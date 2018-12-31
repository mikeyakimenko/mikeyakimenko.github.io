const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require("gulp-rename")
const imagemin = require('gulp-imagemin')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const minify = require('gulp-minify')
const gutil = require('gulp-util')

const SOURCE = './src/assets'
const PRODUCTION = './src/static'

gulp.task('copyfonts', () => {
    gulp.src([`./node_modules/font-awesome/fonts/*.*`])
        .pipe(gulp.dest(`${PRODUCTION}/fonts/`))
})

gulp.task('copyfontscss', () => {
    gulp.src([`./node_modules/font-awesome/css/font-awesome.min.css`])
        .pipe(gulp.dest(`${PRODUCTION}/css/`))
})

gulp.task('sass', () => {
    gulp.src([`${SOURCE}/sass/style.scss`])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(sass({
          outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(gulp.dest(`${PRODUCTION}/css`))
})

gulp.task('js', () => {
    gulp.src([
            `${SOURCE}/js/bubbles.js`
        ])
        .pipe(babel({
            presets: ['env']
        }).on('error', gutil.log))
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${PRODUCTION}/js`))
})

gulp.task('images', () =>
    gulp.src(`${SOURCE}/images/**/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${PRODUCTION}/images`))
)

gulp.task('minifystyles', () => {
    gulp.src([`${PRODUCTION}/css/style.css`])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(`${PRODUCTION}/css`))
})

gulp.task('minifyjs', () => {
    gulp.src([`${PRODUCTION}/js/bundle.js`])
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest(`${PRODUCTION}/js`))
})

gulp.task('fa', ()=> {
    gulp.start(['copyfonts', 'copyfontscss'])
})

gulp.task('watch', () => {
    gulp.start(['images'])
    gulp.watch(`${SOURCE}/images/**/*`, ['images'])
    gulp.watch(`${SOURCE}/sass/**/*.scss`, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
    gulp.watch(`${SOURCE}/js/**/*.js`, ['js'])
})

gulp.task('build', () => {
    gulp.start(['images', 'sass', 'js', 'minifystyles', 'minifyjs'])
})
