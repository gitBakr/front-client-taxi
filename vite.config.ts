import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    cors: {
      origin: "*",
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          // Ne pas modifier le chemin, garder /api
          const newPath = path;
          console.log('🔄 Proxy URL:', {
            original: path,
            rewritten: newPath,
            fullUrl: `http://localhost:3002${newPath}`
          });
          return newPath;
        },
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            const fullUrl = `${req.protocol}://${req.headers.host}${req.url}`;
            console.log('🚀 Requête envoyée:', {
              from: fullUrl,
              to: `http://localhost:3002${proxyReq.path}`,
              method: req.method,
              query: req.query
            });
          });

          proxy.on('proxyRes', (proxyRes, req, _res) => {
            let body = '';
            proxyRes.on('data', chunk => {
              body += chunk;
            });
            proxyRes.on('end', () => {
              try {
                const data = JSON.parse(body);
                console.log('📥 Réponse reçue:', {
                  status: proxyRes.statusCode,
                  url: req.url,
                  data,
                  headers: proxyRes.headers
                });
              } catch (e) {
                console.error('❌ Erreur parsing réponse:', {
                  body,
                  error: e
                });
              }
            });
          });
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
