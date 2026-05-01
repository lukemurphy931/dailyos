const CACHE_NAME = 'dailyos-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

// ─── INSTALL ─────────────────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ─── FETCH (offline support) ──────────────────────────────────────────────
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/index.html')))
  );
});

// ─── SCHEDULED NOTIFICATION ───────────────────────────────────────────────
let notifTimer = null;

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIF') {
    if (notifTimer) clearTimeout(notifTimer);
    const delay = e.data.delay;
    notifTimer = setTimeout(() => {
      self.registration.showNotification('Daily OS — Evening Check-in 🌙', {
        body: 'Time to log your day. How did it go?',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'checkin',
        renotify: true,
        actions: [
          { action: 'open', title: 'Open app' }
        ],
        data: { url: '/' }
      });
    }, delay);
  }
});

// ─── NOTIFICATION CLICK ───────────────────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
