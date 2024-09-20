import path from 'path'
import fs from 'fs'
import {glob} from 'glob'
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

export async function imagesbuild(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        processImages(file, outputSubDir);
    });
    done();
}

function processImages(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

// monitoring files for compile
export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('src/img/**/*.{png,jpg}', imagesbuild)
}

// run multiple tasks whitout a name (it is no need a name to run in package.json)
// serries run function one after another
// parallel run all at the same time
export default series(crop, js, css, imagesbuild, dev)