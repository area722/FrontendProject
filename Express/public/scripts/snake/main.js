/**
 * Created by Wouter on 25/11/14.
 */

var socket = io.connect();
var canvas = document.getElementById("snakeCanvas"),ctx = canvas.getContext("2d");
var snakesArr = [];
var step = 0.2;
var food = new Food(0,"normal",Math.floor((Math.random() * canvas.width)+1),Math.floor((Math.random() * canvas.height)+1),"#0000FF");
var control = "right";

//sockets probeersel
$("#snakePlay").on("click", function (e) {
    $("#snakeCanvas").show();
    socket.emit("play");
});

socket.on("ready", function (data) {
    //snake toevoegen
    var x = Math.floor((Math.random() * 100)+ 1),y = Math.floor((Math.random() * 100)+ 1),control;
    //controls doorsturen
    socket.emit("newSnakeClient",{x: x,y:y,canvasW: canvas.width,canvasH: canvas.height});
    //waiting for other player
    console.log("waiting for other player");
});

socket.on("2Players", function (data) {
    snakesArr = [];
    $.each(data.snakes,function(i,val){
        snakesArr.push(new Snake(val.color,val.id,3,val.x,val.y,3,"left"));
    });
    //food = new Food(0,"normal",data.food.x,data.food.y,data.food.c);
});

$(window).keydown(function(e){
    e.preventDefault();
    switch (e.keyCode){
        case 38:
            control = "up";
            break;
        case 40:
            control = "down";
            break;
        case 37:
            control = "left";
            break;
        case 39:
            control = "right";
            break;
        default:
            control = "default"
            break;
    }
});
var prefControl = null;
socket.on("serverControl", function (data) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    $.each(snakesArr, function (i,val) {
        if(val.Id == data.id){
            switch (data.control){
                case "left":
                    val.moveX(-step);
                    val.Control = "left";
                    break;
                case "right":
                    val.moveX(step);
                    val.Control = "right";
                    break;
                case "down":
                    val.moveY(-step);
                    val.Control = "down";
                    break;
                case "up":
                    val.moveY(step);
                    val.Control = "up";
                    break;
            }

            //collision detection (food)
            if(val.X < food.X + 3 && val.X + val.width > food.X && val.Y < food.Y + 3 && val.Y + 3 > food.Y){
                console.log(data.id +" eet");
                socket.emit("newFood",{canvasW: canvas.width,canvasH: canvas.height});
                val.Eat();
            }
        }
        val.draw(ctx);
    });
    food.draw(ctx);
});

socket.on("newFoodServer", function (data) {
    food = new Food(0,"normal",data.x,data.y,data.c);
});

socket.on("disconnect",function(data){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    $.each(snakesArr,function(i,val){
        if(val.Id == data.id){
            snakesArr.splice(i,1);
        }
        val.draw(ctx);
    });
});

(function animate(){
    requestAnimationFrame(animate);
    socket.emit("control",control);
})();