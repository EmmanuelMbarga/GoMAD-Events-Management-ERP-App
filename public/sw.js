self.addEventListener("install", (event) => {
  console.log("Service worker installed");
});

self.addEventListener("fetch", (event) => {
  // Skip intercepting requests to localhost
  if (!event.request.url.startsWith("http://localhost")) {
    console.log("Fetch intercepted for:", event.request.url);
    event.respondWith(fetch(event.request));
  }
});
