const CACHE_NAME = 'shopify-theme-cache-v1';
const OFFLINE_PAGE = '/offline';

const CACHED_URLS = [
  '/',
  OFFLINE_PAGE,
  '/assets/theme.bundle.js',
  '/assets/styles.bundle.css'
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
        .catch(() => caches.match(OFFLINE_PAGE))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
