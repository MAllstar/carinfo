var express = require('express');
var hbs = require('express-handlebars')
var session = require('express-session');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session模块配置信息
var opt = {
    secret: 'keyboard',
    cookie: { maxAge: 60 * 1000 * 30 }, //过期时间
    resave: true,
    saveUninitialized: true,
}
app.use(session(opt)); //加载session模块
app.use(cookieParser());

//各个路由
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/regist', require('./routes/regist'));
app.use('/sendMail', require('./routes/sendMail'));
app.use('/reGetPsd', require('./routes/reGetPsd'));
app.use('/dataStatistics', require('./routes/dataStatistics'));
app.use('/imitate', require('./routes/imitate'));
app.use('/sendidea', require('./routes/directory'));

app.use('/rsu', require('./routes/rsu'));
app.use('/carMeneger', require('./routes/carMeneger'));
app.use('/msgSend', require('./routes/msgSend'));

app.use('/map', require('./routes/map'));

app.use('/userMeneger', require('./routes/userMeneger'));

app.set('views', path.join(__dirname, 'views'));
//静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs'); //设置模板引擎
app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}));




app.listen(3000)