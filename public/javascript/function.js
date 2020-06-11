//移动车辆函数
function moveCar_right(){
	carX += 1;
}
function moveCar_left(){
	carX -= 1;
}
function moveCar_on(){
	carY -= 1;
}
function moveCar_down(){
	carY += 1;
}
//画虚线圆
function ract(){
	ctx.beginPath();
	ctx.save();
 	ctx.setLineDash([10,20]);
	ctx.arc(434,90,120,0,2*Math.PI);
	ctx.stroke();
	ctx.restore();
	ctx.closePath();
}
//移动情景1函数
function MoveCar(direction){
	switch(direction){
		case "东到西":
			moveCar_right(); 
			break;
		case "西到东":
			moveCar_left(); 
			break;
		case "南到北":
			moveCar_on(); 
			break;
		case "北到南":
			moveCar_down(); 
			break;
	}
	ctx.clearRect(0,0,900,600);
	ctx.drawImage(road,-25,-100,1024,768);
	ctx.drawImage(rtu,420,80,53/2,75/2);
	ctx.drawImage(car,carX,carY,30,30);   
	ract();			
}
//初始化地图
function init(){
	ctx.drawImage(road,-25,-100,1024,768);
	ctx.drawImage(rtu,420,80,53/2,75/2);
	ract();
}
//小车初始位置
function init_car(){
	ctx.clearRect(0,0,900,600);
	carX=80,carY=130;
	car_state = false;
	init();
	car.onload = function() {	
		ctx.drawImage(car,carX,carY,30,30);   
	}
	ctx.drawImage(car,carX,carY,30,30);
}	
//改变小车状态
function change_car_state(){
	if(car_state == true) 
		car_state = false;
	else 
		car_state = true;
}
//控制requestNextAnimationFrame()是否调用函数
function RequestNextAnimationFrame(x,y){
	if(y == true){
		requestNextAnimationFrame(x);
	}
}
//改变小车移动方向
function changeDirection(){
	var len = document.getElementsByName('direction').length;
	for(var i = 0; i < len; i++){
		if(document.getElementsByName('direction')[i].checked){
			carDirection = document.getElementsByName('direction')[i].value;
		}
	}
}
//画线
function drawLine(x,y,x1,y1){
	ctx.beginPath();
	ctx.setLineDash([10,10]);
	ctx.moveTo(x,y);
	ctx.lineTo(x1,y1);
	ctx.stroke();
}

//重置msg
function init_msg(){
    msgX=434;msgY=90;
    msg_isSend = false;
}

//改变小车状态
function change_msg_isSend_state(){
	if(msg_isSend == true) 
		msg_isSend = false;
	else 
		msg_isSend = true;
}

//判断小车和msg是否同在省内或省外
function is_Msg_And_Car_WhereSame(){
	var car_len = document.getElementsByName('fromWhere').length;
	var msg_len = document.getElementsByName('msg_fromWhere').length;
	for(var i = 0; i < car_len; i++){
		if(document.getElementsByName('fromWhere')[i].checked){
			var craWhere = document.getElementsByName('fromWhere')[i].value;
		}
	}
	for(var i = 0; i < msg_len; i++){
		if(document.getElementsByName('msg_fromWhere')[i].checked){
			var msgWhere = document.getElementsByName('msg_fromWhere')[i].value;
		}
	}
	if(craWhere == msgWhere)
		return true;
	else
		return false;
}
//判断小车和msg方向是否一样
function is_Msg_And_Car_DirectionSame(){
	var car_direction = document.getElementsByName('direction').length;
	var msg_direction = document.getElementsByName('msg_direction').length;
	for(var i = 0; i < car_direction; i++){
		if(document.getElementsByName('direction')[i].checked){
			var car_direction_new = document.getElementsByName('direction')[i].value;
		}
	}
	for(var i = 0; i < msg_direction; i++){
		if(document.getElementsByName('msg_direction')[i].checked){
			var msg_direction_new = document.getElementsByName('msg_direction')[i].value;
		}
	}
	if(car_direction_new == msg_direction_new)
		return true;
	else
		return false;
}
//判断小车车速是否在区间内
function is_CarSpeed_In_msg_carSpeed(){
	if(carSpeed.value <= msg_carSpeed2.value && carSpeed.value >= msg_carSpeed1.value)
		return true;
	else
		return false;
}