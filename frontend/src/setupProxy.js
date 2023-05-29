const {createProxyMiddleware} = require('http-proxy-middleware');

// Creating a proxy due to complications with other methods
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8000/',
      changeOrigin: true,
    }),
  );
};

