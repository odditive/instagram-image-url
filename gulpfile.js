var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('scripts.extension', function() {
    gulp.src(["./src/extension/*"])
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts.resources', function() {
    gulp.src(["./resources/*"])
        .pipe(gulp.dest('dist/resources'));
});

gulp.task('build', [
    'scripts.extension', 'scripts.resources', 'test'
]);

gulp.task('test', function() {

});

gulp.task('watch', function() {
    gulp.watch("./src/extension/*", ['scripts.extension']);
    gulp.watch("./resources/*", ['scripts.resources']);
    gulp.watch("./test/*", ['test']);

});

gulp.task('default', ['build', 'watch']);
