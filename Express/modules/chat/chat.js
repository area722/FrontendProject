/**
 * Created by Wouter on 04/12/14.
 */

var chat = function(io){
    var date;
    io.sockets.on("connection",function(socket){
        var roomsSockets = [];
        socket.on("roomSelected", function (data) {
            socket.join(data.room);
            roomsSockets.push({id:socket.id,room:data.room,name:data.name});
            console.log(roomsSockets);
            io.sockets.emit("id",socket.id);
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
                    date = new Date();
                    io.sockets.to(roomsSockets[i].room).emit("newMessage",{id:socket.id,name:roomsSockets[i].name,mes:data,time:date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()});
                }
            }
        });
    });
}

module.exports = chat;