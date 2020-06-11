//开始按钮点击事件
document.getElementById('btn_start').addEventListener('click',function(){
	car_state = true;
	animate_state = true;
	changeDirection();
	RequestNextAnimationFrame(animate,animate_state);
});

//暂停按钮
document.getElementById('btn_stop').addEventListener('click',function(){
	changeDirection();
	change_car_state();
});

//重置按钮点击事件
document.getElementById('btn_restart').addEventListener('click',function(){
	carSpeed.value='10';//车速
	carDirection = '东到西';//行驶方向
	animate_state = false;//小车状态
	init_car();
	init_msg();
});

//发送msg按钮
document.getElementById('msg_send').addEventListener('click',function(){
	init_msg();
	msg_isSend = true;
});



