/**
 * Created by Wouter on 08/12/14.
 */

module.exports = (function(){
    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/snakedb");
    //online
    //mongoose.connect("mongodb://admin:password@ds031271.mongolab.com:31271/snakedb");
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
