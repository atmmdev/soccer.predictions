const CACHE_NAME = 'soccer-predictions-v2';
const SHELL_ASSETS = [
  '/offline.html',
  '/favicon.png',
  '/icon.png',
  '/brand/logomarca.png',
];

function isCacheableRequest(request) {
  const url = new URL(request.url);
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function cacheResponse(request, response) {
  if (!isCacheableRequest(request) || !response.ok) {
    return;
  }

  const copy = response.clone();
  caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => {
    // Ignore cache errors (e.g. opaque responses, extension URLs).
  });
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET' || !isCacheableRequest(request)) {
    return;
  }

  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          cacheResponse(request, response);
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => cached ?? caches.match('/offline.html')),
        ),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      cached =>
        cached ??
        fetch(request).then(response => {
          cacheResponse(request, response);
          return response;
        }),
    ),
  );
});
