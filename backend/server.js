if(process.envNODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')

const app = express();
const port = 5000;

//Obsługa CORS dla wszystkich requestów
app.use(cors());

//Obsługa json dla wszystkich requestów
app.use(express.json());


//Database
let db = new sqlite3.Database('./db/database.db', (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log("Connected to database");
    }
});

module.exports = {
    db: db,
}



//Autentykacja

const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const passport = require('passport');
const initializePassport = require('./passport');

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', passport.authenticate('local-login'), (req, res) => {
    delete req.user.password;
    res.send({user: req.user})
})

app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    delete req.user.password;
    res.send({user: req.user});
})

app.get('/logout', (req, res) => {
    req.logout();
    res.send({message: "Wylogowano"})
})



app.get('/api/', (req, res) => res.send('API działa'));

app.get('/api/groups', (req, res) => {
    db.all('SELECT group_name, rowid FROM groups', (err, rows) => {
        res.send(rows);
    })
    
});

app.post('/api/groups', (req, res) => {
    let group = Object.values(req.body);

    db.serialize(() => {

        let placeholders = group.map((column) => '?').join(',');
        let sql = 'INSERT INTO groups (group_name, trainer) VALUES (' + placeholders + ')';
        console.log(sql);
    
        db.run(sql, group, function(err) {
        if (err) {
          return console.log(err.message);
        } else {
            db.all('INSERT INTO group_trainers(user_id, group_id) VALUES($userid, $groupid)', {
                $userid: group[1],
                $groupid: this.lastID
            }, (err) => {
                if(err) {
                    return console.log(err.message)
                } else {
                    return null
                    //return res.send("Group added");
                }
            })

            db.all('INSERT INTO group_members(user_id, group_id) VALUES($userid, $groupid)', {
                $userid: "",
                $groupid: this.lastID
            }, (err) => {
                if(err) {
                    return console.log(err.message)
                } else {
                    return res.send("Group added");
                }
            })
        }})   
    })
})

app.get('/api/groups/:groupid', (req, res) => {
    const groupid = req.params.groupid;

    db.all(`SELECT DISTINCT groups.group_name, groups.trainer, t.name AS trainer, u.name AS name
            FROM groups
            INNER JOIN group_members ON group_members.group_id = groups.rowid
            INNER JOIN users u ON group_members.user_id = u.user_id
            INNER JOIN users t ON groups.trainer = t.user_id
            WHERE group_members.group_id = $group_id`,
            {
                $group_id: groupid
            },
    (err, rows) => {
        console.log("group rows", rows)
        if(rows.length > 0) {
            const resBody = {
                group_name: rows[0].group_name,
                trainer: rows[0].trainer,
                members: []
            }
            rows.forEach((row, index) => {
                if(index == 0) {
                    resBody.group_name = row.group_name;
                    resBody.trainer_name = row.trainer;
                    resBody.members.push(row.name)
                } else {
                    resBody.members.push(row.name);
                }
            })
            console.log("res.send groupDetails", resBody)
            return res.send(resBody);

        } else {
            return res.send({});
        } 
    })
})


app.patch('/api/users/:userid', (req, res) => {
    const userid = req.params.userid;
    const groupid = req.body.groupid;

    console.log("userid, groupid", userid, groupid)

    db.serialize(() => {
        db.all('INSERT INTO group_members(user_id, group_id) VALUES($userid, $groupid);', {
            $userid: userid,
            $groupid: groupid
        }, (err) => {
            console.log(err)
        })
    })

})

app.delete('/api/groups/:groupid', (req, res) => {
    const groupid = req.params.groupid;
    db.all('DELETE FROM groups WHERE rowid=$id', {
        $id: groupid
    },
    (err) => {
        if(err) {
            return console.log(err.message);
        } else {
            res.send("Usunięto grupę");
        } 
    })
})

app.get('/api/users/trainers', (req, res) => {

    db.all(`SELECT user_id, name FROM users WHERE role = 'trainer'`, 
    (err, rows) => {
        if(rows) {
            console.log("GET trainers", rows)
            res.send(rows)
        } else {
            console.log('GET trainers', err.message)
        }
    })
})

app.get('/api/users/:userid', (req, res) => {
    const userid = req.params.userid;

    db.all('SELECT name, user_id FROM users WHERE NOT user_id = $user_id', {
        $user_id: userid
    }, 
    (err, rows) => {
        if(rows.length > 0) {
            res.send(rows)
        }
    })
})

app.get('/api/messages/:userid', (req, res) => {
    const userid = req.params.userid;

    db.all('SELECT rowid, header, msg_from, msg_to FROM messages WHERE msg_to = $userid OR msg_from = $userid', {
        $userid: userid
    },
    (err, rows) => {
        const recievedMsg = rows.filter((row) => row.msg_to == userid);
        const sentMsg = rows.filter((row) => row.msg_from == userid);
        const messages = {
            recieved: recievedMsg,
            sent: sentMsg
        }
        res.send(messages);
    });
})

app.get('/api/messages/find/:msgid', (req, res) => {
    const msgid = req.params.msgid;

    db.get(`SELECT messages.header, messages.body, u1.name AS msg_from, u2.name AS msg_to
            FROM messages
            INNER JOIN users u1 ON messages.msg_from = u1.user_id
            INNER JOIN users u2 ON messages.msg_to = u2.user_id
            WHERE messages.rowid = $message_id`, {
        $message_id: msgid
        },
        (err, row) => {
            if(row) {
                res.send(row);
            } else {
                res.send({})
            } 
        }
    )
})

app.post('/api/messages/', (req, res) => {
    let message = Object.values(req.body);

    db.serialize(() => {
        let placeholders = message.map((column) => '?').join(',');
        let sql = 'INSERT INTO messages (msg_from, msg_to, header, body) VALUES (' + placeholders + ')';
    
        db.run(sql, message, function(err) {
        if (err) {
          return console.log(err.message);
        }

        res.send("Message sent");
        });

        
    })
})

app.delete('/api/messages/:msgid', (req, res) => {
    const msgid = req.params.msgid;
    db.all('DELETE FROM messages WHERE rowid=$msgid', {
        $msgid: msgid
    },
    (err) => {
        if(err) {
            return console.log(err.message);
        } else {
            res.send("Usunięto wiadomość");
        } 
    })
})

app.get('/api/events/:userid', (req, res) => {
    const userid = req.params.userid
    db.all(`SELECT title, start, id FROM events WHERE user_id = $userid`,
    {
        $userid: userid
    }, 
    (err, rows) => {
        if(rows) {
            console.log("GET events", rows)
            res.send(rows)
        } else {
            console.log('GET events', err.message)
        }
    })
})

app.post('/api/events/', (req, res) => {
    let event = Object.values(req.body);

    db.serialize(() => {
        let placeholders = event.map((column) => '?').join(',');
        let sql = 'INSERT INTO events (id, user_id, title, start) VALUES (' + placeholders + ')';
    
        db.run(sql, event, function(err) {
        if (err) {
          return console.log(err.message);
        }

        res.send("Events");
        });
    })
})

app.delete('/api/events/:eventid', (req, res) => {
    const eventid = req.params.eventid;
    db.all('DELETE FROM events WHERE id=$eventid', {
        $eventid: eventid
    },
    (err) => {
        if(err) {
            return console.log(err.message);
        } else {
            res.send("Usunięto wydarzenie");
        } 
    })
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));