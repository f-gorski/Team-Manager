const express = require('express');

const signup = express.Router();
const passport = require('passport');

signup.post('/', passport.authenticate('local-signup'), (req, res) => {
    delete req.user.password;
    res.send({user: req.user});
})

module.exports = signup;