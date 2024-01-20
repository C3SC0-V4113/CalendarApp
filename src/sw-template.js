importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
  new RegExp(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
  ),
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  ),
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  new RegExp("http://localhost:4000/api/events"),
  new workbox.strategies.NetworkFirst({
    cacheName: "events-calendar-cache",
  })
);

workbox.routing.registerRoute(
  new RegExp("http://localhost:4000/api/auth/renew"),
  new workbox.strategies.NetworkFirst()
);
