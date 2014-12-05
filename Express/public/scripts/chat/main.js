/**
 * Created by Wouter on 04/12/14.
 */
$("#txtUsername").show();
var currentRoom = "",username = "";

$("#selectRooms").change(function (e) {
    socket.emit("roomSelected",{room:$(this).val(),name:username});
    currentRoom = $(this).val();
    $("#selectRooms").hide();
    $("#chatInput").show();
    $("#changeRoom").show();
});

$("#changeRoom").click(function (e) {
    $(this).hide();
    $("#selectRooms").show();
    $("#chatInput").hide();
    socket.emit("leaveRoom",currentRoom);
});

$("#chatInput").keydown(function(e){
    if(e.keyCode === 13){
        socket.emit("message",$(this).val());
        $(this).val("");
    }
});

$("#txtUsername").keydown(function (e) {
    if(e.keyCode === 13){
        if($(this).val() !== ""){
            username = $(this).val();
            socket.emit("username",$(this).val());
            $(this).hide();
            $("label").hide();
            $("#selectRooms").show();
        }
    }
});

socket.on("newMessage", function (data) {
    console.log(data);
});