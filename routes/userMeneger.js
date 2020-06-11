var express = require('express');
var router = express.Router();
var db = require('../public/javascript/conn.js')

router.get('/', function (req, res, next) {
  var pageNumber = 0;
  var pageNumber = req.query.pageNumber || 0;
  var pageNumberDel = parseInt(pageNumber) - 1;
  var pageNumberAdd = parseInt(pageNumber) + 1;
  res.render('generary/userMeneger',
    {
      title: "用户管理",
      pageNumber: pageNumber,
      pageNumberDel: pageNumberDel,
      pageNumberAdd: pageNumberAdd
    });
});

//写入数据库
router.get('/addUser', function (req, res, next) {
  var userInfo = req.query;
  var newUser = new db.users({
    mail: userInfo.mail,
    password: userInfo.password,
    name: userInfo.name,
    phoneNumber: userInfo.phoneNumber,
    type: userInfo.type
  })
  newUser.save();
});

//修改密码
router.get('/changePsd', function (req, res, next) {
  var userInfo = req.query;
  db.users.findOneAndUpdate({ mail: userInfo.mail }, { password: userInfo.password },
    function(){
      res.send("修改密码成功");
    }
    );
});

//修改权限
router.get('/changePermission', function (req, res, next) {
  var userInfo = req.query;
  db.users.findOneAndUpdate({ mail: userInfo.mail }, { type: userInfo.type },
    function(){
      res.send("修改权限成功");
    }
    );
});

//显示数据库返回前端
router.get('/getData', function (req, res, next) {
  var _id = req.query._id;
  var mail = req.query.mail;
  var password = req.query.password;
  var name = req.query.name;
  var phoneNumber = req.query.phoneNumber;
  var type = req.query.type;

  console.log(_id);
  if (_id != "") {
    db.users.find({ _id: _id }, function (err, result) {
      res.send(result);
    })
  }
  else if (mail != "") {
    db.users.find({ mail: mail }, function (err, result) {
      res.send(result);
    })
  }
  else if (password != "") {
    db.users.find({ password: password }, function (err, result) {
      res.send(result);
    })
  }
  else if (name != "") {
    db.users.find({ name: name }, function (err, result) {
      res.send(result);
    })
  }
  else if (phoneNumber != "") {
    db.users.find({ phoneNumber: phoneNumber }, function (err, result) {
      res.send(result);
    })
  }
  else if (type != "") {
    db.users.find({ type: type }, function (err, result) {
      res.send(result);
    })
  }
  else {
    db.users.find(function (err, result) {
      res.send(result);
    })
  }
});

router.get('/delData', function (req, res, next) {
  var _id = req.query._id;
  db.users.findByIdAndRemove(_id, function (err, result) {
    res.send("删除" + _id + "成功");
  });
})

module.exports = router;
