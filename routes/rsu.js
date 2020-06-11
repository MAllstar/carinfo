var express = require('express');
var router = express.Router();
var rsu = require('../public/javascript/conn.js')

router.get('/',  function(req, res,next){
  var pageNumber = 0;
  var pageNumber = req.query.pageNumber || 0;
  var pageNumberDel = parseInt(pageNumber) - 1;
  var pageNumberAdd = parseInt(pageNumber) + 1;
  res.render('generary/rsu',
  {
    title:"路测单元",
    pageNumber:pageNumber,
    pageNumberDel:pageNumberDel,
    pageNumberAdd:pageNumberAdd
  });
});

//写入数据库
router.get('/rsuDatabase',function(req, res,next){
  var newRsu = new rsu.rsu({
    loAndLa: req.query.loAndLa,
    carNum: 2,
    state: '运行中',
    group: req.query.group
    })
    newRsu.save();
});
//获取数据库数据并返回前端
router.get('/getData',function(req, res,next){
  var _id = req.query._id;
  var loAndLa = req.query.loAndLa;
  var carNum = req.query.carNum;
  var state = req.query.state;
  var group = req.query.group;

  if(_id != "编号"){
    rsu.rsu.findById(_id,function(err, result){
      res.send(result);
    })
  }
  else{
    if(loAndLa != "经纬度"){
      rsu.rsu.find({loAndLa:loAndLa},function(err, result){
        res.send(result);
      })
    }
    else{
      if(carNum != "范围内车辆数" && state == "状态" && group == "组别"){
        rsu.rsu.find({carNum:carNum},function(err, result){
          res.send(result);
        })
      }
      else if(carNum == "范围内车辆数" && state != "状态" && group == "组别"){
        rsu.rsu.find({state:state},function(err, result){
          res.send(result);
        })
      }
      else if(carNum == "范围内车辆数" && state == "状态" && group != "组别"){
        rsu.rsu.find({group:group},function(err, result){
          res.send(result);
        })
      }
      else if(carNum != "范围内车辆数" && state != "状态" && group == "组别"){
        rsu.rsu.find({carNum:carNum,state:state},function(err, result){
        })
      }
      else if(carNum != "范围内车辆数" && state == "状态" && group != "组别"){
        rsu.rsu.find({carNum:carNum,group:group},function(err, result){
          res.send(result);
        })
      }
      else if(carNum == "范围内车辆数" && state != "状态" && group != "组别"){
        rsu.rsu.find({state:state,group:group},function(err, result){
          res.send(result);
        })
      }
      else if(carNum != "范围内车辆数" && state != "状态" && group != "组别"){
        rsu.rsu.find({carNum:carNum,state:state,group:group},function(err, result){
          res.send(result);
        })
      }
      else{
        rsu.rsu.find(function(err, result){
          res.send(result);
        })
      }
    }
  }
});

router.get('/delData',function(req,res,next){
  var _id = req.query._id;
  rsu.rsu.findByIdAndRemove(_id,function(err, result){
    res.send("删除"+_id+"成功");  
  });
})
module.exports = router;
