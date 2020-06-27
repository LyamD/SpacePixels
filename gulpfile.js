var gulp = require('gulp');
var spawn = require('child_process').spawn,
node;
var concat = require('gulp-concat');
const { src, dest, parallel, series, watch } = require('gulp');

//Typescript compilateur
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');


// Node

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
async function server() {
    if (node) node.kill()
        node = spawn('node', ['dist/server/main.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
    if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
    }
  });
}

//Server Side

function typescriptServer() {
    return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest('dist/server'));
}

// Client Side

function html() {
    return src('src/client/index.html', {allowEmpty: true})
            .pipe(dest('dist/client/'));
}

function exportComponents() {
    //exportSystemManager();
    return src('src/server/engine/components/**/*.ts', {allowEmpty: true})
            .pipe(dest('src/client/engine/components/'))
}

function exportSystemManager() {
    return src('src/server/engine/systems/systemmanager.ts', {allowEmpty: true})
            .pipe(dest('src/client/engine/systems/'))
}

function typescriptClient() {

    //Browserify tout les dépendance client
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/client/index.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist/client/js'))

}

exports.dev = function() {
    
    watch(
        ['src/**/*.ts', 'src/client/**/*.html'], 
        {
            queue : false,
            ignoreInitial: false
        },
        series(exportComponents ,series(series(typescriptServer, typescriptClient), series(html, server) ))
    );
}

exports.build = parallel(parallel(typescriptClient, typescriptServer), html);
exports.html = html;
exports.exportComponents = exportComponents;

process.on('exit', function() {
    if (node) node.kill()
})