/**
 * Created by Wouter on 27/12/14.
 */

var mongoose = require("mongoose");
var wordSheme = require("../sheme/word");
var word = mongoose.model('Word',wordSheme,"word");
module.exports = word;