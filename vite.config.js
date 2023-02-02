import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa'


export default () => {
    
    return defineConfig({
        plugins: [react(), viteCompression(), 
            VitePWA({
                
                injectRegister: 'auto',
                workbox:{
                    globPatterns: [
                        '**/*.{json,ico,html,png,txt,css,js}'
                    ],
                    cleanupOutdatedCaches: true,
                    runtimeCaching: [
                        {
                            urlPattern: ({request, url}) => { 
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
                                return CacheNetworkFirstRoutes.includes(url.pathname)
                            },
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'api-cache',
                                expiration: {
                                    maxEntries: 25,
                                    maxAgeSeconds: 60 * 60 * 24 * 365,
                                },
                            }
                        },
                        {
                            urlPattern: ({request, url}) => {
                                const CacheFirstRoutes = [
                                    'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap',
                                ]
                                return CacheFirstRoutes.includes(url.pathname)
                            },
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'google-fonts',
                                expiration: {
                                    maxEntries: 25,
                                    maxAgeSeconds: 60 * 60 * 24 * 365,
                                },
                            },                       
                        },

                        // NetworkOnly
                        {
                            handler: 'NetworkOnly',
                            urlPattern: new RegExp(`/bitacora`),
                            method: 'POST',
                            options: {
                                backgroundSync: {
                                    name: 'bitacoraQueue',
                                    options: {
                                        maxRetentionTime: 24 * 60,
                                    },
                                },
                            },
                        },
                        {
                            handler: 'NetworkOnly',
                            urlPattern: new RegExp(`/vales`),
                            method: 'POST',
                            options: {
                                backgroundSync: {
                                    name: 'valesQueue',
                                    options: {
                                        maxRetentionTime: 24 * 60,
                                    },
                                },
                            },
                        }
                    ],
                    

                },
                
                manifest:{
                    name: 'Sistema de Control de Obra',
                    short_name: 'SCO',
                    description: 'Sistema de Control de Obra',
                    theme_color: '#ffffff',
                    icons: [
                        {
                            src: '/img/favicon/icon-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: '/img/favicon/icon-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable',
                        },
                    ],
                    start_url: '/',
                    display: 'standalone',
                    background_color: '#ffffff',

                }
                
        })],
        server: {
            port: process.env.VITE_PORT || 3000,
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
