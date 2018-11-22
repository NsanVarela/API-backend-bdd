const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myApp';
const collectionName = 'contact';

app.use(express.json());

app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

app.get('/user', function (req, res) {
    MongoClient.connect(mongoUrl, {
        useNewUrlParser: true
    }, function (err, db) {
        const dbo = db.db(dbName);
        const user = {
            "_id": new ObjectId(req.query._id)
        };
        dbo.collection(collectionName).findOne(user, function (err, val) {
            res.send(val);
            db.close();
        });
    });
});

app.get('/users', function (req, res) {
    MongoClient.connect(mongoUrl, {
        useNewUrlParser: true
    }, function (err, db) {
        const dbo = db.db(dbName);
        dbo.collection(collectionName).find({}).toArray(function (err, val) {
            res.send(val);
            db.close();
        });
    });
});


app.post('/user', function (req, res) {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    };
    MongoClient.connect(mongoUrl, {
        useNewUrlParser: true
    }, function (err, db) {
        const dbo = db.db(dbName);
        dbo.collection(collectionName).insertOne(user, function (err, val) {
            res.send(val);
            db.close();
        });
    });
});

app.put('/user', function (req, res) {
    MongoClient.connect(mongoUrl, {
        useNewUrlParser: true
    }, function (err, db) {
        const dbo = db.db(dbName);
        const user = {
            "_id": new ObjectId(req.query._id)
        }
        dbo.collection(collectionName).findOneAndUpdate(
            user,
            { $set: 
                {
                    "firstname": req.body.firstname,
                    "lastname": req.body.lastname,
                    "email": req.body.email
                }
            },
            function (err, val) {
                res.send(val);
                db.close();
            }
        );
    });
});

app.delete('/user', function (req, res) {
    const user = {
        _id: new ObjectId(req.query._id)
    };
    MongoClient.connect(mongoUrl, {
        useNewUrlParser: true
    }, function (err, db) {
        const dbo = db.db(dbName);
        dbo.collection(collectionName).deleteOne(user, function (err, val) {
            res.send(val);
            db.close();
        });
    });
});

app.listen(port, function () {
    console.log("Lancement de myApp sur le port " + port);
});