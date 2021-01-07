const gulp = require("gulp");
const nunjucks = require("gulp-nunjucks");
const livereload = require("gulp-livereload");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const del = require("del");

sass.compiler = require("node-sass");

const PATHS = {
  nunjucks: "src/views/**/*.html",
  scss: ["src/assets/css/**/*.s(c|a)ss", "src/assets/css/**/*.css"],
  dist: "./dist",
};

gulp.task("compile:nunjucks", () => {
  return (
    gulp
      // Compile tous les fichiers ayant une extension .html
      // sauf ceux dont le nom commence par "_"
      .src([PATHS.nunjucks, "!src/views/**/_*.html"])
      .pipe(nunjucks.compile())
      .pipe(gulp.dest(PATHS.dist))
      .pipe(livereload())
      .pipe(browserSync.stream())
  );
});

gulp.task("compile:sass", function () {
  return gulp
    .src([...PATHS.scss, "!src/assets/css/**/_*.(s)(c|a)ss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(`${PATHS.dist}/assets/css`))
    .pipe(livereload())
    .pipe(browserSync.stream());
});

gulp.task("clean", () => {
  return del(["./dist/*/"]);
});

gulp.task("serve", () => {
  gulp.series("clean")();
  gulp.parallel(["compile:nunjucks", "compile:sass"])();

  const PORT = 3001;
  browserSync.init({
    server: {
      baseDir: PATHS.dist,
    },
    port: PORT,
  });
  browserSync.notify("Compiling, please wait!");
  livereload.listen({ basePath: PATHS.dist, host: PORT });
  gulp.watch(
    [PATHS.nunjucks, ...PATHS.scss],
    gulp.parallel(["compile:nunjucks", "compile:sass"])
  );
});

exports.default = "Hello";
