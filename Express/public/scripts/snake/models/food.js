/**
 * Created by Wouter on 22/11/14.
 */

var Food = function(id,type,x,y,color){
    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = color;
}

Food.prototype = {
    get Id(){
        return this.id;
    },
    set Id(v){
        this.id = v;
    },
    get Type(){
        return this.type;
    },
    set Type(v){
        this.type = v;
    },
    get X(){
        return this.x;
    },
    set X(v){
        this.x = v;
    },
    get Y(){
        return this.y;
    },
    set Y(v){
        this.y = v;
    },
    get Color(){
        return this.color;
    },
    set Color(v){
        this.color = v;
    },
    draw: function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,3,3);
    }
}