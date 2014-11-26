/**
 * Created by Wouter on 25/11/14.
 */

var Snake = function (id,length,bodyArr,startX,startY) {
    this.id = id;
    this.length = length;
    this.bodyArr = bodyArr;
    this.startX = startX;
    this.startY = startY;
    this.nx = 0;
    this.ny = 0;
    //var arr = ["up","left","down"]
    this.direction = "left";
        //arr[Math.floor(Math.random() * arr.length)];
    this.tail = null;
}

Snake.prototype = {
    create: function () {
        for (var i = 0; i < this.length; i++) {
            this.bodyArr.push({x: i + this.startX, y: 0 + this.startY});
        }
    },
    draw: function (color, colorBorder, w, h, food) {
        //The movement code for the snake to come here.
        //The logic is simple
        //Pop out the tail cell and place it infront of the head cell
        this.nx = this.bodyArr[0].x;
        this.ny = this.bodyArr[0].y;
        //These were the position of the head cell.
        //We will increment it to get the new head position
        if (this.direction === "right") this.nx++;
        else if (this.direction === "left") this.nx--;
        else if (this.direction === "up") this.ny--;
        else if (this.direction === "down") this.ny++;

        this.checkEatSelf(w, h);

        this.eat(food);

        this.bodyArr.unshift(this.tail); //puts back the tail as the first cell

        for (var i = 0; i < this.bodyArr.length; i++) {
            var c = this.bodyArr[i];
            //Lets paint 10px wide cells
            ctx.fillStyle = color;
            ctx.fillRect(c.x * celWidth, c.y * celWidth, celWidth, celWidth);
            ctx.strokeStyle = colorBorder;
            ctx.strokeRect(c.x * celWidth, c.y * celWidth, celWidth, celWidth);
        }
    },
    checkEatSelf: function (w, h) {
        //left and right thew wall
        if (this.nx <= -1) {
            this.nx = w / celWidth;
        }
        else if (this.nx == w / celWidth) {
            this.nx = -1;
        }

        if (this.ny <= -1) {
            this.ny = h / celWidth;
        }
        else if (this.ny >= h / celWidth) {
            this.ny = -1;
        }

        if (this.ckeckCollision()) {
            console.log("ik eet mezelf op");
        }
    },
    ckeckCollision: function () {
        for (var i = 0; i < this.bodyArr.length; i++) {
            if (this.bodyArr[i].x == this.nx && this.bodyArr[i].y == this.ny) {
                return true;
            }
        }
        return false;
    },
    eat: function (food) {
        if (this.nx == food.x && this.ny == food.y) {
            this.tail = {x: this.nx, y: this.ny};
            //create new food
            this.length++;
            socket.emit("newFood",{w:w,h:h,celWidth:celWidth});
        }
        else {
            this.tail = this.bodyArr.pop(); //pops out the last cell
            this.tail.x = this.nx;
            this.tail.y = this.ny;
        }
    }
};
