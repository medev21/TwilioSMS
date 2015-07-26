var express = require('express');
var router = express.Router();
var accountSid = process.env.TWILIO_ACCOUNT_SID;		//must set this key in heroku config before deploying
var authToken = process.env.TWILIO_AUTH_TOKEN;		//must set this key in heroku config before deploying
var client = require('twilio')( accountSid, authToken);

/* GET users listing. */
router.post('/', function(req, res, next) {

  var toPhone = req.body.phonenumber;	//store the phonenumber value from index form field 
  var message = req.body.message;			//store the message value from index form field
  var phonenum = toPhone.replace(/[^0-9]/g, '');		//remove any characters that are not number, variable is inactive for now
  if (message == ''){
	message = 'Hello world from Twilio (default message)';
  }
  console.log(toPhone);		//print the phonenumber to the console
  console.log(phonenum);		//print the phonenumber to the console
  console.log(message);		//print the message to the console
  //check if the phonenumber is not a number, or less than 10 digits, or more than ten digits
  if (isNaN(toPhone) || toPhone.length < 10 || toPhone.length > 10){
	res.render('oopsview', {phonenumber : toPhone});		//display the oopsview page if true
  }else{
	//generate the message
	client.messages.create({
    body: message,
    to: '1' + phonenum,
    from: "+14804280838"
	}, function(err, message) {
	//if there is an error, display the oopsview message, this is for unverified numbers
	if(err){
		console.log(err);
		console.log(message);
		res.render('oopsview', {phonenumber : toPhone});	
	}else{
		res.render('message');		//dispaly the message page if number is verified and generated a successful message
	}
	});

  }
});

module.exports = router;