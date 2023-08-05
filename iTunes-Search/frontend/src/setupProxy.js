//This file is used to configure the development server's proxy settings
// so that it can forward requestes from the React app  to the Express server.

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // Forward requests that match the '/api' path to the Express server
    app.use(
        '/api', createProxyMiddleware({
            target: 'https://itunes-search.onrender.com/',
            changeOrigin: true
        })
    );
};

/*
Reference for http-proxy-middleware

https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware-options

*/