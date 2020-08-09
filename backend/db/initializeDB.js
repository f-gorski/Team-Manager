//This script is to be run once at the server start to initialize database
//node initializeDB.js

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db', (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log("Connected to database");
    }
});

db.serialize(() => {
    //Create users table
    db.run("CREATE TABLE users(user_id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, role TEXT)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized users")
        }
    });

    db.run("INSERT INTO users(name, email, password, role) VALUES ('Admin', 'admin@test.pl', '$2b$10$WO4YXmdGQH0ou9vCahyqZe0/qZ/bAgO/02HldAXhfUBuQ4eJGf0x.', 'admin' )", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial admin")
        }
    });

    db.run("INSERT INTO users(name, email, password, role) VALUES ('Trener', 'trener@test.pl', '$2b$10$WO4YXmdGQH0ou9vCahyqZe0/qZ/bAgO/02HldAXhfUBuQ4eJGf0x.', 'trainer' )", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial trainer")
        }
    });

    //Create groups table
    db.run("CREATE TABLE groups(group_name TEXT, trainer INTEGER)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized groups")
        }
    });

    db.run("CREATE TABLE group_members(user_id INTEGER, group_id INTEGER, CONSTRAINT unique_member UNIQUE (user_id, group_id))", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized group_members")
        }
    });

    db.run("INSERT INTO groups VALUES ('Grupa piłki nożnej', 2)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });
    db.run("INSERT INTO groups VALUES ('Grupa siatkówki', 2)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });
    db.run("INSERT INTO groups VALUES ('Grupa koszykówki', 2)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });

    //Create group trainers table
    db.run("CREATE TABLE group_trainers(user_id INTEGER, group_id INTEGER)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized group_trainers")
        }
    });

    //Create messages table
    db.run("CREATE TABLE messages(msg_from TEXT, msg_to TEXT, header TEXT, body TEXT)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized messages")
        }
    });

    //Create messages table
    db.run("CREATE TABLE events(id INTEGER, user_id INTEGER, title TEXT, start TEXT)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized events")
        }
    });
})

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });