var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  scirpt = "/javascripts/stats.js"
  res.render('home', { title: 'Express'});
});

module.exports = router;
