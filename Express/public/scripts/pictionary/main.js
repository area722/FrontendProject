/**
 * Created by Wouter on 27/12/14.
 */
var socket = io.connect();
var socketId;
$("#playPic").on("click", function (e) {
    socket.emit("playPic");
});

socket.on("readyPic", function (data) {
    socketId = data;
    $("#pictionaryDiv").show();
    $("#picCanvas")[0].width = 825;
    $("#picCanvas")[0].height = 515;
    console.log("waiting for other players");
    $("#waitingPic").show();
});

socket.on("playersReadyPic", function (data) {
    var drawBool = false;
    var eraseBool = false;
    var color = 0;
    if(data.arr[0].id == socketId){
        $("#waitingPic").text("You draw");

        console.log("you draw");
        //disable right mouse click
        $("#picCanvas").bind('contextmenu', function(){ return false });
        $("#picCanvas").on("mousedown",function(e){
            if(e.which === 1){
                drawBool = true;
            }
            else{
                eraseBool = true;
            }
        });
        $("#picCanvas").on("mouseup", function (e) {
            if(e.which === 1){
                drawBool = false;
            }
            else{
                eraseBool = false;
            }
        });
        $("#picCanvas").on("mousemove", function (e) {
            if(drawBool){
                drawRect(e);
            }
            if(eraseBool){
                eraseRect(e);
            }
        });

        $("#textGues").text(data.word.word);
        $("#textGues").show();

        socket.on("wrongGeusServer", function (data) {
            $("#textGues").hide();
            $("#opendGues").text("Jouw tegenstander raade "+data);
            setTimeout(function(){
                $("#opendGues").text("");
                $("#textGues").show();
            }, 3000);
        });
    }
    else{
        $("#waitingPic").text("You guess");

        $("#krijtjes").hide();
        var shuffled = shuffle(data.word.word.split(''));
        function shuffle(o) {
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
        $.each(shuffled, function (i,val) {
            $("#chars").append("<p class='char'>"+val+"</p>");
        });

        var text = "";
        $(".char").on("click",charClick);

        function charClick(e){
            text += $(e.currentTarget).text();
            $("#textGuesed").text(text);
            $(e.currentTarget).remove();

            //check text correct
            if(text.split('').length === data.word.word.split('').length){
                if(text === data.word.word){
                    console.log("correct");
                    socket.emit("geusedRight",data.arr[0].room);
                }
                else{
                    socket.emit("geusedWrong",{room:data.arr[0].room,text:text});
                    text = "";
                    $("#textGuesed").text(text);
                    $.each(shuffled, function (i,val) {
                        $("#chars").append("<p class='char'>"+val+"</p>");
                    });
                    $(".char").on("click",charClick);
                }
            }
        }
    }
    setTimeout(function (e) {
        $("#waitingPic").hide();
    },2000);


    function getMousePos(evt) {
        var rect = $("#picCanvas")[0].getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function drawRect(ev){
        socket.emit("draw",{room:data.arr[0].room,x:getMousePos(ev).x,y:getMousePos(ev).y,c:color});
    }
    function eraseRect(ev){
        socket.emit("erase",{room:data.arr[0].room,x:getMousePos(ev).x,y:getMousePos(ev).y});
    }

    $(window).keydown(function(e){
        if(e.keyCode >= 49 && e.keyCode <= 53){
            if(e.keyCode === 49){
                color = 0;
            }
            if(e.keyCode === 50){
                color = 1;
            }
            if(e.keyCode === 51){
                color = 2;
            }
            if(e.keyCode === 52){
                color = 3;
            }
            if(e.keyCode === 53){
                color = 4;
            }
        }
    });

    //click on chalks
    $("#black").click(function(){
        color = 4;
    });
    $("#white").click(function(){
       color = 3;
    });
    $("#blue").click(function(){
       color = 2;
    });
    $("#green").click(function(){
       color = 1;
    });
    $("#red").click(function(){
       color = 0;
    });

    socket.on("quesedRightServer", function () {
        $("#textGues").text("Goed geraden!");
        $("#textGuesed").text("Goed geraden!");
    });
});

socket.on("drawServer", function (data) {
    var ctx = $("#picCanvas")[0].getContext("2d");
    ctx.beginPath();
    ctx.arc(data.x, data.y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = data.color;
    ctx.fill();
});

socket.on("eraseServer", function (data) {
    var ctx = $("#picCanvas")[0].getContext("2d");
    ctx.clearRect(data.x,data.y,20,20);
});