const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/database.db', (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log("Connected to database");
    }
});

module.exports = {
    db: db
}