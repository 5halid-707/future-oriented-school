// Service Worker for Future-Oriented Kindergarten PWA
// Provides offline support and fast loading via caching

const CACHE_NAME = "kindergarten-v1";
const STATIC_ASSETS = [
  "/",
  "/school-logo.jpeg",
  "/kindergarten-display.jpg",
  "/manifest.json",
  "/favicon.svg",
];

// Install: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip API requests (always fetch from network)
  if (event.request.url.includes("/api/")) {
    return;
  }

  // Skip cross-origin requests (Unsplash images, Google Maps)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Return cached if available, otherwise fetch from network
      const fetchPromise = fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => cached); // Fallback to cache if network fails
      return cached || fetchPromise;
    })
  );
});

// Allow page to be controlled by service worker immediately
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
