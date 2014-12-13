/**
 * Created by Wouter on 22/11/14.
 */

var express = require("express");
var routes = require("./routes");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
//var errorHandler = require("express-error-handler");
var router = express.Router();

var app = express();

//set environment settings
app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//development only
//if ('development' == app.get('env')) {
//    app.use(errorHandler);
//}

//server
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//socket io
var io = require("socket.io").listen(server);
var snake = require("./modules/snake/snake")(io);
var chat = require("./modules/chat/chat")(io);

//router
app.get('/',routes.index);
//home
require("./routes/routes")(app);

//database
require("./modules/database/connectDb");
require("./modules/database/db");

