var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

router.post('/send',function(req, res, next){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user:  'test@test.com',
      pass:  'apassword'
    }
  });

  var mailOptions = {
    from: 'John Dough <Johndough@test.com>',
    to: 'test@test.com',
    subject:  'Website Submission',
    text: 'You have a new submission with the following details:\n\nName: ' + req.body.name + '\n\nEmail:  ' + req.body.email + '\n\nMessage:  ' + req.body.message,
    html:  '<p>You got a new submission with the following details</p><ul><li>Name:  ' + req.body.name + '</li><li>Email:  ' + req.body.email + '</li><li>Message:  ' + req.body.message + '</li>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message Sent:  ' + info.response);
      res.redirect('/');
    }
  });
});

module.exports = router;
