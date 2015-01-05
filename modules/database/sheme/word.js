/**
 * Created by Wouter on 27/12/14.
 */

var mongoose = require("mongoose");
var wordSheme = new mongoose.Schema(
    {
        id: String,
        word: String,
        createdOn: Date
    }
);

module.exports = wordSheme;