const plugin = {
  gulp: require("gulp"),
  browserSync: require("browser-sync").create(),
  gulpMem: null,
};

const gulpMem = new (require("gulp-mem"))();
gulpMem.enableLog = false;
plugin.gulpMem = gulpMem;

module.exports = plugin;
