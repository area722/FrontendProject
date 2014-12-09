/**
 * Created by Wouter on 08/12/14.
 */

var mongoose = require("mongoose");
var scoreSheme = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String},
        highscore: {type: String},
        createdOn: {type:Date, 'default':Date.now }
    }
);

module.exports = scoreSheme;