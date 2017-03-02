
var GithubWebHook = require('./git-webhook');
var webhookHandler = GithubWebHook({ path: '/', secret: 'hex' });
var express = require('express');
var bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json()); // must use bodyParser in express
app.use(webhookHandler); // use our middleware
webhookHandler.on('success', function (data, req, res) {
  if( data.payloadData.ref === 'refs/heads/master' ) {
    var exec = require('child_process').exec;
    var script = exec('sh ./build.sh');
    var log = '';
    script.stdout.on('data', function(data){
        log += data + '\n';
    });
    script.stderr.on('data', function(data){
        log += data + '\n';
    });
    script.stdout.on('end', function(){
        res.json({
          message: log
        });
    });
  } else {
    res.json({
      message: 'no_build'
    });
  }
});

webhookHandler.on('error', function ( data, req, res) {
  res.statusCode = 400;
  res.json({
    message: data.error.message
  });
});
module.exports = app;

