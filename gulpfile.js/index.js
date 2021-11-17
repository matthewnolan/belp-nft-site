const config = require("./config");
const plugin = require("./plugin");

const { sassCompile, sassWatch } = require("./tasks/sass");

const { jsTranspile, jsWatch } = require("./tasks/js");

const serve = require("./tasks/serve");

exports.default = plugin.gulp.series(
  sassWatch,
  sassCompile,
  jsWatch,
  jsTranspile,
  serve
);
exports.build = plugin.gulp.series(sassCompile, jsTranspile);
