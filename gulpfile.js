var gulp = require('gulp');
var spawn = require('child_process').spawn,
node;
var concat = require('gulp-concat');
const { src, dest, parallel, series, watch } = require('gulp');

//Typescript compilateur
var ts = require('gulp-typescript');
var tsProjectServer = ts.createProject('tsconfigserver.json');
var tsProjectClient = ts.createProject('tsconfigclient.json');

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

function buildServer() {
    return src('src/server/main.js', {allowEmpty: true})
            .pipe(dest('dist/server/'));
}

function vendor() {
    return src('src/client/vendor/**/*.js', { sourcemaps: true })
            .pipe(concat('vendor.js'))
            .pipe(dest('dist/client/js'), { sourcemaps: true });
}

function typescriptServer() {
    return tsProjectServer.src()
            .pipe(tsProjectServer())
            .js.pipe(gulp.dest('dist/server'));
}

// Client Side

function html() {
    return src('src/client/index.html', {allowEmpty: true})
            .pipe(dest('dist/client/'));
}

function jsClient() {
    return src('src/client/index.js', {allowEmpty: true})
            .pipe(dest('dist/client/js/'));
}

function typescriptClient() {

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
        ['src/**/*.js', 'src/client/**/*.html'], 
        {
            queue : false,
            ignoreInitial: false
        },
        series(series(vendor, series(typescriptServer, jsClient)), series(html, server) )
    );
}

exports.buildAll = parallel(parallel(html, jsClient), buildServer);
exports.html = html;
exports.ts = typescriptClient;

process.on('exit', function() {
    if (node) node.kill()
})