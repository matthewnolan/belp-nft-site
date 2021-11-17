const config = require("../config");
const plugin = require("../plugin");

/** -----------------------------------
 * require
 */
const webpack = require("webpack");
const configDev = require("../webpack/webpack-dev.config");
const configProd = require("../webpack/webpack-prod.config");
const configShowConsole = require("../webpack/webpack-showConsole.config");
const compileDev = webpack(configDev);
compileDev.outputFileSystem = plugin.gulpMem.fs;
const compileProd = webpack(configProd);
const compileShowConsole = webpack(configShowConsole);
const jsTranspile = () => {
  return Promise.all([
    new Promise((resolve) => {
      if (process.env.NODE_ENV !== "development") {
        return resolve();
      }
      compileDev.run((err, stats) => {
        if (err) throw err;
        if (stats) {
          console.log(
            stats.toString({
              colors: true,
              modules: false,
              errors: true,
              assets: false,
            })
          );
        }
        resolve(stats);
      });
    }).finally((result) => Promise.resolve(result)),
    new Promise((resolve) => {
      if (process.env.NODE_ENV !== "showConsole") {
        return resolve();
      }
      compileShowConsole.run((err, stats) => {
        console.log("\nShow Console build");
        console.log("--------------------------------------");
        if (err) throw err;
        if (stats) {
          console.log(
            stats.toString({
              colors: true,
              modules: false,
              errors: true,
              assets: false,
            })
          );
        }
        resolve(stats);
      });
    }).finally((result) => Promise.resolve(result)),
    new Promise((resolve) => {
      if (process.env.NODE_ENV === "showConsole") {
        return resolve();
      }
      compileProd.run((err, stats) => {
        console.log("\nproduction build");
        console.log("--------------------------------------");
        if (err) throw err;
        if (stats) {
          console.log(
            stats.toString({
              colors: true,
              modules: false,
              errors: true,
              assets: false,
            })
          );
        }
        resolve(stats);
      });
    }).finally((result) => Promise.resolve(result)),
  ]).then(() => {
    plugin.browserSync.reload();
  });
};

const jsWatch = (cb) => {
  plugin.gulp.watch([config.scripts.src], jsTranspile);
  cb();
};

exports.jsTranspile = jsTranspile;
exports.jsWatch = jsWatch;
