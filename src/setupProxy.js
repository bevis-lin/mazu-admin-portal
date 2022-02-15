const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'https://api.testnet.sentimen.art/',
      changeOrigin: true,
    })
  );
};
