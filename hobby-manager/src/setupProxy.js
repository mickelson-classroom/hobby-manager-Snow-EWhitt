const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://whittakerxyz.duckdns.org:3007',
      changeOrigin: true,
    })
  );
};