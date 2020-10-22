const login = require('./login');
const signup = require('./signup');
const logout = require('./logout');
const users = require('./users');
const groups = require('./groups');
const messages = require('./messages');
const events = require('./events');

module.exports = {
    login,
    signup,
    logout,
    users,
    groups,
    messages,
    events
}