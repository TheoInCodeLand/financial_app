const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./financial-advisor.db');

// Create Users table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    // Create Expenses table
    db.run(`CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        income REAL,
        debitOrders REAL,
        currentExpenses REAL,
        rent REAL,
        FOREIGN KEY(userId) REFERENCES users(id)
    )`);
});

module.exports = db;
