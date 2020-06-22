const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')

const app = express();
const port = 5000;

let db = new sqlite3.Database('./db/database.db', (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log("Connected to database");
    }
});

//Obsługa CORS dla wszystkich requestów
app.use(cors());

//Obsługa json dla wszystkich requestów
app.use(express.json());

app.get('/api/', (req, res) => res.send('API działa'));

app.get('/api/groups', (req, res) => {
    db.all('SELECT name, rowid FROM groups', (err, rows) => {
        //const groupId = rows.map(el => {el.name, el.group_id});
        
        res.send(rows);
    })
    
});

app.post('/api/groups', (req, res) => {
    let group = Object.values(req.body);

    db.serialize(() => {

        let placeholders = group.map((column) => '?').join(',');
        let sql = 'INSERT INTO groups (name, member_list_id, trainer_name) VALUES (' + placeholders + ')';
        console.log(sql);
    
        db.run(sql, group, (err) => {
        if (err) {
          return console.log(err.message);
        }
        res.send("Group added");
        });
    })
})

app.get('/api/groups/:groupid', (req, res) => {
    const groupid = req.params.groupid;
    db.all('SELECT * FROM groups WHERE rowid = $groupid', {
        $groupid: groupid
    },
    (err, rows) => {
        if(rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.send({})
        } 
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
    db.all('SELECT * FROM messages WHERE rowid=$msgid', {
        $msgid: msgid
    },
    (err, rows) => {
        if(rows.length > 0) {
            res.send(rows);
        } else {
            res.send({})
        } 
    })
})

app.post('/api/messages/', (req, res) => {
    let message = Object.values(req.body);

    db.serialize(() => {

        let placeholders = message.map((column) => '?').join(',');
        let sql = 'INSERT INTO messages (msg_from, msg_to, header, body) VALUES (' + placeholders + ')';
        console.log(sql);
    
        db.run(sql, message, (err) => {
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

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));