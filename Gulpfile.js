var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minifier');
var del = require('del');
var rev = require('gulp-rev-append-all');

gulp.task('sass', function () {
    return gulp
        .src(['./sass/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('dev', ['sass'], function () {
    gulp.watch(['./sass/**/*.scss'], ['sass']);
});

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('build:css', ['sass'], function () {
    return gulp.src(['./css/*.css']).pipe(minify({
        minify: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    })).pipe(gulp.dest('build/css'));
});

gulp.task('build:js', function () {
    return gulp.src(['./js/*.js']).pipe(minify({
        minify: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    })).pipe(gulp.dest('build/js'));
});

gulp.task('build:copy:html', function() {
    return gulp.src(['./index.html'])
        .pipe(rev())
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('build:copy:manifest', function() {
    return gulp.src(['./manifest.json'])
        .pipe(gulp.dest('build'));
});

gulp.task('build:copy:img', function() {
    return gulp.src(['img/**/*'])
        .pipe(gulp.dest('build/img'));
});

gulp.task('build:copy:icons', function() {
    return gulp.src(['app-icons/**/*'])
        .pipe(gulp.dest('build/app-icons'));
});

gulp.task('build:copy', ['build:copy:icons', 'build:copy:html', 'build:copy:img', 'build:copy:manifest']);

gulp.task('build', ['build:css', 'build:js', 'build:copy']);
