/**
 * Created by Wouter on 22/11/14.
 */

var snake = function (server) {
    var snakesArrServer = [],io = require("socket.io").listen(server),color = require("randomcolor");
    io.sockets.on("connection", function (socket) {

        socket.on("play", function (data) {
            socket.emit("ready",socket.id);
            console.log(socket.id + " wants to play");
        });

        socket.on("newSnake", function (data) {
            snakesArrServer.push(data.snake);
            if(snakesArrServer.length >=2){
                io.sockets.emit("PlayersReady",{snakes: snakesArrServer,food: {x:Math.round(Math.random()*(data.w-data.celWidth)/data.celWidth),y:Math.round(Math.random()*(data.h-data.celWidth)/data.celWidth)}});
            }
        });

        socket.on("control", function (data) {
            io.sockets.emit("serverControl",{id: socket.id,control: data});
        });

        socket.on("newFood",function(data){
            //TODO aan andere laten weten dat hij opgegeten heeft
           io.sockets.emit("newFood",{id:socket.id,x:Math.round(Math.random()*(data.w-data.celWidth)/data.celWidth),y:Math.round(Math.random()*(data.h-data.celWidth)/data.celWidth)});
        });

        socket.on("disconnect",function(data){
            console.log("disconnect "+socket.id)
            snakesArrServer.forEach(function (item,i) {
                if(item.id == socket.id){
                    console.log(snakesArrServer.splice(i,1));
                }
            });
            io.sockets.emit("disconnect",{id: socket.id});
        });
    });
}

module.exports = snake;