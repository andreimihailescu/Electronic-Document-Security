var express = require('express');
var router = express.Router();

router.post('/insert', function (req, res) {
    var body = req.body;
    var dbs = body.database;
    var coll = body.collection;
    var cont = body.content;

    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost/' + dbs;

    var insertDocument = function (db, callback) {
        db.collection(coll).insertOne(JSON.parse(cont), function (err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into database \'" + dbs + "\' and collection \'" + coll + "\'.");
            callback();
        });
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        insertDocument(db, function () {
            db.close();
        });
    });

    res.send(JSON.stringify('INSERTED'));
});


router.post('/select', function (req, res) {
    var body = req.body;

    var dbs = body.database;
    var coll = body.collection;
    var cond = body.condition;

    console.log("Get a document from database \'" + dbs + "\' and collection \'" + coll + "\'.");

    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost/' + dbs;

    var find = function (db, callback) {
        var cursor = db.collection(coll).find(JSON.parse(cond));
        cursor.each(function (err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
                return res.send(doc);
            } else {
                callback();
                //return res.send('No data.');
            }
        });
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        find(db, function () {
            db.close();
        });
    });
});

router.post('/mongoid', function (req, res) {
    var body = req.body;

    var dbs = body.database;

    console.log("New mongo ID.");

    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost/' + dbs;

    objectId = new ObjectId();

    res.send(objectId);
});

router.post('/selectAll', function (req, res) {

    var body = req.body;

    var dbs = body.database;
    var coll = body.collection;
    var cond = body.condition;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/" + dbs;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = cond;
        db.collection(coll).find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send(result);
        });
    });
});

router.post('/remove', function (req, res) {

    var body = req.body;

    var dbs = body.database;
    var coll = body.collection;
    var cond = body.condition;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/" + dbs;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var myquery = cond;
        db.collection(coll).remove(myquery, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            res.send(obj.result.n + " document(s) deleted");
            db.close();
        });
    });
});

router.post('/update', function (req, res) {

    var body = req.body;

    var dbs = body.database;
    var coll = body.collection;
    var cond = body.condition;
    var nValue = body.newValue;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/" + dbs;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var myquery = cond;
        var newvalues = nValue;
        db.collection(coll).update(myquery, newvalues, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.nModified + " record updated");
            res.send(obj.result.nModified + " record updated");
            db.close();
        });
    });
});


module.exports = router;
