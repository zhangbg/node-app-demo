var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with the file resource');
});

router.get('/downloadcss', function(req, res) {
    res.download('../public/stylesheets/style.css', 'downloadcss.css');
});

router.get('/newfile/:content', function(req, res) {
    var content = req.params.content;
    fs.writeFile('../temp/newfile' + new Date().getTime() + '.txt', content, function(err) {
        if (err) throw err;
        console.log('Yeah, It\'s saved!');
        res.send('The content is ' + content);
    });
});

router.get('/cvs', function(req, res) {
    var content = [
            ['col1', 'col2'],
            [1, 'test'],
            [2, 'test2']
        ],
        output = [],
        temp;
    for (var i = 0, length = content.length; i < length; i++) {
        temp = content[i];
        output.push(temp.join(',') + '\n');
    }

    fs.writeFile('../temp/newcvs' + new Date().getTime() + '.csv', output.join(''), function(err) {
        if (err) throw err;
        console.log('Yeah, It\'s saved!');
        res.send('The content is ' + output);
    });
});


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../temp/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
})
var upload = multer({
    storage: storage
}).array('userPhoto', 2);
router.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        // console.log(req.body);
        console.log(req.files);
        if (err) {
            console.dir(err);
            return res.end("Error uploading file : " + err.code);
        }
        fs.readFile(req.files[0].path, (err, data) => {
            if (err) throw err;
            console.log(data.toString());
        });
        res.end("File is uploaded");
    });
});

module.exports = router;
