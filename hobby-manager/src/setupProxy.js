const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'https://100.68.122.57:3007',
      target: 'https://whittakerxyz.duckdns.org:3007',
      changeOrigin: true,
    })
  );
};