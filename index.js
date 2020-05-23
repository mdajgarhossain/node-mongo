const express = require('express');
const app = express();

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

app.listen(3000, () => console.log('Server is starting...'));
