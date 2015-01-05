/**
 * Created by Wouter on 08/12/14.
 */
var mongoose = require("mongoose");
var scoreSheme = require("../sheme/score");
var score = mongoose.model('Score',scoreSheme,"snake");
module.exports = score;