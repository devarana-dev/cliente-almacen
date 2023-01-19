import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    plugins: [react()],
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
                    "react-dom": ["react-dom"],
                    "react": ["react"],
                    "react-router-dom": ["react-router-dom"],
                    "react-router": ["react-router"],
                    "react-redux": ["react-redux"],
                    "redux": ["redux"],
                    "redux-thunk": ["redux-thunk"],
                    "axios": ["axios"],
                    "moment": ["moment"],
                    "antd": ["antd"],
                    "chart.js": ["chart.js"],
                    "react-chartjs-2": ["react-chartjs-2"],
                    "nanoid": ["nanoid"],
                    "animate.css": ["animate.css"],
                    "react-dropzone": ["react-dropzone"],
                    "react-icons": ["react-icons"],
                    "icons": ["@ant-design/icons"],
                },
            },
        },

    }
  })
}
