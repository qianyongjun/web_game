/***********通过gulp载入外挂转义生成文件******************/
var gulp = require('gulp'),
    clean = require('gulp-clean'),/*文件清理*/
    notify = require('gulp-notify'),
/*    autoprefixer = require('gulp-autoprefixer'),*/
    browserSync = require('browser-sync'),/*即使刷新*/
    runSequence = require('run-sequence'),
    stylus = require('gulp-stylus'),
    cache = require('gulp-cache')



/***************** configuration *****************/
 /*定义刷新来源文件*/
var serveConfig = {
    files: [
        'src/*.html',
        'src/css/*.css',
        'src/js/**/*.js',
        'src/js/**/*.json',
        'src/images/**/*.png',
        'src/images/**/*.jpg'
    ],
    server: {
        baseDir: 'src/'
    }
};

gulp.task('browser-sync', function () {
    browserSync(serveConfig);
});



/*****************编译Sass，Autoprefix及缩小化**********/
/**gulp.task('styles', function() {
  return sass('src/sass/',{style:'expanded'})/**定义来源档案**/
/*    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))*/
    /**.pipe(gulp.dest('src/dist/css'))/*gulp.destAPI设定目的路径*/
    /**.pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('src/dist/css'))
    .pipe(notify({ message: 'styles task complete' }));
});
gulp.task('default', ['styles', 'watch']);**/


/****************************编译stylus**************************/
gulp.task('cssCompile', function(){
  return gulp.src(['src/stylus/*'])
  .pipe(stylus({
    compress: false,
        linenos: true
  }))
  .pipe(gulp.dest('src/css'))
/*  .pipe(rename({suffix:'.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('src/dist/css'))*/
  .pipe(notify({message:'styles task complete'}))
});

/**************************images***************************/
gulp.task('images',function(){
  return gulp.src(['src/images/*'])
  .pipe(gulp.dest('src/img'))
})


/*****************清除目的目录重建档案**********/
gulp.task('clean', function() {
  return gulp.src([/*'src/css'*//*'src/dist/js'*/], {read: false})
    .pipe(clean());
});

/****************** 监测文档 *************************/
gulp.task('watch', function() {
  // 看守所有.less档
  gulp.watch('src/stylus/**/*.styl', ['cssCompile']);
  // 看守所有图片档
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/i*.html', ['html']);
});

/******************  task  *********************/
gulp.task('default',function(){
    runSequence('clean','browser-sync','cssCompile','watch')
});  //顺序尽量和watch一致，且要html在css前
