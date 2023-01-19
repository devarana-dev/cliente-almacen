import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    // rename the output file
    build: {
        outDir: "build",
        chunkSizeWarningLimit: 10000,
    }
  })
}
