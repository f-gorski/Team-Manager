const express = require('express');

const login = express.Router();
const passport = require('passport');

login.post('/', passport.authenticate('local-login'), (req, res) => {
    delete req.user.password;
    res.send({user: req.user})
})

module.exports = login;