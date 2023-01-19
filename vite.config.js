import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from 'vite-plugin-compression';
import dynamicImport from 'vite-plugin-dynamic-import'

const exceljsChunk = chunk => `exceljs/chunks/${chunk}.js`;
const dynamicImportFunction = specifier => `import('./${exceljsChunk(specifier)}').then(exceljsChunk${specifier} => exceljsChunk${specifier}.default)`;

export default () => {
  return defineConfig({
    plugins: [react(), viteCompression(), dynamicImport({
        dynamicImportFunction,
    })],
    server: {
        port: 3000,
    },
    build: {
        outDir: "build",
        chunkSizeWarningLimit: 10000,
        // Optimization
        brotliSize: false,
        rollupOptions: {
            output: {            
                manualChunks: {
                    "react-dropzone": ["react-dropzone"],
                    "exceljs": ["exceljs"],
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
