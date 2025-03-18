import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

// Fix for __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../backend/build'), // Output folder set to backend/public
    emptyOutDir: true, // Clears previous build files
  },
  server: {
    https: {
      key: '../localhost+1-key.pem', // Path to your private key
      cert: '../localhost+1.pem', // Path to your certificate
    }
  },
})
