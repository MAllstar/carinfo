var express = require('express');
var router = express.Router();
var vsCode = require('../public/javascript/vsCode.js')
var users = require('../public/javascript/conn.js')

router.get('/', function(req, res, next) {
    res.render('generary/regist', { title: "注册" });
});

router.post('/', function(req, res, next) {
    var userInfo = req.body; //获得表单信息
    var regMail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //用来判断邮箱格式
    var regPsd = /^(?![^a-zA-Z]+$)(?!\D+$)/; //用来判断密码
    var isInUser = true; //isIisnUser判断email是否已经注册
    users.users.find({ mail: userInfo.mail }, function(err, response) {
        if (err) {
            res.send("数据库连接出错");
        }
        if (response == "") {
            isInUser = false;
        }
        if (userInfo.vsCode == vsCode.vsCode) { //判断6为验证码是否相同
            if (regMail.test(userInfo.mail)) { //判断邮箱格式
                if (regPsd.test(userInfo.psd)) { //判断密码格式
                    if (userInfo.psd == userInfo.psdAgain) { //判断两次密码是否相同
                        if (!isInUser) { //判断email是否已经注册
                            //将数据写入数据库
                            var newUser = new users.users({
                                mail: userInfo.mail,
                                password: userInfo.psd,
                                name: "",
                                phoneNumber: "",
                                type: "0"
                            });
                            newUser.save(function(err, Person) {
                                if (err)
                                    res.render('generary/regist', { message: "Database error" });
                                else
                                    res.render('index', { message: "注册成功" });
                            });
                        } else {
                            res.render("generary/regist", { message: "此邮箱已被注册" });
                        }
                    } else {
                        res.render("generary/regist", { message: "两次密码不匹配" });
                    }
                } else {
                    res.render("generary/regist", { message: "密码格式有误" });
                }
            } else {
                res.render("generary/regist", { message: "邮箱格式有误" });
            }
        } else {
            res.render("generary/regist", { message: "验证码错误" });
        }
    });
});

module.exports = router;