/**
 * Created by ycb on 2018/12/7.
 */

const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    open: false,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: "3701",
    proxy: {
      "": {
        // target: "http://192.168.100.161:8080", //测试环境
        target: "http://testm.chapaiming.com", //预发环境
        // target: "https://m.chapaiming.com", //正式环境
        changeOrigin: true,
        ws: false
      }
    }
  },
  css: {
    sourceMap: false,
    modules: false,
    loaderOptions: {
      less: {
        modifyVars: {
          // Button
          "button-large-height": "40px",
          "button-large-line-height": "40px",
          "button-primary-background-color": "#FD4C72",
          "button-primary-border-color": "#FD4C72",
          // "button-border-radius": "6px",
          // NavBar
          "nav-bar-icon-color": "#fff",
          "nav-bar-title-text-color": "#fff",
          "nav-bar-background-color": "#393a3d",
          // tab
          "tabs-bottom-bar-color": "#FD4C72"
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    config.resolve.alias
      .set("@", resolve("src"))
      .set("api", resolve("src/api"))
      .set("config", resolve("src/config"))
      .set("assets", resolve("src/assets"))
      .set("utils", resolve("src/utils"));
  }
};
