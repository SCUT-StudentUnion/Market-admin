const proxyConfig = {
  local: {
    "/api": {
      target: "http://localhost:8080",
      pathRewrite: { "^/api": "" },
      headers: {
        "X-Forwarded-Prefix": "/api"
      }
    }
  },
  remote: "https://market-staging.huww98.cn/api"
};

module.exports = {
  devServer: {
    host: "localhost",
    port: 8081,
    proxy: process.env.npm_config_localBackend
      ? proxyConfig.local
      : proxyConfig.remote
  }
};
