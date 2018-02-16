var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('build', function() {
    gulp.src('src/jquery.ggergoMillerColumns.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('dist'));
});
