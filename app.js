
var GithubWebHook = require('./git-webhook');
var webhookHandler = GithubWebHook({ path: '/', secret: 'hex' });
var express = require('express');
var bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json()); // must use bodyParser in express
app.use(webhookHandler); // use our middleware
webhookHandler.on('success', function (data, req, res) {
console.log('success');
  if( data.payloadData.ref === 'refs/heads/master' ) {
    res.json({
      message: 'build _success'
    });
  } else {
    res.json({
      message: 'no_build'
    });
  }
});

webhookHandler.on('error', function ( data, req, res) {
console.log('error');
  res.statusCode = 400;
  res.json({
    message: data.error.message
  });
});
module.exports = app;

