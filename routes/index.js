var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('index.html');
    //res.render('index', { title: 'Express' });
});

router.get('/upload', function(req, res, next) {
    //res.redirect('upload.html');
    res.sendFile(__dirname + "/public/upload.html");
});

router.get('/list', function(req, res) {
    res.send('list the data by paging.');
});

//search the users by elasticsearch
router.get('/users', function(req, res) {
    var client = elasticsearch.Client({
        host: 'localhost:9200'
    });

    client.search({
        index: 'nodeapp',
        type: 'users'
    }).then(function(response) {
        var hits = response.hits.hits;
        res.send(response);
    }, function(error) {
        console.trace(error.message);
    });

});

module.exports = router;
