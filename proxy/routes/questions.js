var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request({
    url: 'https://polls.apiblueprint.org/',
    headers: {
      'Accept': 'application/json, text/plain, */*'
    }
  }, function (error, response, body) {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Expose-Headers', '*');

    res.set(response.headers);
    res.send(body);
  });
});

router.get('/questions', function(req, res, next) {
  request({
    url: 'https://polls.apiblueprint.org/questions',
    headers: {
      'Accept': 'application/json, text/plain, */*'
    }
  }, function (error, response, body) {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Expose-Headers', '*');

    res.set(response.headers);
    res.send(body);
  });
});

router.get('/questions/:id', function(req, res, next) {
  request({
    url: 'https://polls.apiblueprint.org/questions/' + req.params.id,
    headers: {
      'Accept': 'application/json, text/plain, */*'
    }
  }, function (error, response, body) {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Expose-Headers', '*');

    res.set(response.headers);
    res.send(body);
  });
});

router.post('/questions/:questionId/choices/:choiceId', function(req, res, next) {
  request({
    url: 'https://polls.apiblueprint.org/questions/' + req.params.questionId + '/choices/' + req.params.choiceId,
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*'
    }
  }, function (error, response, body) {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Expose-Headers', '*');

    res.set(response.headers);
    res.send(body);
  });
});

module.exports = router;
