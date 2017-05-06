// Support .jsx and react on Node runtime
require('babel-register')({
  extensions: ['.jsx', '.js'],
  presets :['es2015'],
  plugins : [
      [ 'transform-react-jsx', { pragma: 'h' } ]
  ]
});

const fs = require('fs');
const path = require('path');
const express = require('express');
const ssr = require('./ssr');
const compression = require('compression')
const app = express();
const glob = require('glob');
const appPath = glob.sync('dist/app.*.js')[0].replace('dist', '');
const vendorPath = glob.sync('dist/vendor.*.js')[0].replace('dist', '');
const spdy = require('spdy'); 
const options = {
    key: fs.readFileSync(__dirname + '/certificate/server.key'),
    cert:  fs.readFileSync(__dirname + '/certificate/server.crt')
}

app.use(compression());
app.get(['/', '/home', '/credit', '/blog', '/blog/:id'], (req, res) => {
  const data = {};  // mandatory data
  const ssrResult = ssr(data);
  // send it back wrapped up as an HTML5 document:
  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Preact Starter</title>
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="application-name" content="Preact Starter">

        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-title" content="Preact Starter">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png">
        <link rel="manifest" href="/manifest.json">

        <meta name="msapplication-tap-highlight" content="no">
        <meta name="msapplication-TileImage" content="/icon/ms-touch-icon-144x144-precomposed.png">
        <meta name="msapplication-TileColor" content="#F2F2F2">

        <meta name="theme-color" content="#673AB8">
        <style>
          .card,.header{box-shadow:0 1px 3px 0 rgba(33,33,33,.2),0 1px 1px 0 rgba(33,33,33,.14),0 2px 1px -1px rgba(33,33,33,.12)}*{margin:0;padding:0;box-sizing:border-box}#app,body{width:100vw;min-height:100vh;overflow-x:hidden}body{color:#212121;background:#f5f5f5;font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-weight:400;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}a{color:#673ab7}li,p{margin-bottom:8px}img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;max-width:100%}blockquote{border-left:4px solid #eee;padding:8px 16px;padding-right:0}.header{position:fixed;height:56px;width:100%;padding:0;left:0;top:0;background:#673ab7;z-index:50}.header h1{float:left;margin:0;padding:0 16px;font-size:24px;line-height:56px;font-weight:400;color:#fff}.header nav{float:right;font-size:100%}.header nav a{display:inline-block;height:56px;line-height:56px;padding:0 16px;text-align:center;min-width:50px;background:hsla(0,0%,100%,0);will-change:background-color;text-decoration:none;color:#f5f5f5}.header nav a:active,.header nav a:hover{background:hsla(0,0%,100%,.3)}@media screen and (max-width:401px){.header nav a{padding:0 8px;min-width:32px}}@media screen and (max-width:321px){.header h1{font-size:18px}}#content{padding-top:56px}.page{padding:16px 32px;min-height:100%;width:100%}.page nav{margin:0 8px}.page nav a{display:block}@media screen and (max-width:321px){.page{padding:16px 8px}}.card{display:block;position:relative;background:#fff;border-radius:2px;margin:0 0 8px;padding:16px}.card h2{margin-bottom:16px}a.card{cursor:pointer;text-decoration:none;color:#212121}a.card em,a.card strong{display:block}a.card em{font-size:85%;padding-left:8px}.page__home ul{padding-left:32px}.page__home img{width:100%;display:block;margin:8px auto;max-width:960px}.page__article h1{text-transform:capitalize;margin-bottom:16px}.page__article small{display:block;text-indent:16px;font-size:65%;opacity:.65;font-style:italic}.page__article .back,.page__article p{display:block;margin-bottom:16px}.page__404{text-align:center}
        </style>
        <!-- split media="none" onload="if(media!='all')media='all'" -->
        <!-- <link href="/styles.396b46521f600ee6ae7f.css" rel="stylesheet"> -->
        </head>
      <body>        
          ${ssrResult.html}        
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(ssrResult.state)};</script>
        <script type="text/javascript" src="${vendorPath}"></script>
        <script type="text/javascript" src="${appPath}"></script>
      </body>
    </html>`);
});
app.use(express.static('dist'));

// start server
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'production'){
  spdy
    .createServer(options, app)
    .listen(PORT, (error) => {
      if (error) {
        console.error(error)
        return process.exit(1)
      } else {
        console.log('Listening on port: ' + PORT + '.')
      }
    });
} else {
  app.listen(PORT, () => {
    console.log(`Preact Server start on ${PORT}`);
  });
}
