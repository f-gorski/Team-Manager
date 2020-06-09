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
    db.all('SELECT name, group_id FROM groups', (err, rows) => {
        //const groupId = rows.map(el => {el.name, el.group_id});
        
        res.send(rows);
    })
    
});

app.post('/api/groups', (req, res) => {
    const group = Object.values(req.body);
    console.log(group);

    let placeholders = group.map((column) => '?').join(',');
    let sql = 'INSERT INTO groups (group_id, name, member_list_id, trainer_name) VALUES (' + placeholders + ')';
    console.log(sql);

    db.run(sql, group, (err) => {
    if (err) {
      return console.log(err.message);
    }
    res.send("Group added");
    });
})

app.get('/api/groups/:groupid', (req, res) => {
    const groupid = req.params.groupid;
    db.all('SELECT * FROM groups where group_id=$id', {
        $id: groupid
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
    db.all('DELETE FROM groups where group_id=$id', {
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

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));