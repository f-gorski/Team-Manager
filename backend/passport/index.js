

const initializePassport = (passport) => {

    const LocalStrategy = require('passport-local').Strategy;
    const bcrypt = require('bcrypt');

    const db = require('../server.js').db



    passport.serializeUser((user, done) => {
        console.log("Aktualny user", user);
        done(null, user.user_id);
    });

    passport.deserializeUser((user_id, done) => {
        db.all('SELECT * FROM users WHERE user_id = $id', {
            $id: user_id
        },
        (err, rows) => {
            done(err, rows[0]);
        });
    });

    passport.use('local-signup',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        db.all('SELECT * FROM users WHERE email = $email', {
            $email: email
        },
        (err, rows) => {
            if(err) {
                return done(err);
            }
            if(rows.length) {
                return done(null, false);
            } else {
                const newUserSQL = {
                    name: req.body.name,
                    email: email,
                    password: bcrypt.hashSync(password, 10),
                    role: "user"
                };

                const insertQuery = 'INSERT INTO users (email, password, name, role) VALUES ($email, $password, $name, $role)';
                db.run(insertQuery, {
                    $email: newUserSQL.email,
                    $password: newUserSQL.password,
                    $name: newUserSQL.name,
                    $role: "user"
                },
                function (err) {
                    if(!err) {
                        newUserSQL.user_id = this.lastID;
                        return done(null, newUserSQL);
                    } else {
                        console.log(err)
                    }
                    
                });
            }
        }
        )
    }
    
    ));

    passport.use('local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        db.all('SELECT * FROM users WHERE email = $email', {
            $email: email
        }, 
        (err, rows) => {
            if(err) {
                return done(err)
            }
            if(!rows.length) {
                return done(null, false)
            }
            if(!bcrypt.compareSync(password, rows[0].password)) {
                return done(null, false)
            }
            return done(null, rows[0]);

        });
    }))
};

module.exports = initializePassport;