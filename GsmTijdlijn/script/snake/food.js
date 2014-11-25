/**
 * Created by Wouter on 25/11/14.
 */

var Food = function (x,y,type) {
    this.x = x;
    this.y = y;
    this.type = type;
}

Food.prototype = {
    draw: function(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x*celWidth, this.y*celWidth, celWidth, celWidth);
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x*celWidth, this.y*celWidth, celWidth, celWidth);
    }
};
