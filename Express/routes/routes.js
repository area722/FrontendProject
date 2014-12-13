/**
 * Created by Wouter on 22/11/14.
 */
module.exports = function(app){
    //index
    app.get("/home",function(req,res){
        var useragent = require('useragent');
        var agent = useragent.parse(req.headers['user-agent']);
        var username = require('username');
        res.render("index",{title: "Mijn GsmTijdsLijn",time:"2004 - 2014",os:agent.os.toString()});
    });

    app.post("addScore",function(req,res){

    });
};