const gulp = require('gulp');
const Sass = require('gulp-sass');
const server = require('gulp-webserver');
gulp.task('devScss', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(Sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task("server", function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8989,
            proxies: [{
                source: '/getdata',
                target: 'http://localhost:3000/getdata'
            }]
        }))
})
gulp.task('watch', () => {
    gulp.watch('./src/scss/*.scss', gulp.series('devScss'))
})
gulp.task('default', gulp.series('devScss', 'server', 'watch'))