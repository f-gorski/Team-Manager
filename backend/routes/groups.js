const express = require('express');
const groups = express.Router();
const db = require('../db').db;

groups.get('/', (req, res) => {
    db.all('SELECT group_name, rowid FROM groups', (err, rows) => {
        res.send(rows);
    })
});

groups.post('/', (req, res) => {
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
});

groups.get('/:groupid', (req, res) => {
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
});

groups.delete('/:groupid', (req, res) => {
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
});

module.exports = groups;