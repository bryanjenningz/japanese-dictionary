/// <reference lib="webworker" />

const self = /** @type {ServiceWorkerGlobalScope} */ (
  /** @type {unknown} */ (globalThis.self)
);

// Static cache is cached at install time, dynamic cache is cached on each request
const DYNAMIC_CACHE = "dynamic-cache";
const STATIC_CACHE = "static-cache";

const precachedPages = [
  "/",
  "/clip-reader-history",
  "/clip-reader",
  "/flashcard-test",
  "/history",
  "/new-flashcard-test",
  "/settings",
  "/word",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(precachedPages);
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.delete(DYNAMIC_CACHE));
});

/** @param {string} url */
async function getFromCache(url) {
  // Try dynamic cache first since that's more up to date
  const dynamicCache = await caches.open(DYNAMIC_CACHE);
  const dynamicCacheResponse = await dynamicCache.match(url, {
    ignoreSearch: true,
  });
  if (dynamicCacheResponse) {
    return dynamicCacheResponse;
  }

  // Fallback to static cache
  const staticCache = await caches.open(STATIC_CACHE);
  const staticCacheResponse = await staticCache.match(url, {
    ignoreSearch: true,
  });
  return staticCacheResponse;
}

/** @param {string} url */
async function fetchAndSaveToDynamicCache(url) {
  const cache = await caches.open(DYNAMIC_CACHE);
  await cache.add(url);
  return /** @type {Promise<Response>} */ (cache.match(url));
}

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const { url } = event.request;
      const cachedResponse = await getFromCache(url);
      if (!cachedResponse) {
        return fetchAndSaveToDynamicCache(url);
      }
      void fetchAndSaveToDynamicCache(url);
      return cachedResponse;
    })(),
  );
});
