/**
 * Created by Wouter on 04/12/14.
 */
$("#txtUsername").show();
var messageLeft = $(".messageLeft");
var messagRight = $(".messageRight");
$(".messageLeft").remove();
$(".messageRight").remove();
var currentRoom = "",username = "",messagesArr = [],socketId = "";

$("#txtUsername").keydown(function (e) {
    if(e.keyCode === 13){
        if($(this).val() !== ""){
            username = $(this).val();
            $(this).hide();
            $("label").hide();
            $("#selectRooms").show();
            $('#rooms p').hide();
            $("#chatInput").show();
        }
    }
});

$("#selectRooms").change(function (e) {
    socket.emit("roomSelected",{room:$(this).val(),name:username});
    currentRoom = $(this).val();
    $("#selectRooms").hide();
    $("#chatInput").show();
    $("#changeRoom").show();
    $("#chatInput").attr("placeholder", "Press enter to submit");
    $("#rooms p").show();
    $("#rooms p").text('Room: '+currentRoom);
});

$("#rooms p").click(function (e) {
    $(this).hide();
    currentRoom = "";
    $("#messages").children().remove();
    $("#selectRooms").show();
    $("#rooms p").hide();
    $("#chatInput").attr("placeholder", "Please Select a room above");
    socket.emit("leaveRoom",currentRoom);
});

$("#chatInput").keydown(function(e){
    if(e.keyCode === 13){
        if($(this).val() !== "" && currentRoom !== ""){
            $("#chatInput").attr("placeholder", "Press enter to submit");
            socket.emit("message",$(this).val());
        }
        else{
            $("#chatInput").attr("placeholder", "Please Select a room above");
        }
        $(this).val("");
    }
});

socket.on("newMessage", function (data) {
    if($("#messages").children().length >= 4){
        console.log($("#messages").children().length);
        $("#messages").children(":first-child").remove();
    }
    console.log(socketId);
    if(socketId == data.id){
        //eigen message
        messagRight.children(".message").text(data.mes);
        messagRight.children(".userTime").text(data.name+" "+data.time)
        messagRight.clone().appendTo("#messages");
    }
    else{
        //adere message
        messageLeft.children(".message").text(data.mes);
        messageLeft.children(".userTime").text(data.name+" "+data.time)
        messageLeft.clone().appendTo("#messages");
    }
});

socket.on("id", function (data) {
    socketId = data;
});