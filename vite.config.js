import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa'



export default () => {
    const cacheNetworkFirst = [
        '/api/login/validate',
        '/api/auth/login',    
        '/api/permisos/usuario',
        '/api/bitacora',
    ]

    return defineConfig({
        plugins: [react(), viteCompression(), 
            VitePWA({
                injectRegister: 'auto',
                workbox:{
                    globPatterns: [
                        '**/*.{json,ico,html,png,txt,css,js}'
                    ],
                    runtimeCaching: [
                        {
                            // Routing via a matchCallback function:
                            urlPattern: ({request, url}) => { 
                                console.log(url.pathname);
                                return cacheNetworkFirst.includes(url.pathname)
                            },
                            handler: 'NetworkFirst',
                        },
                        {
                            // cacheFirst https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap
                            urlPattern: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap',
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'google-fonts',
                                expiration: {
                                    maxEntries: 10,
                                    maxAgeSeconds: 60 * 60 * 24 * 365,
                                },
                            },                       
                        }
                    ]
                    
                },          
                
        })],
        server: {
            port: 3000,
        },
        build: {
            outDir: "build",
            chunkSizeWarningLimit: 10000,
            rollupOptions: {
                output: {            
                    manualChunks: {
                        "react-dropzone": ["react-dropzone"],
                        // "exceljs": ["exceljs"],
                        "moment": ["moment"],
                        "react-dom": ["react-dom"],
                        "chart.js": ["chart.js"],
                        "antd": ["antd"],
                    },
                },
            },
        }
    })
}
