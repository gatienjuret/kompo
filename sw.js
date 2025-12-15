self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force activation immediately
  e.waitUntil(
    caches.open('model-app-store-v3').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/js/app.js',
    ])),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== 'model-app-store-v3') {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim(); // Take control of all clients immediately
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
