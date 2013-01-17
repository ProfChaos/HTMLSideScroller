var animations = [];
animations[0] = [28, 0, 16, 24]; //idle start
animations[1] = [0, 30, 16, 24]; //idle left and right pressed
animations[2] = [199, 0, 16, 24]; //idle left
animations[3] = [235, 0, 16, 24]; //idle right
animations[4] = [169, 0, 16, 24, 199, 0, 16, 24]; //walking left
animations[5] = [235, 0, 16, 24,  264, 0, 16, 24]; //walking left
animations[6] = [84, 0, 16, 24,  112, 0, 16, 24]; //walking left
animations[7] = [321, 0, 16, 24,  348, 0, 16, 24]; //walking left
animations[8] = [85, 30, 16, 24]; //look up left
animations[9] = [348, 30, 16, 24]; //look up right
animations[10] = [112, 30, 16, 24]; //duck left
animations[11] = [321, 30, 16, 24]; // duck right
var sJump = new Audio("audio/jump.wav");
var frame = 0;
var keyPressed = {};
var luigi = new Player();
var GRAVITY = 9.81;

function Player()
{
    this.x = 300;
    this.y = 400;
    this.height = 50;
    this.width = 40;

    this.velocity = 0;
    this.currentAnimation = 0;
    this.inAnimation = 0;
    this.onTheGround = false;
}
Player.prototype.Jump = function()
{
    if (this.onTheGround)
    {
        sJump.play();
        this.velocity = -20;
        this.onTheGround = false;
    }
}
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
            $('#luigi').css("left", "-=4");
        }else {
            this.currentAnimation = 4;
            $('#luigi').css("left", "-=2");
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
            $('#luigi').css("left", "+=4");
        }else {
            this.currentAnimation = 5;
            $('#luigi').css("left", "+=2");
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
        if(this.currentAnimation === 4 || this.currentAnimation === 6 || this.currentAnimation === 8 || this.currentAnimation === 10)
        {
            this.currentAnimation = 2;
        }
        else if(this.currentAnimation === 5 || this.currentAnimation === 7 || this.currentAnimation === 9 || this.currentAnimation === 11)
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
    $('#luigi').css("top", this.y);
}

Player.prototype.Gravity = function()
{

    this.velocity += GRAVITY * 0.1;
    this.y += this.velocity * 1;
}
Player.prototype.Collision = function()
{
    var obj = this;
    $('.collidable').each(function(coll) {
        var top = parseInt($(this).css('top'), 10);

        //alert("top "+top+" objx "+ obj.y);
        if((obj.y + obj.height) > top)
        {
            if((obj.y + obj.height) < top + 50 && obj.velocity >= 0)
            {
                obj.velocity = 0;
                obj.y = top - obj.height;
                obj.onTheGround = true;
            }
        }
    });
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

function draw()
{
    luigi.Animate(frame);

    luigi.CheckKeys();

    luigi.Update();

    //$('#frames').html(frame);
    frame += 1;
}
//function gravity(object)
//{
//    var GCONST = 9.81;
//}