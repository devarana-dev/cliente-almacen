const networlUrl = [
    '/api/login/validate',
    '/api/auth/login',    
    '/api/permisos/usuario',
    '/api/bitacora',
];

const cachedRoutes = [];


networlUrl.map((url) => {

    cachedRoutes.push({
        // urlPattern: url,
        urlPattern: new RegExp(url),
        handler: 'NetworkFirst',
        options: {
            cacheName: 'api-cache',
            expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
            }
        }
    });
});



// cacheFirst

const cacheUrl = [
    'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap',
]

cacheUrl.map((url) => {
    
        cachedRoutes.push({
            urlPattern: new RegExp(url),
            handler: 'CacheFirst',
            options: {
                cacheName: 'google-fonts-stylesheets',
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24, // 24 hours
                }
            }
        });
    });

export default cachedRoutes