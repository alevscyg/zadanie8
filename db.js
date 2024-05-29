const sqlite = require('sqlite3');
const db = new sqlite.Database('sqlite.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    age TINYINT NOT NULL
)`);

module.exports = {
    createUser: async(name, age) => {
        return await new Promise((resolve, reject) => { db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, [name, age], (err) => { 
                if(err) reject(err);
                else resolve('THE USER HAS BEEN CREATED');
            } 
        )});
    },
    getUsers: async() => {
        return await new Promise((resolve, reject) => { db.all(`SELECT * FROM users`, (err, row) => {
                if(row) resolve(row);
                else reject(err);
            } 
        )});
    },
    getUserById: async(id) => {
        return await new Promise((resolve, reject) => { db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
                if(row) resolve(row);
                else reject(err);
            }
        )});
    },
    deleteUser: async(id) => {
        return await new Promise((resolve, reject) => { db.run(`DELETE FROM users WHERE id = ?`, [id] , (err) => { 
                if(err) reject(err);
                else resolve(`THE USER WITH ID = ${id} HAS BEEN DELETED`);
            } 
        )});
    },
    updateUser: async(name, age, id) => {
        return await new Promise((resolve, reject) => { db.run(`UPDATE users SET name = ?, age = ? WHERE id = ?`, [name, age, id], (err) => { 
            if(err) reject(err);
            else resolve(`THE USER WITH ID = ${id} HAS BEEN UPDATED`);
            } 
        )});
    }
};
