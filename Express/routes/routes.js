/**
 * Created by Wouter on 22/11/14.
 */
module.exports = function(app){
    //index
    app.get("/home",function(req,res){
        res.render("index",{title: "Mijn GsmTijdsLijn",time:"2004 - 2014"});
    });

    app.post("addScore",function(req,res){
        res.
    });
};