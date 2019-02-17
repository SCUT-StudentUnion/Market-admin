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
  remote: {
    "/api": {
      target: "https://market-staging.huww98.cn"
    }
  }
};

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/",
  devServer: {
    host: "localhost",
    port: 8081,
    proxy: process.env.npm_config_localBackend
      ? proxyConfig.local
      : proxyConfig.remote
  }
};
