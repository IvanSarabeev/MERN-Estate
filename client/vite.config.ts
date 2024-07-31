import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path'

const rootPath = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.relative(__dirname, "./src"),
      "lib": resolve(rootPath, "./lib"),
      "api": resolve(rootPath, "./api"),
      "auth": resolve(rootPath, "auth"),
      "components": resolve(rootPath, "components"),
      "constants": resolve(rootPath, "constants"),
      "hooks": resolve(rootPath, "hooks"),
      "pages": resolve(rootPath, "pages"),
      "assets": resolve(rootPath, "assets"),
      "types": resolve(rootPath, "types"),
      "utils": resolve(rootPath, "utils"),
      "store": resolve(rootPath, "store"),
      "services": resolve(rootPath, "services"),
    }
  }
})
