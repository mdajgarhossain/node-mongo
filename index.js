const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
//hide sensitive data
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

//private data
//hide sensitive data with dotenv
const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });
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

app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({name:'Mobile'}).limit(10).toArray((err, documents) => {
            if(err) {
                console.log(err);
                res.status(500).send({message: err});
            } else {
                console.log('Products extracted from database', documents);
                res.send(documents);
            }
        })
        client.close();
    });
});

//dynamic api, api parameter, access params, access query
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    // console.log(req.query);
    const name = users[id];
    res.send({id, name});
});

//post
app.post('/addProduct', (req, res) => {
    //save to database
    const product = req.body;
    console.log('data received', product);

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send({message: err});
            } else {
                console.log('Successfully inserted', result);
                res.send(result.ops[0]);
            }
        })
        client.close();
    });
});


const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Server is starting...'));
