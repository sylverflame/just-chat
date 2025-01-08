import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Exposes the app on the network (0.0.0.0)
    port: 5173, // Specify the port if necessary
  },
  build: {
    sourcemap: false, // Disable source maps
    outDir: 'dist', // Optional: Specify the output directory for build files
  },

})
