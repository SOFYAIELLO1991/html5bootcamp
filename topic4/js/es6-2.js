(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var start = window.mozAnimationStartTime;

function step() {
    class Vector {
        constructor(x = null, y = null) {        
            this.set(x, y);
        }
      
        set(x, y) {
            this.x = x;
            this.y = y;
        }
        
        add(first, second) {
            if (second != null) {
                this.x += first;
                this.y += second;
            } else if (first instanceof Vector) {
                this.x += first.x;
                this.y += first.y;
            } else {
                this.x += first;
                this.y += first;
            }
        }
        
        mult(first, second) {
            if (second != null) {
                this.x *= first;
                this.y *= second;
            } else if (first instanceof Vector) {
                this.x *= first.x;
                this.y *= first.y;
            } else {
                this.x *= first;
                this.y *= first;
            }
        }
    }

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width  = 500;
    var height = 500;
    var mouse = new Vector();

    function setWidth() {
        width  = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    setWidth();
    window.addEventListener("resize", setWidth);
    window.addEventListener("mousemove", e => mouse.set(e.offsetX, e.offsetY));

    function rand(min, max, exception) {
        if (max !== undefined) var val = Math.floor(Math.random() * (max - min + 1)) + min;      
        else var val = Math.floor(Math.random() * (min + 1));    
        if (val == exception) return rand(min, max, exception);
        return val;
    };

    class Square {
        constructor() {
            this.w = 40;
            this.h = 40;
            this.cords = new Vector(rand(0, width - this.w), rand(0, height - this.w));
            this.speed = new Vector(rand(-4, 4, 0), rand(-4, 4, 0));
            this.normalColor = this.randomizeColor();
            this.color = this.normalColor;
            this.isIntersected = false;
        }
        
        randomizeColor() {
            return '#' + Math.round((0x1000000 + 0xffffff * Math.random())).toString(16).slice(1);
        }
        
        becomeIntersected() {
            this.isIntersected = true;
            this.color = this.normalColor;
        }
        
        becomeNOTIntersected() {
            this.isIntersected = false;
            this.color = this.normalColor;
        }
        
        calc() {        
            this.cords.add(this.speed);
            
            if (this.cords.x <= 0 || this.cords.x >= width - this.w) 
                this.speed.mult(-1, 1);
            if (this.cords.y <= 0 || this.cords.y >= height - this.h) 
                this.speed.mult(1, -1);
        }
        
        checkIntersection(item) {
            return this.cords.y + this.h > item.cords.y          &&
                   this.cords.y          < item.cords.y + item.h &&
                   this.cords.x + this.w > item.cords.x          &&
                   this.cords.x          < item.cords.x + item.w
        }
        
        checkMouse(x, y) {
            return x >= this.cords.x          && 
                   x <= this.cords.x + this.w && 
                   y >= this.cords.y          && 
                   y <= this.cords.y + this.h
        }
        
        draw() {        
            ctx.fillStyle = this.color;
            ctx.fillRect(this.cords.x, this.cords.y, this.w, this.h);
        }
    }

    var squares = Array(15).fill().map(e => new Square());
    setInterval(draw, 1000 / 60);

    function draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        
        for(var i = 0; i < squares.length; i++) {   
            squares[i].calc();
          
            for(var j = 0; j < squares.length; j++) 
                if(squares[i] !== squares[j] && squares[i].checkIntersection(squares[j])) 
                    if(!squares[i].isIntersected) squares[i].becomeIntersected();
            
            if (squares[i].checkMouse(mouse.x, mouse.y)) squares[i].color="red"; 
            squares[i].draw();
            squares[i].becomeNOTIntersected();
        }
    }
}

requestAnimationFrame(step);