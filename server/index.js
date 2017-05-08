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
const compression = require('compression');
const zlib = require('zlib');
const deflate = zlib.createDeflate();
const app = express();
const glob = require('glob');
const appPath = glob.sync('dist/app.*.js')[0].replace('dist', '');
const vendorPath = glob.sync('dist/vendor.*.js')[0].replace('dist', '');
const stylesPath = glob.sync('dist/styles.*.css')[0].replace('dist', '');
const spdy = require('spdy'); 
const options = {
    key: fs.readFileSync(__dirname + '/certificate/server.key'),
    cert:  fs.readFileSync(__dirname + '/certificate/server.crt')
}
/*
const pushFile = (res, file, options = {}) => {
  if (!res.push){
    return Promise.resolve();
  }
  return new Promise (resolve =>{
    fs.readFile(`${process.cwd()}/dist${file}`, (err, data)=> {
      if (err) {
        console.log(err);
      }
      console.log('push file', file, options);      
      res.push(file, options).end(data);
      resolve();
    });
  });  
};
const pushFile = (res, file, options = {}) => {
  if (!res.push){
    return Promise.resolve();
  }
  return new Promise (resolve =>{
    const stream$ = fs
      .createReadStream(`${process.cwd()}/dist${file}`)
      .pipe(zlib.createGzip());
    stream$.on('error',()=> console.log('error'));
    stream$.on('finish',(data)=> {
      console.log(data);
      res.push(file, options).append($stream).end(data);
      resolve();
    });
  });  
};
const pushFile = (res, file, options = {}) => {
  if (!res.push){
    return Promise.resolve();
  }
  return new Promise (resolve =>{
    const stream$ = fs
      .readFile(`${process.cwd()}/dist${file}`, (err, data)=>{
        res.push(file, options).end(zlib.deflate(data));
      });
  });  
};
const pushFile = (res, file, options = {}) => {
  if (!res.push){
    return Promise.resolve();
  }
  return new Promise (resolve =>{
  const push$ = res.push(file, options); 
  const stream$ = fs
      .createReadStream(`${process.cwd()}/dist${file}`,{encoding: 'utf8'})
      .pipe(push$);
  stream$.on('finish', resolve);
  });  
};

*/

const pushFile = (res, file, options = {}) => {
  if (!res.push){
    return Promise.resolve();
  }
  return new Promise (resolve =>{
    fs.readFile(`${process.cwd()}/dist${file}`, (err, data)=> {
      if (err) {
        console.log(err);
      }
      zlib.deflate(data, (err, compressed) =>{
        res.push(file, options).end(compressed);
        resolve();
      })
    });
  });  
};

app.use(compression());
const cssFileOptions = { request: { accept: '*/\*' , 'accept-encoding': 'deflate, gzip;q=1.0, *;q=0.5'}, response: { 'content-encoding': 'deflate', 'content-type': 'text/css'}};
const jsFileOptions = { request: { accept: '*/\*' , 'accept-encoding': 'deflate, gzip;q=1.0, *;q=0.5'}, response: { 'content-encoding': 'deflate', 'content-type': 'application/javascript'}};
app.get(['/', '/home', '/credit', '/blog', '/blog/:id'], (req, res) => {

  Promise.all([
    pushFile(res, stylesPath, cssFileOptions),
    pushFile(res, appPath, jsFileOptions),
    pushFile(res, vendorPath, jsFileOptions),
    pushFile(res, '/service-worker.js', jsFileOptions)
  ]).then(() => {
    const initialData = {};  // mandatory data
    const ssrResult = ssr(initialData);
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
