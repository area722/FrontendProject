/**
 * Created by Wouter on 25/11/14.
 */
var socket = io.connect(),canvas = $("#snakeCanvas")[0],ctx = canvas.getContext("2d"),w,h,celWidth = 10,snakesArr = [],food,snake,socketid = "",score=0;
canvas.width = 900;
canvas.height = 650;

//sockets probeersel
$("#snakePlay").on("click", function (e) {
    $("#snakeDiv").show();
    $("#date").hide();
    w = canvas.width;
    h = canvas.height;
    socket.emit("play");
    $(e.currentTarget).hide();
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
    $("#waiting").hide();
    snakesArr = data.snakes;
    $("#numplayers").text(snakesArr.length+" players");
    $.each(snakesArr, function (i,val) {
        val.__proto__ = Object.getPrototypeOf(snake);
        if(val.id === socketid){
            $("#player").text("You are player "+(i+1));
            val.player = i+1;
        }
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
            if(val.id === socketid){
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
        if(val.id === data.id && val.direction !== data.control.d){
            val.direction = data.control.d;
        }
    });
});

socket.on("newFood", function (data) {
    food.x = data.x;
    food.y = data.y;
    $.each(snakesArr,function(i,val){
        if(val.id === data.id){
            val.tail = {x: val.nx, y: val.ny};
        }
    });
});

socket.on("deadServer",function(data){
    $.each(snakesArr,function (i,val) {
        if(val.id === data.id) {
            score = val.length;
            snakesArr.splice(i,1);
        }
    });
    $("#waiting").show();
    $("#highscoreInput").show();

    if(data.id == socketid){
        console.log("ik verlies");
        $("#waiting h4").text("you lost");
    }else{
        console.log("ik win");
        $("#waiting h4").text("you won");
    }
});

socket.on("disconnect",function(data){
    console.log("disconnect "+data.id);
    $.each(snakesArr,function(i,val){
        if(val.id === data.id){
            snakesArr.splice(i,1);
        }
    });
});

$("#highscore").click(function (e) {
    if($("#highscoreInput #name").val() != "") {
        $.post("/addScore", {id: socketid, name: $("#highscoreInput #name").val(), score: score}).done(function (data) {
            console.log(data);
            $("#snakeDiv").hide();
            $("#highscores").show();
            var html = '';
            $.each(data, function (i, val) {
                html += '<tr><td class="name">'
                + val.name
                + '</td><td class="score">'
                + val.highscore
                + '</td></tr>';
            });
            $("#highscores table").append(html);
        });
    }else{
        $("#highscoreInput #name").attr("placeholder","please fill in a name");
    }
});