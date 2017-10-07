var gulp = require('gulp'),
    sass = require('gulp-sass'),
    //path = require('path'),
    bs = require('browser-sync').create(),
    proxyTarget = "https://www.google.it/",
    // proxyTarget = "https://example.com",
    serverPort = 30003;


// start proxy server to inject websocket to autoload and dispatch message
gulp.task('browser-sync', function () {
    console.log('Init Server and proxy to...!');
    bs.init({
        https: true,
        port: serverPort,
        // do not open new browser's tab
        // open: false, 
        proxy: {
            target: proxyTarget, // can be [virtual host, sub-directory, localhost with port]
            // ws: true, // enables websockets
            // middleware e' utile se voglio....
            // middleware: function(req,res,next) {
            //     console.log('*****************************')
            //     console.log(res.body)
            //     return next();
            // }
        },
        // lo snipped posso sfruttarlo per appendere stringhe di html, js o css che non avevo appeso nel body
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                // match: /.*/i,
                fn: function (snippet, match) {
                    // aggiungere una funzione per caricare script/css dinamicamente
                    //return snippet + '<script>alert(\'snipped!\')</script>';
                    return snippet + '<link href="/cache/template/mio.css" rel="stylesheet" type="text/css">';
                }
            }
        },
        // serve static, specificando folder per folder in modo da fare un lavoro specifico
        serveStatic: [
            {
                // Se trova il file lo rimpiazza, altrimenti usa quello del server
                route: '/cache/template',
                dir: ['./btt/dirCss', './btt/dirJs']
            }
        ],
        // con questo invece mappo tutta la tree del sito nella tree locale di dirCss: 
        // in sostanza il locale diventa un warp a specchio del remoto
        serveStatic: ['.', './btt/dirCss']
    });
});

// Monitor over php files
gulp.task('style', function () {
    // var sources = 'scss/*scss';
    // var destcss = 'css';
    // gulp.watch("scss/*.scss", function() {
    //     return gulp.src( sources )
    //     .pipe(sass())
    //     .pipe(gulp.dest( destcss ))
    //     .pipe(bs.stream());
    // });

    // watch css and stream to BrowserSync when it changes
    // gulp.watch('app/css/*', function() {

    gulp.watch('btt/dirCss/*').on('change', function (file) {
        //console.log('changed css, then reload browser...');
        bs.reload();
    });


});

gulp.task('watch', ['browser-sync', 'style']);
