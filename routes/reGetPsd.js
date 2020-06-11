var express = require('express');
var router = express.Router();
var users = require('../public/javascript/conn.js')
var vsCode = require('../public/javascript/vsCode.js')

router.get('/',function(req, res,next){
    res.render('generary/reGetPsd',{title:'找回密码'});
});

router.post('/',function(req, res,next){
    var regPsd=/^(?![^a-zA-Z]+$)(?!\D+$)/;//用来判断密码
    var formInfo = req.body;//获取表单信息
    users.users.find({mail:formInfo.mail},function(err,response){
        if(err){
            res.render('generary/reGetPsd',{message:'数据库连接失败'})
        }
        else{
            if(response){
                if(formInfo.vsCode == vsCode.vsCode){
                    if(regPsd.test(formInfo.newPsd)){
                        if(formInfo.newPsd == formInfo.newPsdAgain){
                            //改数据库
                            users.users.update({mail: formInfo.mail}, {password: formInfo.newPsd},function(err, response){
                                console.log(response);
                            });
                            res.render('index',{message:'密码已找回'})
                        }
                        else{
                            res.render('generary/reGetPsd',{message:'两次密码不一致'})
                        }
                    }
                    else{
                        res.render('generary/reGetPsd',{message:'密码格式错误'});
                    }
                }
                else{
                    res.render('generary/reGetPsd',{message:'验证码不正确'})
                }
            }
            else{
                res.render('generary/reGetPsd',{message:'不存在此账户'})
            }
        }
    })
})

module.exports = router;

