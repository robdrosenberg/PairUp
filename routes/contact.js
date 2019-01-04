var express = require('express');
var router = express.Router();

/* GET contact page and post contact form submission */
router.route('/')
  .get(function (req, res, next) {
    res.render('contact', { title: 'Contact' });
  })
  .post(function(req, res, next){
    res.render('thank', {title: 'Thank You'});
  });

module.exports = router;