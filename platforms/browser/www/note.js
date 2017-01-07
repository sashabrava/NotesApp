function Notes() {
    this.db = window.openDatabase("notes", "1.0", "Notes DB", 200000);
    this.db.transaction(initDB, errorCB, successCB);
}

function initDB(t) {
    t.executeSql('create table if not exists NOTE(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, date DATE)');
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function successCB() {
    console.log("success!");
}
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS NOTE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS NOTE (id unique, title, body)');
    tx.executeSql('INSERT INTO NOTE (id, title, body) VALUES (1, "First row", "Text")');
}
Notes.prototype.getEntry = function (data, callback) {

    this.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM NOTE where id = ?', [data.id], function (tx, results) {
            callback(results.rows);
        })
    }, errorCB);
}

Notes.prototype.add = function (data, callback) {

    this.db.transaction(function (tx) {
        tx.executeSql('insert into NOTE(title,body, date) values(?,?,?)',
            [data.title, data.body, new Date().getTime()])
    }, errorCB, function (tx) {
        callback();
    });
}
Notes.prototype.update = function (data) {

    this.db.transaction(function (tx) {
        tx.executeSql('UPDATE NOTE SET title = ?,body = ?,date = ? WHERE id =? ',
            [data.title, data.body, new Date().getTime(), data.id])
    }, errorCB, successCB);
}

Notes.prototype.remove = function (id) {

    this.db.transaction(function (tx) {
        tx.executeSql('delete from NOTE where id = ?',
            [id])
    }, errorCB, successCB);
}

Notes.prototype.getEntries = function (callback) {
    this.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM NOTE', [], function (tx, results) {
            callback(results.rows);
        }, errorCB);
    }, errorCB);
}
function queryDB(tx) {
    tx.executeSql('SELECT * FROM NOTE', [], querySuccess, errorCB);
}
function querySuccess(tx, results) {
    if (results.rows.length == 0)
        console.log("Empty table!");
    callback(results.rows);
}
