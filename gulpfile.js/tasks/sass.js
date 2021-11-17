const config = require("../config");
const plugin = require("../plugin");

const cached = require("gulp-cached");
const progeny = require("gulp-progeny");
const filter = require("gulp-filter");
const sass = require("gulp-sass");
const packageImporter = require("node-sass-package-importer");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const objectFitImages = require("postcss-object-fit-images");
const cssnano = require("cssnano");
const through = require("through2");

const sassCompile = () => {
  return plugin.gulp
    .src([config.styles.src])
    .pipe(
      cached("scss", {
        optimizeMemory: true,
      })
    )
    .pipe(progeny())
    .pipe(filter([config.styles.src]))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        importer: packageImporter({
          extensions: [".scss", ".css"],
        }),
      })
    )
    .pipe(
      postcss([
        autoprefixer({
          grid: "autoplace",
        }),
        objectFitImages(),
        cssnano(),
      ])
    )
    .pipe(plugin.gulp.dest(config.styles.dest))
    .pipe(sourcemaps.write({ sourceRoot: "/" }))
    .pipe(plugin.gulpMem.dest("."))
    .pipe(
      through.obj(function (file, enc, cb) {
        console.log(file.path);
        this.push(file);
        cb();
      })
    )
    .pipe(plugin.browserSync.stream());
};

const sassWatch = (cb) => {
  plugin.gulp.watch([config.styles.src], sassCompile);
  cb();
};

exports.sassCompile = sassCompile;
exports.sassWatch = sassWatch;
