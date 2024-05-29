const db = require('../db');
class UserController {
    
    createUser = async(req, res) => {
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

    getUser = async(req, res) => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(await db.getUsers()));
    }

    getUserById = async(req, res, id) => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(await db.getUserById(Number(id))));
    }

    deleteUserById = async(req, res, id) => {
        await db.deleteUser(id)
        .then(result => {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: result}));
        })
        .catch(err => {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: err}));
        })
    }

    updateUser = async(req, res, id) => {
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
