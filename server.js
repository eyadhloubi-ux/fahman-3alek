'use strict';
/* فهمان عليك؟ — سيرفر الترحيل
   موبايل الريس هو صاحب حالة اللعبة، والسيرفر بس بيمرّر الرسائل بين الموبايلات. */
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;
const STATS_KEY = process.env.STATS_KEY || '';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const PUB = path.join(__dirname, 'public');

/* ================= الإحصائيات (أرقام فقط، بلا أسماء ولا صور) ================= */
const blank = () => ({ opened: 0, started: 0, finished: 0, players: 0, turns: 0, cycles: 0,
  bank: 0, own: 0, mix: 0, named: 0, anon: 0, maxPlayers: 0, days: {} });
let STATS = blank();
let dirty = false;
let pg = null;

async function loadStats() {
  if (process.env.DATABASE_URL) {
    try {
      const { Pool } = require('pg');
      pg = new Pool({ connectionString: process.env.DATABASE_URL,
        ssl: process.env.PGSSL === 'off' ? false : { rejectUnauthorized: false } });
      await pg.query('CREATE TABLE IF NOT EXISTS fahman_stats (id int PRIMARY KEY, data jsonb NOT NULL)');
      const r = await pg.query('SELECT data FROM fahman_stats WHERE id=1');
      if (r.rows[0]) STATS = { ...blank(), ...r.rows[0].data };
      console.log('stats: postgres');
      return;
    } catch (e) { console.error('stats: postgres failed, using file —', e.message); pg = null; }
  }
  try { STATS = { ...blank(), ...JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'stats.json'), 'utf8')) }; } catch (e) {}
  console.log('stats: file');
}
async function saveStats() {
  if (!dirty) return;
  dirty = false;
  const days = Object.keys(STATS.days).sort();
  while (days.length > 90) delete STATS.days[days.shift()];
  const data = JSON.stringify(STATS);
  try {
    if (pg) await pg.query('INSERT INTO fahman_stats(id,data) VALUES(1,$1) ON CONFLICT (id) DO UPDATE SET data=EXCLUDED.data', [data]);
    else { fs.mkdirSync(DATA_DIR, { recursive: true }); fs.writeFileSync(path.join(DATA_DIR, 'stats.json'), data); }
  } catch (e) { console.error('stats save', e.message); dirty = true; }
}
setInterval(saveStats, 15000).unref();
function bump(k, n = 1) {
  STATS[k] = (STATS[k] || 0) + n;
  const d = new Date().toISOString().slice(0, 10);
  const day = STATS.days[d] || (STATS.days[d] = { opened: 0, started: 0, finished: 0, players: 0 });
  if (k in day) day[k] += n;
  dirty = true;
}

/* ================= HTTP ================= */
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);

let INDEX = '';
function indexHtml(req) {
  if (!INDEX || process.env.NODE_ENV !== 'production') INDEX = fs.readFileSync(path.join(PUB, 'index.html'), 'utf8');
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'https').split(',')[0];
  const origin = proto + '://' + req.get('host');
  return INDEX.replace(/%ORIGIN%/g, origin);
}
app.get(['/', '/index.html'], (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.type('html').send(indexHtml(req));
});
app.use(express.static(PUB, {
  maxAge: '7d',
  setHeaders(res, p) { if (/(sw\.js|manifest\.json)$/.test(p)) res.setHeader('Cache-Control', 'no-cache'); }
}));
app.get('/healthz', (req, res) => res.send('ok'));

const fmt = n => Number(n || 0).toLocaleString('en-US');
app.get('/stats', (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!STATS_KEY) return res.status(503).type('html').send(page('الإحصائيات غير مفعّلة', '<p>يجب تعيين متغيّر البيئة <code>STATS_KEY</code> على الخادم ثم فتح الصفحة عبر <code>/stats?key=…</code>.</p>'));
  if (req.query.key !== STATS_KEY) return res.status(403).type('html').send(page('غير مصرّح', '<p>المفتاح غير صحيح.</p>'));
  const s = STATS;
  const avg = s.started ? (s.players / s.started).toFixed(1) : '0';
  const done = s.started ? Math.round(s.finished / s.started * 100) : 0;
  const days = Object.keys(s.days).sort().reverse().slice(0, 14);
  const cards = [
    ['القعدات المفتوحة', s.opened], ['القعدات التي بدأت', s.started], ['القعدات المكتملة', s.finished],
    ['نسبة الإكمال', done + '%'], ['مجموع اللاعبين', s.players], ['متوسط اللاعبين في القعدة', avg],
    ['أكبر قعدة', s.maxPlayers], ['الأدوار التي كُشفت', s.turns], ['الدورات الإضافية', s.cycles]
  ].map(([k, v]) => `<div class="c"><div class="k">${k}</div><div class="v">${typeof v === 'number' ? fmt(v) : v}</div></div>`).join('');
  const modes = `<div class="row"><span>كل الأسئلة من البنك</span><b>${fmt(s.bank)}</b></div><div class="row"><span>كل لاعب يكتب أسئلته</span><b>${fmt(s.own)}</b></div><div class="row"><span>مزيج من البنك وأسئلة اللاعبين</span><b>${fmt(s.mix)}</b></div>
   <div class="row"><span>أصحاب الأجوبة ظاهرون</span><b>${fmt(s.named)}</b></div><div class="row"><span>أصحاب الأجوبة مخفيون</span><b>${fmt(s.anon)}</b></div>`;
  const rows = days.map(d => { const x = s.days[d]; return `<tr><td>${d}</td><td>${fmt(x.opened)}</td><td>${fmt(x.started)}</td><td>${fmt(x.finished)}</td><td>${fmt(x.players)}</td></tr>`; }).join('')
    || '<tr><td colspan="5">لا توجد بيانات بعد.</td></tr>';
  res.type('html').send(page('إحصائيات «فهمان عليك؟»', `<div class="grid">${cards}</div>
   <h2>إعدادات القعدات</h2><div class="box">${modes}</div>
   <h2>آخر 14 يوماً</h2><div class="box"><table><tr><th>اليوم</th><th>مفتوحة</th><th>بدأت</th><th>اكتملت</th><th>لاعبون</th></tr>${rows}</table></div>
   <p class="note">لا تُحفظ أي أسماء أو صور أو أجوبة؛ الأرقام فقط.</p>`));
});
function page(title, body) {
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><link href="/fonts/fonts.css" rel="stylesheet">
<style>:root{--bg:#EADFC8;--s:#FFFBF2;--i:#14163A;--m:#5B5D7E;--b:#2D46D6}@media(prefers-color-scheme:dark){:root{--bg:#111430;--s:#1D2147;--i:#EEF0FF;--m:#A3A7D2;--b:#7B8CFF}}
body{margin:0;background:var(--bg);color:var(--i);font-family:"IBM Plex Sans Arabic",system-ui,sans-serif}.w{max-width:900px;margin:0 auto;padding:24px 16px 60px}
h1{font-size:28px;margin:0 0 18px}h2{font-size:19px;margin:28px 0 10px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
.c,.box{background:var(--s);border:2.5px solid var(--i);border-radius:10px;box-shadow:4px 4px 0 var(--i);padding:14px}.k{color:var(--m);font-size:14px}.v{font-size:30px;font-weight:700;margin-top:4px;color:var(--b)}
.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1.5px dashed var(--m)}.row:last-child{border:0}table{width:100%;border-collapse:collapse}td,th{padding:8px;text-align:right;border-bottom:1.5px dashed var(--m)}th{color:var(--m);font-weight:600}
.note{color:var(--m);font-size:13px;margin-top:22px}code{background:var(--bg);padding:2px 6px;border-radius:5px}</style></head><body><div class="w"><h1>${title}</h1>${body}</div></body></html>`;
}

/* ================= WebSocket ================= */
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 12 * 1024 * 1024 });
const GRACE = +process.env.HOST_GRACE_MS || 40000; // قدّيش منستنى الريس قبل ما حدا تاني يقدر يستلم
const rooms = new Map(); // code -> { code, secret, host, peers: Map(pid->ws), touched, flags }
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const newCode = () => { let c; do { c = Array.from(crypto.randomBytes(5), b => ALPHA[b % 32]).join(''); } while (rooms.has(c)); return c; };
const okCode = c => typeof c === 'string' && /^[A-Z0-9]{5}$/.test(c);
const okId = s => typeof s === 'string' && s.length >= 4 && s.length <= 40;

function send(ws, obj) { if (ws && ws.readyState === 1) ws.send(typeof obj === 'string' ? obj : JSON.stringify(obj)); }
const mkRoom = (code, secret, flags) => ({ code, secret, host: null, peers: new Map(), touched: Date.now(), flags: flags || {},
  snap: null, roster: null, queue: [], banned: new Set(), vacant: false, vacTimer: null, gone: 0 });
function bcast(room, obj) { const s = JSON.stringify(obj); room.peers.forEach(p => send(p, s)); }
function attachHost(room, ws, quiet) {
  if (room.host && room.host !== ws) { room.host.role = 'gone'; try { room.host.close(4001, 'replaced'); } catch (e) {} }
  room.host = ws; ws.role = 'host'; ws.code = room.code; room.touched = Date.now();
  clearTimeout(room.vacTimer); room.vacant = false; room.gone = 0;
  if (!quiet) bcast(room, { t: 'host-up' });
  // الرسائل اللي وصلت والريس غايب
  const q = room.queue.splice(0); q.forEach(x => send(ws, x));
}
function hostLeft(room) {
  room.host = null; room.gone = Date.now();
  bcast(room, { t: 'host-down', grace: GRACE });
  clearTimeout(room.vacTimer);
  room.vacTimer = setTimeout(() => { if (!room.host && room.snap) { room.vacant = true; bcast(room, { t: 'host-vacant' }); } }, GRACE);
}
function promote(room, pws, extra) {
  const secret = crypto.randomBytes(16).toString('hex');
  room.secret = secret; room.peers.delete(pws.cid);
  attachHost(room, pws, true);
  send(pws, { t: 'promoted', secret, snap: room.snap, roster: room.roster, ...(extra || {}) });
  bcast(room, { t: 'host-up', newHost: pws.cid });
}

wss.on('connection', ws => {
  ws.alive = true;
  ws.on('pong', () => { ws.alive = true; });
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (!m || typeof m !== 'object') return;
    const room = ws.code ? rooms.get(ws.code) : null;
    if (room) room.touched = Date.now();
    switch (m.t) {
      case 'create': {
        const code = newCode(), secret = crypto.randomBytes(16).toString('hex');
        const r = mkRoom(code, secret);
        rooms.set(code, r); attachHost(r, ws); bump('opened');
        send(ws, { t: 'created', code, secret });
        break;
      }
      case 'resume': {
        if (!okCode(m.code) || typeof m.secret !== 'string') return;
        let r = rooms.get(m.code);
        if (!r) { r = mkRoom(m.code, m.secret, m.flags); rooms.set(m.code, r); }
        if (r.secret !== m.secret) { send(ws, { t: 'denied' }); return; }
        attachHost(r, ws);
        send(ws, { t: 'resumed', peers: [...r.peers.keys()] });
        break;
      }
      case 'join': {
        if (!okCode(m.code) || !okId(m.cid)) return;
        const r = rooms.get(m.code);
        if (!r) { send(ws, { t: 'no-room' }); return; }
        if (r.banned.has(m.cid)) { send(ws, { t: 'kicked' }); return; }
        const old = r.peers.get(m.cid);
        if (old && old !== ws) { old.replaced = true; try { old.close(4001, 'replaced'); } catch (e) {} }
        r.peers.set(m.cid, ws); ws.role = 'peer'; ws.code = r.code; ws.cid = m.cid;
        send(ws, { t: 'joined', host: !!(r.host && r.host.readyState === 1), vacant: r.vacant, grace: r.gone ? Math.max(0, GRACE - (Date.now() - r.gone)) : 0 });
        send(r.host, { t: 'peer-up', cid: m.cid });
        break;
      }
      case 'up': // لاعب ← الريس (وإذا الريس غايب منخبّيها لحتى يرجع)
        if (ws.role === 'peer' && room) {
          const x = { t: 'from', cid: ws.cid, msg: m.msg };
          if (room.host && room.host.readyState === 1) send(room.host, x);
          else if (room.queue.length < 300) room.queue.push(x);
        }
        break;
      case 'snap': // نسخة من حالة اللعبة، لحتى حدا تاني يقدر يستلم إذا الريس طلع
        if (ws.role === 'host' && room && room.host === ws && m.snap && typeof m.snap === 'object') room.snap = m.snap;
        break;
      case 'claim': // لاعب بدو يستلم الريس بعد ما الريس غاب
        if (ws.role === 'peer' && room && !room.host && room.vacant && room.snap) promote(room, ws);
        else send(ws, { t: 'claim-no' });
        break;
      case 'handover': { // الريس بيسلّم الرياسة لحدا
        if (ws.role !== 'host' || !room || room.host !== ws) return;
        const target = room.peers.get(m.cid);
        if (!target || target.readyState !== 1) { send(ws, { t: 'handover-no' }); return; }
        if (m.snap && typeof m.snap === 'object') room.snap = m.snap;
        ws.role = 'gone'; room.host = null;
        send(ws, { t: 'handed' });
        promote(room, target, { handed: true });
        break;
      }
      case 'kick': {
        if (ws.role !== 'host' || !room || room.host !== ws || !okId(m.cid)) return;
        room.banned.add(m.cid);
        const p = room.peers.get(m.cid);
        if (p) { send(p, { t: 'kicked' }); room.peers.delete(m.cid); p.role = 'gone'; setTimeout(() => { try { p.close(4002, 'kicked'); } catch (e) {} }, 300); }
        break;
      }
      case 'to': // الريس ← لاعب
        if (ws.role === 'host' && room && room.host === ws) send(room.peers.get(m.cid), { t: 'msg', msg: m.msg });
        break;
      case 'all':
        if (ws.role === 'host' && room && room.host === ws) {
          if (m.msg && m.msg.t === 'roster' && Array.isArray(m.msg.players)) room.roster = m.msg.players;
          const s = JSON.stringify({ t: 'msg', msg: m.msg }); room.peers.forEach(p => send(p, s));
        }
        break;
      case 'stat':
        if (ws.role === 'host' && room && room.host === ws) stat(room, m);
        break;
      case 'ping': send(ws, { t: 'pong' }); break;
    }
  });
  ws.on('close', () => {
    const r = ws.code && rooms.get(ws.code);
    if (!r) return;
    if (ws.role === 'peer' && r.peers.get(ws.cid) === ws) { r.peers.delete(ws.cid); send(r.host, { t: 'peer-down', cid: ws.cid }); }
    if (ws.role === 'host' && r.host === ws) hostLeft(r);
    r.touched = Date.now();
  });
});

function stat(room, m) {
  const f = room.flags;
  const n = Math.max(0, Math.min(60, parseInt(m.n) || 0));
  if (m.ev === 'start' && !f.started) {
    f.started = true; bump('started'); bump('players', n);
    if (n > STATS.maxPlayers) { STATS.maxPlayers = n; dirty = true; }
    bump(['own', 'mix'].includes(m.mode) ? m.mode : 'bank'); bump(m.named ? 'named' : 'anon');
  } else if (m.ev === 'turn' && (f.turns = (f.turns || 0) + 1) <= 500) bump('turns');
  else if (m.ev === 'cycle' && (f.cycles = (f.cycles || 0) + 1) <= 50) bump('cycles');
  else if (m.ev === 'finish' && !f.finished) { f.finished = true; bump('finished'); }
}

// نبض لإبقاء الاتصالات حيّة، وتنظيف القعدات المهجورة
setInterval(() => {
  wss.clients.forEach(ws => { if (!ws.alive) return ws.terminate(); ws.alive = false; try { ws.ping(); } catch (e) {} });
  const now = Date.now();
  rooms.forEach((r, k) => {
    const empty = !r.host && r.peers.size === 0;
    if ((empty && now - r.touched > 3 * 3600e3) || now - r.touched > 18 * 3600e3) { clearTimeout(r.vacTimer); rooms.delete(k); }
  });
}, 25000).unref();

loadStats().then(() => server.listen(PORT, () => console.log('فهمان عليك؟ على المنفذ ' + PORT)));
const bye = () => { dirty = true; saveStats().finally(() => process.exit(0)); };
process.on('SIGTERM', bye); process.on('SIGINT', bye);
