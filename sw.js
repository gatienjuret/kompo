self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('model-app-store-v2').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/js/app.js',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
