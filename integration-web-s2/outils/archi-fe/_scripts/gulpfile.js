const gulp = require('gulp')
const nunjucks = require('gulp-nunjucks')
const livereload = require('gulp-livereload')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const del = require('del')
const cleanCSS = require('gulp-clean-css')
const argv = require('minimist')(process.argv.slice(2))
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')

sass.compiler = require('sass')

const PATHS = {
  nunjucks: 'src/views/**/*.html',
  scss: ['src/assets/css/**/*.{scss,.sass}', 'src/assets/css/**/*.css'],
  images: 'src/assets/images/**/*',
  assets: 'src/assets/**',
  favicons: 'src/favicons/**',
  dist: 'dist',
  build: 'build',
}

const startTasks = [
  'compile:nunjucks',
  'compile:sass',
  'copy:imgs',
  'copy:assets',
  'copy:favicons',
]

gulp.task('compile:nunjucks', () => {
  return (
    gulp
      // Compile tous les fichiers ayant une extension .html
      // sauf ceux dont le nom commence par "_"
      .src([
        PATHS.nunjucks,
        '!src/views/**/_*.html',
        '!src/views/layouts/**',
        '!src/views/partials/**',
      ])
      .pipe(nunjucks.compile())
      // Déplace ces fichiers vers le dossier défini dans la variable "PATHS.dist"
      .pipe(gulp.dest(PATHS.dist))
      .pipe(livereload())
      .pipe(browserSync.stream())
  )
})

gulp.task('compile:sass', function () {
  return (
    gulp
      // Compile tous les fichiers ayant une extension .scss, .sass ou .css
      // sauf ceux dont le nom commence par "_"
      .src([...PATHS.scss, '!src/assets/css/**/_*.{scss,.sass}'])
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${PATHS.dist}/assets/css`))
      .pipe(livereload())
      .pipe(browserSync.stream())
  )
})

gulp.task('minify:css', () => {
  return gulp
    .src(`${PATHS.dist}/**/*.css`)
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(
          `Taille originale ${details.name}: ${details.stats.originalSize}kb`
        )
        console.log(
          `Taille minifiée ${details.name}: ${details.stats.minifiedSize}kb`
        )
      })
    )
    .pipe(gulp.dest(`${PATHS.build}`))
})

gulp.task('copy:html', () => {
  return gulp.src([`${PATHS.dist}/**/*.html`]).pipe(gulp.dest(PATHS.build))
})

gulp.task('copy:imgs', async () => {
  const folder = argv.env === 'prod' ? PATHS.build : PATHS.dist
  return gulp
    .src(PATHS.images)
    .pipe(imagemin())
    .pipe(gulp.dest(`${folder}/assets/images`))
})

gulp.task('copy:favicons', async () => {
  const folder = argv.env === 'prod' ? PATHS.build : PATHS.dist
  return gulp.src(PATHS.favicons).pipe(gulp.dest(`${folder}`))
})

gulp.task('copy:assets', async () => {
  const folder = argv.env === 'prod' ? PATHS.build : PATHS.dist

  return gulp
    .src(['src/assets/**/*', '!src/assets/**/*.scss'], { nodir: true })
    .pipe(gulp.dest(`${folder}/assets`))
})

gulp.task('build', async () => {
  return gulp.series(
    'clean',
    ...startTasks,
    gulp.parallel(['copy:html', 'minify:css', 'copy:imgs', 'copy:assets'])
  )()
})

gulp.task('build:start', async () => {
  return gulp.series(['clean'], gulp.parallel(...startTasks))()
})

gulp.task('clean', async () => {
  const folder = argv.env === 'prod' ? PATHS.build : PATHS.dist
  return del([folder], { force: true })
})

gulp.task('serve', async () => {
  const PORT = 3001
  browserSync.init({
    server: {
      baseDir: PATHS.dist,
    },
    port: PORT,
  })
  browserSync.notify('Compiling, please wait!')
  livereload.listen({ basePath: PATHS.dist, host: PORT })
})

gulp.task('watch', () => {
  gulp.watch([PATHS.nunjucks, ...PATHS.scss], gulp.parallel(startTasks))
})

exports.default = gulp.series('build:start', 'serve', 'watch')
