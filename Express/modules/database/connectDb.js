/**
 * Created by Wouter on 08/12/14.
 */

module.exports = (function(){
    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/snakeDB");
    mongoose.connection.on("open", function () {
        console.log("connection met mongo server ");
        // get collection (=table) names als test
        mongoose.connection.db.collectionNames(function (err,names) {
            console.log("collection list:");
            console.log(names);
        });
    });

    mongoose.connection.on("error", function () {  });
    mongoose.connection.on("close", function () {  });
})();
