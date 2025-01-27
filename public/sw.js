const CACHE_NAME = "gomad-cache-v1";
const urlsToCache = ["/", "/manifest.json", "/logo.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith("http://localhost")) {
    event.respondWith(
      (async () => {
        try {
          // Try to get from cache first
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;

          // If not in cache, try network
          try {
            const networkResponse = await fetch(event.request);

            // Check if the request was aborted
            if (event.request.signal?.aborted) {
              return new Response("Request was aborted", { status: 499 });
            }

            // Cache the response if it's valid
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === "basic"
            ) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(event.request, networkResponse.clone());
            }

            return networkResponse;
          } catch (error) {
            // Handle abort error specifically
            if (error.name === "AbortError") {
              console.log("Request was aborted:", event.request.url);
              return new Response("Request was aborted", { status: 499 });
            }
            throw error;
          }
        } catch (error) {
          console.error("Fetch handler error:", error);
          // Return cached version if available, otherwise return error response
          const cachedResponse = await caches.match(event.request);
          return (
            cachedResponse || new Response("Network error", { status: 500 })
          );
        }
      })()
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
