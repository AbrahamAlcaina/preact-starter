/* eslint-disable */
// Support .jsx and react on Node runtime
require('babel-register')({
  extensions: ['.jsx', '.js'],
  presets: ['es2015'],
  plugins: [
      ['transform-react-jsx', { pragma: 'h' }]
  ]
});

const fs = require('fs');
const express = require('express');
const ssr = require('./ssr');
const compression = require('compression');
const zlib = require('zlib');
const glob = require('glob');

const app = express();
const appPath = glob.sync('dist/app.*.js')[0].replace('dist', '');
const vendorPath = glob.sync('dist/vendor.*.js')[0].replace('dist', '');
const stylesPath = glob.sync('dist/styles.*.css')[0].replace('dist', '');
const spdy = require('spdy');

// -> redirect to https
if (process.env.NODE_ENV === 'production') {
  const http = express();
  http.get('*', (req, res) => {
    res.redirect(`https://${req.headers.host}${req.url}`);
  });
  http.listen(80, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    }
    console.log('Listening on port: 80.');
  });
}

const certificateOptions = {
  key: fs.readFileSync(`${__dirname}/certificate/server.key`),
  cert: fs.readFileSync(`${__dirname}/certificate/server.crt`)
};
const pushFile = (res, file, options = {}) => {
  if (!res.push) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const push$ = res.push(file, options);
    const stream$ = fs
        .createReadStream(`${process.cwd()}/dist${file}`)
        .pipe(zlib.createDeflate())
        .pipe(push$);
    const cleanup = (err) => {
      stream$.removeListener('finish', end);
      stream$.removeListener('error', cleanup);
      if (err) {
        console.log(err);
      }
    };
    const end = () => {
      cleanup();
      resolve();
    };

    stream$.on('error', cleanup);
    stream$.on('finish', end);
  });
};

app.use(compression());
const cssFileOptions = { request: { accept: '*/\*', 'accept-encoding': 'deflate, gzip;q=1.0, *;q=0.5' }, response: { 'content-encoding': 'deflate', 'content-type': 'text/css' } };
const jsFileOptions = { request: { accept: '*/\*', 'accept-encoding': 'deflate, gzip;q=1.0, *;q=0.5' }, response: { 'content-encoding': 'deflate', 'content-type': 'application/javascript' } };
app.get(['/', '/home', '/credit', '/blog', '/blog/:id'], (req, res) => {
  Promise.all([
    pushFile(res, stylesPath, cssFileOptions),
    pushFile(res, appPath, jsFileOptions),
    pushFile(res, vendorPath, jsFileOptions)
  ]).then(() => {
    const initialData = {};  // mandatory data
    const ssrResult = ssr(initialData);
    // print shell
    // console.log(ssrResult.html);
    // send it back wrapped up as an HTML5 document:
    res.end(`<!DOCTYPE html>
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
          <link href="${stylesPath}" rel="stylesheet">
          </head>
        <body>        
            ${ssrResult.html}        
          <script>window.__INITIAL_STATE__ = ${JSON.stringify(ssrResult.state)};</script>
          <script type="text/javascript" src="${vendorPath}"></script>
          <script type="text/javascript" src="${appPath}"></script>
        </body>
      </html>`);
  });
});
app.use(express.static('dist'));

// start server
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'production') {
  spdy
    .createServer(certificateOptions, app)
    .listen(PORT, (error) => {
      if (error) {
        console.error(error);
        return process.exit(1);
      }
      console.log(`Listening on port: ${PORT}.`);
    });
} else {
  app.listen(PORT, () => {
    console.log(`Preact Server start on ${PORT}`);
  });
}
