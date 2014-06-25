gulp       = require 'gulp'
rename     = require 'gulp-rename'
plumber    = require 'gulp-plumber'
concat     = require 'gulp-concat'
sass       = require 'gulp-sass'
bowerFiles = require "gulp-bower-files"
source     = require 'vinyl-source-stream'
browserify = require 'browserify'

gulp.task 'js', ->
  browserify
    entries: ['./app/initialize.coffee']
    extensions: ['.coffee','.jade', '.js']
  .transform 'coffeeify'
  .transform 'jadeify'
  .bundle()
  .pipe plumber()
  .pipe source 'app.js'
  .pipe gulp.dest 'public'

gulp.task 'vendor', ->
  bowerFiles()
    .pipe plumber()
    .pipe concat('vendor.js')
    .pipe gulp.dest('./public')

gulp.task 'css', ->
  gulp
    .src './app/styles/*.scss'
    .pipe plumber()
    .pipe sass()
    .pipe gulp.dest './public'

gulp.task 'watch', ['build'], ->
  gulp.watch 'app/**/*.coffee', ['js']
  gulp.watch 'app/**/*.jade', ['js']
  gulp.watch 'app/styles/**/*.scss', ['css']
  gulp.watch 'bower_components/**/*.js', ['vendor']

gulp.task 'build', ['vendor', 'js', 'css']
gulp.task 'default', ['build']
