/**
 * Created by Wouter on 04/12/14.
 */

var chat = function(io){
    io.sockets.on("connection",function(socket){
        var roomsSockets = [];
        socket.on("roomSelected", function (data) {
            socket.join(data.room);
            roomsSockets.push({id:socket.id,room:data.room,name:data.name});
            console.log(roomsSockets);
        });
        socket.on("leaveRoom", function (data) {
            socket.leave(data);
            roomsSockets.forEach(function (item,i) {
                if (item.id === socket.id) {
                    roomsSockets.splice(i, 1);
                }
            });
        });
        socket.on("message",function(data){
            for(var i=0;i<roomsSockets.length;i++){
                if(roomsSockets[i].id == socket.id){
                    io.sockets.to(roomsSockets[i].room).emit("newMessage",{name:roomsSockets[i].name,mes:data});
                }
            }
        });
    });
}

module.exports = chat;