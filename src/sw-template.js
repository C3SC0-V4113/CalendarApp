importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.loadModule("workbox-background-sync");

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const cacheNetworkFirst = ["/api/events", "/api/auth/renew"];

const cacheFirst = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
];

workbox.routing.registerRoute(({ request, url }) => {
  if (cacheNetworkFirst.includes(url.pathname)) {
    return true;
  }
}, new workbox.strategies.NetworkFirst());

workbox.routing.registerRoute(({ request, url }) => {
  if (cacheFirst.includes(url.href)) {
    return true;
  }
}, new workbox.strategies.CacheFirst());

// workbox.routing.registerRoute(
//   new RegExp("http://localhost:4000/api/events"),
//   new workbox.strategies.NetworkFirst({
//     maxAgeSeconds: 60, // Establece el tiempo máximo que se almacenará en caché antes de intentar la red nuevamente
//   })
// );

// workbox.routing.registerRoute(
//   new RegExp("http://localhost:4000/api/auth/renew"),
//   new workbox.strategies.NetworkFirst()
// );

/** Offline Post */

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
  "offlineQueue",
  {
    maxRetentionTime: 24 * 60,
  }
);

workbox.routing.registerRoute(
  new RegExp("http://localhost:4000/api/events"),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

/** Offline Put */
workbox.routing.registerRoute(
  new RegExp("http://localhost:4000/api/events/"),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "PUT"
);

/** Offline Delete */
workbox.routing.registerRoute(
  new RegExp("http://localhost:4000/api/events/"),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "DELETE"
);
