var express = require('express');
var router = express.Router();

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
      res.render('thank', { title: 'Thank You' });
    }
    
  });

module.exports = router;