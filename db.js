const sqlite = require('sqlite3');
const db = new sqlite.Database('sqlite.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    age TINYINT NOT NULL
)`);
module.exports = {
    createUser: async(name, age) => {
        db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, [name, age]);
        return 'THE USER HAS BEEN CREATED';
    },
    getUsers: async() => {
        return await new Promise((resolve) => {
            db.all(`SELECT * FROM users`, (err, row) => {resolve(row)});
        });
    },
    getUserById: async(id) => {
        return await new Promise((resolve) => {
            db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {resolve(row)});
        });
    },
    deleteUser: async(id) => {
        return db.run(`DELETE FROM users WHERE id = ?`, [id]);
    },
    updateUser: async(name, age, id) => {
        db.run(`UPDATE users SET name = ?, age = ? WHERE id = ?`,[name, age, id]);
        return `THE USER WITH ID = ${id} HAS BEEN UPDATED`;
    }

};
