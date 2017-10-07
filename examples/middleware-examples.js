

var middleware = function (req, res, next) {

            // get the path to the requested resource
            var path = req.url.slice(-1) === '/' ? req.url + 'index.html' : req.url;

            // test if the requested file exists
            fs.exists('www' + path,function(exists) {

                // render this file using swig and send it back
                if (exists) {

                    //console.log('[BS] Serving resource: ',path);

                    var html = swig.renderFile('www' + path, {});
                    html = html.replace(/<\/head>/, '<script async src="//' + req.headers.host + '/browser-sync-client.js"></script></head>');

                    res.end(html);

                }
                // move to next middleware, if setup
                else {
                    next();
                }

            });

        }



var middleware2 = functionfunction (req, res, next) {
        res.body = res.body + "modified";
        next();
}