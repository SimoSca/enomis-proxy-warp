'use strict';

const { existsSync, readdirSync, readFileSync } = require('fs')
const { join } = require('path')
const { debounce } = require('./lib/timingFunctions')


const gulp = require('gulp')
const bs = require('browser-sync').create()

var sourceConf = null;
var sourceDir = null;

var conventions = {
    assetsDir: "assets",
    injectFilesDir: "injects"
}

var startBrowserSyncProxy = ({ proxyPort = 3307, proxyTarget, assetsDir, proxyOpen = true, injectFilesDir }) => {

    var bsConfs = {
        https: true,
        port: proxyPort,
        // if open or not new browser's tab
        open: proxyOpen,
        proxy: {
            target: proxyTarget, // can be [virtual host, sub-directory, localhost with port]
        },
        serveStatic: ['.', assetsDir]
    }

    if (existsSync(injectFilesDir)) {
        var injectToBody = '';
        readdirSync(injectFilesDir).forEach(file => {
            injectToBody += readFileSync( join(injectFilesDir,file) );
        });
        // lo snipped posso sfruttarlo per appendere stringhe di html, js o css che non avevo appeso nel body
        bsConfs.snippetOptions = {
            rule: {
                match: /<\/body>/i,
                // match: /.*/i,
                fn: function (snippet, match) {
                    return snippet + injectToBody;
                }
            }

        }
    }

    console.log('Init proxy map ' + proxyTarget + ' <-> localhost:' + proxyPort);

    bs.init(bsConfs);

}

/**
 * di default il watch e' direttamente sul progetto
 */
var startGulpWatch = ({ assetsDir }) => {
    gulp.watch(join(assetsDir, '**')).on('change', debounce(function (file) {
        // console.log('try reload')
        bs.reload();
    }), 500);
}


const startProxy = (sourcePath) => {

    sourceConf = join(sourcePath, "enproxy.json");
    sourceDir = sourcePath;

    if (!existsSync(sourceConf)) {
        console.log('Error: file "' + sourceConf + '" not exists.')
        process.exit(1);
    }

    var config = require(sourceConf);

    config.assetsDir = config.assetsDir || conventions.assetsDir;
    config.assetsDir = join(sourceDir, config.assetsDir);

    config.injectFilesDir = config.injectFilesDir || conventions.injectFilesDir;
    config.injectFilesDir = join(sourceDir, config.injectFilesDir);


    startGulpWatch(config)

    startBrowserSyncProxy(config)



}


// Export all methods
module.exports = {
    startProxy
};