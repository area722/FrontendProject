/**
 * Created by Wouter on 31/12/14.
 */

var request = require('superagent');
var expect = require('expect.js');

describe('post response', function(){
    it (function(done){
        request.get('http://localhost:8001/home').end(function(req,res){
            expect(res).to.exist;
            done();
        });
    });
});