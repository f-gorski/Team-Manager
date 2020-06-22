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

    db.run("INSERT INTO users VALUES (1, 'User1', 'test@test.com', 1, 1)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial trainer")
        }
    });

    //tworzenie tabeli grup sportowych
    db.run("CREATE TABLE groups(name TEXT, member_list_id INTEGER, trainer_name TEXT)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Initialized groups")
        }
    });
    db.run("INSERT INTO groups VALUES ('Grupa piłki nożnej', 0, 'Trener 1')", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });
    db.run("INSERT INTO groups VALUES ('Grupa siatkówki', 1, 'Trener 2')", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });
    db.run("INSERT INTO groups VALUES ('Grupa koszykówki', 2, 'Trener 3')", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial group")
        }
    });

    //tworzenie tabeli trenerów
    db.run("CREATE TABLE trainers(trainer_id INTEGER, trainer_name TEXT)", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Created trainers table")
        }
    });

    db.run("INSERT INTO trainers VALUES (1, 'Jan Kowalski')", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial trainer")
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

    db.run("INSERT INTO messages VALUES ('Trener 1', 'Jan Kowalski', 'Zmiana terminu zajęć', 'Nastapiła zmiana terminu zajęć na godzinę 19:00')", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Inserted initial trainer")
        }
    });

})

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });