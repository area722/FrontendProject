/**
 * Created by Wouter on 27/12/14.
 */

var pic = function (io) {
    var picArrServer = [];
    var colorArr = ["#e23934","#4c7030","#4444aa","#f1f1f2","#3a3a3a"];
    var room = 0;
    io.sockets.on("connection",function(socket){
        socket.on("playPic", function (data) {
            socket.join(room+1);
            socket.emit("readyPic",socket.id);
            picArrServer.push({id:socket.id,room:room+1});
            if(picArrServer.length % 2 === 0){
                //get words from db
                var Word = require('../database/models/word');
                Word.find().exec(function (err,docs) {
                    io.sockets.to(room+1).emit("playersReadyPic",{arr:picArrServer,word:docs[generateRandom(0,docs.length)]});
                    picArrServer = [];
                    room++;
                });
            }

            function generateRandom(min,max){
                return Math.floor(Math.random() * max) + min;
            }
        });
        socket.on("draw",function(data){
            io.sockets.to(data.room).emit("drawServer",{x:data.x,y:data.y,color:colorArr[data.c]});
        });
        socket.on("erase", function (data) {
           io.sockets.to(data.room).emit("eraseServer",{x:data.x,y:data.y});
        });
    });
};

module.exports = pic;