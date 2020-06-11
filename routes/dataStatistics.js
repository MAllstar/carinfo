var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('generary/dataStatistics', { title: "测试页面", userType: req.session.type });
});

module.exports = router;