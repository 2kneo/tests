var gulp = require('gulp'),
  sass = require('gulp-sass'),
  webserver = require('browser-sync'),
  del = require('del'),
  cache = require('gulp-cache'),
  imagemin = require('gulp-imagemin'),
  rigger = require('gulp-rigger'),
  jpegrecompress = require('imagemin-jpeg-recompress'),
  notify = require('gulp-notify'),
  pngquant = require('pngquant'),
  sourcemaps = require('gulp-sourcemaps'),
  sequence = require('gulp-sequence'),
  importCss = require('gulp-import-css'),
  babel = require('gulp-babel'),
  pxToRem = require('gulp-pxtorem'),
  cssNano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  terser = require('gulp-terser');

var path = {
  build: {
    html:      'build/',
    js:        'build/js/',
    css:       'build/css/',
    bootstrap: 'app/libs/bootstrap',
    img:       'build/images/',
    fonts:     'build/webfonts/',
  },
  src: {
    html:      'app/*.html',
    js:        'app/js/*.js',
    libsJs:    'app/libs/include.js',
    css:       'app/css/main.scss',
    bootstrap: 'app/libs/bootstrap/bootstrap.scss',
    libsCss:   'app/libs/include.css',
    sass:      'app/sass/*.scss',
    img:       'app/images/**/*.*',
    fonts:     'app/webfonts/**/*.*',
  },
  watch: {
    html:      'app/**/*.html',
    js:        'app/js/*.js',
    libsJs:    'app/libs/include.js',
    css:       'app/sass/*.scss',
    bootstrap: 'app/libs/bootstrap/*.scss',
    libsCss:   'app/libs/include.css',
    img:       'app/images/**/*.*',
    fonts:     'app/webfonts/**/*.*',
    libs:      'app/libs/**/*.*',
  },
  clean:       './build'
};

var config = {
  server: {
    baseDir: './build'
  },
  notify: false
};

var variablesPxToRem = {
  propList: [
    'width',
    'min-width',
    'max-width',
    'height',
    'min-height',
    'max-height',
    'font',
    'font-size',
    'line-height',
    'letter-spacing',
    'border',
    'border-width',
    'top',
    'right',
    'bottom',
    'left',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'border-radius',
    '-moz-border-radius',
    '-webkit-border-radius',
    'box-shadow',
    '-moz-box-shadow',
    '-webkit-box-shadow',
    'text-shadow',
    '-moz-text-shadow',
    '-webkit-text-shadow',
  ]
}


gulp.task('webserver', function () {
  webserver(config);
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(webserver.reload({stream: true}));
});

gulp.task('libs:build', function(){
  return gulp.src(path.src.libsCss)
    .pipe(rename({suffix:".min"}))
    .pipe(importCss())
    .pipe(cssNano())
    .pipe(gulp.dest(path.build.css))
    .pipe(webserver.reload({stream: true}));
});

gulp.task('bootstrap:build', function () {
  return gulp.src(path.src.bootstrap)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError({
      message: "<%= error.message %>",
      title  : "Sass Error!"
    })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.css))
    .pipe(webserver.reload({stream: true})); // перезагрузим сервер
});

gulp.task('css:build',function(){
  return gulp.src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError({
      message: "<%= error.message %>",
      title  : "Sass Error!"
    })))
    .pipe(pxToRem(variablesPxToRem))
    .pipe(cssNano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.css))
    .pipe(webserver.reload({stream: true}));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('PxToRem', function() {
  gulp.src('build/css/style.css')
    .pipe(pxToRem(variablesPxToRem))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('libs-script:build', function(){
  return gulp.src(path.src.libsJs)
    .pipe(sourcemaps.init())
    .pipe(rigger())
    .pipe(babel())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.js))
    .pipe(webserver.reload({stream: true}))
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.js))
    .pipe(webserver.reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({plugins: [{removeViewBox: false}]})
    ])))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('clean:build', function () {
  del.sync(path.clean);
});

gulp.task('cache:clear', function () {
  cache.clearAll();
});

gulp.task('build', [
  'clean:build',
  'html:build',
  'js:build',
  'libs-script:build',
  'libs:build',
  'css:build',
  'bootstrap:build',
  'fonts:build',
  'image:build',
]);

gulp.task('watch', function() {
  gulp.watch(path.watch.html, ['html:build']);
  gulp.watch(path.watch.html, ['libs:build']);
  gulp.watch(path.watch.js, ['js:build']);
  gulp.watch(path.watch.js, ['libs-script:build']);
  gulp.watch(path.watch.css, ['css:build']);
  gulp.watch(path.watch.bootstrap, ['bootstrap:build']);
  gulp.watch(path.watch.img, ['image:build']);
  gulp.watch(path.watch.fonts, ['fonts:build']);
  gulp.watch(path.watch.libs, ['libs:build']);
});

gulp.task('default', function (){
  sequence('clean:build','build','webserver','watch',function(){})
});