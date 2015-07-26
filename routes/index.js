var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twilio' });
});

// router.post('/', function(req, res, next){
	// res.render('message', { name : req.body.name })
// });

module.exports = router;
