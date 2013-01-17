var animations = [];
animations[0] = [28, 0, 16, 24]; //idle start
animations[1] = [0, 30, 16, 24]; //idle left and right pressed
animations[2] = [199, 0, 16, 24]; //idle left
animations[3] = [235, 0, 16, 24]; //idle right
animations[4] = [169, 0, 16, 24, 199, 0, 16, 24]; //walking left
animations[5] = [235, 0, 16, 24,  264, 0, 16, 24]; //walking right
animations[6] = [84, 0, 16, 24,  112, 0, 16, 24]; //run left
animations[7] = [321, 0, 16, 24,  348, 0, 16, 24]; //run right
animations[8] = [85, 30, 16, 24]; //look up left
animations[9] = [348, 30, 16, 24]; //look up right
animations[10] = [112, 30, 16, 24]; //duck left
animations[11] = [321, 30, 16, 24]; // duck right
animations[12] = [54, 30, 16, 24]; //duck left
animations[13] = [378, 30, 16, 24]; // duck right
var sJump = new Audio("audio/jump.wav");
var frame = 0;
var keyPressed = {};
var GRAVITY = 9.81;

function Player()
{
    this.x = 50;
    this.y = 400;
    this.height = 50;
    this.width = 40;

    this.yVelocity = 0;
    this.xVelocity = 0;
    this.currentAnimation = 0;
    this.inAnimation = 0;
    this.onTheGround = false;
}
Player.prototype.Jump = function()
{
    if (this.onTheGround)
    {
        sJump.play();
        this.yVelocity = -20;
        this.onTheGround = false;
    }
};
Player.prototype.CheckKeys = function()
{

    if(keyPressed["37"] && keyPressed["39"]) {
        this.currentAnimation = 1;
    }
    else if(keyPressed["37"])
    {
        if(keyPressed["90"])
        {
            this.currentAnimation = 6;
            this.RunLeft(6);
        }else {
            this.currentAnimation = 4;
            this.RunLeft(2);
        }
        if(keyPressed["88"])
        {
            this.Jump();
        }
    }
    else if(keyPressed["39"])
    {
        if(keyPressed["90"])
        {
            this.currentAnimation = 7;
            this.RunRight(6);
        }else {
            this.currentAnimation = 5;
            this.RunRight(2);
        }
        if(keyPressed["88"])
        {
            this.Jump();
        }
    }
    else if(keyPressed["88"])
    {
        this.Jump();
    }
    else if(keyPressed["38"])
    {
        if(this.currentAnimation === 2 || this.currentAnimation === 8)
        {
            this.currentAnimation = 8;
        }
        else
        {
            this.currentAnimation = 9;
        }
    }
    else if(keyPressed["40"])
    {
        if(this.currentAnimation === 2 || this.currentAnimation === 10)
        {
            this.currentAnimation = 10;
        }
        else
        {
            this.currentAnimation = 11;
        }
    }
    else
    {
        if((this.currentAnimation === 6 || this.currentAnimation === 12) && this.xVelocity !== 0)
        {
            this.currentAnimation = 12;
            console.log("wooo");
        }
        else if((this.currentAnimation === 7 || this.currentAnimation === 13) && this.xVelocity !== 0)
        {
            this.currentAnimation = 13;
        }
        else if(this.currentAnimation === 4 || this.currentAnimation === 8 || this.currentAnimation === 10 || this.currentAnimation === 12)
        {
            this.currentAnimation = 2;
        }
        else if(this.currentAnimation === 5 || this.currentAnimation === 9 || this.currentAnimation === 11 || this.currentAnimation === 13)
        {
            this.currentAnimation = 3;
        }
    }
};

Player.prototype.Animate = function(frame)
{
    if(this.inAnimation >= (animations[this.currentAnimation].length))
    {
        this.inAnimation = 0;
    }
    $('#luigi').css({'background-position-x': "-"+animations[this.currentAnimation][this.inAnimation]*2+"px", 'background-position-y': "-"+animations[this.currentAnimation][this.inAnimation+1]*2+"px"});
    //$('#luigi').html(animations[this.currentAnimation][inAnimation]);
    if((frame % 10) === 0)
    {
        this.inAnimation+=4;
    }
};

Player.prototype.Update = function()
{
    this.Gravity();
    this.Collision();
    this.Friction();
    $('#luigi').css("top", this.y);
    $('#luigi').css("left", this.x);
};

Player.prototype.Gravity = function()
{

    this.yVelocity += GRAVITY * 0.1;
    this.y += this.yVelocity * 1;
};

Player.prototype.RunRight = function(MAX) {
    if (this.xVelocity < MAX)
        this.xVelocity += 4;
};
Player.prototype.RunLeft = function(MIN) {
    if (this.xVelocity > -MIN)
        this.xVelocity -= 4;

};
Player.prototype.Friction = function()
{
    if(this.xVelocity < 0)
    {
        this.xVelocity += 0.5;
        if(this.xVelocity > -1)
            this.xVelocity = 0;
        this.x += this.xVelocity;
    }else if(this.xVelocity > 0)
    {
        this.xVelocity -= 0.5;
        if(this.xVelocity < 1)
            this.xVelocity = 0;
        this.x += this.xVelocity;
    }else {
        this.xVelocity = 0;
    }
};
Player.prototype.Collision = function()
{
    var obj = this;
    obj.onTheGround = false;
    $('.collidable').each(function(coll) {
        var top = parseInt($(this).css('top'), 10);
        var bottom = parseInt($(this).css('top'), 10) + parseInt($(this).height(), 10);
        var left = parseInt($(this).css('left'), 10);
        var right = parseInt($(this).css('left'), 10) + parseInt($(this).width(), 10);

        //console.log(coll+"objx"+right+"");
        //alert("top "+top+" objx "+ obj.y);
        
        if((obj.y + obj.height) > top && obj.x + obj.width >= left && obj.x<= right)
        {
            
            if((obj.y + obj.height) < top + 50 && obj.yVelocity >= 0)
            {
                obj.yVelocity = 0;
                obj.y = top - obj.height;
                obj.onTheGround = true;
            }
            else if(obj.y > bottom - 50 && obj.yVelocity < 0)
            {
                obj.yVelocity = 0;
                obj.y = bottom + 10;
            }
        }
        else if(obj.xVelocity < 0 && obj.x - 10 < right && obj.x + obj.width > left && obj.y + obj.height > top && obj.y < bottom)
        {
            obj.x = right + 10;
        }
        else if(obj.xVelocity > 0 && obj.x + 5 < right  && obj.x + obj.width > left - 5 && obj.y + obj.height > top && obj.y < bottom)
        {
            obj.x = left - obj.width - 5;
        } 
    });
    if(obj.y > 720)
    {
        obj.y = 100;
        obj.x = 200;
        obj.yVelocity = 0;
    }
};

var luigi = new Player();
function draw()
{
    luigi.Animate(frame);

    luigi.CheckKeys();

    luigi.Update();

    //$('#frames').html(frame);
    frame += 1;
}

function init()
{
    document.addEventListener('keydown', function(e) {
        keyPressed[e.keyCode] = true;
    }, false);
    document.addEventListener('keyup', function(e) {
        keyPressed[e.keyCode] = false;
    }, false);
    var winHeight = $('body').height();
    $('#bg').css({"padding-top": ((winHeight/2)-360)+"px"});

    return setInterval(draw ,16);
}