import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Proxy API requests to the real horoscope API
app.use('/api', createProxyMiddleware({
  target: 'https://horoscope-app-api.vercel.app/api/v1',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding to target
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err.message);
    res.status(500).json({ error: 'API proxy error', message: err.message });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔗 Proxying: ${req.method} ${req.url} -> ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
  }
}));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Cosmic Compass is running on port ${port}`);
  console.log(`📡 Server started at: ${new Date().toISOString()}`);
  console.log(`🔮 API proxy: /api/* -> https://horoscope-app-api.vercel.app/api/v1/*`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
}); 