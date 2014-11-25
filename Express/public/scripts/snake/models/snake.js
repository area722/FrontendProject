/**
 * Created by Wouter on 22/11/14.
 */

var Snake = function(color,id,width,x,y,height,control){
    this.color = color;
    this.id = id;
    this.width = width;
    this.x = x;
    this.y = y;
    this.body = [];
    this.height = height;
    this.control = control;
}

Snake.prototype = {
    get Color() {
        return this.color;
    },
    set Color(v) {
        this.color = v;
    },
    get Id(){
        return this.id;
    },
    set Id(v){
        this.id = v;
    },
    get Width(){
        return this.width;
    },
    set Width(v){
        this.width = v;
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
    get Height(){
        return this.height;
    },
    set Height(v){
        this.height = v;
    },
    get Body(){
        return this.body;
    },
    set Body(v){
        this.body = v;
    },
    set Control(v){
        this.control = v;
    },
    get Control(){
        return this.control;
    },
    moveX: function (step) {
        var dit = this;
        this.x += step;
        $.each(this.body, function (i,val) {
            val.x = dit.x;
        });
    },
    moveY: function(step){
        var dit = this;
        this.y -= step;
        $.each(this.body,function(i,val){
            val.y = dit.y;
        });
    },
    Eat: function () {
        this.body.push({x: this.x+3,y:this.y,w: 3,h:3});
        console.log("bodylength "+ this.body.length);
    },
    draw: function(ctx) {
        var dit = this;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        $.each(this.body, function (i, val) {
            val.x = dit.x;
            val.y = dit.y;
            if(dit.control == "left" || dit.control == "right")
            {
                ctx.fillRect(val.x + ((i+1)*3), val.y, val.w, val.h);
            }
            else{
                ctx.fillRect(val.x, val.y + ((i+1)*3), val.w, val.h);
            }
        });
    }
}