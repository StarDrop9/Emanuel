const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // This is the endpoint you will use in your app
    createProxyMiddleware({
      target: "https://api.elevenlabs.io", // The API you want to proxy
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/v1/text-to-speech", // Rewrite the path
      },
    })
  );
};
