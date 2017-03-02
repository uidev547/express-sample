var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.use(bodyParser.json());
var GithubWebHook = require('./git-webhook');
var webhookHandler = GithubWebHook({ path: '/', secret: 'hex' });

webhookHandler.on('success', function (data, req, res) {
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
  res.statusCode = 400;
  res.json({
    message: data.error
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
