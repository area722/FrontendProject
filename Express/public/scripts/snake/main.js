/**
 * Created by Wouter on 25/11/14.
 */

var socket = io.connect();

var canvas = $("#snakeCanvas")[0],ctx = canvas.getContext("2d"),w,h,celWidth = 10,snakesArr = [],food;
var snake;
var socketid = "";
canvas.width = 1000;
canvas.height = 700;

//sockets probeersel
$("#snakePlay").on("click", function (e) {
    $("#snakeCanvas").show();
    w = canvas.width;
    h = canvas.height;
    socket.emit("play");
});

socket.on("ready", function (data) {
    //Snake toevoegen
    socketid = data;
    snake = new Snake(data,5,[],50,10);
    snake.create();

    socket.emit("newSnake",{snake: snake,w:w,h:h,celWidth:celWidth});
    console.log("waiting for other player");
});

socket.on("PlayersReady", function (data) {
    snakesArr = data.snakes;
    $.each(snakesArr, function (i,val) {
        val.prototype = snake.prototype;
    });
    food = new Food(data.food.x,data.food.y);
    animate();
});


function animate(){
    //draw background
    ctx.fillStyle = "#608a36";
    ctx.fillRect(0,0,w,h);
    ctx.lineWidth = 11;
    ctx.strokeStyle = "#1f2c13";
    ctx.strokeRect(0,0,w,h);

    $.each(snakesArr,function(i,val){
        val.draw("#1f2c13","white",w,h,food);
    });
    food.draw();

    setTimeout(function () {
        animate();
    },100);
}

$(window).keydown(function(e){
    var key = e.keyCode;
    if(key >= 37 && key <= 40){
        e.preventDefault();
        $.each(snakesArr, function (i,val) {
            if(val.id == socketid){
                if(key === 37 && val.direction !== "right") {
                    socket.emit("control",{d:"left",x:val.nx, y:val.ny});
                }
                else if(key === 38 && val.direction !== "down"){
                    socket.emit("control",{d:"up",x:val.nx, y:val.ny});
                }
                else if(key === 39 && val.direction !== "left") {
                    socket.emit("control",{d:"right",x:val.nx, y:val.ny});
                }
                else if(key === 40 && val.direction !== "up") {
                    socket.emit("control",{d:"down",x:val.nx, y:val.ny});
                }
            }
        });
    }
});

socket.on("serverControl", function (data) {
    $.each(snakesArr, function (i,val) {
        if(val.id === data.id && val.direction != data.control.d){
            val.direction = data.control.d;
            val.nx = data.control.x;
            val.ny = data.control.y;
        }
    });
});

socket.on("newFood", function (data) {
    food.x = data.x;
    food.y = data.y;
    $.each(snakesArr,function(i,val){
        if(val.id === data.id){
            val.tail = {x: val.nx, y: val.ny};
            val.length++;
        }
    });
});

socket.on("disconnect",function(data){
    $.each(snakesArr,function(i,val){
        if(val.id === data.id){
            snakesArr.splice(i,1);
        }
    });
});

