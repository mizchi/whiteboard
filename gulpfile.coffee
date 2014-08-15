gulp        = require 'gulp'
rename      = require 'gulp-rename'
plumber     = require 'gulp-plumber'
concat      = require 'gulp-concat'
sass        = require 'gulp-ruby-sass'
bowerFiles  = require "main-bower-files"
source      = require 'vinyl-source-stream'
browserify  = require 'browserify'
browserSync = require 'browser-sync'

gulp.task 'server', ->
  browserSync
    server:
      baseDir: "./public"

gulp.task 'reload', ->
  browserSync.reload stream: true

gulp.task 'js', ->
  browserify
    entries: ['./app/initialize.coffee']
    extensions: ['.coffee','.jade', '.js']
  .transform 'coffeeify'
  .transform 'jadeify'
  .bundle()
  .pipe plumber()
  .pipe source 'whiteboard.js'
  .pipe gulp.dest 'public'

gulp.task 'vendor', ->
  gulp
    .src bowerFiles()
    .pipe plumber()
    .pipe concat('vendor.js')
    .pipe gulp.dest('./public')

gulp.task 'css', ->
  gulp
    .src './app/styles/*.scss'
    .pipe plumber()
    .pipe sass(sourcemap: true)
    .pipe gulp.dest './public'

gulp.task 'watch', ['build', 'server'], ->
  gulp.watch 'app/**/*.coffee', ['js', 'reload']
  gulp.watch 'app/**/*.jade', ['js', 'reload']
  gulp.watch 'app/styles/**/*.scss', ['css', 'reload']
  gulp.watch 'bower_components/**/*.js', ['vendor', 'reload']

gulp.task 'build', ['vendor', 'js', 'css']
gulp.task 'default', ['build']
