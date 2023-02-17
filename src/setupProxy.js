const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/article", {
      target: "http://www.rj97807.work:8082",
      // target: "http://localhost:8888",
      changeOrigin: true,
      pathRewrite: { "^/article": "" },
    })
  );
};
