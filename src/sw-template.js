import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  new RegExp(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
  ),
  new CacheFirst()
);

registerRoute(
  new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  ),
  new CacheFirst()
);

registerRoute(
  new RegExp("http://localhost:4000/api/events"),
  new NetworkFirst({
    maxAgeSeconds: 60, // Establece el tiempo máximo que se almacenará en caché antes de intentar la red nuevamente
  })
);

registerRoute(
  new RegExp("http://localhost:4000/api/auth/renew"),
  new NetworkFirst()
);
