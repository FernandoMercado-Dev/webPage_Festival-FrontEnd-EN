import path from 'path'
import fs from 'fs'
import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

// Compiling SASS with the gulp-sass dependency
const sass = gulpSass(dartSass);

import terser from 'gulp-terser'
import sharp from 'sharp'

export function js(done) {

    src('src/js/app.js')
        .pipe(terser())
        .pipe(dest('build/js'))

    done()
}

export function css(done) {
    // sass file location
    src('src/scss/app.scss', {sourcemaps: true})
        // call the compilation function
        .pipe( sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError) )
        // css storage destination
        .pipe( dest('build/css', {sourcemaps: '.'}) )

    done()
}

export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

// monitoring files for compile
export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}

// run multiple tasks whitout a name (it is no need a name to run in package.json)
// serries run function one after another
// parallel run all at the same time
export default series(crop, js, css, dev)