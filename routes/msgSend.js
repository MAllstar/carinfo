var express = require('express');
var router = express.Router();
var msgSend = require('../public/javascript/conn.js')

router.get('/', function (req, res, next) {
  var pageNumber = 0;
  var pageNumber = req.query.pageNumber || 0;
  var pageNumberDel = parseInt(pageNumber) - 1;
  var pageNumberAdd = parseInt(pageNumber) + 1;
  res.render('generary/msgSend',
    {
      title: "信息分发",
      pageNumber: pageNumber,
      pageNumberDel: pageNumberDel,
      pageNumberAdd: pageNumberAdd
    });
});

//写入数据库
router.get('/msgSendDatabase', function (req, res, next) {
  var newMsgSend = new msgSend.msgSend({
    startTime: req.query.startTime,
    continueTime: req.query.continueTime,
    kind: req.query.kind,
    rsu: req.query.rsu,
    content: req.query.content
  })
  newMsgSend.save();
});
//获取数据库数据并返回前端
router.get('/getData', function (req, res, next) {
  var _id = req.query._id;
  var startTime = req.query.startTime;
  var continueTime = req.query.continueTime;
  var kind = req.query.kind;
  var rsu = req.query.rsu;
  var content = req.query.content;

  if (_id != "编号") {
    msgSend.msgSend.findById(_id, function (err, result) {
      res.send(result);
    })
  }
  else if (startTime != "开始时间") {
    msgSend.msgSend.find({ startTime: startTime }, function (err, result) {
      res.send(result);
    })
  }
  else if (continueTime != "持续时间") {
    msgSend.msgSend.find({ continueTime: continueTime }, function (err, result) {
      res.send(result);
    })
  }
  else if (kind != "种类") {
    msgSend.msgSend.find({ kind: kind }, function (err, result) {
      res.send(result);
    })
  }
  else if (rsu != "rsu") {
    msgSend.msgSend.find({ rsu: rsu }, function (err, result) {
      res.send(result);
    })
  }
  else if (content != "内容") {
    msgSend.msgSend.find({ content: content }, function (err, result) {
      res.send(result);
    })
  }
  else{
    msgSend.msgSend.find( function (err, result) {
      res.send(result);
    })
  }
});

router.get('/delData', function (req, res, next) {
  var _id = req.query._id;
  msgSend.msgSend.findByIdAndRemove(_id, function (err, result) {
    res.send("删除" + _id + "成功");
  });
})
module.exports = router;
