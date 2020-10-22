const express = require('express');
const events = express.Router();
const db = require('../db').db;

events.get('/:userid', (req, res) => {
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
});

events.post('/', (req, res) => {
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
});

events.delete('/:eventid', (req, res) => {
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
});


module.exports = events;