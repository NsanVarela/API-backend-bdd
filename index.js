const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const apiRoutes = require("./api-routes")
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myApp';
const contact = 'contact';

app.get('/', (req, res) => res.send('Hello World avec Express et Nodemon'));

/* Liste de tous les contacts */
app.get('/', function (req, res) {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true}, function (err, db) {
        const dbo = db.db(dbName);
        dbo.collection(contact).find({}).toArray(function (err, val) {
            // res.send(val);
            db.close();
        });
    });
});

// /* Récupérer un seul contact */
app.get('/', function (req, res) {
    const user = {
        _id: new ObjectId("5bec28c9d8631e0dc701c665")
    };
    MongoClient.connect(mongoUrl, { useNewUrlParser: true}, function (err, db) {
        const dbo = db.db(dbName);
        dbo.collection(contact).findOne(user, function (err, val) {
            res.send(val);
            db.close();
        });
    });
});

// /* Créer un nouveau  contact */
app.post('/', function (req, res) {
    const user = {
        firstname: "prénom ok",
        lastname: "nom ok",
        email: "email ok"
    };
    MongoClient.connect(mongoUrl, { useNewUrlParser: true}, function (err, db) {
        const dbo = db.db(dbName);
        dbo.collection(contact).insertOne(user, function (err, val) {
            // res.send(val);
            db.close();
        });
    });
});

/* Mettre à jour un contact unique */
app.put('/', function (req, res) {
    const user = { _id: new ObjectId("5bec28c9d8631e0dc701c665")};
    const newDatas = {
        $set: {
          firstname: "Bob",
          lastname: "Toto",
          email: "bob@toto.com"
        }
    };
    MongoClient.connect(mongoUrl, { useNewUrlParser: true}, function (err, db) {
        const dbo = db.db(dbName);
        dbo.collection(contact).updateOne(user, newDatas, function (err, val) {
            res.send(val);
            db.close();
        });
    });
});

/* Effacer un seul contact */
app.delete('/', function (req, res) {
    const user = {
        _id: new ObjectId("5bec36be5fcdc916fb442e46")
    };
    MongoClient.connect(mongoUrl, { useNewUrlParser: true}, function (err, db) {
        const dbo = db.db(dbName);
        dbo.collection(contact).deleteOne(user, function (err, val) {
            res.send(val);
            db.close();
        });
    });
});

app.listen(port, function () {
     console.log("Lancement de myApp sur le port " + port);
});
app.use('/api', apiRoutes)
