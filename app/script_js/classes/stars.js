import { ctx } from "../variables/variables.js";
var Star = /** @class */ (function () {
    function Star(x, y, radius, color, condition, distanceFromCenter) {
        this.currentX = 0;
        this.currentY = 0;
        this.radian = Math.random() * 6.283;
        this.speed = Math.random() * (.0005 + .0005) - .0005;
        this.speedConst = 1;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        if (distanceFromCenter)
            this.distanceFromCenter = distanceFromCenter;
        this.condition = condition;
        if (this.condition === 'distance') {
            if (Math.random() * 4 > 3) {
                this.radian = Math.random() * 1.57;
            }
            else if (Math.random() * 4 > 2) {
                this.radian = Math.random() * (3.14 - 1.57) + 1.57;
            }
            else if (Math.random() * 4 > 1) {
                this.radian = Math.random() * (4.71 - 3.14) + 3.14;
            }
            else if (Math.random() * 4 >= 0) {
                this.radian = Math.random() * (6.28 - 4.71) + 4.71;
            }
        }
    }
    Star.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = this.color;
        ctx.closePath();
    };
    Star.prototype.movement = function (centerX, centerY) {
        if (centerX) {
            this.x = centerX;
            this.y = centerY;
        }
        switch (this.condition) {
            case 'circle':
                this.radian += this.speed;
                this.x += Math.cos(this.radian) * this.distanceFromCenter;
                this.y += Math.sin(this.radian) * this.distanceFromCenter;
                this.draw();
                break;
            case 'distance':
                this.radius += .01;
                if (this.speedConst < 2)
                    this.speedConst += .005;
                if (this.speedConst >= 2)
                    this.speedConst += .01;
                this.x += Math.cos(this.radian) * this.speedConst;
                this.y += Math.sin(this.radian) * this.speedConst;
                this.draw();
                break;
        }
    };
    return Star;
}());
export { Star };
