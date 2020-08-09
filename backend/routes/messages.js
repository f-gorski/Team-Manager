const express = require('express');
const messages = express.Router();
const db = require('../db').db;

messages.get('/:userid', (req, res) => {
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
});

messages.get('/find/:msgid', (req, res) => {
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
});

messages.post('/', (req, res) => {
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
});

messages.delete('/:msgid', (req, res) => {
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
});

module.exports = messages;