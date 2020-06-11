var express = require('express');
var router = express.Router();
var rsu = require('../public/javascript/conn.js')

router.get('/', function(req, res, next) {
    res.render('generary/map', {
        title: "路测单元地图地图显示",
    });
});


//获取数据库数据并返回前端
router.get('/getMapdata', function(req, res, next) {
    rsu.rsu.find(function(err, result) {
        console.log(result);
        res.send(result);
    });
});

module.exports = router;