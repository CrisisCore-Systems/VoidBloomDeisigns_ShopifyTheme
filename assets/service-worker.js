const CACHE_NAME = 'theme-cache-v1';
const OFFLINE_URL = '/offline';

const CACHED_URLS = [
  '/offline',
  '/assets/voidbloom-base.css',
  '/assets/theme.js',
  '/assets/theme-utils.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHED_URLS))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
