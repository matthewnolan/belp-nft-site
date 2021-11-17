const srcBase = "src";
const destBase = "htdocs";
//
module.exports = {
  styles: {
    base: srcBase,
    src: srcBase + "/**/*.scss",
    dest: destBase,
  },
  scripts: {
    base: srcBase,
    src: srcBase + "/**/*.js",
    ignore: [srcBase + "/**/_*.js", srcBase + "/**/_modules/**/*.js"],
    dest: destBase,
  },
  browserSync: {
    base: destBase,
    start: "/",
    open: "local",
    notify: true,
    watch: [
      destBase + "/**/*.html",
      destBase + "/**/*.jpg",
      destBase + "/**/*.png",
      destBase + "/**/*.gif",
    ],
  },
};
