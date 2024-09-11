import {src, dest, watch} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

// Compiling SASS with the gulp-sass dependency
const sass = gulpSass(dartSass);

export function css(done) {
    // sass file location
    src('src/scss/app.scss')
        // call the compilation function
        .pipe( sass().on('error', sass.logError) )
        // css storage destination
        .pipe( dest('build/css') )

    done()
}

// monitoring files for compile
export function dev() {
    watch('src/scss/**/*.scss', css)
}