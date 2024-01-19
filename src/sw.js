import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";

import { clientsClaim } from "workbox-core";

import { NavigationRoute, registerRoute } from "workbox-routing";

cleanupOutdatedCaches();
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), {
    denylist: [/^\/backoffice/],
  })
);

self.skipWaiting();
clientsClaim();

self.addEventListener("install", async (event) => {
  const cache = await caches.open("cache-1");

  await cache.addAll([
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
    "/vite.svg",
  ]);
});

/** http://localhost:4000/api/events */

self.addEventListener("fetch", (event) => {
  /** http://localhost:4000/api/auth/renew */
  if (
    event.request.url !== "http://localhost:4000/api/auth/renew" &&
    event.request.url !== "http://localhost:4000/api/events"
  )
    return;

  const resp = fetch(event.request)
    .then((response) => {
      if (!response) {
        return caches.match(event.request);
      }

      /** Guardar respuesta en cache */
      caches.open("cache-dynamic").then((cache) => {
        cache.put(event.request, response);
      });

      return response.clone();
    })
    .catch((err) => {
      console.log("offline response");
      return caches.match(event.request);
    });

  event.respondWith(resp);
});
