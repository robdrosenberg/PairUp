var passport = require('passport');

var express = require('express');
var router = express.Router();


router.route('/login')
  .get(function (req, res, next) {
    res.render('login', { title: 'Login - PairUp' });
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/login'
  }), function(req, res){
    res.redirect('/');
  });

router.route('/register')
  .get(function (req, res, next) {
    res.render('register', { title: 'Register - PairUp' });
  })
  .post(function(req, res, next){
    req.checkBody('name', 'Empty Name').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('password', 'Empty Password').notEmpty();
    req.checkBody('password', 'Passwords do not match').equals(req.body.confirmPassword).notEmpty();

    var errors = req.validationErrors();
    if (errors){
      res.render('register', {
        name: req.body.name,
        email: req.body.email,
        errorMessages: errors
      });
    } else {
      var user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.setPassword(req.body.password);
      user.save(function(err){
        if (err) {
          res.render('register', {errorMessages: err});
        } else {
          res.redirect('/login');
        }
      });
    }

  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;