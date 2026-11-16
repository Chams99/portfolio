// Service Worker for La Cuisine Restaurant PWA
const CACHE_NAME = 'la-cuisine-v2';
const APP_CACHE_PREFIX = 'la-cuisine-';
const APP_SCOPE = new URL(self.registration.scope);
const APP_INDEX = new URL('', APP_SCOPE).href;
const urlsToCache = [
  APP_INDEX,
  new URL('index.html', APP_SCOPE).href,
  new URL('css/styles.css', APP_SCOPE).href,
  new URL('js/main.js', APP_SCOPE).href,
  new URL('manifest.json', APP_SCOPE).href
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (
    request.method !== 'GET' ||
    requestUrl.origin !== APP_SCOPE.origin ||
    !requestUrl.pathname.startsWith(APP_SCOPE.pathname)
  ) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.open(CACHE_NAME).then((cache) => cache.match(APP_INDEX)))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((cachedResponse) => cachedResponse || fetch(request))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName.startsWith(APP_CACHE_PREFIX) && cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
});
