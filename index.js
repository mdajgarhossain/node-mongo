const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = ['Karim', 'Rahim', 'Jabbar', 'Jewell'];

//api return object, create multiple api
app.get('/', (req, res) => {
    const developer = {
        name: 'Jewell',
        age: 27,
        stack: 'FullStack Developer'
    };
    res.send(developer);
});

// app.get('/devs/details', (req, res) => {
//     const frontend = {
//         language: 'Javascript',
//         framework: 'React'
//     };
//     res.send(frontend);
// });

//dynamic api, api parameter, access params, access query
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    // console.log(req.query);
    const name = users[id];
    res.send({id, name});
});

//post
app.post('/addUser', (req, res) => {
    //receive data from client
    console.log('data received', req.body);
    //save to database
    const user = req.body;
    user.id = 7;
    //send back to the client
    res.send(user);
});

app.listen(3000, () => console.log('Server is starting...'));
