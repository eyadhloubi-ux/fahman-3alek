/* فهمان عليك؟ — عامل الخدمة: بيخلّي اللعبة تنفتح بسرعة كتطبيق */
const CACHE = 'fahman-v4';
const SHELL = ['/', '/style.css', '/app.js', '/qrcode.js', '/manifest.json', '/fonts/fonts.css', '/fonts/marhey-arabic-700-normal.woff2', '/fonts/marhey-arabic-400-normal.woff2', '/fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2', '/fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2', '/fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.pathname.startsWith('/ws') || u.pathname.startsWith('/stats') || u.pathname.startsWith('/healthz')) return;
  if (u.origin === location.origin && (u.pathname === '/' || u.pathname === '/index.html')) {
    // الصفحة: من الشبكة أول، ومن الكاش إذا ما في نت
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('/', cp)); return r; }).catch(() => caches.match('/')));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => { if (r.ok && (u.origin === location.origin)) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
