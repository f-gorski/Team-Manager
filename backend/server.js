if(process.envNODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors')

const app = express();
const port = 5000;

//CORS enabling middleware
app.use(cors());

//JSON enabling middleware
app.use(express.json());

//Session middleware
const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//Initialize Passport authentication
const passport = require('passport');
const initializePassport = require('./passport');

initializePassport(passport);

//Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes middleware
const {
    login,
    signup,
    logout,
    groups,
    users,
    messages,
    events
} = require('./routes');

app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/api/groups', groups);
app.use('/api/users', users);
app.use('/api/messages', messages);
app.use('/api/events', events);


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));