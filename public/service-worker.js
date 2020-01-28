let doCache = false;

const CACHE_NAME = 'pwa-app-cache';

self.addEventListener('activate', event => {
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    cache.keys().then(keys => {
      Promise.all(
        keys.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('install', event => {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        fetch('asset-manifest.json')
          .then(response => response.json())
          .then(assets => {
            const urlsToCache = ['/', assets['main.js']];
            cache.addAll(urlsToCache);
          });
      })
    );
  }
});

self.addEventListener('fetch', event => {
  if (doCache) {
    event.respondWith(
      caches
        .match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
