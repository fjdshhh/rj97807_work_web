const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/article", {
      target: "http://www.rj97807.work:8082",
      // target: "http://localhost:8888",
      changeOrigin: true,
    }),
    // proxy.createProxyMiddleware("/wsClient", {
    //   target: "ws://www.rj97807.work",
    //   changeOrigin: true,
    //   ws: true,
    //   pathRewrite: {
    //     "^/wsClient": "^/ws",
    //   },
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // })
  );
};
