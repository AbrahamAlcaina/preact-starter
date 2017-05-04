'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

// Support .jsx on Node runtime
require('babel-register')({
  extensions: ['.jsx', '.js'],
  presets :['es2015'],
  plugins : [
      [ 'transform-react-jsx', { pragma: 'h' } ]
  ]
});

// Server-side Entry (.jsx)
const ssr = require('./ssr');

// basic HTTP server via express:
const app = express();

app.use(express.static('dist'));

const BUNDLE_FILE_URL = './app.396b46521f600ee6ae7f.js';
const BUNDLE_FILE_PATH = path.join(__dirname, `../dist${BUNDLE_FILE_URL}`);



// on each request, render and return a component:
app.get('*', (req, res) => {
  const data = {};  
  const ssrResult = ssr(data);
  // send it back wrapped up as an HTML5 document:
  res.send(`
  <!DOCTYPE html>
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
  <link href="/styles.396b46521f600ee6ae7f.css" rel="stylesheet"></head>
  <body>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(ssrResult.state)};</script>
  <script type="text/javascript" src="./vendor.396b46521f600ee6ae7f.js"></script><script type="text/javascript" src="./app.396b46521f600ee6ae7f.js"></script></body>
</html>`);
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Preact Server start on ${PORT}`);
});