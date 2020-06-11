var ctx = document.getElementById('canvas').getContext('2d');
var lastTime = 0; //用来控制动画的更新速度

var car = new Image();
var road = new Image();
var rtu = new Image();
var msg = new Image();
var msg_locked = new Image();

car.src = 'images/car1.png'; //汽车
road.src = 'images/road.png'; //马路
rtu.src = 'images/RTU.png'; //路测单元
msg.src = 'images/msg.png';
msg_locked = 'images/msg_locked.png';

var carX = 80,
    carY = 130; //车的初始位置
var msgX = 434,
    msgY = 90;

var car_state = true; //汽车是否行驶
var animate_state = false; //动画函数调用状态
var msg_isSend = false; //消息是否发送

//省内省外单选框
var fromWhere_1 = document.getElementById('fromWhere_1'); //省内input
var fromWhere_2 = document.getElementById('fromWhere_2'); //省外input
var carSpeed = document.getElementById('carSpeed'); //车速input
var direction_1 = document.getElementById('direction_1'); //东到西input
var direction_2 = document.getElementById('direction_2'); //西到东input
var direction_3 = document.getElementById('direction_3'); //北到南input
var direction_4 = document.getElementById('direction_4'); //南到北input

//msg定义
var msg_fromWhere_1 = document.getElementById('msg_fromWhere_1'); //msg_省内input
var msg_fromWhere_2 = document.getElementById('msg_fromWhere_2'); //msg_省外input
var msg_direction_1 = document.getElementById('msg_direction_1'); //msg_东到西input
var msg_direction_2 = document.getElementById('msg_direction_2'); //msg_西到东input
var msg_direction_3 = document.getElementById('msg_direction_3'); //msg_北到南input
var msg_direction_4 = document.getElementById('msg_direction_4'); //msg_南到北input
var msg_carSpeed1 = document.getElementById('msg_carSpeed1'); //msg_车速input
var msg_carSpeed2 = document.getElementById('msg_carSpeed2'); //msg_车速input

//小车自身策略
var carFromWhere = 'inProvince'; //省内还是省外
var carDirection = '东到西'; //方向