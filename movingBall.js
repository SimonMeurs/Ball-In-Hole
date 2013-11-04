window.onload = init;

var winW, winH;
var ball;
var mouseDownInsideball;
var touchDownInsideball;
var movementTimer;
var lastMouse, lastOrientation, lastTouch;
var centerX = screen.width / 4;
var centerY = screen.height / 4;
                            
// Initialisation on opening of the window
function init() {
	lastOrientation = {};
	window.addEventListener('resize', doLayout, false);
	document.body.addEventListener('mousemove', onMouseMove, false);
	document.body.addEventListener('mousedown', onMouseDown, false);
	document.body.addEventListener('mouseup', onMouseUp, false);
	document.body.addEventListener('touchmove', onTouchMove, false);
	document.body.addEventListener('touchstart', onTouchDown, false);
	document.body.addEventListener('touchend', onTouchUp, false);
	window.addEventListener('deviceorientation', deviceOrientationTest, false);
	lastMouse = {x:0, y:0};
	lastTouch = {x:0, y:0};
	mouseDownInsideball = false;
	touchDownInsideball = false;
	doLayout(document);
	

	
	
}


// Does the gyroscope or accelerometer actually work?
function deviceOrientationTest(event) {
	window.removeEventListener('deviceorientation', deviceOrientationTest);
	if (event.beta != null && event.gamma != null) {
		window.addEventListener('deviceorientation', onDeviceOrientationChange, false);
		movementTimer = setInterval(onRenderUpdate, 10); 
	}
}

function doLayout(event) {
	winW = window.innerWidth;
	winH = window.innerHeight;
	var surface = document.getElementById('surface');
	surface.width = winW;
	surface.height = winH;
	radius = 20;
	ball = {	radius:radius,
				x:Math.round(winW/2),
				y:Math.round(winH/2),
				color:'rgba(100, 100, 100, 255)'};
				
	renderBall();

}
	
function renderBall() {
	var surface = document.getElementById('surface');
	context = surface.getContext('2d');
	context.clearRect(0, 0, surface.width, surface.height);
	
	context = surface.getContext('2d');
    var radius = 20;
	context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'grey';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#111111';
    context.stroke();
	
	context.beginPath();
	context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
	context.fillStyle = ball.color;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = ball.color;
	context.stroke();

	
} 

function onRenderUpdate(event) {
	var xDelta, yDelta;
	switch (window.orientation) {
		case 0: // portrait - normal
			xDelta = lastOrientation.gamma;
			yDelta = lastOrientation.beta;
			break;
		case 180: // portrait - upside down
			xDelta = lastOrientation.gamma * -1;
			yDelta = lastOrientation.beta * -1;
			break;
		case 90: // landscape - bottom right
			xDelta = lastOrientation.beta;
			yDelta = lastOrientation.gamma * -1;
			break;
		case -90: // landscape - bottom left
			xDelta = lastOrientation.beta * -1;
			yDelta = lastOrientation.gamma;
			break;
		default:
			xDelta = lastOrientation.gamma;
			yDelta = lastOrientation.beta;
	}
	moveBall(xDelta, yDelta);
	
}

function inHole(xDelta, yDelta){
	if (xDelta > centerX-100 && xDelta < centerX+100 && yDelta > centerY-100 && yDelta < centerY+100){
		
		alert("Je tijd is : is goed hoor!");
		
	}
}

function moveBall(xDelta, yDelta) {	
if (running== true){
	ball.x += xDelta;
	ball.y += yDelta;
	ballOutOff();
	renderBall();
	if (ball.x > centerX-10 && ball.x < centerX+10 && ball.y > centerY-10 && ball.y < centerY+10){		
		init();		
		alert("Je tijd is : "+ tijd +" is goed hoor!");
		stop();				
	}
}	
}

function ballOutOff(){
	if (ball.x < 50){
		ball.x=50;
	}
	
	if (ball.y < 50){
		ball.y=50;
	}
	if (ball.x > window.innerWidth-50){
		ball.x=window.innerWidth-50;
	}	
	if (ball.y > window.innerHeight -50){
		ball.y=window.innerHeight -50;
	}
}

function onMouseMove(event) {
	if(mouseDownInsideball){
		var xDelta, yDelta;
		xDelta = event.clientX - lastMouse.x;
		yDelta = event.clientY - lastMouse.y;
		moveBall(xDelta, yDelta);
		lastMouse.x = event.clientX;
		lastMouse.y = event.clientY;
	}
}

function onMouseDown(event) {
	var x = event.clientX;
	var y = event.clientY;
	if(	x > ball.x - ball.radius &&
		x < ball.x + ball.radius &&
		y > ball.y - ball.radius &&
		y < ball.y + ball.radius){
		mouseDownInsideball = true;
		lastMouse.x = x;
		lastMouse.y = y;
	} else {
		mouseDownInsideball = false;
	}
} 

function onMouseUp(event) {
	mouseDownInsideball = false;
}

function onTouchMove(event) {
	event.preventDefault();	
	if(touchDownInsideball){
		var touches = event.changedTouches;
		var xav = 0;
		var yav = 0;
		for (var i=0; i < touches.length; i++) {
			var x = touches[i].pageX;
			var y =	touches[i].pageY;
			xav += x;
			yav += y;
		}
		xav /= touches.length;
		yav /= touches.length;
		var xDelta, yDelta;

		xDelta = xav - lastTouch.x;
		yDelta = yav - lastTouch.y;
		moveBall(xDelta, yDelta);
		lastTouch.x = xav;
		lastTouch.y = yav;
	}
}

function onTouchDown(event) {
	event.preventDefault();
	touchDownInsideball = false;
	var touches = event.changedTouches;
	for (var i=0; i < touches.length && !touchDownInsideball; i++) {
		var x = touches[i].pageX;
		var y = touches[i].pageY;
		if(	x > ball.x - ball.radius &&
			x < ball.x + ball.radius &&
			y > ball.y - ball.radius &&
			y < ball.y + ball.radius){
			touchDownInsideball = true;		
			lastTouch.x = x;
			lastTouch.y = y;			
		}
	}
} 

function onTouchUp(event) {
	touchDownInsideball = false;
}

function onDeviceOrientationChange(event) {
	lastOrientation.gamma = event.gamma;
	lastOrientation.beta = event.beta;
}