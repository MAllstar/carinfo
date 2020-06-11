var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('generary/imitate', {
        title: "模拟分发过程",
    });
});


module.exports = router;