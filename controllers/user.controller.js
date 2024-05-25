const db = require('../db');
class UserController {
    
    async createUser(req, res) {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', async() => {
            const parsedBody = JSON.parse(body);
            const userName = parsedBody['name'];
            const userAge = parsedBody['age'];
            if (userName && userAge) {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(await db.createUser(userName, userAge)));
            }
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: "Enter name and age"}));
            }
        });
        
    }

    async getUser(req, res) {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(await db.getUsers()));
    }

    async getUserById(req, res, id){
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(await db.getUserById(Number(id))));
    }

    async deleteUserById(req, res, id){
        if(await db.deleteUser(id)){
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: `THE USER WITH ID = ${id} HAS BEEN DELETED`}));
        }
        else{
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: "ERROR"}));
        }
    }

    async updateUser(req, res, id){
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', async() => {
            const parsedBody = JSON.parse(body);
            const userName = parsedBody['name'];
            const userAge = parsedBody['age'];
            if (userName && userAge && id) {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(await db.updateUser(userName, userAge, id)));
            }
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: "Enter name, age and id"}));
            }
        });
    }


    
}
module.exports = new UserController();