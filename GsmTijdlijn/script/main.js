/**
 * Created by Wouter on 25/11/14.
 */

//Canvas stuff
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var w = $("#canvas").width();
var h = $("#canvas").height();

var celWidth = 10;
var food;
var score;

var snake;

//init
(function () {
    //create snake with default length of 5
    snake = new Snake(5,[],50,10);
    snake.create();

    food = new Food(10,10);

    animate();
})();

function animate(){
    requestAnimationFrame(animate);
    //clear the canvas
    //TODO draw background and other stuff instead of clear
    ctx.clearRect(0,0,w,h);
    snake.draw("red","white",w,h,food);
    food.draw();
}


//keyboard controls
$(document).keydown(function(e){
    e.preventDefault();
    var key = e.keyCode;
    if(key == "37" && snake.direction != "right") snake.direction = "left";
    else if(key == "38" && snake.direction != "down") snake.direction = "up";
    else if(key == "39" && snake.direction != "left") snake.direction = "right";
    else if(key == "40" && snake.direction != "up") snake.direction = "down";
});
