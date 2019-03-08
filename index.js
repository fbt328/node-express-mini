// implement your API here
require('dotenv').config();
const express = require('express');
const db = require('./data/db.js')

const server = express();
server.use(express.json());
PORT = process.env.PORT || 4000;
// test .get to make sure the server is working
// server.get('/', (req, res) => {
//     res.send('Hello World, from node-express-mini');
// });

// | GET    | /api/users     | Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to grab users'});
    })
});

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log('new user', req.body);
    
        db.insert(newUser)
        .then(dbUser => {
            res.status(201).json(dbUser);
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to send users'});
        })
    
});
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(users => {
        if(users) {
            res.json(users)
        } else {
            res.status(400).json({err: 'invalid ID'})
        }
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to delete users'});
        })
});

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. 
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const {name, bio} = req.body;
    db.update(id, req.body)
        .then(dbUser => {
            if (dbUser) {
                res.json(dbUser);
            } else {
                res.status(400).json({err: 'invalid ID'})
            }
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to delete users'});
        })
});

// | GET    | /api/users/:id | Returns the user object with the specified `id`.   
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(users => {
            res.json(users);
            console.log('success!')
        })
        .catch(err => {
            res.status(500).json({err: 'failed to grab individual user by ID'})
        })
});


// server.listen should be the last bit
server.listen(port, () => {
    console.log(`server is now listening on port ${port}`);
});