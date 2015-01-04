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

    app.post("/addScore",function(req,res){
        var Score = require('../modules/database/models/score');
        var newScore = new Score({id:req.body.id,name:req.body.name,highscore:req.body.score});
        newScore.save(function () {
            //get highscores from db
            Score.find({}).sort({highscore: -1}).exec(function (err, docs) {
                res.json(docs);
                res.end();
            });
        });

    });
};