var express = require('express');
var router = express.Router();
var ideaSend = require('../public/javascript/conn.js')
var users = require('../public/javascript/conn.js')

//写入数据库
router.get('/', function(req, res, next) {
    var t = new Date();
    var newIdea = new ideaSend.ideaSend({
        userName: req.query.userId,
        ideaTitle: req.query.ideaTitle,
        ideaContent: req.query.ideaContent,
        ideaPhone: req.query.ideaPhone,
        ideaTime: t,
    })
    newIdea.save();
    res.send("success");
});

router.get('/showInfo', function(req, res, next) {
    users.users.find({ mail: req.query.userId }, function(err, result) {
        res.send(result);
    })
});

router.get('/updateInfo', function(req, res, next) {

    users.users.findByIdAndUpdate(req.query.oneId, { mail: req.query.thisEmail, password: req.query.thisSecond, name: req.query.thisName, phoneNumber: req.query.thisPhone },
        function(err, response) {
            res.send("success");
            console.log(response);
        });

});


module.exports = router;