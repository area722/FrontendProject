/**
 * Created by Wouter on 08/12/14.
 */

module.exports = (function getAllUsers(){
    var score = require('./models/score');
    score.find({}).exec(function (err,docs) {
        console.log(docs);
    });
})();