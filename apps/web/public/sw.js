const CACHE_NAME = 'hangout-pwa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/clubhouse',
  '/dashboard',
  '/arcade',
  '/cinema',
  '/music',
  '/planning',
  '/ai-assistant',
  '/manifest.json'
];

// Install Event - Caching Core Static Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Cleaning Up Stale Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network First with Cache Fallback
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/clubhouse') || caches.match('/');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        console.log('[ServiceWorker] Offline fetch fallback');
      });
    })
  );
});

// Web Push Notification Listener
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Hangout Notification', body: 'New squad activity!' };
  const options = {
    body: data.body,
    icon: 'https://i.postimg.cc/mD363XkH/hangout-icon-192.png',
    badge: 'https://i.postimg.cc/mD363XkH/hangout-icon-192.png',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now(), primaryKey: '1' }
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
