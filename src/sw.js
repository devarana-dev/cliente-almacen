// import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
// import { registerRoute } from 'workbox-routing'
// import { NetworkFirst, CacheFirst } from 'workbox-strategies'


self.importScripts('workbox-precaching.js', 'workbox-routing.js', 'workbox-strategies.js');
const { precacheAndRoute, cleanupOutdatedCaches } = self.workbox.precaching;
const { registerRoute } = self.workbox.routing;
const { NetworkFirst, CacheFirst } = self.workbox.strategies;

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

console.log('Hello from Workbox!');


const cacheNetworkFirst = [
    '/api/login/validate',
    '/api/auth/login',    
    '/api/permisos/usuario',
    '/api/bitacora',
]

registerRoute(
    ({ request, url }) => {

        console.log(url.href);

        if(cacheNetworkFirst.some(path => new RegExp(path).test(url.href))) return true

        return false;
    },
    new NetworkFirst()
)

const cacheFirst = [
    'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap',
]

registerRoute(
    ({ request, url }) => {

        if(cacheFirst.includes(url.href)) return true

        return false;
    },
    new CacheFirst()
)