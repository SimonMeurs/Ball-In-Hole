var myVar;
var tijd = 0;
var paused = false;
var start = false;

function count(){
	++tijd
	document.getElementById("counter").innerHTML=tijd;
}

function Start(){
if (paused==false && start==false){
	myVar = setInterval(function(){count()},1000);
	start=true
}	
}

function Continuef(){
if (paused==true){
	myVar = setInterval(function(){count()},1000);
	paused=false;
	}
}

function Pause(){
	clearInterval(myVar);
	paused=true;

	
}