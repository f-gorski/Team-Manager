const express = require('express');

const logout = express.Router();
const passport = require('passport');

logout.get('/', (req, res) => {
    req.logout();
    res.send({message: "Wylogowano"})
})

module.exports = logout;