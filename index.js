const express = require('express');
const app = express();

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

app.get('/devs/details', (req, res) => {
    const frontend = {
        language: 'Javascript',
        framework: 'React'
    };
    res.send(frontend);
});

//dynamic api, api parameter, access params, access query
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.query);
    const name = users[id];
    res.send({id, name});
});

app.listen(3000, () => console.log('Server is starting...'));
