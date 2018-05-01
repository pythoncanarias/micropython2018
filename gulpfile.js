var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("source/style/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("source/style/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('dev', ['sass', 'serve']);