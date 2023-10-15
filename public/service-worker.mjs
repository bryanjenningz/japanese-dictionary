/// <reference lib="webworker" />

const self = /** @type {ServiceWorkerGlobalScope} */ (
  /** @type {unknown} */ (globalThis.self)
);

const CACHE_NAME = "cache";
const PAGES_CACHE_NAME = "pages";
const PAGES = [
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
      const cache = await caches.open(PAGES_CACHE_NAME);
      await cache.addAll(PAGES);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.delete(CACHE_NAME));
});

/** @param {FetchEvent} event */
async function fetchAndCacheResponse(event) {
  const cache = await caches.open(CACHE_NAME);
  await cache.add(event.request.url);
  return /** @type {Promise<Response>} */ (cache.match(event.request.url));
}

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request.url, {
        ignoreSearch: true,
      });
      if (!cachedResponse) {
        return fetchAndCacheResponse(event);
      }
      void fetchAndCacheResponse(event);
      return cachedResponse;
    })()
  );
});
