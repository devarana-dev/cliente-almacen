import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst, NetworkOnly } from 'workbox-strategies'
import { BackgroundSyncPlugin } from 'workbox-background-sync'

precacheAndRoute(self.__WB_MANIFEST)

const bgSyncPlugin = new BackgroundSyncPlugin('bitacoraQueue', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
})


// app works on refresh
self.addEventListener('fetch', (event) => {
    if (event.request.method === 'POST') {
        event.respondWith(
            fetch(event.request).catch((err) => {
                return new Response(
                    JSON.stringify({
                        error: 'No internet connection found. App is running in offline mode.'
                    })
                )
            })
        )
    }
})


const CacheNetworkFirstRoutes = [
    '/api/login/validate',
    '/api/auth/login',    
    '/api/permisos/usuario',
    '/api/bitacora',
    '/api/obras',
    '/api/niveles',
    '/api/personal',
    '/api/usuarios',
    '/api/actividades',
]

const CacheFirstRoutes = [
    'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap'
]

registerRoute(
    ({request, url}) => { 
        if( CacheNetworkFirstRoutes.includes(url.pathname) ) return true
        return false
    }
    , new NetworkFirst()
)

registerRoute(
    ({request, url}) => {
        if( CacheFirstRoutes.includes(url.href) ) return true
        return false
    }
    , new CacheFirst()
)

registerRoute(
    new RegExp('http://localhost:5000/api/bitacora'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
)
registerRoute(
    new RegExp('http://localhost:5000/api/actividades'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
)