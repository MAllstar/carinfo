var express = require('express');
var router = express.Router();

var users = require('../public/javascript/conn.js')

router.get('/', function(req, res, next) {
    res.render('generary/login', { title: "登陆" });
});

router.post('/', function(req, res, next) {
    var userInfo = req.body; //Get the parsed information
    if (!userInfo.mail || !userInfo.psd) {
        res.render("generary/login", { message: "有空输入" });
    } else {
        users.users.find({ mail: userInfo.mail }, function(err, response) {
            let data = JSON.stringify(response);
            var data1 = eval(data);
            req.session.type = data1[0].type;

            if (response && response != "") {
                if (userInfo.psd == data1[0].password) {
                    //登陆成功 
                    res.render("generary/dataStatistics", { title: '数据统计', userType: data1[0].type });
                } else {
                    res.render("generary/login", { message: "密码错误" });
                }
            } else {
                res.render("generary/login", { message: "没有此用户" });
            }
        });
    }
});

module.exports = router;