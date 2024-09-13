import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

// Compiling SASS with the gulp-sass dependency
const sass = gulpSass(dartSass);

export function js(done) {

    src('src/js/app.js')
        .pipe(dest('build/js'))

    done()
}

export function css(done) {
    // sass file location
    src('src/scss/app.scss', {sourcemaps: true})
        // call the compilation function
        .pipe( sass().on('error', sass.logError) )
        // css storage destination
        .pipe( dest('build/css', {sourcemaps: '.'}) )

    done()
}

// monitoring files for compile
export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}

// run multiple tasks whitout a name (it is no need a name to run in package.json)
// serries run function one after another
// parallel run all at the same time
export default series(js, css, dev)