/**
 * Created by Wouter on 08/12/14.
 */

var mongoose = require("mongoose");
var scoreSheme = new mongoose.Schema(
    {
        id: String,
        name: String,
        highscore: String,
        createdOn: Date
    }
);

module.exports = scoreSheme;