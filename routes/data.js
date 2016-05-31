var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with the data resource');
});

// query all users from sqlite3
router.get('/query-users', function(req, res) {
    var db = new sqlite3.Database('../demo.db');
    db.serialize(function() {
        db.all("SELECT * FROM user", function(err, rows) {
            if (err) {
                return res.send([]);
            }
            res.send(rows);
        });
    });
    db.close();
});

// query single user by the user id
router.get('/query-user/:id', function (req, res) {
    var db = new sqlite3.Database('../demo.db');
    if (req.params.id) {
        db.serialize(function() {
            db.get("SELECT * FROM user where id = $id", {$id : req.params.id}, function(err, row) {
                if (err) {
                    return res.send({});
                }
                res.send(row);
            });
        });
    } else {
        res.send({});
    }
    db.close();
});

module.exports = router;
