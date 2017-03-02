var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deploy', function(req, res, next) {
  var GithubWebHook = require('express-github-webhook');
  var webhookHandler = GithubWebHook({ path: '/', secret: 'hex' });
  // Now could handle following events
  webhookHandler.on('*', function (event, repo, data) {
    console.log('---------start(*)-------');
    console.log('------------------------');
    console.log('event', event);
    console.log('------------------------');
    console.log('repo', repo);
    console.log('------------------------');
    console.log('data', data);
    console.log('-------end(*)-------');
  });

  webhookHandler.on('event', function (repo, data) {
    console.log('----------start(event)------');
    console.log('repo', repo);
    console.log('------------------------');
    console.log('data', data);
    console.log('-------end(event)----------');
  });

  webhookHandler.on('reponame', function (event, data) {
    console.log('----------start(reponame)------');
    console.log('event', data);
    console.log('------------------------');
    console.log('data', data);
    console.log('-------end(reponame)----------');
  });

  webhookHandler.on('error', function (err, req, res) {
    console.log('----------start(error)------');
    console.log('err', err);
    console.log('------------------------');
    console.log('req', req);
    console.log('------------------------');
    console.log('res', res);
    console.log('-------end(error)----------');
  });
  res.render('index', { title: 'Express_post' });
});

module.exports = router;
