var animations = new Array();
	animations[0] = [28,0,16,24]; //idle start
	animations[1] = [0,30,16,24]; //idle left and right pressed
	animations[2] = [199,0,16,24]; //idle left
	animations[3] = [235,0,16,24]; //idle right
	animations[4] = [169,0,16,24, 199,0,16,24]; //walking left
	animations[5] = [235,0,16,24, 264,0,16,24]; //walking left
	animations[6] = [84,0,16,24, 112,0,16,24]; //walking left
	animations[7] = [321,0,16,24, 348,0,16,24]; //walking left
	animations[8] = [85,30,16,24]; //look up left
	animations[9] = [348,30,16,24]; //look up right
	animations[10] = [112,30,16,24]; //duck left
	animations[11] = [321,30,16,24]; // duck right
var sJump = new Audio("audio/jump.wav");
var currentAnimation = 0;
var frame = 0;
var inAnimation = 0;
var position = 0;
var keyPressed = {};
var oldKeyPressed = {};
function init()
{
	document.addEventListener('keydown', function(e) {
		keyPressed[e.keyCode] = true;
	}, false);
	document.addEventListener('keyup', function(e) {
		keyPressed[e.keyCode] = false;
	}, false);
	var winHeight = $('body').height();
	$('#bg').css({"padding-top": ((winHeight/2)-360)+"px"})

	return setInterval(draw ,16);
}

function draw()
{
	if(inAnimation >= (animations[currentAnimation].length))
	{
		inAnimation = 0;
	}
	$('#luigi').css({'background-position-x': "-"+animations[currentAnimation][inAnimation]*2+"px", 'background-position-y': "-"+animations[currentAnimation][inAnimation+1]*2+"px"});
	//$('#luigi').html(animations[currentAnimation][inAnimation]);
	if((frame % 10) == 0)
		inAnimation+=4;

	checkKeys();

//	$('#frames').html(frame);
	frame++;
}
function checkKeys()
{
	if(keyPressed["37"] && keyPressed["39"]) {
		currentAnimation = 1;
	}
	else if(keyPressed["37"])
	{
		if(keyPressed["90"])
		{
			currentAnimation = 6;
			$('#luigi').css("left", "-=4");	
		}else {
			currentAnimation = 4;
			$('#luigi').css("left", "-=2");	
		}
	}
	else if(keyPressed["39"])
	{
		if(keyPressed["90"])
		{
			currentAnimation = 7;
			$('#luigi').css("left", "+=4");
		}else {
			currentAnimation = 5;
			$('#luigi').css("left", "+=2");
		}
	}
	else if(keyPressed["88"])
	{
		sJump.play();
	}
	else if(keyPressed["38"])
	{
		if(currentAnimation == 2 || currentAnimation == 8)
			currentAnimation = 8;
		else
			currentAnimation = 9;
	}
	else if(keyPressed["40"])
	{
		if(currentAnimation == 2 || currentAnimation == 10)
			currentAnimation = 10;
		else
			currentAnimation = 11;
	}
	else
	{
		if(currentAnimation == 4 || currentAnimation == 6 || currentAnimation == 8 || currentAnimation == 10)
			currentAnimation = 2;
		else if(currentAnimation == 5 || currentAnimation == 7 || currentAnimation == 9 || currentAnimation == 11)
			currentAnimation = 3;
	}
}
