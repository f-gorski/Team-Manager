const express = require('express');
const users = express.Router();
const db = require('../db').db;

users.get('/:userid', (req, res) => {
    const userid = req.params.userid;

    db.all('SELECT name, user_id FROM users WHERE NOT user_id = $user_id', {
        $user_id: userid
    }, 
    (err, rows) => {
        if(rows.length > 0) {
            res.send(rows)
        }
    })
});

users.patch('/:userid', (req, res) => {
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
});

users.get('/trainers', (req, res) => {

    db.all(`SELECT user_id, name FROM users WHERE role = 'trainer'`, 
    (err, rows) => {
        if(rows) {
            console.log("GET trainers", rows)
            res.send(rows)
        } else {
            console.log('GET trainers', err.message)
        }
    })
});

module.exports = users;