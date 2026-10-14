'use strict';
/* ==========================================================
   فهمان عليك؟ — قعدة رواق · إعداد م. إياد حلوبي
   موبايل الريس صاحب الحالة، والسيرفر بس بيمرّر الرسائل.
   ========================================================== */

/* ================= ثوابت ================= */
const INSTA = 'https://www.instagram.com/eyad.hloubi/';
const PCOL = ['#9FB0FF', '#8EE3BE', '#FF9DAB', '#F2CF8E', '#C7B4FF', '#9DE0F0', '#FFB98A', '#C9E68A', '#F5A8D4', '#B5C7FF', '#E8D27A', '#A8E6CF'];
const TITLES = [
  ['قارئ الأفكار', 'قارئة الأفكار'],
  ['فهمان عالطاير', 'فهمانة عالطاير'],
  ['عينو عليكن', 'عينها عليكن'],
  ['على نفس الموجة', 'على نفس الموجة'],
  ['بيلقطها من نصّها', 'بتلقطها من نصّها'],
  ['فهمان بس بدو شرح', 'فهمانة بس بدها شرح'],
  ['عم يقرّب يفهمكن', 'عم تقرّب تفهمكن'],
  ['بدو كم قعدة كمان', 'بدها كم قعدة كمان'],
  ['لسّا عم يتعرّف عليكن', 'لسّا عم تتعرّف عليكن'],
  ['مو فهمان على حدا', 'مو فهمانة على حدا']
];
const GROUP_TYPES = ['شلة', 'عيلة', 'رفقة', 'فريق', 'جمعة الشغل', 'الدفعة', 'الجيران', 'ولاد العم'];
const PTS = [2, 1, 1];

/* بنك الأسئلة: [أيقونة، صيغة الشب، صيغة الصبية] — {n} = اسم صاحب الدور */
const QB = [
  ['sun', 'شو أول شي بيعملو {n} لما يصحى؟', 'شو أول شي بتعملو {n} لما تصحى؟'],
  ['cup', 'شو بيطلب {n} إذا قعد بكافيه؟', 'شو بتطلب {n} إذا قعدت بكافيه؟'],
  ['money', 'لو ربح {n} مليون، شو أول شي بيشتريه؟', 'لو ربحت {n} مليون، شو أول شي بتشتريه؟'],
  ['chat', 'شو الجملة اللي ما بتفارق تمّ {n}؟'],
  ['fire', 'شو الشي اللي بيعصّب {n} بثانية؟'],
  ['plane', 'وين بيحلم {n} يسافر؟', 'وين بتحلم {n} تسافر؟'],
  ['food', 'شو أكلة {n} المفضّلة؟'],
  ['home', 'شو بيعمل {n} أول ما يرجع عالبيت؟', 'شو بتعمل {n} أول ما ترجع عالبيت؟'],
  ['paw', 'لو كان {n} حيوان، شو بيكون؟', 'لو كانت {n} حيوان، شو بتكون؟'],
  ['music', 'شو الأغنية اللي بيدندنها {n} بالسيارة؟', 'شو الأغنية اللي بتدندنها {n} بالسيارة؟'],
  ['phone', 'شو أكتر تطبيق بيفتحو {n} عالموبايل؟', 'شو أكتر تطبيق بتفتحو {n} عالموبايل؟'],
  ['heart', 'شو الشي اللي ما بيقدر {n} يعيش بلاه؟', 'شو الشي اللي ما بتقدر {n} تعيش بلاه؟'],
  ['smile', 'شو أكتر شي بيضحّك {n}؟'],
  ['clock', 'لو عند {n} يوم فاضي كامل، كيف بيقضّيه؟', 'لو عند {n} يوم فاضي كامل، كيف بتقضّيه؟'],
  ['gift', 'شو الهدية اللي بتفرّح {n} أكتر شي؟'],
  ['star', 'شو المهنة اللي كان {n} رح يبدع فيها غير شغلو؟', 'شو المهنة اللي كانت {n} رح تبدع فيها غير شغلها؟'],
  ['clock', 'شو الشي اللي دايماً بيأجّلو {n}؟', 'شو الشي اللي دايماً بتأجّلو {n}؟'],
  ['film', 'شو المسلسل أو الفيلم اللي بيعيدو {n} بلا ملل؟', 'شو المسلسل أو الفيلم اللي بتعيدو {n} بلا ملل؟'],
  ['moon', 'شو بيعمل {n} إذا زعل؟', 'شو بتعمل {n} إذا زعلت؟'],
  ['food', 'شو الحلو اللي ما بيقدر {n} يقاومو؟', 'شو الحلو اللي ما بتقدر {n} تقاومو؟'],
  ['eye', 'شو أول شي بيلاحظو {n} بالناس؟', 'شو أول شي بتلاحظو {n} بالناس؟'],
  ['moon', 'شو الشي اللي بيسهّر {n} للصبح؟'],
  ['clock', 'لو بيقدر {n} يرجع بالزمن، لأي عمر بيرجع؟', 'لو بتقدر {n} ترجع بالزمن، لأي عمر بترجع؟'],
  ['q', 'شو الشي اللي دايماً بيضيّعو {n}؟', 'شو الشي اللي دايماً بتضيّعو {n}؟'],
  ['sun', 'شو الفصل المفضّل عند {n}؟'],
  ['fire', 'شو بيعمل {n} لما يتوتّر؟', 'شو بتعمل {n} لما تتوتّر؟'],
  ['money', 'عشو بيصرف {n} مصاري بلا ما يحسب؟', 'عشو بتصرف {n} مصاري بلا ما تحسب؟'],
  ['chat', 'شو أكتر كلمة بيكتبها {n} بالرسائل؟', 'شو أكتر كلمة بتكتبها {n} بالرسائل؟'],
  ['star', 'شو الشي اللي بيفتخر فيه {n} بحالو؟', 'شو الشي اللي بتفتخر فيه {n} بحالها؟'],
  ['cup', 'قهوة ولا شاي؟ وكيف بيشربها {n}؟', 'قهوة ولا شاي؟ وكيف بتشربها {n}؟'],
  ['star', 'لو فتح {n} مشروع، شو بيكون؟', 'لو فتحت {n} مشروع، شو بيكون؟'],
  ['smile', 'شو أكتر شي بيحبّو {n} بالسهرات؟', 'شو أكتر شي بتحبّو {n} بالسهرات؟'],
  ['moon', 'شو الشي اللي بيخاف منو {n} وما بيعترف؟', 'شو الشي اللي بتخاف منو {n} وما بتعترف؟'],
  ['film', 'مين الشخصية المشهورة اللي بتشبه {n} بطباعو؟', 'مين الشخصية المشهورة اللي بتشبه {n} بطباعها؟'],
  ['heart', 'شو أحلى ذكرى طفولة عند {n}؟'],
  ['lock', 'شو الشي اللي ما بيرضى {n} حدا يلمسو؟', 'شو الشي اللي ما بترضى {n} حدا يلمسو؟'],
  ['food', 'إذا طلبنا أكل عالبيت، شو بيطلب {n}؟', 'إذا طلبنا أكل عالبيت، شو بتطلب {n}؟'],
  ['paw', 'لو كان {n} لون، شو بيكون؟', 'لو كانت {n} لون، شو بتكون؟'],
  ['chat', 'شو النصيحة اللي دايماً بيعطيها {n}؟', 'شو النصيحة اللي دايماً بتعطيها {n}؟'],
  ['phone', 'شو أول شي بيعملو {n} لما يمسك الموبايل؟', 'شو أول شي بتعملو {n} لما تمسك الموبايل؟'],
  ['music', 'مين المطرب اللي بيرفع مزاج {n}؟'],
  ['plane', 'لو {n} مسافر بكرا، شو أول غرض بيحطّو بالشنتة؟', 'لو {n} مسافرة بكرا، شو أول غرض بتحطّو بالشنتة؟']
];

const ICONS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  cup: '<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 10h2a2 2 0 0 1 0 4h-2M8 2v3M12 2v3"/>',
  money: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 9.5h.01M17.5 14.5h.01"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  fire: '<path d="M12 21c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z"/>',
  plane: '<path d="M10.5 13.5L3 11l18-7-7 18-2.5-7.5zM10.5 13.5L21 4"/>',
  food: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 3-3 7h3v11"/>',
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  paw: '<circle cx="7" cy="9" r="1.8"/><circle cx="11" cy="6" r="1.8"/><circle cx="15.5" cy="7" r="1.8"/><circle cx="18" cy="11" r="1.8"/><path d="M12 12c-3 0-6 4-5 7 1 2 4 1 5 1s4 1 5-1c1-3-2-7-5-7z"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14c1 2.5 7 2.5 8 0M9 9.5h.01M15 9.5h.01"/>',
  gift: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M3 9h18M12 9v11M12 9c-2-4-6-4-6-1s6 1 6 1zM12 9c2-4 6-4 6-1s-6 1-6 1z"/>',
  clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  q: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17h.01"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 12l5 5L20 7"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  back: '<path d="M9 6l6 6-6 6"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  down: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  skip: '<path d="M6 6l6 6-6 6M13 6l6 6-6 6"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/>',
  crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
  moonT: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13" r="4"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4M9 2h6M19 6l1.5-1.5"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>',
  menu: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
  hide: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/><rect x="9" y="11" width="6" height="5" rx="1"/>',
  install: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 7v7M9 11l3 3 3-3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5M14 10.5V5.5a1.5 1.5 0 0 1 3 0V13c0 4-2.5 7-6.5 7S5 17.5 4.5 15l-1-3a1.5 1.5 0 0 1 2.7-1.2L8 13"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  door: '<path d="M14 3H6v18h8M14 3l5 2v14l-5 2zM11 12h.01"/>',
  flip: '<path d="M4 7h11a4 4 0 0 1 0 8H9M7 4L4 7l3 3M17 20l3-3-3-3"/>'
};
const ic = (k, c = '') => `<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || ICONS.q}</svg>`;

/* ================= أدوات ================= */
const $ = s => document.querySelector(s);
const app = $('#app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rnd = n => Array.from(crypto.getRandomValues(new Uint8Array(n)));
const rid = (n = 12) => rnd(n).map(b => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const store = {
  get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { sessionStorage.removeItem(k); } catch (e) {} }
};
const params = new URLSearchParams(location.search);
let DEMO = params.has('demo') || !!window.__PREVIEW;
const cleanName = n => String(n || '').replace(/\s+/g, ' ').trim().slice(0, 20);
const cleanText = (n, max) => String(n || '').replace(/\s+/g, ' ').trim().slice(0, max);
const initial = n => { let t = String(n || '؟').trim(); if (/^ال./.test(t)) t = t.slice(2); return /^[اأإآ]/.test(t) ? t.slice(0, 2) : (t[0] || '؟'); };
function toast(msg, ms = 2400) { document.querySelectorAll('.toast').forEach(t => t.remove()); const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), ms); }
const vibrate = n => { try { navigator.vibrate && navigator.vibrate(n); } catch (e) {} };

/* ================= الحالة ================= */
let ROLE = null, CODE = null, SECRET = null, ME = null, H = null, S = null, PICK = null;
let ROSTER = [];
const UI = {
  screen: 'cover', profile: { name: '', photo: null, g: null }, asHost: false, codeInput: '', gTried: false,
  draft: '', askDraft: '', qAdd: '', sheet: false, picks: { f: [], r: [] }, pkey: null, seen: {}, sentFx: null,
  wrap: { type: 'شلة', name: '', photo: null, party: true }, layout: 'cover', imgTheme: null, storyPid: null,
  showPts: true, showRank: true, ftab: 'people', story: {}, conn: 'idle', joined: false, noRoom: false, hostDown: false,
  lastKey: null, nextKey: null, flashSeen: null, dl: null, settings: { cycles: 2, bank: 1, names: true, timer: 0 }, myqs: [], mySugg: null, noneArm: false
};
const byId = pid => ROSTER.find(p => p.pid === pid);
const nameOf = pid => { const p = byId(pid); return p ? p.name : '؟'; };
const gOf = pid => { const p = byId(pid); return p && p.g === 'f' ? 'f' : 'm'; };
const G = (pid, m, f) => gOf(pid) === 'f' ? f : m;           // نص حسب جنس شخص
const T = (m, f) => G(ME, m, f);                               // نص حسب جنسي أنا
const titleOf = (pid, t) => TITLES[t][gOf(pid) === 'f' ? 1 : 0];
const colOf = pid => { const p = byId(pid); return PCOL[(p ? p.ci : 0) % PCOL.length]; };

/* ================= السمة ================= */
function themeNow() { const t = document.documentElement.dataset.theme; if (t) return t; return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
function applyTheme(t) { document.documentElement.dataset.theme = t; const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t === 'dark' ? '#111430' : '#EADFC8'; try { localStorage.setItem('fahman-theme', t); } catch (e) {} }
try { const t = localStorage.getItem('fahman-theme'); if (t) applyTheme(t); } catch (e) {}

/* ================= الشبكة ================= */
let ws = null, wsTimer = null, wsBack = 700, hiTimer = null;
function wsOpen() {
  if (DEMO) return;
  clearTimeout(wsTimer);
  const u = (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/ws';
  try { ws = new WebSocket(u); } catch (e) { return retry(); }
  const me = ws;
  ws.onopen = () => {
    if (me !== ws) return;
    wsBack = 700; UI.conn = 'up';
    if (ROLE === 'host') wsSend(SECRET ? { t: 'resume', code: CODE, secret: SECRET } : { t: 'create' });
    else wsSend({ t: 'join', code: CODE, cid: ME });
    render();
  };
  ws.onmessage = e => { if (me !== ws) return; let m; try { m = JSON.parse(e.data); } catch (_) { return; } onNet(m); };
  ws.onclose = () => { if (me !== ws) return; UI.conn = 'down'; UI.joined = false; render(); retry(); };
  ws.onerror = () => {};
}
function retry() { clearTimeout(wsTimer); wsTimer = setTimeout(wsOpen, wsBack); wsBack = Math.min(wsBack * 1.6, 6000); }
function wsSend(o) { if (ws && ws.readyState === 1) { try { ws.send(JSON.stringify(o)); } catch (e) {} } }
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible' || !ROLE || DEMO) return;
  keepAwake();
  if (!ws || ws.readyState > 1) { clearTimeout(wsTimer); wsOpen(); }
});
addEventListener('online', () => { if (ROLE && !DEMO && (!ws || ws.readyState > 1)) wsOpen(); });
setInterval(() => { if (ws && ws.readyState === 1) wsSend({ t: 'ping' }); }, 20000);

function onNet(m) {
  if (ROLE === 'host') {
    if (m.t === 'created') {
      CODE = m.code; SECRET = m.secret; H.code = CODE;
      store.set('fahman-me-' + CODE, ME);
      try { history.replaceState(null, '', '?r=' + CODE + '&h=1'); } catch (e) {}
      pushRoster(); pushState();
    } else if (m.t === 'resumed') { pushRoster(); pushState(); }
    else if (m.t === 'denied') demoteToPlayer('صار في ريس جديد للقعدة، ورجعت لاعب 👋');
    else if (m.t === 'handed') demoteToPlayer('سلّمت الرياسة 👑 وصرت لاعب');
    else if (m.t === 'handover-no') toast('ما قدرنا نسلّمو، يمكن طلع من القعدة');
    else if (m.t === 'from') hostMsg(m.cid, m.msg);
    else if (m.t === 'peer-down') { const p = H.players[m.cid]; if (p) { p.on = false; pushRoster(); pushState(); } }
    return;
  }
  // لاعب
  if (m.t === 'joined') { UI.noRoom = false; UI.hostDown = !m.host; UI.vacant = !!m.vacant; UI.graceEnd = m.host ? 0 : Date.now() + (m.grace || 0); sendHi(); render(); }
  else if (m.t === 'kicked') { UI.kicked = true; ROLE = null; clearInterval(hiTimer); try { ws.onclose = null; ws.close(); } catch (e) {} store.del('fahman-p-' + CODE); render(); }
  else if (m.t === 'host-vacant') { UI.vacant = true; render(); }
  else if (m.t === 'claim-no') { UI.claiming = false; toast('حدا سبقك واستلم 👑'); render(); }
  else if (m.t === 'promoted') becomeHost(m);
  else if (m.t === 'no-room') { UI.noRoom = true; render(); setTimeout(() => wsSend({ t: 'join', code: CODE, cid: ME }), 3000); }
  else if (m.t === 'host-up') { UI.hostDown = false; UI.vacant = false; UI.claiming = false; UI.joined = false; sendHi(); render(); }
  else if (m.t === 'host-down') { UI.hostDown = true; UI.graceEnd = Date.now() + (m.grace || 40000); render(); }
  else if (m.t === 'msg') playerMsg(m.msg);
}
function sendHi() {
  const p = UI.profile;
  const hi = () => wsSend({ t: 'up', msg: { t: 'hi', pid: ME, name: p.name, photo: p.photo, g: p.g } });
  hi(); clearInterval(hiTimer);
  hiTimer = setInterval(() => { if (UI.joined) clearInterval(hiTimer); else hi(); }, 2500);
}
function playerMsg(m) {
  if (!m || typeof m !== 'object') return;
  if (m.t === 'welcome') { UI.joined = true; if (UI.myqs.length) wsSend({ t: 'up', msg: { t: 'myq', pid: ME, list: UI.myqs.slice() } }); render(); }
  else if (m.t === 'roster' && Array.isArray(m.players)) { ROSTER = m.players; render(); }
  else if (m.t === 'state' && m.s) { setState(m.s); if (byId(ME)) UI.joined = true; render(); }
  else if (m.t === 'pick') { PICK = m; render(); }
}
function setState(s) {
  S = s;
  UI.dl = S.turn && S.turn.left != null ? Date.now() + S.turn.left : null;
  if (S.flash && S.flash.id !== UI.flashSeen) { UI.flashSeen = S.flash.id; setTimeout(() => toast(S.flash.text), 120); }
}
function send(m) { if (ROLE === 'host') hostMsg('self', m); else wsSend({ t: 'up', msg: m }); }

/* ================= الريس: الحالة ================= */
function out(m) { if (!DEMO) wsSend({ t: 'all', msg: m }); }
function outTo(pid, m) { if (!DEMO) wsSend({ t: 'to', cid: pid, msg: m }); }
function stat(ev, extra) { if (!DEMO) wsSend({ t: 'stat', ev, ...(extra || {}) }); }
let snapT = 0;
function hostSave() {
  if (!H || DEMO) return;
  const c = { ...H, _t: null };
  store.set('fahman-host-' + H.code, { H: c, SECRET });
  clearTimeout(snapT); snapT = setTimeout(sendSnap, 700);
}
// نسخة من الحالة بلا صور اللاعبين (الصور عند السيرفر بالـroster) — لحتى حدا تاني يقدر يستلم الريس
function snapOf() {
  const players = {};
  for (const k in H.players) players[k] = { ...H.players[k], photo: null };
  return JSON.parse(JSON.stringify({ ...H, _t: null, players }));
}
function sendSnap() { if (H && !DEMO && H.code && ROLE === 'host') wsSend({ t: 'snap', snap: snapOf() }); }
function becomeHost(m) {
  if (!m.snap) return;
  const old = Object.values(m.snap.players).find(p => p.host);
  ROLE = 'host'; SECRET = m.secret; H = m.snap; H.code = CODE; H.demo = false; PICK = null;
  const ros = Array.isArray(m.roster) ? m.roster : [];
  Object.values(H.players).forEach(p => { const r = ros.find(x => x.pid === p.pid); p.photo = r ? r.photo : null; p.host = p.pid === ME; });
  if (old && old.pid !== ME) old.on = false;
  if (H.players[ME]) H.players[ME].on = true;
  UI.settings = { ...H.settings }; UI.hostDown = false; UI.vacant = false; UI.claiming = false; UI.joined = true;
  store.set('fahman-me-' + CODE, ME); store.del('fahman-p-' + CODE);
  try { history.replaceState(null, '', '?r=' + CODE + '&h=1'); } catch (e) {}
  H.flash = { id: rid(4), text: '👑 ' + nameOf(ME) + (m.handed ? ' استلم الرياسة' : ' صار الريس، واللعبة مكمّلة') };
  UI.flashSeen = H.flash.id; toast(T('👑 صرت الريس!', '👑 صرتي الريس!'));
  pushRoster(); pushState(); sendSnap();
  if (H.phase === 'write' && H.cur && H.cur.deadline) armTimer();
  if (H.phase === 'pick') sendPick();
  if (H.phase === 'pick' && H.cur && H.players[H.cur.subject] && !H.players[H.cur.subject].on) toast('صاحب الدور مو موجود، فيك تتخطّى دورو من ⋯');
}
function demoteToPlayer(msg) {
  const me = H && H.players[ME];
  if (H) clearTimeout(H._t);
  clearTimeout(snapT);
  if (H && H.code) store.del('fahman-host-' + H.code);
  if (me) UI.profile = { name: me.name, photo: me.photo, g: me.g };
  ROLE = 'player'; H = null; SECRET = null; PICK = null; UI.sheet = false; UI.member = null;
  try { history.replaceState(null, '', '?r=' + CODE); } catch (e) {}
  toast(msg, 3500);
  try { ws.onclose = null; ws.close(); } catch (e) {}
  joinAsPlayer();
}
function startHost() {
  ROLE = 'host'; ME = rid();
  H = { code: null, demo: DEMO, players: {}, settings: { ...UI.settings },
    phase: 'lobby', order: [], ti: -1, cycle: 1, round: 0, cur: null, pending: null, last: null, rounds: [], bag: [],
    final: null, results: null, partyStep: 0, flash: null, started: false, finished: false, prev: null, nextCi: 0 };
  addPlayer(ME, { name: UI.profile.name, photo: UI.profile.photo, g: UI.profile.g, host: true });
  UI.screen = 'game';
  if (DEMO) { H.code = 'DEMO1'; CODE = 'DEMO1'; UI.conn = 'up'; pushRoster(); pushState(); addBots(); return; }
  pushRoster(); pushState(); wsOpen(); keepAwake();
}
function resumeHost(saved) {
  ROLE = 'host'; H = saved.H; SECRET = saved.SECRET; CODE = H.code;
  ME = store.get('fahman-me-' + CODE) || Object.keys(H.players).find(k => H.players[k].host);
  Object.values(H.players).forEach(p => { if (!p.host) p.on = false; });
  UI.screen = 'game'; UI.settings = { ...H.settings }; UI.myqs = (H.players[ME] && H.players[ME].qs || []).slice();
  pushRoster(); pushState(); wsOpen(); keepAwake();
  if (H.phase === 'write' && H.cur && H.cur.deadline) armTimer();
}
function addPlayer(pid, d) {
  const p = H.players[pid] = { pid, name: cleanName(d.name) || ('ضيف ' + (Object.keys(H.players).length + 1)), photo: d.photo || null,
    g: d.g === 'f' ? 'f' : 'm', on: true, host: !!d.host, bot: !!d.bot, ci: H.nextCi++, qs: [], plan: null };
  return p;
}
function hostMsg(cid, m) {
  if (!H || !m || typeof m !== 'object') return;
  const pid = m.pid;
  if (typeof pid !== 'string' || pid.length > 40) return;
  if (cid !== 'self' && cid !== 'bot' && cid !== pid) return;
  if (m.t === 'hi') {
    let p = H.players[pid];
    if (p && p.out) { outTo(pid, { t: 'kicked' }); return; }
    const fresh = !p;
    if (!p) p = addPlayer(pid, { name: m.name, g: m.g, bot: cid === 'bot' });
    else if (m.name && !p.renamed) p.name = cleanName(m.name) || p.name;
    if (m.g === 'm' || m.g === 'f') p.g = m.g;
    if (typeof m.photo === 'string' && m.photo.startsWith('data:image/') && m.photo.length < 400000) p.photo = m.photo;
    else if (m.photo === null && !fresh) p.photo = null;
    p.on = true;
    if (fresh && ['ask', 'write', 'pick', 'decide', 'reveal'].includes(H.phase) && !H.order.includes(pid)) H.order.push(pid);
    if (cid !== 'self' && cid !== 'bot') outTo(pid, { t: 'welcome' });
    pushRoster(); pushState();
    if (cid !== 'self' && cid !== 'bot') { outTo(pid, { t: 'roster', players: ROSTER }); outTo(pid, { t: 'state', s: S }); }
    if (H.phase === 'pick' && H.cur && H.cur.subject === pid) sendPick();
    if (H.phase === 'write' && fresh) botsWrite();
    return;
  }
  const p = H.players[pid];
  if (!p || p.out) return;
  const c = H.cur;
  switch (m.t) {
    case 'me': { // اللاعب عدّل اسمو أو صورتو
      const n = cleanName(m.name); if (n) { p.name = n; p.renamed = false; }
      if (m.g === 'm' || m.g === 'f') p.g = m.g;
      if (typeof m.photo === 'string' && m.photo.startsWith('data:image/') && m.photo.length < 400000) p.photo = m.photo;
      else if (m.photo === null) p.photo = null;
      pushRoster(); pushState();
      break;
    }
    case 'ask': {
      if (H.phase !== 'ask' || !c || c.subject !== pid || m.key !== c.key) return;
      const t = cleanText(m.text, 90); if (!t) return;
      c.q = { text: t, icon: 'pen', own: true }; H.phase = 'write'; startClock(); pushState(); botsWrite();
      break;
    }
    case 'ans': {
      if (H.phase !== 'write' || !c || m.key !== c.key || pid === c.subject) return;
      const t = cleanText(m.text, 70); if (!t) return;
      if (c.deadline && Date.now() > c.deadline + 1500) return;
      c.answers[pid] = t;
      if (allWrote()) toPick(); else pushState();
      break;
    }
    case 'unans':
      if (H.phase !== 'write' || !c || m.key !== c.key) return;
      delete c.answers[pid]; pushState();
      break;
    case 'myq':
      if (!Array.isArray(m.list) || H.started) return;
      p.qs = m.list.map(t => cleanText(t, 90)).filter(Boolean).slice(0, 6);
      pushRoster();
      break;
    case 'picks':
      if (H.phase !== 'pick' || !c || m.key !== c.key || pid !== c.subject) return;
      applyPicks(Array.isArray(m.ids) ? m.ids : [], !!m.none, Array.isArray(m.firsts) ? m.firsts : null);
      break;
  }
}
function writers() { const c = H.cur; return Object.values(H.players).filter(p => p.on && !p.out && p.pid !== c.subject).map(p => p.pid); }
function allWrote() { const w = writers(); return w.length > 0 && w.every(pid => H.cur.answers[pid]); }

function rosterList() {
  return Object.values(H.players).sort((a, b) => a.ci - b.ci)
    .map(p => ({ pid: p.pid, name: p.name, photo: p.photo || null, g: p.g, on: !!p.on && !p.out, host: !!p.host, ci: p.ci, qn: (p.qs || []).length, out: !!p.out, bot: !!p.bot }));
}
function pushRoster() { ROSTER = rosterList(); out({ t: 'roster', players: ROSTER }); hostSave(); render(); }

function pubRound(r) {
  if (!r) return null;
  const named = H.settings.names;
  return { key: r.key, subject: r.subject, q: r.q, none: r.none, empty: r.empty, hidden: !!r.hidden,
    list: r.list.map(x => ({ text: x.text, rank: x.rank, pts: x.pts, author: named ? x.author : null })) };
}
function pub() {
  const c = H.cur;
  const s = { phase: H.phase, code: H.code, cycle: H.cycle, set: H.settings, asked: H.rounds.length,
    hiddenCount: H.rounds.filter(r => r.hidden).length, flash: H.flash };
  if (c && ['ask', 'write', 'pick', 'decide'].includes(H.phase)) {
    s.turn = { key: c.key, subject: c.subject, q: c.q, wrote: Object.keys(c.answers), n: H.ti + 1, of: H.order.length,
      left: c.deadline ? Math.max(0, c.deadline - Date.now()) : null, dur: c.dur || 20000, hurry: !!c.hurry, sugg: H.phase === 'ask' ? c.sugg : null,
      count: c.cards ? c.cards.length : 0 };
  }
  if (H.phase === 'reveal') { s.reveal = pubRound(H.last); s.turn = { n: H.ti + 1, of: H.order.length }; }
  if (H.phase === 'cycleEnd' && H.cycle < H.settings.cycles) s.board = ranking(false); // بآخر دورة الترتيب بيضل مختوم للكشف
  if (H.phase === 'party' || H.phase === 'final') s.final = { info: H.final, results: H.results, rounds: H.rounds.map(pubRound), step: H.partyStep, party: H.final && H.final.party };
  return s;
}
function pushState() { S = pub(); UI.dl = H.cur && H.cur.deadline ? H.cur.deadline : null; out({ t: 'state', s: S }); hostSave(); render(); }

function ranking(withHidden) {
  const pts = {}, firsts = {};
  Object.keys(H.players).filter(p => !H.players[p].out).forEach(p => { pts[p] = 0; firsts[p] = 0; });
  H.rounds.forEach(r => {
    if (!withHidden && r.hidden) return;
    r.list.forEach(x => { if (x.rank && pts[x.author] != null) { pts[x.author] += x.pts; if (x.rank === 1) firsts[x.author]++; } });
  });
  const arr = Object.keys(pts).map(pid => ({ pid, pts: pts[pid], firsts: firsts[pid] }))
    .sort((a, b) => b.pts - a.pts || b.firsts - a.firsts || H.players[a.pid].ci - H.players[b.pid].ci);
  let rank = 0;
  arr.forEach((x, i) => { if (i === 0 || x.pts !== arr[i - 1].pts || x.firsts !== arr[i - 1].firsts) rank = i + 1; x.rank = rank; });
  const n = arr.length, lastRank = n ? arr[n - 1].rank : 1;
  arr.forEach(x => {
    if (x.rank === 1) x.t = 0;
    else if (x.rank === lastRank) x.t = TITLES.length - 1;
    else x.t = 1 + Math.min(TITLES.length - 3, Math.floor((x.rank - 2) * (TITLES.length - 2) / Math.max(1, n - 2)));
  });
  return arr;
}

/* ---- مسار الدور ---- */
function bankQ(pid) {
  if (!H.bag.length) H.bag = shuffle(QB.map((_, i) => i));
  const i = H.bag.shift();
  return qFor(i, pid);
}
function qFor(i, pid) {
  const [icon, m, f] = QB[i]; const p = H.players[pid];
  const t = (p.g === 'f' && f ? f : m).replace('{n}', p.name);
  return { text: t, icon };
}
function suggestions(pid) { return shuffle(QB.map((_, i) => i)).slice(0, 3).map(i => qFor(i, pid).text); }
function makePlan() {
  const n = H.settings.cycles, b = Math.min(n, H.settings.bank);
  return shuffle(Array(n - b).fill('own').concat(Array(b).fill('bank')));
}
function beginTurn(subject, forceBank) {
  clearTimeout(H._t);
  H.round++;
  H.cur = { key: 't' + H.round + rid(3), subject, q: null, answers: {}, cards: null, deadline: null };
  H.pending = null; H.last = null;
  const p = H.players[subject];
  if (!p.plan) p.plan = makePlan();
  const kind = forceBank ? 'bank' : (p.plan[H.cycle - 1] || 'bank');
  if (kind === 'own' && p.qs && p.qs.length) { H.cur.q = { text: p.qs.shift(), icon: 'pen', own: true }; H.phase = 'write'; }
  else if (kind === 'own') { H.phase = 'ask'; H.cur.sugg = suggestions(subject); }
  else { H.cur.q = bankQ(subject); H.phase = 'write'; }
  if (H.phase === 'write') startClock();
  UI.sheet = false;
  pushState();
  if (H.phase === 'write') botsWrite(); else botsAsk();
}
function nextTurn() {
  clearTimeout(H._t);
  for (;;) {
    H.ti++;
    if (H.ti >= H.order.length) { H.phase = 'cycleEnd'; H.cur = null; H.pending = null; H.last = null; pushState(); return; }
    const p = H.players[H.order[H.ti]];
    if (p && p.on && !p.out) break;
  }
  beginTurn(H.order[H.ti]);
}
function onlineIds() { return Object.values(H.players).filter(p => p.on && !p.out).map(p => p.pid); }
function startClock() { const sec = +H.settings.timer || 0; if (!sec || !H.cur) return; H.cur.dur = sec * 1000; H.cur.deadline = Date.now() + sec * 1000; H.cur.hurry = false; armTimer(); }
function armTimer() {
  clearTimeout(H._t);
  const key = H.cur.key;
  H._t = setTimeout(() => { if (ROLE === 'host' && H && H.phase === 'write' && H.cur && H.cur.key === key) toPick(); }, Math.max(0, H.cur.deadline - Date.now()) + 150);
}
function toPick() {
  clearTimeout(H._t);
  const c = H.cur; c.deadline = null; c.hurry = false;
  const ids = Object.keys(c.answers);
  if (!ids.length) { recordRound({ key: c.key, subject: c.subject, q: c.q, list: [], none: true, empty: true }); return revealNow(); }
  c.cards = shuffle(ids.map(a => ({ id: rid(6), author: a, text: c.answers[a] })));
  H.phase = 'pick'; pushState(); sendPick(); botPick();
}
function sendPick() {
  const c = H.cur; if (!c || !c.cards) return;
  const msg = { t: 'pick', key: c.key, cards: c.cards.map(x => ({ id: x.id, text: x.text })) };
  if (c.subject === ME) { PICK = msg; render(); } else outTo(c.subject, msg);
}
function applyPicks(ids, none, firsts) {
  const c = H.cur;
  const ok = id => c.cards.some(x => x.id === id);
  // firsts: أوراق متشابهة كلها بالمركز الأول (نقطتين لكل وحدة)، وبعدها لحد ورقتين نقطة نقطة
  let F = none ? [] : [...new Set(firsts || [])].filter(ok);
  let rest = none ? [] : [...new Set(ids)].filter(id => ok(id) && !F.includes(id));
  if (!F.length && rest.length) F = [rest.shift()];
  rest = rest.slice(0, 2);
  const valid = F.concat(rest);
  if (!none && !valid.length) return;
  const card = id => c.cards.find(k => k.id === id);
  const list = F.map(id => ({ text: card(id).text, author: card(id).author, rank: 1, pts: PTS[0] }))
    .concat(rest.map((id, i) => ({ text: card(id).text, author: card(id).author, rank: i + 2, pts: PTS[i + 1] })))
    .concat(c.cards.filter(x => !valid.includes(x.id)).map(x => ({ text: x.text, author: x.author, rank: 0, pts: 0 })));
  H.pending = { key: c.key, subject: c.subject, q: c.q, list, none: !valid.length, empty: false };
  H.phase = 'decide'; pushState();
}
function recordRound(r) { H.pending = r; }
function revealNow() {
  const r = H.pending; if (!r) return;
  r.hidden = false; H.rounds.push(r); H.last = r; H.pending = null; H.cur = null;
  H.phase = 'reveal'; stat('turn'); pushState();
}
function hideForLater() {
  const r = H.pending; if (!r) return;
  r.hidden = true; H.rounds.push(r); H.pending = null;
  H.flash = { id: rid(4), text: 'جولة ' + nameOf(r.subject) + ' انحفظت بظرف مختوم للآخر 🔒' };
  nextTurn();
}
const HOST = {
  start() {
    const on = onlineIds(); if (on.length < 2) return;
    H.settings = { ...UI.settings };
    H.order = shuffle(on); H.ti = -1; H.cycle = 1;
    const own = H.settings.cycles - H.settings.bank;
    Object.values(H.players).forEach(p => { p.plan = makePlan(); if (p.bot) while (p.qs.length < own) p.qs.push(suggestions(p.pid)[0]); });
    if (!H.started) { H.started = true; stat('start', { n: on.length, mode: H.settings.bank >= H.settings.cycles ? 'bank' : H.settings.bank === 0 ? 'own' : 'mix', named: H.settings.names }); }
    nextTurn();
  },
  hurry() { if (H.phase !== 'write' || !H.cur) return; H.cur.deadline = Date.now() + 20000; H.cur.dur = 20000; H.cur.hurry = true; armTimer(); pushState(); },
  rename(pid, name) { const p = H.players[pid], n = cleanName(name); if (!p || !n) return; p.name = n; p.renamed = pid !== ME; pushRoster(); pushState(); toast('انحفظ الاسم'); },
  kick(pid) {
    const p = H.players[pid]; if (!p || pid === ME) return;
    const nm = p.name; p.out = true; p.on = false;
    if (!DEMO) { outTo(pid, { t: 'kicked' }); wsSend({ t: 'kick', cid: pid }); }
    const c = H.cur;
    if (c && c.answers[pid] && H.phase === 'write') delete c.answers[pid];
    H.flash = { id: rid(4), text: nm + ' طلع من القعدة' };
    if (c && c.subject === pid && ['ask', 'write', 'pick', 'decide'].includes(H.phase)) { H.cur = null; H.pending = null; pushRoster(); nextTurn(); return; }
    pushRoster(); pushState();
    if (H.phase === 'write' && c && allWrote()) toPick();
  },
  handover(pid) {
    const p = H.players[pid]; if (!p || !p.on || p.bot || DEMO) return toast('ما فينا نسلّم الرياسة لهالشخص');
    hostSave(); wsSend({ t: 'handover', cid: pid, snap: snapOf() });
  },
  closeNow() { if (H.phase !== 'write' || !H.cur) return; if (!Object.keys(H.cur.answers).length) return toast('لسّا ما وصلت ولا ورقة'); toPick(); },
  pass() { if (!H.cur) return; const s = H.cur.subject; H.flash = { id: rid(4), text: 'الريس مرّر السؤال، جاي سؤال تاني' }; beginTurn(s, true); },
  skip() { H.flash = { id: rid(4), text: 'الريس تخطّى دور ' + (H.cur ? nameOf(H.cur.subject) : '') }; H.cur = null; H.pending = null; nextTurn(); },
  reveal() { revealNow(); },
  hide() { hideForLater(); },
  next() { nextTurn(); },
  newCycle() { H.cycle++; H.order = shuffle(onlineIds()); H.ti = -1; stat('cycle'); nextTurn(); },
  wrap() { H.prev = H.phase; clearTimeout(H._t); H.phase = 'wrap'; UI.sheet = false; pushState(); },
  unwrap() {
    if (H.final) { H.phase = 'final'; pushState(); return; }
    H.phase = H.prev && H.prev !== 'wrap' ? H.prev : 'lobby';
    if (H.phase === 'write' && H.cur && H.cur.deadline) armTimer();
    pushState(); if (H.phase === 'pick') sendPick();
  },
  finalize() {
    const w = UI.wrap; const again = !!H.final;
    if (!cleanName(w.name)) { toast('اكتب اسم القعدة أول'); return; }
    H.final = { type: cleanText(w.type, 16) || 'شلة', name: cleanName(w.name), photo: w.photo, party: w.party && !again };
    H.cur = null; H.pending = null; clearTimeout(H._t);
    H.results = ranking(true).map(x => ({ pid: x.pid, pts: x.pts, rank: x.rank, t: x.t }));
    if (!H.finished) { H.finished = true; stat('finish'); }
    H.partyStep = 0; H.phase = H.final.party ? 'party' : 'final';
    pushState();
  },
  partyNext() {
    const n = H.results.length;
    if (H.partyStep >= n) { H.phase = 'final'; pushState(); return; }
    H.partyStep++; pushState();
  }
};

/* ================= الوضع التجريبي ================= */
const BOTS = [['سامر', 'm'], ['رهف', 'f'], ['أبو عمر', 'm'], ['لين', 'f'], ['جود', 'f']];
const BOT_ANS = ['الموبايل أول شي', 'قهوة سادة', 'شاورما بزيادة توم', 'فيروز الصبح', 'البحر والسفر', 'نومة لبعد الضهر', 'اتصال مع الأهل', 'شي حلو بالليل',
  '«يا عمّي ولا يهمّك»', 'ترتيب الغرفة', 'نكتة بايخة', 'مسلسل تركي', 'كاسة متة', 'بيت عالبحر', 'سيارة جديدة', 'رحلة لإسطنبول', 'بيضحك وبيسكت', 'لعبة طاولة', 'كنافة', 'مشوار بالسيارة'];
function botFace(i) {
  const c = document.createElement('canvas'); c.width = c.height = 220; const x = c.getContext('2d');
  const bgs = ['#E8DCC8', '#DCE3E8', '#E6E0D0', '#EADCE3', '#E9E2D2'], sk = ['#C9A27E', '#E2C3A8', '#B98B6C', '#E7CDB4', '#D3AE8E'], sh = ['#5B6B7A', '#8A4B57', '#4F5D46', '#6E5A7E', '#7A4A3A'];
  x.fillStyle = bgs[i % 5]; x.fillRect(0, 0, 220, 220);
  x.fillStyle = sh[i % 5]; x.beginPath(); x.ellipse(110, 228, 86, 68, 0, 0, Math.PI * 2); x.fill();
  x.fillStyle = sk[i % 5]; x.beginPath(); x.arc(110, 96, 50, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#2A211B'; x.beginPath(); x.arc(92, 94, 4.5, 0, 7); x.arc(128, 94, 4.5, 0, 7); x.fill();
  x.strokeStyle = '#2A211B'; x.lineWidth = 3.5; x.lineCap = 'round'; x.beginPath(); x.arc(110, 106, 15, .2 * Math.PI, .8 * Math.PI); x.stroke();
  return c.toDataURL('image/jpeg', .85);
}
function addBots() { BOTS.forEach(([n, g], i) => setTimeout(() => { if (!H || H.phase === 'final') return; hostMsg('bot', { t: 'hi', pid: 'bot' + i, name: n, g, photo: i === 2 ? null : botFace(i) }); }, 600 + i * 550)); }
function botsWrite() {
  if (!H || !H.demo || H.phase !== 'write') return;
  const key = H.cur.key;
  Object.values(H.players).filter(p => p.bot && p.on && p.pid !== H.cur.subject && !H.cur.answers[p.pid]).forEach(p => setTimeout(() => {
    if (H.phase !== 'write' || H.cur.key !== key) return;
    hostMsg('bot', { t: 'ans', pid: p.pid, key, text: BOT_ANS[Math.floor(Math.random() * BOT_ANS.length)] });
  }, 1500 + Math.random() * 4500));
}
function botsAsk() {
  if (!H || !H.demo || H.phase !== 'ask') return;
  const c = H.cur, p = H.players[c.subject]; if (!p.bot) return;
  setTimeout(() => { if (H.phase === 'ask' && H.cur.key === c.key) hostMsg('bot', { t: 'ask', pid: p.pid, key: c.key, text: c.sugg[0] }); }, 2200);
}
function botPick() {
  if (!H || !H.demo || H.phase !== 'pick') return;
  const c = H.cur, p = H.players[c.subject]; if (!p.bot) return;
  setTimeout(() => {
    if (H.phase !== 'pick' || H.cur.key !== c.key) return;
    const none = Math.random() < .1;
    const ids = shuffle(c.cards.map(x => x.id)).slice(0, 1 + Math.floor(Math.random() * 3));
    hostMsg('bot', { t: 'picks', pid: p.pid, key: c.key, ids, none });
  }, 2600 + Math.random() * 1500);
}

/* ================= اللاعب ================= */
function joinAsPlayer() {
  ROLE = 'player'; UI.screen = 'game';
  if (!ME) ME = rid();
  store.set('fahman-p-' + CODE, { pid: ME, name: UI.profile.name, photo: UI.profile.photo, g: UI.profile.g });
  wsOpen(); keepAwake(); render();
}

/* ================= شاشة مضاءة ================= */
let lock = null;
async function keepAwake() { try { if ('wakeLock' in navigator && document.visibilityState === 'visible' && !lock) { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => { lock = null; }); } } catch (e) {} }

/* ================= أجزاء الواجهة ================= */
function avatar(p, size, cls = '') {
  const c = p && p.pid ? colOf(p.pid) : PCOL[0];
  return `<div class="av ${cls}" style="--s:${size}px;--pc:${c}">${p && p.photo ? `<img src="${p.photo}" alt="">` : esc(initial(p && p.name))}</div>`;
}
function topBar(extra = '') {
  return `<div class="top"><div class="brand"><span class="mini-env"></span>فهمان عليك؟</div>
  <div class="topr">${extra}<button class="iconbtn" data-a="help" aria-label="كيف منلعب؟">${ic('q')}</button><button class="iconbtn" data-a="theme" aria-label="الوضع">${ic(themeNow() === 'dark' ? 'sun' : 'moonT')}</button></div></div>`;
}
const hostChip = () => ROLE === 'host' ? `<span class="chip gold">${ic('crown')} ${T('الريس', 'الريس')}</span>` : '';
const SIG = `<div class="sig">إعداد م. إياد حلوبي</div>`;
const SIG_END = `<div class="sig">@eyad.hloubi · صار بدها قعدة.</div>`;
const dots = `<span class="dots"><span></span><span></span><span></span></span>`;
const envHTML = (st = 'var(--red)', cls = '', style = '') => `<div class="env ${cls}" style="${style}"><span class="st" style="background:${st}"></span><span class="ln"></span></div>`;
function keyEnter(k) { UI.nextKey = k; return UI.lastKey !== k ? 'enter' : ''; }
function groupLabel(f) {
  const t = (f && f.type) || 'شلة', n = (f && f.name) || '';
  if (n) return t + ' ' + n;
  return ({ 'شلة': 'الشلة', 'عيلة': 'العيلة', 'رفقة': 'الرفقة' })[t] || t;
}
function turnBar() {
  const t = S.turn; if (!t || !t.of) return '';
  const n = Math.min(t.of, 16); let segs = '';
  for (let i = 1; i <= n; i++) segs += `<i class="${i < t.n ? 'done' : i === t.n ? 'now' : ''}"></i>`;
  const cy = S.set && S.set.cycles > 1 ? ` · الدورة ${S.cycle} من ${Math.max(S.cycle, S.set.cycles)}` : '';
  return `<div class="turnbar"><span>الدور ${t.n} من ${t.of}${cy}</span><div class="segs">${segs}</div></div>`;
}
function qNote(q, from) {
  return `<div class="note flipin"><span class="qi">${ic(q.icon || 'q')}</span>${from ? `<div class="from">${from}</div>` : ''}<div class="q">${esc(q.text)}</div></div>`;
}
function hostTools() { return ROLE === 'host' ? `<button class="btn ghost mini" data-a="sheet" aria-label="أدوات الريس">${ic('menu')}</button>` : ''; }
function waitPill(t) { return `<div class="waitpill">${dots} ${t}</div>`; }
function connBanner() {
  if (DEMO) return '';
  if (ROLE === 'player' && UI.screen === 'game' && (UI.conn !== 'up')) return `<div class="banner">${ic('wifi')} عم نرجع نوصل…</div>`;
  if (ROLE === 'player' && UI.hostDown && UI.conn === 'up' && !UI.vacant) { const l = Math.max(0, Math.ceil(((UI.graceEnd || 0) - Date.now()) / 1000)); return `<div class="banner">${ic('wifi')} الريس فصل، منستناه ${l ? '0:' + String(l).padStart(2, '0') : 'شوي'}</div>`; }
  if (ROLE === 'player' && UI.vacant && UI.vacantHide) return `<button class="banner" data-a="vacantShow">👑 الريس طلع · اكبس لتستلم</button>`;
  if (ROLE === 'host' && UI.conn === 'down') return `<div class="banner">${ic('wifi')} انقطع النت، عم نرجع نوصل…</div>`;
  return '';
}

/* ================= الشاشات ================= */
function vCover() {
  const join = !!CODE && ROLE !== 'host';
  const tick = ['سؤال عن واحد منكن', 'الكل بيكتب جوابو ويطويه', 'صاحب الدور بيختم أقرب 3', 'وبالآخر: مين فاهم على مين؟'];
  const tk = tick.concat(tick).map(t => `<span>${t}</span>`).join('');
  return `<div class="screen cover">${topBar()}
  <div class="scene" aria-hidden="true">
    ${envHTML('var(--red)', '', 'right:12px;top:24px;transform:rotate(-8deg);animation:bob 4s ease-in-out infinite;--r:-8deg')}
    ${envHTML('var(--green)', '', 'left:8px;top:100px;transform:rotate(7deg);animation:bob 5s ease-in-out infinite;--r:7deg;animation-delay:-2s')}
    <div class="seal" style="right:118px;top:140px;animation:wob 3s ease-in-out infinite">؟</div>
    <div class="postmark" style="left:120px;top:4px">قعدة<br>رواق<br>✉</div>
    <div class="fly" style="right:-10px;top:200px">${envHTML('var(--blue)', '', 'position:relative;width:70px;height:46px;box-shadow:3px 3px 0 var(--press)')}</div>
  </div>
  <h1 class="hero">فهمان <span class="hl">عليك</span><span class="qm">؟</span></h1>
  <p class="lede">سؤال عن واحد منكن، الكل بيكتبلو جوابو بورقة مطوية، وهو بيختم أقرب 3 أوراق إلو. بالآخر منعرف مين فعلاً فهمان على مين.</p>
  <div class="ticker"><div>${tk}</div></div>
  <div class="ctas">
  ${join ? `<button class="btn" data-a="goProfile">${ic('mail')} فوت عالقعدة <span style="direction:ltr;opacity:.75">${esc(CODE)}</span></button>
    <button class="btn flat" data-a="newGame">لا، بدي افتح قعدة جديدة</button>`
    : `<button class="btn" data-a="hostProfile">${ic('plus')} افتح قعدة جديدة</button>
    <button class="btn ghost" data-a="codeScreen">معي كود قعدة</button>
    ${DEMO ? `<button class="btn flat" data-a="demoProfile">${ic('eye')} جرّب لحالك (لاعبين وهميين)</button>` : ''}`}
    <button class="btn flat sm" data-a="help">${ic('q')} كيف منلعب؟</button>
  </div>${SIG}</div>`;
}
function vCode() {
  return `<div class="screen enter">${topBar()}
  <div><button class="chip" data-a="toCover">${ic('back')} رجوع</button></div>
  <h2 class="ptitle">شو كود القعدة؟</h2>
  <p class="muted small" style="margin:0 0 16px">الكود بيطلع عند الريس تحت الـQR</p>
  <input id="codeIn" class="field" data-in="codeInput" maxlength="5" autocomplete="off" autocapitalize="characters" spellcheck="false"
   style="text-align:center;letter-spacing:.3em;font-family:var(--fd);font-size:30px;direction:ltr" value="${esc(UI.codeInput)}" placeholder="•••••">
  <div style="margin-top:18px"><button class="btn green" data-a="codeGo">كمّل</button></div>${SIG}</div>`;
}
function photoPick(kind, photo, cls = 'pick') {
  const id = kind === 'ava' ? 'fileAva' : 'fileGroup', cam = kind === 'ava' ? 'camAva' : 'camGroup';
  return `<label class="${cls} ${photo ? 'has' : ''}" for="${id}">${photo ? `<img src="${photo}" alt="">` : `<span style="text-align:center">${ic('camera')}${kind === 'ava' ? 'صورتك<br>(اختياري)' : 'خدوا سيلفي سوا<br><span class="small">أو اختاروا صورة</span>'}</span>`}</label>
  <input type="file" id="${id}" accept="image/*" hidden data-file="${kind}"><input type="file" id="${cam}" accept="image/*" capture="user" hidden data-file="${kind}">
  <div class="photobtns"><button class="chip gold" data-a="selfie" data-v="${kind}">${ic('camera')} ${kind === 'ava' ? 'سيلفي' : 'سيلفي جماعي'}</button><label class="chip" for="${id}">${ic('image')} من الصور</label>${photo ? `<button class="chip" data-a="${kind === 'ava' ? 'rmAva' : 'rmGroup'}">${ic('x')} شيل</button>` : ''}</div>`;
}
function vProfile() {
  const p = UI.profile, host = UI.asHost, edit = UI.editMe;
  const gm = p.g === 'm', gf = p.g === 'f';
  const act = edit ? 'saveMe' : host ? 'doHost' : 'doJoin';
  const lbl = edit ? ic('check') + ' احفظ' : host ? ic('mail') + ' افتح القعدة' : ic('send') + ' فوت عالقعدة';
  return `<div class="screen enter">${topBar()}
  <div><button class="chip" data-a="${edit ? 'backGame' : 'toCover'}">${ic('back')} رجوع</button></div>
  <h2 class="ptitle">${edit ? T('عدّل معلوماتك', 'عدّلي معلوماتك') : 'عرّفنا عليك'}</h2>
  <p class="muted small" style="margin:0">الاسم والصورة اختياريين، بس بيخلّوا اللعبة أحلى.</p>
  <div>${photoPick('ava', p.photo)}</div>
  <input id="nameIn" class="field" data-in="name" maxlength="20" placeholder="اسمك متل ما بتعرفك القعدة" value="${esc(p.name)}" autocomplete="off">
  <div><span class="label">إنت…</span>
  <div class="seg"><button class="${gm ? 'on' : ''}" data-a="gender" data-v="m">🧔 شب</button><button class="${gf ? 'on' : ''}" data-a="gender" data-v="f">👩 صبية</button></div>
  <div class="req">${UI.gTried && !p.g ? 'اختار شب أو صبية لنظبط الكلام إلك' : ''}</div></div>
  <div style="margin-top:8px"><button class="btn ${host || edit ? '' : 'green'}" data-a="${act}">${lbl}</button></div>
  ${SIG}</div>`;
}
function joinUrl() { return location.origin + '/?r=' + CODE; }
function peopleHTML() {
  const own = S && S.set && S.phase === 'lobby' ? ownCount(S.set) : 0;
  const tap = p => ROLE === 'host' ? `data-a="member" data-v="${p.pid}"` : p.pid === ME && S && S.phase === 'lobby' ? 'data-a="editMe"' : '';
  return ROSTER.filter(p => !p.out).map((p, i) => `<button class="person" ${tap(p)} style="animation-delay:${Math.min(i, 8) * .05}s"><div class="avw">${p.host ? `<span class="tagr">الريس</span>` : ''}${avatar(p, 64, p.on ? '' : 'off')}${ROLE === 'host' || (p.pid === ME && S && S.phase === 'lobby') ? `<span class="editdot">${ic('edit')}</span>` : ''}</div>
  <div class="nm">${esc(p.name)}${p.pid === ME ? ' (إنت)' : ''}</div>${own ? `<div class="qn ${p.qn >= own ? 'ok' : ''}">✍️ ${Math.min(p.qn || 0, own)}/${own}</div>` : ''}</button>`).join('');
}
const ownCount = st => Math.max(0, (st.cycles || 1) - (st.bank || 0));
function stepper(a, val, min, max) {
  return `<div class="stepper"><button data-a="${a}" data-v="1" ${val >= max ? 'disabled' : ''} aria-label="زيد">${ic('plus')}</button><b>${val}</b><button data-a="${a}" data-v="-1" ${val <= min ? 'disabled' : ''} aria-label="نقّص"><svg class="ic" viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button></div>`;
}
function mySuggest() {
  const me = byId(ME); if (!me) return [];
  if (!UI.mySugg || UI.mySugg.length < 3) UI.mySugg = shuffle(QB.map((_, i) => i)).slice(0, 3);
  return UI.mySugg.map(i => { const [, m, f] = QB[i]; return (me.g === 'f' && f ? f : m).replace('{n}', me.name); });
}
function myQsHTML(st) {
  const own = ownCount(st); if (!own) return '';
  const list = UI.myqs.map((q, i) => `<div class="qitem"><span>${esc(q)}</span><button data-a="rmMyQ" data-v="${i}" aria-label="شيل">${ic('x')}</button></div>`).join('');
  const full = UI.myqs.length >= own;
  return `<div class="card myq" style="margin-top:22px">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><h3 style="font-size:22px">${ic('pen')} ${T('جهّز أسئلتك', 'جهّزي أسئلتك')}</h3><span class="chip ${full ? 'green' : 'gold'}">${UI.myqs.length}/${own}</span></div>
    <div class="hint" style="margin-top:4px">${T('اكتب', 'اكتبي')} ${own === 1 ? 'سؤال واحد' : own + ' أسئلة'} عن حالك، والكل رح يحاول يجاوب عنك لما يجي دورك.</div>
    <div class="qlist">${list}</div>
    ${full ? `<div class="hint" style="margin-top:10px">✅ ${T('خلصت! ناطرين الريس يبلّش.', 'خلصتي! ناطرين الريس يبلّش.')}</div>` : `
    <div class="addq" style="margin-top:12px"><input id="myqIn" class="field" data-in="myqDraft" maxlength="90" placeholder="مثلاً: شو أكتر أكلة بحبّها؟" value="${esc(UI.myqDraft || '')}"><button class="btn gold" data-a="addMyQ" aria-label="ضيف">${ic('plus')}</button></div>
    <div class="hint" style="margin-top:10px">أو ${T('اختار', 'اختاري')} واحد جاهز:</div>
    <div class="sugg">${mySuggest().map((q, i) => `<button data-a="useMySugg" data-v="${i}">${esc(q)}</button>`).join('')}</div>`}
  </div>`;
}
function vLobby() {
  const on = ROSTER.filter(p => p.on);
  const st = ROLE === 'host' ? UI.settings : (S.set || UI.settings);
  const own = ownCount(st);
  if (ROLE === 'host') {
    const ready = !!H.code;
    const missing = own ? on.filter(p => (p.qn || 0) < own).length : 0;
    return `<div class="screen ${keyEnter('lobby')}">${topBar(hostChip())}
    <div class="airmail">
      <div class="small" style="font-weight:700">خلّي الكل يمسح الكود من موبايلو</div>
      <div class="qrbox" id="qr">${ready ? '' : dots}</div>
      <div class="small muted" style="margin:14px 0 6px">أو بيكتبوا كود القعدة</div>
      <div class="code">${ready ? [...H.code].map(c => `<b>${esc(c)}</b>`).join('') : dots}</div>
      <div style="margin-top:14px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="chip" data-a="copyLink">${ic('link')} انسخ الرابط</button>${navigator.share ? `<button class="chip" data-a="shareLink">${ic('share')} ابعتو</button>` : ''}</div>
      ${DEMO ? `<div class="note-tip">عرض تجريبي: اللاعبين وهميين وبيلعبوا لحالهن، وإنت الريس. جرّب كل شي.</div>` : ''}
    </div>
    <div class="sech"><h3>مين جوّا القعدة</h3><span class="chip blue">${on.length} موجودين</span></div>
    <div class="people">${peopleHTML()}</div>
    <div class="sech"><h3>إعدادات القعدة</h3></div>
    <div class="card">
      <div class="setrow"><div><b>كم دورة؟</b><div class="hint">بكل دورة بيوصل الدور لكل واحد مرة</div></div>${stepper('cyc', st.cycles, 1, 6)}</div>
      <div class="setrow"><div><b>كم سؤال من البنك؟</b><div class="hint">لكل واحد، من أصل ${st.cycles}</div></div>${stepper('bnk', st.bank, 0, st.cycles)}</div>
      <div class="note-tip" style="margin-top:6px">${own ? `كل واحد بيجاوب عنو ${st.cycles === 1 ? 'سؤال واحد' : st.cycles + ' أسئلة'}: ${st.bank ? (st.bank === 1 ? 'واحد' : st.bank) + ' من البنك، و' : ''}<b>${own === 1 ? 'واحد' : own} بيكتبو هو عن حالو</b> من موبايلو قبل ما نبلّش.` : `كل الأسئلة من البنك، ${st.cycles === 1 ? 'سؤال واحد' : st.cycles + ' أسئلة'} لكل واحد.`}<br>المجموع: <b>${on.length * st.cycles}</b> سؤال.</div>
      <span class="label">لما نكشف، منبيّن مين كاتب كل ورقة؟</span>
      <div class="seg blue thin"><button class="${st.names ? 'on' : ''}" data-a="setN" data-v="1">👀 بيبين</button><button class="${!st.names ? 'on' : ''}" data-a="setN" data-v="0">🙈 مخفي</button></div>
      <div class="hint" style="margin-top:8px">${st.names ? 'بالكشف بيطلع اسم صاحب كل ورقة.' : 'الأوراق بتطلع بلا أسماء، وبالآخر منعرف مين جمع نقاط أكتر بس.'}</div>
      <span class="label">وقت الكتابة بكل دور</span>
      <div class="seg blue thin">${[[0, 'مفتوح'], [30, '30 ث'], [60, '60 ث'], [90, '90 ث']].map(([v, n]) => `<button class="${(st.timer || 0) === v ? 'on' : ''}" data-a="setT" data-v="${v}">${n}</button>`).join('')}</div>
      <div class="hint" style="margin-top:8px">${st.timer ? `بعد ${st.timer} ثانية الصندوق بيتسكّر لحالو. وزر «20 ثانية» بيضل موجود.` : 'ما في مؤقت، والريس بيقدر يضغط «20 ثانية وبنسكّر» إذا حدا طوّل.'}</div>
    </div>
    <div class="hint" style="text-align:center;margin-top:12px">${ic('edit')} اكبس على أي حدا لتعدّل اسمو أو تطلّعو أو تسلّمو الرياسة</div>
    ${myQsHTML(st)}
    ${SIG}</div>
    <div class="dock"><div class="dock-in"><div class="hint" style="text-align:center">${on.length < 2 ? 'لازم يكون في شخصين عالأقل' : missing ? `${missing} لسّا ما خلّصوا أسئلتهن، واللي ناقصو بيكتبو لما يجي دورو` : 'الكل جاهز 👌'}</div>
    <button class="btn" data-a="hStart" ${on.length < 2 ? 'disabled' : ''}>${ic('send')} يلا نبلّش</button></div></div>`;
  }
  const me = byId(ME) || { pid: ME, name: UI.profile.name, photo: UI.profile.photo };
  return `<div class="screen ${keyEnter('lobby')}">${topBar()}
  <div class="airmail" style="padding:30px 18px">
    ${avatar(me, 96, '')}
    <h2 style="font-size:30px;margin-top:14px">${T('صرت جوّا القعدة', 'صرتي جوّا القعدة')}</h2>
    <p class="muted" style="margin:4px 0 14px">${st.cycles > 2 ? st.cycles + ' دورات' : st.cycles === 2 ? 'دورتين' : 'دورة وحدة'} · ناطرين الريس يبلّش</p>${dots}
  </div>
  <div style="text-align:center;margin-top:12px"><button class="chip" data-a="editMe">${ic('edit')} ${T('عدّل اسمي وصورتي', 'عدّلي اسمي وصورتي')}</button></div>
  ${myQsHTML(st)}
  <div class="sech"><h3>مين جوّا</h3><span class="chip blue">${on.length}</span></div>
  <div class="people">${peopleHTML()}</div>${SIG}</div>`;
}
function vAsk() {
  const t = S.turn, subj = byId(t.subject) || { name: '؟' }, mine = t.subject === ME;
  if (mine) {
    return `<div class="screen ${keyEnter('ask' + t.key)}">${topBar(hostChip())}${turnBar()}
    <div class="who">${avatar(subj, 56)}<div><div class="nm">${T('الدور عليك!', 'الدور عليكِ!')}</div><div class="sub">${T('اكتب سؤال عن حالك', 'اكتبي سؤال عن حالك')}، والكل رح يجاوب عنك</div></div></div>
    <span class="label">سؤالك</span>
    <textarea id="askIn" class="field" data-in="askDraft" maxlength="90" rows="3" placeholder="مثلاً: شو أكتر أكلة بحبّها؟">${esc(UI.askDraft)}</textarea>
    <span class="label">أو ${T('اختار', 'اختاري')} واحد جاهز</span>
    <div class="sugg">${(t.sugg || []).map((s, i) => `<button data-a="useSugg" data-v="${i}">${esc(s)}</button>`).join('')}</div>
    ${SIG}</div>
    <div class="dock"><div class="dock-in">${ROLE === 'host' ? `<div class="hostbar"><button class="btn" data-a="sendAsk">${ic('send')} ابعت السؤال</button>${hostTools()}</div>` : `<button class="btn" data-a="sendAsk">${ic('send')} ابعت السؤال</button>`}</div></div>`;
  }
  return `<div class="screen ${keyEnter('ask' + t.key)}">${topBar(hostChip())}${turnBar()}
  <div class="waitbox"><div class="envpile">${envHTML()}${envHTML('var(--green)')}${envHTML('var(--blue)')}</div>
  ${avatar(subj, 70, '')}<h2 style="font-size:26px;margin-top:12px">الدور على ${esc(subj.name)}</h2>
  <p class="muted">${G(t.subject, 'عم يكتب سؤال عن حالو…', 'عم تكتب سؤال عن حالها…')}</p></div>${SIG}</div>
  <div class="dock"><div class="dock-in">${ROLE === 'host' ? `<div class="hostbar">${waitPill('ناطرين السؤال')}${hostTools()}</div>` : waitPill('ناطرين السؤال')}</div></div>`;
}
function timerHTML() {
  if (!UI.dl) return '';
  const left = Math.max(0, Math.ceil((UI.dl - Date.now()) / 1000)), dur = (S.turn && S.turn.dur || 20000) / 1000;
  return `<div class="timer ${S.turn && S.turn.hurry ? '' : 'calm'}" id="tmr" data-dur="${dur}"><i style="transform:scaleX(${1 - left / dur})"></i><span>${ic('timer')} ${S.turn && S.turn.hurry ? 'الريس قال: استعجلوا!' : 'الوقت عم يخلص'}</span><span class="t" id="tmrT">${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}</span></div>`;
}
function vWrite() {
  const t = S.turn, subj = byId(t.subject) || { name: '؟', pid: t.subject }, mine = t.subject === ME;
  const writersList = ROSTER.filter(p => p.pid !== t.subject && (p.on || t.wrote.includes(p.pid)));
  const nw = t.wrote.length, total = writersList.length;
  const stack = writersList.map(p => avatar(p, 30, t.wrote.includes(p.pid) ? '' : 'off')).join('');
  const qfrom = t.q.own ? `سؤال ${esc(subj.name)} عن ${G(t.subject, 'حالو', 'حالها')}` : t.q.host ? 'سؤال من الريس' : '';
  const head = mine
    ? `<div class="who">${avatar(subj, 56)}<div><div class="nm">${T('الأوراق جايتك!', 'الأوراق جايتك!')}</div><div class="sub">الكل عم يكتب شو بيعرف عنك</div></div></div>`
    : `<div class="who">${avatar(subj, 56)}<div><div class="nm">الورقة رايحة لـ${esc(subj.name)}</div><div class="sub">${T('اكتب', 'اكتبي')} جوابك ${T('واطويها', 'واطويها')}</div></div></div>`;
  const wrote = t.wrote.includes(ME);
  let body;
  if (mine) body = `<div class="waitbox" style="padding:14px 0 0"><div class="envpile">${envHTML()}${envHTML('var(--green)')}${envHTML('var(--blue)')}</div><p class="muted" style="margin:0">لما يخلصوا، بتوصلك الأوراق بلا أسماء.</p></div>`;
  else if (wrote) body = `<div class="sent"><div class="env" style="width:190px;height:122px"><span class="st" style="background:var(--green)"></span><span class="ln"></span><span class="wax">${ic('check')}</span></div></div>
    <div style="text-align:center"><b>ورقتك وصلت</b> <button class="chip" data-a="unans" style="margin-inline-start:6px">${ic('edit')} عدّل</button></div>`;
  else body = `<span class="label">جوابك</span><div id="noteWrap" class="${UI.sentFx === t.key ? 'flying' : ''}"><textarea id="ansIn" class="field" data-in="draft" maxlength="70" rows="3" placeholder="${G(t.subject, 'شو بتتوقّع يكون جوابو؟', 'شو بتتوقّع يكون جوابها؟')}">${esc(UI.draft)}</textarea>
    <div class="counter" id="cnt">${UI.draft.length}/70</div></div>`;
  const dockMain = mine || wrote ? '' : `<button class="btn green" data-a="sendAns" ${UI.draft.trim() ? '' : 'disabled'} id="sendBtn">${ic('mail')} اطوي وابعت</button>`;
  const hostRow = ROLE === 'host' ? `<div class="hostbar three"><button class="btn ghost sm" data-a="hHurry" ${S.turn.hurry || (UI.dl && UI.dl - Date.now() < 20000) ? 'disabled' : ''}>${ic('timer')} 20 ثانية</button><button class="btn ghost sm" data-a="hClose" ${nw ? '' : 'disabled'}>${ic('lock')} سكّر الصندوق</button>${hostTools()}</div>` : '';
  return `<div class="screen ${keyEnter('w' + t.key)}">${topBar(hostChip())}${turnBar()}
  ${head}<div style="height:16px"></div>${qNote(t.q, qfrom)}
  <div class="progress"><b>انبعتت ${nw} من ${total}</b><div class="stack">${stack}</div></div>
  ${timerHTML()}${body}${SIG}</div>
  <div class="dock"><div class="dock-in">${dockMain}${hostRow}${!dockMain && !hostRow ? waitPill('ناطرين الباقي يكتبوا') : ''}</div></div>`;
}
function rankOf(id) { const P = UI.picks; if (P.f.includes(id)) return 1; const i = P.r.indexOf(id); return i < 0 ? 0 : i + 2; }
function vPick() {
  const t = S.turn, subj = byId(t.subject) || { name: '؟' }, mine = t.subject === ME;
  if (mine && PICK && PICK.key === t.key) {
    if (UI.pkey !== t.key) { UI.pkey = t.key; UI.picks = { f: [], r: [] }; }
    const P = UI.picks;
    const cards = PICK.cards.map(c => { const r = rankOf(c.id);
      return `<button class="ans ${r ? 'on' : ''} ${r === 1 && P.f.length > 1 ? 'tie' : ''}" data-a="pickC" data-hold="pickFirst" data-v="${c.id}">${r ? `<span class="stamp r${r}">${r}</span>` : '<span class="slot"></span>'}${esc(c.text)}<i class="holdbar"></i></button>`; }).join('');
    const slots = `<div class="s1 ${P.f.length ? 'on' : ''}"><i>1</i>نقطتين${P.f.length > 1 ? ` <b class="x">×${P.f.length}</b>` : ''}</div><div class="s2 ${P.r[0] ? 'on' : ''}"><i>2</i>نقطة</div><div class="s3 ${P.r[1] ? 'on' : ''}"><i>3</i>نقطة</div>`;
    return `<div class="screen ${keyEnter('p' + t.key)}">${topBar(hostChip())}${turnBar()}
    <div class="who">${avatar(subj, 50)}<div><div class="nm">${T('وصلك بريد!', 'وصلك بريد!')}</div><div class="sub">${PICK.cards.length} ${PICK.cards.length > 2 ? 'أوراق' : 'ورقة'} · بلا أسماء</div></div></div>
    <div style="height:14px"></div>${qNote(t.q)}
    <div class="hint" style="margin-top:16px">${T('اختم', 'اختمي')} أقرب 3 أوراق إلك بالترتيب: الأولى هي الأقرب.</div>
    <div class="holdtip">${ic('hand')} <span>في أجوبة نفس بعض بس مكتوبة غير شكل؟ <b>اضغط مطوّل</b> على الورقة لتحطها كمان <b>بالمركز الأول</b>.</span></div>
    <div class="slots">${slots}</div>
    <div class="cards">${cards}</div>
    <div class="nonebox"><div class="nonebox-t">ولا ورقة قريبة منك أبداً؟</div><button class="btn nonebtn sm" data-a="noneAsk">🙈 ولا حدا فهمان عليّ</button></div>
    ${SIG}</div>
    <div class="dock"><div class="dock-in">${ROLE === 'host' ? `<div class="hostbar"><button class="btn green" data-a="sendPicks" ${P.f.length ? '' : 'disabled'}>${ic('check')} اعتمد الطوابع</button>${hostTools()}</div>` : `<button class="btn green" data-a="sendPicks" ${P.f.length ? '' : 'disabled'}>${ic('check')} اعتمد الطوابع</button>`}</div></div>`;
  }
  return `<div class="screen ${keyEnter('p' + t.key)}">${topBar(hostChip())}${turnBar()}
  <div class="waitbox"><div class="envpile">${envHTML()}${envHTML('var(--green)')}${envHTML('var(--blue)')}</div>
  ${avatar(subj, 70)}<h2 style="font-size:26px;margin-top:12px">${esc(subj.name)} ${G(t.subject, 'عم يفتح الأوراق', 'عم تفتح الأوراق')}…</h2>
  <p class="muted">${t.count} ${t.count > 2 ? 'أوراق' : 'ورقة'} وصلوا، ${G(t.subject, 'وعم يختم', 'وعم تختم')} أقرب 3</p></div>
  <div class="card" style="text-align:center"><div class="small muted">السؤال كان</div><div style="font-family:var(--fd);font-weight:700;font-size:19px;line-height:1.6;margin-top:6px">${esc(t.q.text)}</div></div>${SIG}</div>
  <div class="dock"><div class="dock-in">${ROLE === 'host' ? `<div class="hostbar">${waitPill('ناطرين الطوابع')}${hostTools()}</div>` : waitPill('ناطرين الطوابع')}</div></div>`;
}
function vDecide() {
  const t = S.turn, subj = byId(t.subject) || { name: '؟' };
  const body = `<div class="waitbox"><div class="hidden-env"><div class="env"><span class="st" style="background:var(--gold)"></span><span class="ln"></span><span class="wax" style="position:absolute;left:50%;top:44%;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:var(--red);border:2.5px solid var(--press);display:grid;place-items:center;color:#fff">${ic('lock')}</span></div></div>
   <h2 style="font-size:26px">${esc(subj.name)} ${G(t.subject, 'ختم الأوراق!', 'ختمت الأوراق!')}</h2>
   <p class="muted">${ROLE === 'host' ? 'منفتح الظرف قدّام الكل، ولا منخبّيه مختوم للآخر؟' : 'الريس عم يقرّر: منفتح الظرف ولا منخبّيه للآخر؟'}</p></div>`;
  return `<div class="screen ${keyEnter('d' + t.key)}">${topBar(hostChip())}${turnBar()}${body}${SIG}</div>
  <div class="dock"><div class="dock-in">${ROLE === 'host'
    ? `<button class="btn red" data-a="hReveal">${ic('mail')} افتح الظرف</button><div class="hostbar"><button class="btn ghost sm" data-a="hHide">${ic('hide')} خبّيه للآخر</button>${hostTools()}</div>`
    : waitPill('الريس عم يقرّر')}</div></div>`;
}
function vReveal() {
  const R = S.reveal; const subj = byId(R.subject) || { name: '؟', pid: R.subject };
  if (!UI.seen[R.key]) {
    setTimeout(() => { if (!UI.seen[R.key]) { UI.seen[R.key] = true; UI.boom = R.key; render(); } }, 2450);
    return `<div class="count"><div><b>3</b><b>2</b><b>1</b></div><p class="ln">عم نفتح الظرف…</p></div>`;
  }
  const picked = R.list.filter(x => x.rank).sort((a, b) => a.rank - b.rank);
  const rest = R.list.filter(x => !x.rank);
  const named = S.set && S.set.names;
  const lastTurn = S.turn && S.turn.n >= S.turn.of;
  let main;
  if (R.empty) main = `<div class="card nobody"><div style="font-size:44px">📭</div><div class="big">ما وصلت ولا ورقة!</div><p class="muted">منكمّل عالدور الجاي</p></div>`;
  else if (R.none) main = `<div class="card nobody"><div style="font-size:44px">🙈</div><div class="big">ولا حدا فهمان على ${esc(subj.name)}!</div><p class="muted">${G(R.subject, 'رجّع كل الأوراق بلا طوابع', 'رجّعت كل الأوراق بلا طوابع')}. ولا حدا أخد نقاط هالمرة.</p></div>`;
  else {
    const w = picked[0]; const wp = w.author ? byId(w.author) : null;
    main = `<div class="bigwin"><div class="note flipin"><div class="small muted" style="font-weight:700">أقرب ورقة لـ${esc(subj.name)}</div><div class="t" style="margin-top:6px">${esc(w.text)}</div></div>
      <div class="postmark"><span dir="ltr">+${w.pts}</span><br>وصلت</div></div>
      ${wp ? `<div class="winner">${avatar(wp, 58)}<div><div class="nm">${esc(wp.name)}</div><div class="sub">${G(wp.pid, 'فهمان', 'فهمانة')} ${G(R.subject, 'عليه', 'عليها')}! · <span dir="ltr">+${w.pts}</span></div></div></div>` : ''}
      ${picked.filter(x => x.rank === 1).length > 1 ? `<div class="note-tip" style="text-align:center;margin-top:14px">🤝 ${picked.filter(x => x.rank === 1).length} أوراق بالمركز الأول، لأنها نفس الجواب</div>` : ''}
      ${picked.length > 1 ? `<div class="cards" style="margin-top:20px">${picked.slice(1).map(x => ansRow(x, named)).join('')}</div>` : ''}`;
  }
  const restH = rest.length && !R.empty ? `<div class="sub-h">باقي الأوراق</div><div class="cards">${rest.map(x => ansRow(x, named)).join('')}</div>` : '';
  const dock = ROLE === 'host'
    ? `<div class="hostbar"><button class="btn" data-a="hNext">${lastTurn ? ic('flag') + ' خلصت الدورة' : ic('skip') + ' الدور الجاي'}</button>${hostTools()}</div>`
    : waitPill('الريس عم يحضّر الجاي');
  return `<div class="screen ${keyEnter('rv' + R.key)}">${topBar(hostChip())}${turnBar()}
  <div class="rhead">${avatar(subj, 54)}<div class="q">${esc(R.q.text)}</div></div>
  ${main}${restH}${SIG}</div><div class="dock"><div class="dock-in">${dock}</div></div>`;
}
function ansRow(x, named) {
  const a = named && x.author ? byId(x.author) : null;
  return `<div class="ans ${x.rank ? '' : 'dim'}" style="cursor:default">${x.rank ? `<span class="stamp r${x.rank}">${x.rank}</span>` : ''}${esc(x.text)}
  ${a || x.rank ? `<div class="by">${a ? avatar(a, 24) + esc(a.name) : ''}${x.rank ? `<span class="pts" dir="ltr">+${x.pts}</span>` : ''}</div>` : ''}</div>`;
}
function boardHTML(list, withTitles) {
  return `<div class="board">${list.map((x, i) => { const p = byId(x.pid) || { name: '؟', pid: x.pid }; const first = i === 0 && x.rank === 1;
    return `<div class="ps ${first ? 'first' : ''} ${x.pid === ME ? 'me' : ''}" style="animation-delay:${i * .06}s"><span class="pp">${x.pts}</span><span class="rk">#${x.rank}</span>${avatar(p, first ? 64 : 44)}
    <div class="nm">${esc(p.name)}</div>${withTitles ? `<div class="tt">${esc(titleOf(x.pid, x.t))}</div>` : ''}</div>`; }).join('')}</div>`;
}
function vCycleEnd() {
  const list = (S.board || []).filter(x => byId(x.pid));
  const last = S.cycle >= ((S.set && S.set.cycles) || 1);
  return `<div class="screen ${keyEnter('ce' + S.cycle)}">${topBar(hostChip())}
  <div class="fhead"><div class="k">${last ? 'خلصت كل الدورات!' : `خلصت الدورة ${S.cycle} من ${S.set.cycles}`}</div><h1 style="font-size:34px">${last ? 'النتيجة مختومة 🔒' : 'مين ماشي قدّام؟'}</h1></div>
  ${S.hiddenCount ? `<div class="note-tip" style="text-align:center">${ic('lock')} في ${S.hiddenCount} ${S.hiddenCount > 2 ? 'جولات' : 'جولة'} مختومة للآخر، ونقاطها مو محسوبة هون.</div>` : ''}
  <div style="height:16px"></div>${last ? `<div class="waitbox"><div class="hidden-env"><div class="env"><span class="st" style="background:var(--gold)"></span><span class="ln"></span><span class="wax" style="position:absolute;left:50%;top:44%;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;background:var(--red);border:2.5px solid var(--press);display:grid;place-items:center;color:#fff">${ic('lock')}</span></div></div><p class="muted">ما حدا بيعرف الترتيب لسّا… منفتحو سوا بحفلة الكشف.</p></div>` : boardHTML(list, false)}${SIG}</div>
  <div class="dock"><div class="dock-in">${ROLE === 'host'
    ? (last ? `<button class="btn red" data-a="hWrap">${ic('crown')} يلا عالنتيجة</button><button class="btn ghost sm" data-a="hCycle">${ic('refresh')} بدنا دورة زيادة</button>`
      : `<button class="btn green" data-a="hCycle">${ic('refresh')} الدورة الجاية</button><button class="btn ghost sm" data-a="hWrap">${ic('flag')} خلّصنا هون</button>`)
    : waitPill(last ? 'الريس رح يفتح النتيجة' : 'ناطرين الريس يبلّش الدورة الجاية')}</div></div>`;
}
function vWrap() {
  if (ROLE !== 'host') return `<div class="screen">${topBar()}<div class="wait"><div><div class="envpile">${envHTML()}${envHTML('var(--green)')}${envHTML('var(--blue)')}</div>
    <h2 style="font-size:28px">الريس عم يجهّز النتيجة</h2><p class="muted">ضبّوا حالكن للصورة الجماعية</p></div></div>${SIG}</div>`;
  const w = UI.wrap; const again = !!H.final;
  return `<div class="screen ${keyEnter('wrap')}">${topBar(hostChip())}
  <div><button class="chip" data-a="hUnwrap">${ic('back')} ${again ? 'رجوع للنتيجة' : 'رجوع للعبة'}</button></div>
  <h2 class="ptitle">${again ? 'عدّل القعدة' : 'خلصت السهرة؟'}</h2>
  <p class="muted small" style="margin:0">قبل ما نكشف مين فاهم على مين، عرّفنا على القعدة.</p>
  <div><span class="label">مين نحنا؟</span>
  <div class="chips">${GROUP_TYPES.map(t => `<button class="${w.type === t && !w.customOn ? 'on' : ''}" data-a="gType" data-v="${t}">${t}</button>`).join('')}<button class="${w.customOn ? 'on' : ''}" data-a="gCustom">✍️ غير شي</button></div>
  ${w.customOn ? `<input id="gTypeIn" class="field" data-in="gtype" maxlength="16" placeholder="مثلاً: صحاب الجامعة، بنات العم، الكشافة" value="${esc(GROUP_TYPES.includes(w.type) ? '' : w.type)}" style="margin-top:10px">` : ''}
  <span class="label">شو اسمها؟ <span style="color:var(--red)">*</span></span>
  <input id="gName" class="field" data-in="gname" maxlength="20" placeholder="مثلاً: السهرانين، بيت جدّي" value="${esc(w.name)}">
  <div style="margin-top:12px"><span class="chip gold" id="gPreview">رح تطلع: «مين فاهم على ${esc(groupLabel(w))}؟»</span></div>
  <span class="label">صورة جماعية (اختياري)</span>
  ${photoPick('group', w.photo, 'gpick')}
  ${again ? '' : `<span class="label">كيف بدنا نكشف الترتيب؟</span>
  <div class="seg blue thin"><button class="${w.party ? 'on' : ''}" data-a="party" data-v="1">🎉 حفلة كشف</button><button class="${!w.party ? 'on' : ''}" data-a="party" data-v="0">⚡ دفعة وحدة</button></div>
  <div class="hint" style="margin-top:8px">${w.party ? 'منكشف من آخر واحد لأول واحد، خطوة ورا خطوة.' : 'الترتيب كلو بيطلع مرة وحدة.'}</div>`}</div>
  ${SIG}</div>
  <div class="dock"><div class="dock-in">${cleanName(w.name) ? '' : `<div class="hint" id="nameHint" style="text-align:center">اكتب اسم القعدة لتنفتح النتيجة</div>`}<button class="btn red" id="finalBtn" data-a="hFinal" ${cleanName(w.name) ? '' : 'disabled'}>${ic('crown')} ${again ? 'احفظ التعديل' : 'اكشف النتيجة'}</button></div></div>`;
}
function vParty() {
  const F = S.final, res = F.results, n = res.length, step = F.step;
  const order = res.slice().reverse(); // من الآخر للأول
  const shown = order.slice(0, step);
  const cur = shown[shown.length - 1];
  let stage;
  if (!step) stage = `<div class="waitbox"><div class="envpile">${envHTML()}${envHTML('var(--green)')}${envHTML('var(--blue)')}</div><h2 style="font-size:30px">حفلة الكشف!</h2><p class="muted">من آخر واحد… لـ${'قارئ الأفكار'}</p></div>`;
  else {
    const p = byId(cur.pid) || { name: '؟', pid: cur.pid }; const star = cur.rank === 1;
    stage = `<div class="partycard ${star ? 'star' : ''}" data-k="${step}"><div class="rk">${star ? '👑 نجم السهرة' : 'المرتبة ' + cur.rank}</div>
      <div style="margin-top:14px;display:grid;place-items:center">${avatar(p, star ? 120 : 96)}</div>
      <div class="nm">${esc(p.name)}</div><div class="tt">${esc(titleOf(cur.pid, cur.t))}</div><div class="pts">${cur.pts} ${cur.pts === 1 ? 'نقطة' : 'نقاط'}</div></div>`;
    if (UI.boomStep !== step) { UI.boomStep = step; if (star) setTimeout(confetti, 300); else vibrate(20); }
  }
  const prev = shown.slice(0, -1).reverse().map(x => { const p = byId(x.pid) || { name: '؟', pid: x.pid };
    return `<div class="r"><b>${x.rank}</b>${avatar(p, 32)}<div><div>${esc(p.name)}</div><div class="t">${esc(titleOf(x.pid, x.t))}</div></div><span class="p">${x.pts}</span></div>`; }).join('');
  const done = step >= n;
  return `<div class="screen party ${keyEnter('party')}">${topBar(hostChip())}
  <div class="fhead"><div class="k">مين فاهم على</div><h1 style="font-size:36px"><span>${esc(groupLabel(F.info))}</span>؟</h1></div>
  ${stage}${prev ? `<div class="mini-list">${prev}</div>` : ''}${SIG}</div>
  <div class="dock"><div class="dock-in">${ROLE === 'host'
    ? `<button class="btn ${done ? 'green' : 'red'}" data-a="hParty">${done ? ic('check') + ' شوف النتيجة كاملة' : step ? ic('eye') + ' اكشف الجاي (' + (n - step) + ')' : ic('eye') + ' بلّش الكشف'}</button>`
    : waitPill(done ? 'الريس رح يفتح النتيجة' : 'الريس عم يكشف…')}</div></div>`;
}
function vFinal() {
  const F = S.final, res = F.results.filter(x => byId(x.pid)), named = S.set && S.set.names;
  if (!UI.imgTheme) UI.imgTheme = themeNow();
  if (!UI.storyPid || !byId(UI.storyPid)) UI.storyPid = byId(ME) ? ME : (res[0] && res[0].pid);
  const top = res[0];
  const people = res.map(x => { const p = byId(x.pid);
    return `<div class="prow"><span class="n">${x.rank}</span>${avatar(p, 44)}<div style="min-width:0"><div class="nm">${esc(p.name)}${x.pid === ME ? ' (إنت)' : ''}</div><div class="tt">${esc(titleOf(x.pid, x.t))}</div></div><span class="p">${x.pts} ${x.pts === 1 ? 'نقطة' : 'نقاط'}</span></div>`; }).join('');
  const rounds = F.rounds.map((r, i) => { const s = byId(r.subject) || { name: '؟', pid: r.subject };
    const picks = r.list.filter(x => x.rank).sort((a, b) => a.rank - b.rank);
    const lines = r.empty ? `<div class="ra muted">ما وصلت أوراق</div>` : r.none ? `<div class="ra">🙈 ولا حدا فهمان ${G(r.subject, 'عليه', 'عليها')}</div>`
      : picks.map(x => `<div class="ra"><i class="r${x.rank}">${x.rank}</i><span>${esc(x.text)}</span>${named && x.author ? `<small>${esc(nameOf(x.author))} · <span dir="ltr">+${x.pts}</span></small>` : `<small dir="ltr">+${x.pts}</small>`}</div>`).join('');
    return `<div class="round"><div class="who">${avatar(s, 30)}<div class="sub" style="font-weight:700">الدور ${i + 1} · عن ${esc(s.name)}${r.hidden ? ' · 🔒 كانت مختومة' : ''}</div></div><div class="rq">${esc(r.q.text)}</div>${lines}</div>`; }).join('') || '<div class="muted">ما في جولات.</div>';
  const lay = [['cover', 'غلاف'], ['polaroid', 'بولاريد'], ['card', 'طابع']];
  const key = UI.storyPid + '|' + UI.layout + '|' + UI.imgTheme + '|' + UI.showPts + '|' + storySig();
  const img = UI.story[key];
  const who = res.map(x => { const p = byId(x.pid); return `<button class="${UI.storyPid === x.pid ? 'on' : ''}" data-a="storyPid" data-v="${x.pid}">${avatar(p, 46)}<span>${esc(p.name)}</span></button>`; }).join('');
  return `<div class="screen ${keyEnter('final')}">${topBar(hostChip())}
  <div class="fhead"><div class="k">مين فاهم على</div><h1><span>${esc(groupLabel(F.info))}</span>؟</h1></div>
  ${F.info && F.info.photo ? `<div class="gphoto"><img src="${F.info.photo}" alt=""></div>` : ''}
  ${top ? `<div class="partycard star" style="margin-top:22px"><div class="rk">👑 نجم السهرة</div><div style="margin-top:12px;display:grid;place-items:center">${avatar(byId(top.pid), 96)}</div>
    <div class="nm">${res.filter(x => x.rank === 1).map(x => esc(nameOf(x.pid))).join(' و ')}</div><div class="tt">${esc(titleOf(top.pid, 0))}</div><div class="pts">${top.pts} ${top.pts === 1 ? 'نقطة' : 'نقاط'}</div></div>` : ''}
  <div class="tabs"><button class="${UI.ftab === 'people' ? 'on' : ''}" data-a="ftab" data-v="people">حسب الشخص</button><button class="${UI.ftab === 'rounds' ? 'on' : ''}" data-a="ftab" data-v="rounds">كل الجولات</button></div>
  <div class="card">${UI.ftab === 'people' ? people : rounds}</div>
  ${!named && UI.ftab === 'people' ? `<p class="hint" style="text-align:center">أصحاب الأوراق كانوا مخفيين، فمنعرف النقاط بس، مو مين كتب شو.</p>` : ''}
  <div class="sub-h" style="margin-top:30px">صورة القعدة للستوري</div>
  <div class="hint">النتيجة كاملة بالصورة، ${T('واختار', 'واختاري')} مين يكون مميّز فيها:</div>
  <div class="whopick">${who}</div>
  <div class="seg thin" style="margin-top:6px">${lay.map(([k, n]) => `<button class="${UI.layout === k ? 'on' : ''}" data-a="layout" data-v="${k}">${n}</button>`).join('')}</div>
  <div class="seg thin" style="margin-top:10px">${[['light', '☀️ فاتح'], ['dark', '🌙 داكن']].map(([k, n]) => `<button class="${UI.imgTheme === k ? 'on' : ''}" data-a="imgTheme" data-v="${k}">${n}</button>`).join('')}</div>
  <div class="toggles"><button class="${UI.showPts ? 'on' : ''}" data-a="tPts"><i>${UI.showPts ? '✓' : ''}</i> النقاط</button></div>
  <div class="story" id="story" data-key="${esc(key)}">${img ? `<img src="${img}" alt="صورة الستوري">` : dots}</div>
  <div class="row"><button class="btn" data-a="download">${ic('down')} حمّل الصورة</button><button class="btn red" data-a="shareInsta">${ic('share')} شارك مع صحابك</button></div>
  ${ROLE === 'host' ? `<div style="display:grid;gap:10px;margin-top:22px"><button class="btn ghost sm" data-a="hWrap">${ic('edit')} عدّل اسم القعدة أو صورتها</button><button class="btn flat sm" data-a="newGame">${ic('plus')} قعدة جديدة</button></div>` : ''}
  ${installHTML()}
  ${SIG_END}</div>`;
}
function storySig() { const F = S && S.final; return F && F.info ? (F.info.type + (F.info.name || '') + (F.info.photo ? F.info.photo.length : 0)) : ''; }
let installEvt = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; render(); });
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const ua = navigator.userAgent;
const PLAT = /Instagram|FBAN|FBAV|FB_IAB|Snapchat|TikTok|Line\//i.test(ua) ? 'inapp' : /iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document) ? 'ios' : /android/i.test(ua) ? 'android' : 'desktop';
function installHTML() {
  if (isStandalone()) return `<div class="installed">✅ اللعبة منزّلة عندك كتطبيق</div>`;
  return `<div class="appcard"><div class="ico"><img src="/icons/icon-192.png" alt=""></div>
  <div class="t"><b>خلّي «فهمان عليك؟» عموبايلك</b><span>بتفتحها بكبسة متل أي تطبيق، للقعدة الجاية</span></div>
  <button class="btn gold" data-a="install">${ic('install')} نزّل تطبيق اللعبة</button></div>`;
}
function vInstall() {
  if (!UI.install) return '';
  const link = location.origin + '/';
  const steps = {
    inapp: [`إنت فاتح اللعبة من جوّا تطبيق (متل إنستغرام)، ومنو ما فيك تنزّلها.`, `اكبس <b>⋯</b> فوق ← <b>«فتح في المتصفح»</b> (Safari أو Chrome).`, `من هونيك ارجع اكبس «نزّل تطبيق اللعبة».`],
    ios: [`افتح اللعبة بـ <b>Safari</b>.`, `اكبس زر المشاركة <b>⬆️</b> تحت.`, `اختار <b>«إضافة إلى الشاشة الرئيسية»</b> واكبس «إضافة».`],
    android: [`افتح اللعبة بـ <b>Chrome</b>.`, `اكبس <b>⋮</b> فوق.`, `اختار <b>«تثبيت التطبيق»</b> أو «إضافة إلى الشاشة الرئيسية».`],
    desktop: [`بـ Chrome أو Edge اكبس أيقونة التنزيل <b>⊕</b> بآخر شريط العنوان.`, `أو من القائمة <b>⋮</b> ← «تثبيت فهمان عليك».`, `أحلى شي تنزّلها عموبايلك من نفس الرابط.`]
  }[PLAT];
  return `<div class="sheetbg" data-a="installX"></div><div class="sheet"><div class="sheet-in">
  <div class="appcard flat"><div class="ico"><img src="/icons/icon-192.png" alt=""></div><div class="t"><b>نزّل تطبيق اللعبة</b><span>مجاني، وما بياخد مساحة</span></div></div>
  <ol class="steps">${steps.map(x => `<li>${x}</li>`).join('')}</ol>
  <button class="btn ghost sm" data-a="copyApp">${ic('link')} انسخ رابط اللعبة</button>
  <div class="hint" style="text-align:center;direction:ltr">${esc(link)}</div>
  <button class="btn flat sm" data-a="installX">تمام</button></div></div>`;
}
function vHelp() {
  if (!UI.help) return '';
  const st = [
    ['mail', 'افتحوا القعدة', 'واحد بيكون <b>الريس</b> وبيفتح قعدة، والباقي بيمسحوا الـQR أو بيكتبوا الكود، كل واحد من موبايلو.'],
    ['pen', 'جهّزوا الأسئلة', 'الريس بيحدد كم دورة وكم سؤال من البنك، والباقي كل واحد بيكتبه عن حالو قبل ما نبلّش.'],
    ['chat', 'اكتبوا وطووا الأوراق', 'بكل دور في سؤال عن واحد منكن، والكل بيكتبلو جوابو المتوقّع.'],
    ['star', 'صاحب الدور بيختم', 'بيفتح الأوراق بلا أسماء وبيختم أقرب 3: <b>الأولى نقطتين</b>، والتنتين بعدها <b>نقطة نقطة</b>.'],
    ['hand', 'أجوبة نفس بعض؟', '<b>ضغطة مطوّلة</b> عالورقة بتحطها كمان بالمركز الأول، وكل وحدة بتاخد نقطتين.'],
    ['hide', 'ولا ورقة قريبة؟', '«ولا حدا فهمان عليّ» وما حدا بياخد نقاط هالدور.'],
    ['eye', 'نفتح الظرف أو نخبّيه', 'الريس بيكشف الدور قدّام الكل، أو بيخبّيه مختوم لآخر السهرة.'],
    ['crown', 'حفلة الكشف', 'بالآخر منكشف الترتيب: لقب لكل واحد، و«قارئ الأفكار» هو الأول. وفي صورة ستوري للقعدة.']
  ];
  return `<div class="sheetbg" data-a="help"></div><div class="sheet tall"><div class="sheet-in">
  <h3>كيف منلعب «فهمان عليك؟»</h3>
  <div class="howto">${st.map(([i, t, d], k) => `<div class="how"><span class="n">${k + 1}</span><div><b>${ic(i)} ${t}</b><p>${d}</p></div></div>`).join('')}</div>
  <div class="note-tip">👑 إذا الريس طلع، اللعبة بتضل محفوظة. منستناه شوي، وبعدها أي حدا منكن بيقدر يستلم الرياسة ويكمّل.</div>
  <div class="sig" style="margin-top:6px">إعداد م. إياد حلوبي · قعدة رواق</div>
  <button class="btn sm" data-a="help">يلا فهمنا 👌</button></div></div>`;
}
function vMember() {
  if (!UI.member || ROLE !== 'host') return '';
  const p = byId(UI.member); if (!p || p.out) return '';
  const me = p.pid === ME;
  return `<div class="sheetbg" data-a="memberX"></div><div class="sheet"><div class="sheet-in">
  <div class="who" style="justify-content:center">${avatar(p, 64, p.on ? '' : 'off')}<div><div class="nm">${esc(p.name)}${me ? ' (إنت)' : ''}</div><div class="sub">${p.host ? '👑 الريس' : p.on ? 'موجود بالقعدة' : 'فاصل هلق'}</div></div></div>
  <span class="label">الاسم</span>
  <div class="addq"><input id="mName" class="field" data-in="mName" maxlength="20" value="${esc(UI.mName != null ? UI.mName : p.name)}"><button class="btn gold" data-a="mSave" aria-label="احفظ">${ic('check')}</button></div>
  ${me ? `<button class="btn ghost" data-a="editMe">${ic('camera')} غيّر صورتي</button>` : `
  ${!DEMO && p.on && !p.bot ? `<button class="btn ghost" data-a="mHand">${ic('crown')} ${G(p.pid, 'سلّمو الرياسة', 'سلّمها الرياسة')} <small>${G(p.pid, 'بيصير هو الريس', 'بتصير هي الريس')}</small></button>` : ''}
  <button class="btn ghost kick" data-a="mKick">${ic('door')} ${G(p.pid, 'طلّعو من القعدة', 'طلّعها من القعدة')}</button>`}
  <button class="btn flat sm" data-a="memberX">سكّر</button></div></div>`;
}
function vConfirm() {
  const c = UI.confirm; if (!c) return '';
  return `<div class="sheetbg modalbg" data-a="confirmNo"></div><div class="modal ${c.danger ? 'danger' : ''}"><div class="emo">${c.emo || '⚠️'}</div><h3>${c.title}</h3><p>${c.text}</p>
  <div class="row"><button class="btn ${c.danger ? 'red' : ''}" data-a="confirmYes">${c.yes}</button><button class="btn ghost" data-a="confirmNo">${c.no || 'لا، رجعني'}</button></div></div>`;
}
function vVacant() {
  if (ROLE !== 'player' || !UI.vacant || UI.vacantHide || UI.kicked) return '';
  return `<div class="sheetbg modalbg"></div><div class="modal"><div class="emo">👑</div><h3>الريس طلع من القعدة</h3>
  <p>اللعبة محفوظة ومكمّلة، بس لازم حدا منكن يستلم الرياسة ليكمّلوا.</p>
  <div class="row"><button class="btn gold" data-a="claim" ${UI.claiming ? 'disabled' : ''}>${UI.claiming ? 'عم نستلم…' : T('أنا بستلم', 'أنا بستلم')}</button><button class="btn ghost" data-a="vacantHide">منستنى شوي</button></div></div>`;
}
function vKicked() {
  return `<div class="screen">${topBar()}<div class="wait"><div><div class="envpile">${envHTML()}${envHTML('var(--green)')}${envHTML('var(--blue)')}</div>
  <h2 style="font-size:28px">الريس طلّعك من القعدة 👋</h2><p class="muted">فيك تفتح قعدة جديدة، أو تفوت عقعدة تانية بكود جديد.</p>
  <button class="btn" data-a="newGame" style="margin-top:12px">${ic('plus')} قعدة جديدة</button></div></div>${SIG}</div>`;
}
function vConnecting() {
  return `<div class="screen">${topBar()}<div class="wait"><div><div class="envpile">${envHTML()}${envHTML('var(--green)')}${envHTML('var(--blue)')}</div>
  <h2 style="font-size:26px">${UI.noRoom ? 'ناطرين القعدة تفتح…' : 'عم نفوت عالقعدة…'}</h2>
  <p class="muted small">${UI.noRoom ? 'إذا الكود غلط، ارجع وجرّب مرة تانية.' : 'تأكّد إنك والريس عالإنترنت'}</p>
  ${UI.noRoom ? `<button class="chip" data-a="newGame" style="margin-top:10px">${ic('back')} رجوع</button>` : ''}</div></div></div>`;
}
function vSheet() {
  if (!UI.sheet || ROLE !== 'host') return '';
  const ph = H.phase, inTurn = ['ask', 'write', 'pick', 'decide'].includes(ph);
  const subj = H.cur ? nameOf(H.cur.subject) : '';
  const mem = ROSTER.filter(p => !p.out).map(p => `<button data-a="member" data-v="${p.pid}">${avatar(p, 42, p.on ? '' : 'off')}<span>${esc(p.name)}</span></button>`).join('');
  return `<div class="sheetbg" data-a="sheet"></div><div class="sheet"><div class="sheet-in"><h3>أدوات الريس</h3>
  <div class="hint">الأعضاء: اكبس على أي حدا لتعدّل اسمو، أو تطلّعو، أو تسلّمو الرياسة</div>
  <div class="whopick members">${mem}</div>
  ${inTurn ? `<button class="btn ghost" data-a="hPass">${ic('refresh')} مرّر السؤال <small>سؤال تاني لـ${esc(subj)}</small></button>
  <button class="btn ghost" data-a="hSkip">${ic('skip')} تخطّى دور ${esc(subj)} <small>إذا مو موجود</small></button>` : ''}
  <button class="btn ghost" data-a="hWrap">${ic('flag')} خلّصنا السهرة <small>روح عالنتيجة</small></button>
  <button class="btn flat sm" data-a="sheet">سكّر</button></div></div>`;
}

/* ================= كونفيتي ================= */
function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cs = getComputedStyle(document.documentElement);
  const cols = ['--blue', '--green', '--red', '--gold'].map(v => cs.getPropertyValue(v).trim() || '#2D46D6');
  const c = document.createElement('canvas'); c.id = 'confetti'; document.body.appendChild(c);
  const d = Math.min(2, devicePixelRatio || 1); c.width = innerWidth * d; c.height = innerHeight * d; const x = c.getContext('2d'); x.scale(d, d);
  const P = Array.from({ length: 150 }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 90, y: innerHeight * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 13 - 4,
    r: Math.random() * 6, vr: (Math.random() - .5) * .4, w: 8 + Math.random() * 8, h: 6 + Math.random() * 8, c: cols[Math.floor(Math.random() * 4)], k: Math.random() }));
  const t0 = performance.now();
  (function f(t) {
    const el = t - t0; x.clearRect(0, 0, innerWidth, innerHeight);
    P.forEach(p => { p.vy += .32; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.globalAlpha = Math.max(0, 1 - el / 2800);
      x.fillStyle = p.c; x.strokeStyle = '#14163A'; x.lineWidth = 1.5;
      if (p.k < .3) { x.fillRect(-p.w / 2, -p.w * .35, p.w, p.w * .7); x.strokeRect(-p.w / 2, -p.w * .35, p.w, p.w * .7); x.beginPath(); x.moveTo(-p.w / 2, -p.w * .35); x.lineTo(0, 0); x.lineTo(p.w / 2, -p.w * .35); x.stroke(); }
      else if (p.k < .55) { x.beginPath(); x.arc(0, 0, p.w / 2.4, 0, 7); x.fill(); }
      else x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      x.restore(); });
    if (el < 2800) requestAnimationFrame(f); else c.remove();
  })(t0);
}

/* ================= الرسم ================= */
function morph(from, to) {
  for (const a of [...from.attributes]) if (!to.hasAttribute(a.name)) from.removeAttribute(a.name);
  for (const a of [...to.attributes]) if (from.getAttribute(a.name) !== a.value) from.setAttribute(a.name, a.value);
  if (from.tagName === 'INPUT' || from.tagName === 'TEXTAREA') {
    const v = from.tagName === 'TEXTAREA' ? to.textContent : (to.getAttribute('value') || '');
    if (document.activeElement !== from && from.value !== v) from.value = v;
    return;
  }
  const fc = [...from.childNodes], tc = [...to.childNodes];
  for (let i = 0; i < tc.length; i++) {
    const t = tc[i], f = fc[i];
    if (!f) { from.appendChild(t); continue; }
    if (f.nodeType !== t.nodeType || (f.nodeType === 1 && (f.tagName !== t.tagName || f.getAttribute('data-k') !== t.getAttribute('data-k')))) { from.replaceChild(t, f); continue; }
    if (f.nodeType !== 1) { if (f.nodeValue !== t.nodeValue) f.nodeValue = t.nodeValue; continue; }
    morph(f, t);
  }
  for (let i = fc.length - 1; i >= tc.length; i--) if (fc[i].parentNode === from) from.removeChild(fc[i]);
}
let lastHTML = '', rafR = 0;
function render() { if (rafR) return; rafR = requestAnimationFrame(() => { rafR = 0; draw(); }); }
function draw() {
  let html;
  UI.nextKey = null;
  if (S && S.turn && S.turn.key && S.turn.key !== UI.tkey) { UI.tkey = S.turn.key; UI.draft = ''; UI.askDraft = ''; UI.sentFx = null; }
  if (UI.screen === 'cover') html = vCover();
  else if (UI.screen === 'code') html = vCode();
  else if (UI.screen === 'profile') html = vProfile();
  else if (UI.kicked) html = vKicked();
  else if (!S || (ROLE === 'player' && !byId(ME) && !['final', 'party'].includes(S.phase))) html = vConnecting();
  else switch (S.phase) {
    case 'lobby': html = vLobby(); break;
    case 'ask': html = S.turn ? vAsk() : vLobby(); break;
    case 'write': html = S.turn ? vWrite() : vLobby(); break;
    case 'pick': html = S.turn ? vPick() : vLobby(); break;
    case 'decide': html = S.turn ? vDecide() : vLobby(); break;
    case 'reveal': html = S.reveal ? vReveal() : vLobby(); break;
    case 'cycleEnd': html = vCycleEnd(); break;
    case 'wrap': html = vWrap(); break;
    case 'party': html = vParty(); break;
    case 'final': html = vFinal(); break;
    default: html = vConnecting();
  }
  html += vSheet() + vMember() + vHelp() + vInstall() + vVacant() + vConfirm() + connBanner();
  const newKey = UI.nextKey || ('s:' + UI.screen + (S ? S.phase : ''));
  const changed = newKey !== UI.lastKey;
  UI.lastKey = newKey;
  if (html === lastHTML) return;
  lastHTML = html;
  if (changed) { app.innerHTML = html; scrollTo(0, 0); }
  else { const tpl = document.createElement('div'); tpl.innerHTML = html; morph(app, tpl); }
  const q = $('#qr'); if (q && !q.querySelector('svg') && CODE && H && H.code) drawQR(q);
  if ($('#story')) showStory();
  if (UI.boom) { const k = UI.boom; UI.boom = null; if (S && S.reveal && S.reveal.key === k && !S.reveal.none && !S.reveal.empty) { setTimeout(confetti, 300); vibrate([20, 40, 20]); } }
}
function drawQR(el) {
  try { const qr = qrcode(0, 'M'); qr.addData(joinUrl()); qr.make(); el.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); } catch (e) { el.textContent = CODE; }
}
setInterval(() => {
  const el = $('#tmrT'); if (!el || !UI.dl) return;
  const left = Math.max(0, Math.ceil((UI.dl - Date.now()) / 1000));
  el.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
  const t = $('#tmr'), bar = $('#tmr i'), dur = t ? +t.dataset.dur || 20 : 20; if (bar) bar.style.transform = `scaleX(${1 - left / dur})`;
  if (t && left <= 10) t.classList.remove('calm');
}, 250);

/* ================= الأحداث ================= */
const ACT = {
  theme() { applyTheme(themeNow() === 'dark' ? 'light' : 'dark'); lastHTML = ''; UI.lastKey = null; render(); },
  toCover() { UI.screen = 'cover'; render(); },
  codeScreen() { UI.screen = 'code'; render(); setTimeout(() => $('#codeIn') && $('#codeIn').focus(), 60); },
  codeGo() { const c = UI.codeInput.toUpperCase().replace(/[^A-Z0-9]/g, ''); if (c.length !== 5) return toast('الكود 5 أحرف'); CODE = c; ACT.goProfile(); },
  hostProfile() { UI.asHost = true; resetProfile(); UI.screen = 'profile'; render(); },
  demoProfile() { DEMO = true; ACT.hostProfile(); },
  goProfile() { UI.asHost = false; resetProfile(); UI.screen = 'profile'; render(); },
  gender(v) { UI.profile.g = v; render(); },
  rmAva() { UI.profile.photo = null; render(); },
  doHost() { if (!UI.profile.g) { UI.gTried = true; return render(); } startHost(); },
  doJoin() { if (!UI.profile.g) { UI.gTried = true; return render(); } joinAsPlayer(); },
  newGame() { if (H && H.code) store.del('fahman-host-' + H.code); location.href = location.pathname + (DEMO ? '?demo=1' : ''); },
  copyLink() { const u = joinUrl(); (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(() => toast('انتسخ رابط القعدة'), () => prompt('رابط القعدة', u)); },
  shareLink() { navigator.share({ title: 'فهمان عليك؟', text: 'فوت عالقعدة، الكود ' + CODE, url: joinUrl() }).catch(() => {}); },
  cyc(v) { const st = UI.settings; st.cycles = Math.max(1, Math.min(6, st.cycles + (+v))); st.bank = Math.min(st.bank, st.cycles); syncSet(); },
  bnk(v) { const st = UI.settings; st.bank = Math.max(0, Math.min(st.cycles, st.bank + (+v))); syncSet(); },
  setN(v) { UI.settings.names = v === '1'; if (H) { H.settings.names = UI.settings.names; pushState(); } else render(); },
  addMyQ() { addMyQ(UI.myqDraft); },
  useMySugg(i) { const q = mySuggest()[+i]; if (q) { UI.mySugg.splice(+i, 1); addMyQ(q, true); } },
  rmMyQ(i) { UI.myqs.splice(+i, 1); sendMyQs(); render(); },
  hStart() { HOST.start(); },
  sheet() { UI.sheet = !UI.sheet; render(); },
  useSugg(i) { const s = S.turn && S.turn.sugg && S.turn.sugg[+i]; if (s) { UI.askDraft = s; const e = $('#askIn'); if (e) e.value = s; render(); } },
  sendAsk() { const t = cleanText(UI.askDraft, 90); if (!t) return toast(T('اكتب سؤال أو اختار واحد', 'اكتبي سؤال أو اختاري واحد')); send({ t: 'ask', pid: ME, key: S.turn.key, text: t }); UI.askDraft = ''; },
  sendAns() {
    const t = cleanText(UI.draft, 70); if (!t) return;
    const key = S.turn.key; UI.sentFx = key; vibrate(15);
    const w = $('#noteWrap'); if (w) w.classList.add('flying');
    setTimeout(() => { send({ t: 'ans', pid: ME, key, text: t }); UI.sentFx = null; }, 380);
  },
  unans() { UI.draft = UI.draft || ''; send({ t: 'unans', pid: ME, key: S.turn.key }); },
  hHurry() { HOST.hurry(); },
  hClose() { HOST.closeNow(); },
  pickC(id) {
    vibrate(12); const P = UI.picks;
    const fi = P.f.indexOf(id), ri = P.r.indexOf(id);
    if (fi >= 0) { P.f.splice(fi, 1); if (!P.f.length && P.r.length) P.f.push(P.r.shift()); }
    else if (ri >= 0) P.r.splice(ri, 1);
    else if (!P.f.length) P.f.push(id);
    else if (P.r.length < 2) P.r.push(id);
    else P.r[1] = id;
    render();
  },
  pickFirst(id) {
    const P = UI.picks; vibrate([15, 40, 15]);
    if (P.f.includes(id)) return;
    P.r = P.r.filter(x => x !== id); P.f.push(id);
    if (P.f.length > 1 && !UI.tieTold) { UI.tieTold = true; toast('🤝 صاروا ' + P.f.length + ' بالمركز الأول، كل وحدة بتاخد نقطتين'); }
    render();
  },
  sendPicks() { const P = UI.picks; if (!P.f.length) return; send({ t: 'picks', pid: ME, key: S.turn.key, firsts: P.f.slice(), ids: P.r.slice() }); },
  noneAsk() { UI.confirm = { emo: '🙈', title: T('أكيد ولا ورقة قريبة منك؟', 'أكيدة ولا ورقة قريبة منك؟'), text: 'كل الأوراق رح ترجع بلا طوابع، وما حدا بياخد نقاط بهالدور.', yes: 'إي، ولا حدا فهمان عليّ', danger: true, act: 'noneGo' }; vibrate(25); render(); },
  noneGo() { UI.picks = { f: [], r: [] }; send({ t: 'picks', pid: ME, key: S.turn.key, ids: [], none: true }); },
  confirmYes() { const c = UI.confirm; UI.confirm = null; if (c && ACT[c.act]) ACT[c.act](c.v); render(); },
  confirmNo() { UI.confirm = null; render(); },
  help() { UI.help = !UI.help; render(); },
  member(pid) { UI.member = pid; UI.mName = null; UI.sheet = false; render(); },
  memberX() { UI.member = null; render(); },
  mSave() { const p = byId(UI.member); if (!p) return; HOST.rename(UI.member, UI.mName != null ? UI.mName : p.name); UI.mName = null; },
  mKick() { const p = byId(UI.member); if (!p) return; UI.confirm = { emo: '🚪', title: 'نطلّع ' + esc(p.name) + ' من القعدة؟', text: G(p.pid, 'ما رح يقدر يرجع لهالقعدة، ونقاطو بتنشال من الترتيب.', 'ما رح تقدر ترجع لهالقعدة، ونقاطها بتنشال من الترتيب.'), yes: G(p.pid, 'إي، طلّعو', 'إي، طلّعها'), danger: true, act: 'kickGo', v: p.pid }; render(); },
  kickGo(pid) { UI.member = null; HOST.kick(pid); },
  mHand() { const p = byId(UI.member); if (!p) return; UI.confirm = { emo: '👑', title: 'نسلّم الرياسة لـ' + esc(p.name) + '؟', text: G(p.pid, 'رح يصير هو الريس ويكمّل اللعبة من موبايلو، وإنت بترجع لاعب.', 'رح تصير هي الريس وتكمّل اللعبة من موبايلها، وإنت بترجع لاعب.'), yes: G(p.pid, 'إي، سلّمو', 'إي، سلّمها'), act: 'handGo', v: p.pid }; render(); },
  handGo(pid) { UI.member = null; HOST.handover(pid); },
  editMe() {
    const me = byId(ME) || { name: UI.profile.name, photo: UI.profile.photo, g: UI.profile.g };
    UI.member = null; UI.sheet = false; UI.profile = { name: me.name, photo: me.photo || null, g: me.g || 'm' };
    UI.editMe = true; UI.screen = 'profile'; render();
  },
  saveMe() {
    const p = UI.profile; send({ t: 'me', pid: ME, name: p.name, photo: p.photo || null, g: p.g });
    if (ROLE === 'player') store.set('fahman-p-' + CODE, { pid: ME, name: p.name, photo: p.photo, g: p.g });
    UI.editMe = false; UI.screen = 'game'; toast('انحفظت معلوماتك'); render();
  },
  backGame() { UI.editMe = false; UI.screen = 'game'; render(); },
  setT(v) { UI.settings.timer = +v || 0; syncSet(); },
  gCustom() { UI.wrap.customOn = true; if (GROUP_TYPES.includes(UI.wrap.type)) UI.wrap.type = ''; render(); setTimeout(() => $('#gTypeIn') && $('#gTypeIn').focus(), 60); },
  claim() { UI.claiming = true; wsSend({ t: 'claim' }); render(); setTimeout(() => { if (UI.claiming) { UI.claiming = false; render(); } }, 6000); },
  vacantHide() { UI.vacantHide = true; render(); },
  vacantShow() { UI.vacantHide = false; render(); },
  installX() { UI.install = false; render(); },
  copyApp() { const u = location.origin + '/'; (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(() => toast('انتسخ الرابط، الصقو بالمتصفح'), () => prompt('رابط اللعبة', u)); },
  selfie(kind) {
    const fb = kind === 'ava' ? 'camAva' : 'camGroup';
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.isSecureContext) { const el = document.getElementById(fb); if (el) el.click(); return; }
    openCamera({ title: kind === 'ava' ? T('ابتسم 📸', 'ابتسمي 📸') : 'تجمّعوا كلكن بالصورة 📸', aspect: kind === 'ava' ? 1 : 4 / 5, round: kind === 'ava', fallbackId: fb })
      .then(b => b && takePhoto(kind, b));
  },
  hReveal() { HOST.reveal(); },
  hHide() { HOST.hide(); },
  hNext() { HOST.next(); },
  hPass() { UI.sheet = false; HOST.pass(); },
  hSkip() { UI.sheet = false; HOST.skip(); },
  hCycle() { HOST.newCycle(); },
  hWrap() { UI.sheet = false; if (H.final) { const f = H.final; UI.wrap = { type: f.type, name: f.name, photo: f.photo, party: false, customOn: !GROUP_TYPES.includes(f.type) }; } HOST.wrap(); },
  hUnwrap() { HOST.unwrap(); },
  gType(t) { UI.wrap.type = t; UI.wrap.customOn = false; updPreview(); render(); },
  party(v) { UI.wrap.party = v === '1'; render(); },
  rmGroup() { UI.wrap.photo = null; render(); },
  hFinal() { HOST.finalize(); },
  hParty() { HOST.partyNext(); },
  ftab(v) { UI.ftab = v; render(); },
  storyPid(v) { UI.storyPid = v; render(); },
  layout(k) { UI.layout = k; render(); },
  imgTheme(k) { UI.imgTheme = k; render(); },
  tPts() { UI.showPts = !UI.showPts; render(); },
  download() { downloadStory(); },
  shareInsta() { if (navigator.share) navigator.share({ title: 'صار بدها قعدة.', url: INSTA }).catch(() => {}); else window.open(INSTA, '_blank', 'noopener'); },
  install() { if (installEvt) { installEvt.prompt(); installEvt.userChoice.finally(() => { installEvt = null; render(); }); } else { UI.install = true; render(); } }
};
function syncSet() { if (H) { H.settings = { ...UI.settings }; pushState(); pushRoster(); } else render(); }
function addMyQ(t, fromSugg) {
  t = cleanText(t, 90); if (!t) return;
  const own = ownCount(ROLE === 'host' ? UI.settings : (S.set || UI.settings));
  if (UI.myqs.length >= own) return toast('خلصت أسئلتك 👌');
  UI.myqs.push(t); if (!fromSugg) { UI.myqDraft = ''; const e = $('#myqIn'); if (e) e.value = ''; }
  sendMyQs(); render();
}
function sendMyQs() { store.set('fahman-myq-' + CODE, UI.myqs); send({ t: 'myq', pid: ME, list: UI.myqs.slice() }); }
function resetProfile() { UI.profile = { name: '', photo: null, g: null }; UI.gTried = false; }
app.addEventListener('click', e => {
  const el = e.target.closest('[data-a]'); if (!el || el.disabled) return;
  if (el.dataset.hold && UI.holdFired) { UI.holdFired = false; e.preventDefault(); return; }
  const f = ACT[el.dataset.a]; if (f) { e.preventDefault(); f(el.dataset.v, el); }
});
/* ضغط مطوّل (للأجوبة المتشابهة) */
let holdT = 0, holdEl = null, holdXY = null;
const holdEnd = () => { clearTimeout(holdT); if (holdEl) holdEl.classList.remove('holding'); holdEl = null; };
app.addEventListener('pointerdown', e => {
  const el = e.target.closest('[data-hold]'); if (!el) return;
  holdEnd(); UI.holdFired = false; holdEl = el; holdXY = [e.clientX, e.clientY]; el.classList.add('holding');
  holdT = setTimeout(() => { const f = ACT[el.dataset.hold]; holdEnd(); UI.holdFired = true; setTimeout(() => { UI.holdFired = false; }, 900); if (f) f(el.dataset.v, el); }, 520);
});
app.addEventListener('pointermove', e => { if (holdEl && holdXY && Math.hypot(e.clientX - holdXY[0], e.clientY - holdXY[1]) > 12) holdEnd(); });
['pointerup', 'pointercancel', 'pointerleave'].forEach(t => app.addEventListener(t, holdEnd));
app.addEventListener('contextmenu', e => { if (e.target.closest('[data-hold]')) e.preventDefault(); });
setInterval(() => { if (ROLE === 'player' && UI.hostDown && !UI.vacant) render(); }, 1000);
app.addEventListener('input', e => {
  const el = e.target, k = el.dataset.in; if (!k) return;
  if (k === 'name') UI.profile.name = el.value;
  else if (k === 'codeInput') UI.codeInput = el.value;
  else if (k === 'qAdd') UI.qAdd = el.value;
  else if (k === 'askDraft') UI.askDraft = el.value;
  else if (k === 'draft') { UI.draft = el.value; const c = $('#cnt'); if (c) c.textContent = el.value.length + '/70'; const b = $('#sendBtn'); if (b) b.disabled = !el.value.trim(); return; }
  else if (k === 'gname') { UI.wrap.name = el.value; updPreview(); const b = $('#finalBtn'); if (b) b.disabled = !cleanName(el.value); const h = $('#nameHint'); if (h) h.style.visibility = cleanName(el.value) ? 'hidden' : ''; return; }
  else if (k === 'myqDraft') { UI.myqDraft = el.value; return; }
  else if (k === 'mName') { UI.mName = el.value; return; }
  else if (k === 'gtype') { UI.wrap.type = el.value; updPreview(); return; }
});
app.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || e.shiftKey) return; const id = e.target.id;
  if (id === 'codeIn') ACT.codeGo();
  else if (id === 'nameIn') (UI.editMe ? ACT.saveMe : UI.asHost ? ACT.doHost : ACT.doJoin)();
  else if (id === 'mName') { e.preventDefault(); ACT.mSave(); }
  else if (id === 'myqIn') { e.preventDefault(); ACT.addMyQ(); }
  else if (id === 'ansIn') { e.preventDefault(); ACT.sendAns(); }
  else if (id === 'askIn') { e.preventDefault(); ACT.sendAsk(); }
});
app.addEventListener('change', async e => {
  const el = e.target, k = el.dataset.file; if (!k || !el.files || !el.files[0]) return;
  const file = el.files[0]; el.value = '';
  takePhoto(k, file);
});
function updPreview() { const t = $('#gPreview'); if (t) t.textContent = 'رح تطلع: «مين فاهم على ' + groupLabel({ type: cleanText(UI.wrap.type, 16) || 'شلة', name: cleanName(UI.wrap.name) }) + '؟»'; }
async function takePhoto(kind, file) {
  if (kind === 'ava') { const d = await cropImage(file, { aspect: 1, outW: 256, round: true, title: 'حرّك وكبّر صورتك' }); if (d) { UI.profile.photo = d; render(); } }
  else { const d = await cropImage(file, { aspect: 4 / 5, outW: 800, title: 'ضبّط الصورة الجماعية' }); if (d) { UI.wrap.photo = d; render(); } }
}
/* ================= الكاميرا (سيلفي) ================= */
function openCamera(o) {
  return new Promise(resolve => {
    const ov = document.createElement('div'); ov.className = 'cam';
    ov.innerHTML = `<div class="hint">${o.title}</div>
      <div class="camst ${o.round ? 'round' : ''}" style="aspect-ratio:${o.aspect}"><video playsinline autoplay muted></video><div class="camcount"></div><div class="flash"></div></div>
      <div class="camerr" hidden></div>
      <div class="camrow"><button class="cbtn" data-c="no" aria-label="إلغاء">${ic('x')}</button><button class="shutter" data-c="snap" aria-label="صوّر"></button><button class="cbtn" data-c="flip" aria-label="بدّل الكاميرا">${ic('flip')}</button></div>
      <button class="chip" data-c="timer">⏱ عدّاد 3 ثواني: <b>لا</b></button>`;
    document.body.appendChild(ov);
    const v = ov.querySelector('video'), cnt = ov.querySelector('.camcount');
    let stream = null, facing = o.facing || 'user', delay = false, busy = false, closed = false;
    const stop = () => { if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; };
    const done = b => { if (closed) return; closed = true; stop(); ov.remove(); resolve(b); };
    const showErr = () => {
      const er = ov.querySelector('.camerr'); er.hidden = false;
      er.innerHTML = `ما قدرنا نفتح الكاميرا من هون 😕<br><span class="small">يمكن لازم تسمح بالكاميرا من إعدادات المتصفح.</span><br><label class="btn gold sm" for="${o.fallbackId}" style="margin-top:10px">${ic('camera')} افتح كاميرا الموبايل</label>`;
      ov.querySelector('.camst').style.display = 'none'; ov.querySelector('[data-c=snap]').disabled = true; ov.querySelector('[data-c=flip]').disabled = true;
      er.addEventListener('click', e => { if (e.target.closest('label')) setTimeout(() => done(null), 60); });
    };
    const start = async () => {
      stop();
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 1280 } }, audio: false });
        if (closed) return stop();
        v.srcObject = stream; v.style.transform = facing === 'user' ? 'scaleX(-1)' : '';
        await v.play().catch(() => {});
      } catch (e) { showErr(); }
    };
    const shoot = () => {
      const w = v.videoWidth, h = v.videoHeight; if (!w) return toast('الكاميرا لسّا عم تفتح');
      const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
      if (facing === 'user') { x.translate(w, 0); x.scale(-1, 1); }
      x.drawImage(v, 0, 0, w, h);
      ov.querySelector('.flash').classList.add('go'); vibrate(30);
      c.toBlob(b => setTimeout(() => done(b), 180), 'image/jpeg', .9);
    };
    ov.addEventListener('click', e => {
      const b = e.target.closest('[data-c]'); if (!b || b.disabled) return;
      const k = b.dataset.c;
      if (k === 'no') done(null);
      else if (k === 'flip') { facing = facing === 'user' ? 'environment' : 'user'; start(); }
      else if (k === 'timer') { delay = !delay; b.innerHTML = `⏱ عدّاد 3 ثواني: <b>${delay ? 'إي' : 'لا'}</b>`; }
      else if (k === 'snap' && !busy) {
        if (!delay) return shoot();
        busy = true; let n = 3; cnt.textContent = n; cnt.classList.add('on');
        const tk = setInterval(() => { n--; if (n > 0) { cnt.textContent = n; vibrate(10); } else { clearInterval(tk); cnt.classList.remove('on'); busy = false; shoot(); } }, 900);
      }
    });
    start();
  });
}

/* ================= قص الصورة ================= */
function cropImage(file, o) {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file); const img = new Image();
    img.onerror = () => { URL.revokeObjectURL(url); toast('ما قدرنا نفتح الصورة'); resolve(null); };
    img.onload = () => {
      const fw = Math.min(window.innerWidth * .86, 380), fh = fw / o.aspect, iw = img.naturalWidth, ih = img.naturalHeight;
      const sFit = Math.min(fw / iw, fh / ih), sCov = Math.max(fw / iw, fh / ih), sMax = sCov * 5;
      let s = sCov, ox = 0, oy = 0;
      const ov = document.createElement('div'); ov.className = 'crop';
      ov.innerHTML = `<div class="hint">${o.title}</div><div class="st ${o.round ? 'round' : ''}"><canvas></canvas></div>
        <input type="range" min="0" max="1000" aria-label="تكبير"><div class="hint">اسحب لتحرّك · قرّب بإصبعين أو بالشريط</div>
        <div class="row"><button class="btn ghost" data-c="no">إلغاء</button><button class="btn gold" data-c="ok">اعتمد</button></div>`;
      document.body.appendChild(ov);
      const cv = ov.querySelector('canvas'), ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = fw * dpr; cv.height = fh * dpr; cv.style.width = fw + 'px'; cv.style.height = fh + 'px';
      const rng = ov.querySelector('input'); rng.value = Math.round((s - sFit) / (sMax - sFit) * 1000);
      const clamp = () => { const lx = Math.abs(iw * s - fw) / 2, ly = Math.abs(ih * s - fh) / 2; ox = Math.max(-lx, Math.min(lx, ox)); oy = Math.max(-ly, Math.min(ly, oy)); };
      const paint = (c, k) => { c.fillStyle = '#E0D3B6'; c.fillRect(0, 0, fw * k, fh * k); c.imageSmoothingQuality = 'high'; c.drawImage(img, (fw / 2 + ox - iw * s / 2) * k, (fh / 2 + oy - ih * s / 2) * k, iw * s * k, ih * s * k); };
      const drawC = () => { clamp(); paint(ctx, dpr); };
      const setS = v => { s = Math.max(sFit, Math.min(sMax, v)); rng.value = Math.round((s - sFit) / (sMax - sFit) * 1000); drawC(); };
      rng.oninput = () => { s = sFit + (sMax - sFit) * rng.value / 1000; drawC(); };
      const pts = new Map(); let pinch = null;
      cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s }; } });
      cv.addEventListener('pointermove', e => { const p = pts.get(e.pointerId); if (!p) return; const nx = e.clientX, ny = e.clientY;
        if (pts.size === 1) { ox += nx - p.x; oy += ny - p.y; p.x = nx; p.y = ny; drawC(); } else { p.x = nx; p.y = ny; const [a, b] = [...pts.values()]; if (pinch) setS(pinch.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d); } });
      const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
      cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
      cv.addEventListener('wheel', e => { e.preventDefault(); setS(s * (e.deltaY < 0 ? 1.08 : .93)); }, { passive: false });
      drawC();
      ov.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; let outp = null;
        if (b.dataset.c === 'ok') { const W = o.outW, k = W / fw; const c2 = document.createElement('canvas'); c2.width = W; c2.height = Math.round(W / o.aspect); paint(c2.getContext('2d'), k); outp = c2.toDataURL('image/jpeg', .84); }
        ov.remove(); URL.revokeObjectURL(url); resolve(outp); });
    };
    img.src = url;
  });
}

/* ================= صورة الستوري ================= */
const SW = 1080, SH = 1920;
const FD = '"Marhey","IBM Plex Sans Arabic",sans-serif', FB = '"IBM Plex Sans Arabic",sans-serif';
function PAL(t) {
  return t === 'dark'
    ? { bg: '#111430', bg2: '#171B3D', surface: '#1D2147', ink: '#EEF0FF', ink2: '#A3A7D2', line: '#2E3366', press: '#04051A', dot: 'rgba(238,240,255,.07)', blue: '#7B8CFF', green: '#4FD69C', red: '#FF7B8E', gold: '#E8BF7A', onc: '#0D0F2A', paper: '#FFFBF2' }
    : { bg: '#EADFC8', bg2: '#E0D3B6', surface: '#FFFBF2', ink: '#14163A', ink2: '#5B5D7E', line: '#CDBE9F', press: '#14163A', dot: 'rgba(20,22,58,.11)', blue: '#2D46D6', green: '#1E9E6A', red: '#E6455C', gold: '#D9A64E', onc: '#FFFBF2', paper: '#FFFBF2' };
}
const loadImg = src => new Promise(r => { if (!src) return r(null); const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; });
function fitTxt(ctx, t, w) { t = String(t); if (ctx.measureText(t).width <= w) return t; while (t.length > 1 && ctx.measureText(t + '…').width > w) t = t.slice(0, -1); return t + '…'; }
function fontFit(ctx, t, w, size, weight, fam, min) { let s = size; do { ctx.font = `${weight} ${s}px ${fam}`; if (ctx.measureText(t).width <= w) return s; s -= 2; } while (s > min); ctx.font = `${weight} ${min}px ${fam}`; return min; }
function coverImg(ctx, img, x, y, w, h) { const s = Math.max(w / img.width, h / img.height), iw = img.width * s, ih = img.height * s; ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); }
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function boxed(ctx, P, x, y, w, h, fill, sh = 10, r = 6, lw = 5) { ctx.fillStyle = P.press; rr(ctx, x + sh, y + sh, w, h, r); ctx.fill(); ctx.fillStyle = fill; rr(ctx, x, y, w, h, r); ctx.fill(); ctx.strokeStyle = P.press; ctx.lineWidth = lw; ctx.stroke(); }
function dotsBg(ctx, P) { ctx.fillStyle = P.bg; ctx.fillRect(0, 0, SW, SH); ctx.fillStyle = P.dot; for (let y = 12; y < SH; y += 30) for (let x = 12; x < SW; x += 30) { ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill(); } }
function photoArea(ctx, P, D, x, y, w, h) {
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  if (D.img) coverImg(ctx, D.img, x, y, w, h);
  else { ctx.fillStyle = D.col; ctx.fillRect(x, y, w, h); ctx.fillStyle = 'rgba(20,22,58,.08)'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(x + ((i * 173) % w), y + ((i * 97) % h), 30 + (i % 4) * 22, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#14163A'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `700 ${Math.round(Math.min(w, h) * .5)}px ${FD}`; ctx.fillText(initial(D.name), x + w / 2, y + h / 2 + h * .03); ctx.textBaseline = 'alphabetic'; }
  ctx.restore();
}
function stampShape(ctx, x, y, w, h, fill, P, holes = 22) {
  // طابع بريد بحواف مسنّنة
  ctx.save(); ctx.fillStyle = P.press; stampPath(ctx, x + 10, y + 12, w, h, holes); ctx.fill('evenodd');
  ctx.fillStyle = fill; stampPath(ctx, x, y, w, h, holes); ctx.fill('evenodd'); ctx.restore();
}
function stampPath(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.rect(x, y, w, h);
  const nx = Math.round(w / (r * 2.3)), ny = Math.round(h / (r * 2.3));
  for (let i = 0; i <= nx; i++) { const cx = x + i * w / nx; ctx.moveTo(cx + r * .55, y); ctx.arc(cx, y, r * .55, 0, Math.PI * 2); ctx.moveTo(cx + r * .55, y + h); ctx.arc(cx, y + h, r * .55, 0, Math.PI * 2); }
  for (let i = 1; i < ny; i++) { const cy = y + i * h / ny; ctx.moveTo(x + r * .55, cy); ctx.arc(x, cy, r * .55, 0, Math.PI * 2); ctx.moveTo(x + w + r * .55, cy); ctx.arc(x + w, cy, r * .55, 0, Math.PI * 2); }
}
function postmark(ctx, P, cx, cy, r, lines, rot = .25) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.strokeStyle = P.red; ctx.fillStyle = P.red; ctx.globalAlpha = .92;
  ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke();
  ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.arc(0, 0, r - 16, 0, 7); ctx.stroke(); ctx.setLineDash([]);
  ctx.textAlign = 'center'; ctx.direction = 'rtl';
  lines.forEach((l, i) => { const fs = i === 0 ? r * .3 : r * .19; ctx.font = `700 ${fs}px ${i === 0 ? FD : FB}`; ctx.fillText(fitTxt(ctx, l, r * 1.4), 0, (i - (lines.length - 1) / 2) * r * .36 + fs * .35); });
  ctx.lineWidth = 5; for (let k = 0; k < 4; k++) { ctx.beginPath(); for (let x = 0; x <= 150; x += 6) { const yy = -r * .45 + k * 22 + Math.sin(x / 14) * 7; x === 0 ? ctx.moveTo(r + 16 + x, yy) : ctx.lineTo(r + 16 + x, yy); } ctx.stroke(); }
  ctx.restore();
}
function ribbon(ctx, P, cx, y, text, maxW, fill, color) {
  const fs = fontFit(ctx, text, maxW - 90, 62, 700, FD, 34);
  ctx.font = `700 ${fs}px ${FD}`; const tw = Math.min(maxW, ctx.measureText(text).width + 90); const h = fs * 1.75;
  ctx.save(); ctx.translate(cx, y + h / 2); ctx.rotate(-.025);
  boxed(ctx, P, -tw / 2, -h / 2, tw, h, fill, 9, 6, 5);
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, fs * .06); ctx.restore(); ctx.textBaseline = 'alphabetic';
  return h;
}
function footer(ctx, P, y, light) {
  ctx.strokeStyle = light ? 'rgba(255,255,255,.7)' : P.ink2; ctx.lineWidth = 3; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.moveTo(80, y); ctx.lineTo(1000, y); ctx.stroke(); ctx.setLineDash([]);
  ctx.direction = 'rtl'; ctx.textAlign = 'right'; ctx.fillStyle = light ? '#fff' : P.ink; ctx.font = `700 40px ${FD}`; ctx.fillText('صار بدها قعدة.', 1000, y + 70);
  ctx.direction = 'ltr'; ctx.textAlign = 'left'; ctx.fillStyle = light ? 'rgba(255,255,255,.9)' : P.ink2; ctx.font = `600 32px ${FB}`; ctx.fillText('@eyad.hloubi', 80, y + 66);
  ctx.save(); ctx.translate(540, y + 55); ctx.rotate(-.08); ctx.fillStyle = P.surface; ctx.strokeStyle = P.press; ctx.lineWidth = 3; ctx.fillRect(-34, -22, 68, 44); ctx.strokeRect(-34, -22, 68, 44);
  ctx.beginPath(); ctx.moveTo(-34, -22); ctx.lineTo(0, 4); ctx.lineTo(34, -22); ctx.stroke(); ctx.restore();
}
function sqAvatar(ctx, P, img, name, col, cx, cy, r, ring) {
  const s = r * 2, x = cx - r, y = cy - r;
  ctx.save(); rr(ctx, x, y, s, s, s * .3); ctx.clip();
  if (img) coverImg(ctx, img, x, y, s, s);
  else { ctx.fillStyle = col; ctx.fillRect(x, y, s, s); ctx.fillStyle = '#14163A'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'; ctx.font = `700 ${Math.round(r * .95)}px ${FD}`; ctx.fillText(initial(name), cx, cy + r * .08); ctx.textBaseline = 'alphabetic'; }
  ctx.restore(); rr(ctx, x, y, s, s, s * .3); ctx.strokeStyle = ring || P.press; ctx.lineWidth = Math.max(3, r * .09); ctx.stroke();
}
function groupArt(ctx, P, D, x, y, w, h, padT = 0, padB = 0) {
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  if (D.gimg) { coverImg(ctx, D.gimg, x, y, w, h); ctx.restore(); return; }
  ctx.fillStyle = P.blue; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = 'rgba(255,255,255,.09)'; for (let i = -h; i < w; i += 70) { ctx.beginPath(); ctx.moveTo(x + i, y); ctx.lineTo(x + i + h, y + h); ctx.lineTo(x + i + h + 30, y + h); ctx.lineTo(x + i + 30, y); ctx.fill(); }
  const ppl = D.res.slice(0, 12); const n = ppl.length || 1;
  const cols = n <= 4 ? n : n <= 6 ? 3 : 4, rows = Math.ceil(n / cols);
  const cell = Math.min(w / (cols + .4), (h - padT - padB) / (rows + .3)); const r = cell * .38;
  const ox = x + (w - cols * cell) / 2, oy = y + padT + (h - padT - padB - rows * cell) / 2;
  ppl.forEach((p, i) => { const c = i % cols, rw = Math.floor(i / cols); const cx = ox + (cols - c - .5) * cell, cy = oy + (rw + .5) * cell;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(((i % 3) - 1) * .07); ctx.fillStyle = P.press; rr(ctx, -r + 8, -r + 9, r * 2, r * 2, r * .6); ctx.fill();
    sqAvatar(ctx, P, D.imgs[p.pid], nameOf(p.pid), colOf(p.pid), 0, 0, r); ctx.restore(); });
  ctx.restore();
}
function titleBlock(ctx, P, label, cx, y, maxW, onDark) {
  ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.fillStyle = onDark ? 'rgba(255,255,255,.92)' : P.ink2; ctx.font = `700 46px ${FD}`; ctx.fillText('مين فاهم على', cx, y + 40);
  const t = label + '؟'; const fs = fontFit(ctx, t, maxW - 70, 96, 700, FD, 50); ctx.font = `700 ${fs}px ${FD}`;
  const tw = ctx.measureText(t).width + 60, th = fs * 1.55, by = y + 66;
  ctx.save(); ctx.translate(cx, by + th / 2); ctx.rotate(-.02); boxed(ctx, P, -tw / 2, -th / 2, tw, th, P.gold, 9, 6, 5);
  ctx.fillStyle = '#14163A'; ctx.textBaseline = 'middle'; ctx.fillText(t, 0, fs * .06); ctx.restore(); ctx.textBaseline = 'alphabetic';
  return 66 + th + 14;
}
function drawBoard(ctx, P, D, x, y, w, h) {
  const res = D.res, n = res.length; if (!n) return;
  const cols = n > 8 ? 2 : 1, per = Math.ceil(n / cols), gap = 14, cgap = 26;
  const cw = (w - cgap * (cols - 1)) / cols, rh = Math.min(cols > 1 ? 150 : 185, (h - gap * (per - 1)) / per);
  y += Math.max(0, (h - (per * rh + gap * (per - 1))) / 2);
  res.forEach((x0, i) => {
    const col = Math.floor(i / per), row = i % per;
    const rx = x + w - (col + 1) * cw - col * cgap, ry = y + row * (rh + gap);
    const hi = x0.pid === D.me, p = byId(x0.pid) || { name: '؟' };
    const fill = hi ? P.blue : P.surface, ink = hi ? P.onc : P.ink, ink2 = hi ? P.onc : P.ink2;
    if (hi) { boxed(ctx, P, rx - 8, ry - 4, cw + 16, rh + 8, fill, 10, 10, 6); }
    else { ctx.fillStyle = P.press; rr(ctx, rx + 5, ry + 6, cw, rh, 8); ctx.fill(); ctx.fillStyle = fill; rr(ctx, rx, ry, cw, rh, 8); ctx.fill(); ctx.strokeStyle = P.press; ctx.lineWidth = 3.5; ctx.stroke(); }
    const k = rh / 140;
    // الترتيب
    ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.textBaseline = 'middle';
    const rk = x0.rank === 1 ? '👑' : String(x0.rank);
    ctx.fillStyle = hi ? P.onc : (x0.rank === 1 ? P.gold : P.ink2); ctx.font = `700 ${Math.round((x0.rank === 1 ? 44 : 52) * k)}px ${FD}`; ctx.fillText(rk, rx + cw - 40 * k, ry + rh / 2 + 3);
    // الصورة
    const r = 44 * k, ax = rx + cw - 80 * k - r - 10 * k;
    sqAvatar(ctx, P, D.imgs[x0.pid], p.name, colOf(x0.pid), ax, ry + rh / 2, r, hi ? P.onc : P.press);
    // النقاط
    let left = rx + 22;
    if (D.showPts) { ctx.textAlign = 'left'; ctx.direction = 'rtl'; ctx.fillStyle = hi ? P.onc : P.red; ctx.font = `700 ${Math.round(36 * k)}px ${FB}`;
      const pt = `${x0.pts} ${x0.pts === 1 ? 'نقطة' : 'نقاط'}`; ctx.fillText(pt, rx + 24, ry + rh / 2 + 2); left = rx + 24 + ctx.measureText(pt).width + 18; }
    // الاسم واللقب
    const tx = ax - r - 18 * k, tw = tx - left;
    ctx.textAlign = 'right'; ctx.direction = 'rtl'; ctx.textBaseline = 'alphabetic';
    const nfs = fontFit(ctx, p.name, tw, Math.round((hi ? 50 : 44) * k), 700, FD, Math.round(24 * k));
    ctx.fillStyle = ink; ctx.font = `700 ${nfs}px ${FD}`; ctx.fillText(fitTxt(ctx, p.name, tw), tx, ry + rh * .5);
    ctx.fillStyle = ink2; ctx.font = `600 ${Math.round(28 * k)}px ${FB}`; ctx.fillText(fitTxt(ctx, titleOf(x0.pid, x0.t), tw), tx, ry + rh * .82);
    if (hi) { // سهم بيأشّر على الشخص
      ctx.save(); ctx.translate(rx - 8, ry + rh / 2); ctx.fillStyle = P.gold; ctx.strokeStyle = P.press; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-34, -22); ctx.lineTo(4, 0); ctx.lineTo(-34, 22); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    }
  });
  ctx.textBaseline = 'alphabetic';
}
async function buildStory(pid, layout, theme) {
  await Promise.race([document.fonts ? document.fonts.ready : 0, new Promise(r => setTimeout(r, 1500))]);
  try { const tx = 'فهمان عليك؟ 123 @abc'; await Promise.all([document.fonts.load('700 40px "Marhey"', tx), document.fonts.load('600 30px "IBM Plex Sans Arabic"', tx), document.fonts.load('700 30px "IBM Plex Sans Arabic"', tx)]); } catch (e) {}
  const F = S.final, P = PAL(theme);
  const res = F.results.filter(x => byId(x.pid));
  const imgs = {}; await Promise.all(res.map(async x => { imgs[x.pid] = await loadImg(byId(x.pid).photo); }));
  const D = { res, imgs, gimg: await loadImg(F.info && F.info.photo), label: groupLabel(F.info), me: pid, showPts: UI.showPts };
  const c = document.createElement('canvas'); c.width = SW; c.height = SH; const ctx = c.getContext('2d');
  dotsBg(ctx, P);
  const head = (y, light) => { ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.fillStyle = light ? '#FFFBF2' : P.ink2; ctx.font = `700 40px ${FD}`; ctx.fillText('فهمان عليك؟ · قعدة رواق', SW / 2, y); };
  if (layout === 'cover') {
    const H1 = 620;
    groupArt(ctx, P, D, 0, 0, SW, H1, 130, 120);
    const g = ctx.createLinearGradient(0, 0, 0, 220); g.addColorStop(0, 'rgba(10,11,30,.55)'); g.addColorStop(1, 'rgba(10,11,30,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, SW, 220);
    head(90, true);
    ctx.fillStyle = P.bg; ctx.beginPath(); ctx.moveTo(0, H1 - 110); ctx.lineTo(SW / 2, H1 + 30); ctx.lineTo(SW, H1 - 110); ctx.lineTo(SW, SH); ctx.lineTo(0, SH); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = P.press; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, H1 - 110); ctx.lineTo(SW / 2, H1 + 30); ctx.lineTo(SW, H1 - 110); ctx.stroke();
    ctx.save(); ctx.translate(SW / 2, H1 + 22); ctx.fillStyle = P.red; ctx.strokeStyle = P.press; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 56, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `700 54px ${FD}`; ctx.fillText('✉', 0, 4); ctx.restore(); ctx.textBaseline = 'alphabetic';
    const hb = titleBlock(ctx, P, D.label, SW / 2, H1 + 90, 940);
    const top = H1 + 90 + hb + 10;
    drawBoard(ctx, P, D, 90, top, 900, 1745 - top);
    footer(ctx, P, 1780);
  } else if (layout === 'polaroid') {
    head(100);
    ctx.save(); ctx.translate(SW / 2, 470); ctx.rotate(-3 * Math.PI / 180);
    const fw = 700, fh = 640; boxed(ctx, P, -fw / 2, -fh / 2, fw, fh, P.paper, 14, 4, 6);
    groupArt(ctx, P, D, -fw / 2 + 36, -fh / 2 + 36, fw - 72, 440); ctx.strokeStyle = P.press; ctx.lineWidth = 4; ctx.strokeRect(-fw / 2 + 36, -fh / 2 + 36, fw - 72, 440);
    ctx.fillStyle = '#5B5D7E'; ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.font = `700 36px ${FD}`; ctx.fillText('مين فاهم على', 0, fh / 2 - 100);
    const t = D.label + '؟'; const fs = fontFit(ctx, t, fw - 100, 74, 700, FD, 40); ctx.fillStyle = '#14163A'; ctx.font = `700 ${fs}px ${FD}`; ctx.fillText(t, 0, fh / 2 - 34);
    ctx.restore();
    ctx.save(); ctx.translate(SW / 2 - 290, 170); ctx.rotate(-.5); ctx.globalAlpha = .9; ctx.fillStyle = P.blue; ctx.fillRect(-100, -28, 200, 56); ctx.restore();
    ctx.save(); ctx.translate(SW / 2 + 290, 190); ctx.rotate(.45); ctx.globalAlpha = .9; ctx.fillStyle = P.red; ctx.fillRect(-100, -28, 200, 56); ctx.restore(); ctx.globalAlpha = 1;
    postmark(ctx, P, 905, 760, 92, ['قعدة', 'رواق'], .2);
    drawBoard(ctx, P, D, 90, 850, 900, 1745 - 850);
    footer(ctx, P, 1780);
  } else {
    ctx.fillStyle = P.blue; ctx.fillRect(0, 0, SW, SH);
    ctx.fillStyle = 'rgba(255,255,255,.08)'; for (let i = -SH; i < SW; i += 90) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + SH, SH); ctx.lineTo(i + SH + 40, SH); ctx.lineTo(i + 40, 0); ctx.fill(); }
    const sx = 80, sy = 110, sw = 920, sh = 1620;
    stampShape(ctx, sx, sy, sw, sh, P.surface, P, 26);
    ctx.strokeStyle = P.press; ctx.lineWidth = 5; ctx.strokeRect(sx + 36, sy + 36, sw - 72, sh - 72);
    ctx.fillStyle = P.ink2; ctx.textAlign = 'right'; ctx.direction = 'rtl'; ctx.font = `700 34px ${FD}`; ctx.fillText('بريد القعدة · فهمان عليك؟', sx + sw - 70, sy + 100);
    groupArt(ctx, P, D, sx + 70, sy + 130, sw - 140, 360); ctx.lineWidth = 5; ctx.strokeRect(sx + 70, sy + 130, sw - 140, 360);
    const hb = titleBlock(ctx, P, D.label, SW / 2, sy + 520, sw - 140);
    const top = sy + 520 + hb + 10;
    drawBoard(ctx, P, D, sx + 90, top, sw - 180, sy + sh - 70 - top);
    postmark(ctx, P, sx + 110, sy + 150, 92, ['قعدة', 'رواق'], -.2);
    ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.direction = 'rtl'; ctx.textAlign = 'right'; ctx.font = `700 40px ${FD}`; ctx.fillText('صار بدها قعدة.', 1000, 1850);
    ctx.direction = 'ltr'; ctx.textAlign = 'left'; ctx.font = `600 32px ${FB}`; ctx.fillText('@eyad.hloubi', 80, 1846);
  }
  return c;
}
async function showStory() {
  const el = $('#story'); if (!el) return; const key = el.dataset.key; if (UI.story[key] || UI.building === key) return;
  UI.building = key;
  try { const c = await buildStory(UI.storyPid, UI.layout, UI.imgTheme); UI.story[key] = c.toDataURL('image/png'); } catch (e) { console.error(e); }
  UI.building = null;
  const now = $('#story'); if (now && now.dataset.key === key) { now.innerHTML = `<img src="${UI.story[key]}" alt="صورة الستوري">`; lastHTML = ''; }
}
async function downloadStory() {
  const c = await buildStory(UI.storyPid, UI.layout, UI.imgTheme);
  c.toBlob(async b => {
    const name = 'fahman-' + Date.now() + '.png'; const file = new File([b], name, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }, 'image/png');
}

/* ================= الإقلاع ================= */
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('/sw.js').catch(() => {});
(function boot() {
  const r = params.get('r');
  if (r) {
    CODE = r.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
    const hs = store.get('fahman-host-' + CODE);
    if (hs && params.has('h')) { resumeHost(hs); return; }
    const ps = store.get('fahman-p-' + CODE);
    if (ps && ps.pid) { ME = ps.pid; UI.profile = { name: ps.name || '', photo: ps.photo || null, g: ps.g || 'm' }; UI.myqs = store.get('fahman-myq-' + CODE) || []; joinAsPlayer(); return; }
  }
  render();
})();
