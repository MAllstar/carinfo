var express = require('express');
var router = express.Router();
var carMeneger = require('../public/javascript/conn.js')

router.get('/', function(req, res, next) {
    var pageNumber = 0;
    var pageNumber = req.query.pageNumber || 0;
    var pageNumberDel = parseInt(pageNumber) - 1;
    var pageNumberAdd = parseInt(pageNumber) + 1;
    res.render('generary/carMeneger', {
        title: "车辆管理",
        pageNumber: pageNumber,
        pageNumberDel: pageNumberDel,
        pageNumberAdd: pageNumberAdd
    });
});

//写入数据库
router.get('/carMenegerDatabase', function(req, res, next) {
    var newCarMeneger = new carMeneger.carMeneger({
        license: req.query.license,
        carOwner: req.query.carOwner,
        message: '这是msg',
        rsu: req.query.rsu,
        time: "2019年"
    })
    newCarMeneger.save();
});
//获取数据库数据并返回前端
router.get('/getData', function(req, res, next) {
    var _id = req.query._id;
    var license = req.query.license;
    var carOwner = req.query.carOwner;
    var message = req.query.message;
    var rsu = req.query.rsu;
    var time = req.query.time;

    if (_id != "编号") {
        carMeneger.carMeneger.findById(_id, function(err, result) {
            res.send(result);
        })
    } else {
        if (license != "牌照") {
            carMeneger.carMeneger.find({ license: license }, function(err, result) {
                res.send(result);
            })
        } else {
            if (carOwner != "车主" && rsu == "所在路测单元" && time == "时间") {
                carMeneger.carMeneger.find({ carOwner: carOwner }, function(err, result) {
                    res.send(result);
                })
            } else if (carOwner == "车主" && rsu != "所在路测单元" && time == "时间") {
                carMeneger.carMeneger.find({ rsu: rsu }, function(err, result) {
                    res.send(result);
                })
            } else if (carOwner == "车主" && rsu == "所在路测单元" && time != "时间") {
                carMeneger.carMeneger.find({ time: time }, function(err, result) {
                    res.send(result);
                })
            } else if (carOwner != "车主" && rsu != "所在路测单元" && time == "时间") {
                carMeneger.carMeneger.find({ carOwner: carOwner, rsu: rsu }, function(err, result) {})
            } else if (carOwner != "车主" && rsu == "所在路测单元" && time != "时间") {
                carMeneger.carMeneger.find({ carOwner: carOwner, time: time }, function(err, result) {
                    res.send(result);
                })
            } else if (carOwner == "车主" && rsu != "所在路测单元" && time != "时间") {
                carMeneger.carMeneger.find({ rsu: rsu, time: time }, function(err, result) {
                    res.send(result);
                })
            } else if (carOwner != "车主" && rsu != "所在路测单元" && time != "时间") {
                carMeneger.carMeneger.find({ carOwner: carOwner, rsu: rsu, time: time }, function(err, result) {
                    res.send(result);
                })
            } else {
                carMeneger.carMeneger.find(function(err, result) {
                    res.send(result);
                })
            }
        }
    }
});

router.get('/delData', function(req, res, next) {
    var _id = req.query._id;
    carMeneger.carMeneger.findByIdAndRemove(_id, function(err, result) {
        res.send("删除" + _id + "成功");
    });
})
module.exports = router;