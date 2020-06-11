//路线1
function animate(time){
	var now = (+new Date());
	if(carX < 800 && now-lastTime>500/parseInt(carSpeed.value) && car_state == true){
		MoveCar(carDirection);
		lastTime = now;
	}

	//判断小车是否符合策略
	if(is_Msg_And_Car_WhereSame() && is_Msg_And_Car_DirectionSame() && is_CarSpeed_In_msg_carSpeed()){
		//判断小车距离路测单元距离
		var distance = Math.sqrt(Math.pow((carX+15)-434,2)+Math.pow((carY+10)-90,2));
		var distance1 =Math.sqrt(Math.pow((carX+15)-msgX,2)+Math.pow((carY+10)-msgY,2));
		if(distance <= 120){
			ctx.clearRect(0,0,900,600);
			ctx.drawImage(road,-25,-100,1024,768);
			ctx.drawImage(rtu,420,80,53/2,75/2);
			ctx.drawImage(car,carX,carY,30,30);   
			ract();	
			//绘制连接
			drawLine(carX+15,carY+10,434,90);

			//判断消息是否发送，绘制msg
			if(msg_isSend == true && (distance1 >= 25)){
				ctx.drawImage(msg,msgX-8,msgY-5,15,15);
				msgX += (carX+15-msgX)/distance;
				msgY += (carY+10-msgY)/distance;
			}
			if(distance1 <= 25){
				msg_isSend = false;
			}
		}
	}
	RequestNextAnimationFrame(animate,animate_state);
}
//加载地图	
window.onload = function () {
    	ctx.drawImage(road,-25,-100,1024,768);	
    	ctx.drawImage(rtu,420,80,53/2,75/2);  
    	ctx.drawImage(car,carX,carY,30,30);
    	ract();
}





