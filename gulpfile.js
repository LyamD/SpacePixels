var gulp = require('gulp');
var spawn = require('child_process').spawn,
node;
var concat = require('gulp-concat');
const { src, dest, parallel, series, watch } = require('gulp');


// Node

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
async function server(params) {
    if (node) node.kill()
        node = spawn('node', ['dist/server/main.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
    if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
    }
  });
}

//Server Side

function buildServer(params) {
    return src('src/server/main.js', {allowEmpty: true})
            .pipe(dest('dist/server/'));
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

exports.dev = function() {
    
    watch(
        ['src/**/*.js', 'src/client/**/*.html'], 
        {
            queue : false,
            ignoreInitial: false
        },
        series( series(buildServer, jsClient), series(html, server) )
    );
}

exports.buildAll = parallel(parallel(html, jsClient), buildServer);
exports.html = html;

process.on('exit', function() {
    if (node) node.kill()
})