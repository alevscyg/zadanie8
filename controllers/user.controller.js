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
            await db.createUser(userName, userAge)
            .then(result => {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: result}));
            })
            .catch(err => {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: err}));
            })
        });
        
    }

    getUser = async(req, res) => {
        await db.getUsers()
        .then(result => {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: result}));
        })
        .catch(err => {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: err}));
        })
    }

    getUserById = async(req, res, id) => {
        await db.getUserById((id))
        .then(result => {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: result}));
        })
        .catch(err => {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: err}));
        })
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
            await db.updateUser(userName, userAge, id)
            .then(result => {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: result}));
            })
            .catch(err => {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: err}));
            })
        });
    }
}
module.exports = new UserController();
