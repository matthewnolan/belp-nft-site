const config = require("../config");
const plugin = require("../plugin");

const fs = require("fs");

const serve = (cb) => {
  plugin.browserSync.init({
    server: {
      baseDir: config.browserSync.base,
    },
    middleware: [plugin.gulpMem.middleware],
    ghostMode: false,
    startPath: config.browserSync.start,
    notify: config.browserSync.notify,
    open: config.browserSync.open,
    rewriteRules: [
      {
        match: /<!--#include virtual="(.+)" -->/g,
        fn: (req, res, match, filename) =>
          fs.statSync(`${config.browserSync.base}${filename}`)
            ? fs.readFileSync(`${config.browserSync.base}${filename}`, "utf-8")
            : "",
      },
    ],
  });
  console.log("#### Server was launched ###");
  plugin.gulp
    .watch(config.browserSync.watch)
    .on("change", plugin.browserSync.reload);
  cb();
};

module.exports = serve;
