var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');

// CREATE a user
router.post('/', function(req, res) {
  if (!passwordsPresent(req.body.user) || !passwordsMatch(req.body.user)) {
     res.status(422).json({
       message: 'Passwords must match!'
     });
     return;
   }
  var user = new User({
       name: req.body.user.name,
       username: req.body.user.username,
       passwordDigest: bcrypt.hashSync(req.body.user.password, 10)
  });

  user
     .save()
     .then(
       userData => res.json(userData)
     );
});

module.exports = router;

function passwordsPresent(payload) {
   return (payload.password && payload.passwordConfirmation)
 }

 function passwordsMatch(payload) {
   return (payload.password === payload.passwordConfirmation)
 }