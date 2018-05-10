var gulp        = require("gulp"),
    sass        = require("gulp-sass"),
    rename      = require("gulp-rename"),
    cssmin      = require("gulp-cssnano"),
    prefix      = require("gulp-autoprefixer"),
    sourcemaps  = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();


// Static Server + watching scss/html files
gulp.task("serve", function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("source/style/**/*.scss", ["sass"]).on("change", browserSync.reload);
    gulp.watch("public/*.html").on("change", browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
    return gulp.src("source/style/style.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

// Build the CSS for production
var sassOptions = {
    outputStyle: "expanded"
};

var prefixerOptions = {
    browsers: ["last 2 versions"]
};
gulp.task("build", function() {
    return gulp.src("source/style/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(prefix(prefixerOptions))
        .pipe(rename("style.css"))
        .pipe(gulp.dest("public/css"))
        .pipe(cssmin())
        .pipe(gulp.dest("public/css"))
});

gulp.task("dev", ["sass", "serve"]);