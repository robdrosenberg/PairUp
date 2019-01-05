var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET contact page and post contact form submission */
router.route('/')
  .get(function (req, res, next) {
    res.render('contact', { title: 'Contact' });
  })
  .post(function(req, res, next){
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty Message').notEmpty();
    var errors = req.validationErrors();
    
    if(errors){
      res.render('contact', {
        title: 'PairUp',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      })
      // console.log(name);
    } else {

      var mailOptions = {
        from: 'PairUp <no-reply@pairup.com>',
        to: process.env.EMAIL,
        subject: 'You got a new message on PairUp!',
        text:"Email: " + req.body.email + "\n" + "Name: " + req.body.name + "\n" + "Message: " + req.body.message
      };

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        } else{
          res.render('thank', { title: 'Thank You' });
        }
      });
    }
    
  });

module.exports = router;