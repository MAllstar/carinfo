var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
var vsCode = require('../public/javascript/vsCode.js');

let mailTransport = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secureConnection: false,
    auth: {
        user: '13736290450@163.com', //注册的163邮箱账号
        pass: 'ldl19981210' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
    }
});

router.get('/', function(req, res){
  var mail = {
    // 发件人
    from: '<13736290450@163.com>',
    // 主题
    subject: '验证码',//邮箱主题
    // 收件人
    to:req.query.mail,//前台传过来的邮箱
    // 邮件内容，HTML格式
    text: '用'+vsCode.vsCode+'作为你的验证码'//发送验证码
  };
    
  mailTransport.sendMail(mail, function(error, info){
    if(error) {
      return console.log(error);
    }
      console.log('mail发送成功', info.response);
  });
})

module.exports = router;

