//Ten skrypt jest przeznaczony do jednorazowego zainicjalizowania bazy danych
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
    //tworzenie tabeli użytkowników
    db.run("CREATE TABLE users(user_id INTEGER PRIMARY KEY, name TEXT, email TEXT, group_id INTEGER, msg_id INTEGER)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized users")
        }
    });

    //tworzenie tabeli grup sportowych
    db.run("CREATE TABLE groups(group_id INTEGER PRIMARY KEY, name TEXT, member_list_id INTEGER, trainer_id INTEGER)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized groups")
        }
    });
    db.run("INSERT INTO groups VALUES (0, 'Grupa piłki nożnej', 0, 0)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });
    db.run("INSERT INTO groups VALUES (1, 'Grupa siatkówki', 1, 0)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });
    db.run("INSERT INTO groups VALUES (2, 'Grupa koszykówki', 2, 0)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });

    //tworzenie tabeli członków grup
    db.run("CREATE TABLE members(user_id INTEGER PRIMARY KEY, name TEXT, group_id INTEGER)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Created members table")
        }
    });

    //tworzenie tabeli wiadomości tekstowych
    db.run("CREATE TABLE messages(msg_from TEXT, msg_to TEXT, header TEXT, body TEXT)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Created members table")
        }
    });

})

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });