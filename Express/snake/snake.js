/**
 * Created by Wouter on 22/11/14.
 */

var snake = function (server) {
    var snakesArrServer = [];
    var io = require("socket.io").listen(server);
    var color = require("randomcolor");
    io.sockets.on("connection", function (socket) {
        socket.on("play", function (data) {
            socket.emit("ready");
            console.log(socket.id + " wants to play");
        });
        socket.on("newSnakeClient", function (data) {
            data.id = socket.id;
            data.color = color({luminosity: "random",hue: "random"});
            snakesArrServer.push(data);
            if(snakesArrServer.length >= 2){
                io.sockets.emit("2Players",{snakes: snakesArrServer,food:{x: Math.floor((Math.random() * data.canvasW)+1),y:Math.floor((Math.random() * data.canvasH)+1),c: "#FF0000"}});
            }
        });
        socket.on("control", function (data) {
        if(data.control != "default"){
                io.sockets.emit("serverControl",{id: socket.id,control: data});
            }
        });

        socket.on("newFood",function(data){
           io.sockets.emit("newFoodServer",{x: Math.floor((Math.random() * data.canvasW)+1),y:Math.floor((Math.random() * data.canvasH)+1),c: "#FF0000"});
        });

        socket.on("disconnect",function(data){
            console.log("disconnect "+socket.id)
            snakesArrServer.forEach(function (item,i) {
                if(item.id == socket.id){
                    console.log(snakesArrServer.splice(i,1));
                }
            });
            io.sockets.emit("disconnect",{arr: snakesArrServer,id: socket.id});
        });
    });
}

module.exports = snake;