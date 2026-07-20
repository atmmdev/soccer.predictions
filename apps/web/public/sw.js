/** Bump on each release so activate() purges stale caches after deploy. */
const CACHE_NAME = 'soccer-predictions-v3';

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

function isShellAsset(pathname) {
  return SHELL_ASSETS.some(asset => pathname === asset);
}

function cacheResponse(request, response) {
  if (!isCacheableRequest(request) || !response.ok) {
    return;
  }

  const copy = response.clone();
  caches
    .open(CACHE_NAME)
    .then(cache => cache.put(request, copy))
    .catch(() => {
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

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET' || !isCacheableRequest(request)) {
    return;
  }

  const url = new URL(request.url);

  // API and Next.js hashed assets must always hit the network (new deploy = new hashes).
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/')) {
    return;
  }

  if (request.mode === 'navigate') {
    // HTML: network-only. Stale cached documents break chunk loading after deploy.
    event.respondWith(
      fetch(request).catch(() => caches.match('/offline.html')),
    );
    return;
  }

  if (!isShellAsset(url.pathname)) {
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
