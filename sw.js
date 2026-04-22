// Club Sinergético — Service Worker v3
const CACHE = 'cs-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ONLY handle same-origin requests — let ALL external pass through
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if(url.origin !== location.origin) return;
  if(e.request.mode === 'navigate'){
    e.respondWith(fetch(e.request).catch(() => caches.match('/index.html')));
  }
});

self.addEventListener('message', e => {
  if(e.data?.action === 'skipWaiting') self.skipWaiting();
});
