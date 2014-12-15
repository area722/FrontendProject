/**
 * Created by Wouter on 22/11/14.
 */

var Food = function (x,y) {
    this.x = x;
    this.y = y;
};

Food.prototype = {
    draw: function(){
        ctx.fillStyle = "#608a36";
        ctx.fillRect(this.x*celWidth, this.y*celWidth, celWidth, celWidth);
        ctx.fillStyle = "#1f2c13";
        ctx.font = "30px Arial";
        ctx.fillText("*",this.x*celWidth,this.y*celWidth + 2*celWidth + 2.5);
    }
};