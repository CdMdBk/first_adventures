var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TemplateCell } from "./template.js";
import { camera, canvas, ctx, field, mapObjects } from "../variables/variables.js";
import { player } from "./player.js";
import { objAudio } from "../variables/list-audio.js";
var Target = /** @class */ (function (_super) {
    __extends(Target, _super);
    function Target(x, y, size) {
        var _this = _super.call(this, x, y, size) || this;
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        return _this;
    }
    Target.prototype.changePositions = function () {
        var _this = this;
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        if (this.x >= 0 &&
            this.x + this.size <= canvas.width &&
            this.y >= 0 &&
            this.y + this.size <= canvas.height &&
            player.numberOfCompletedFrames % 300 === 0) {
            objAudio.effects[3].play();
            setTimeout(function () { mapObjects.bullet.push(new Bullet(field.sizeCell / 10, _this.x, _this.y)); }, 400);
        }
    };
    return Target;
}(TemplateCell));
var Bullet = /** @class */ (function () {
    // public radian:number;.
    function Bullet(size, targetX, targetY) {
        this.image = new Image();
        this.lifeTime = 0;
        this.constSpeed = canvas.height / 40 * .3;
        this.size = size;
        if (Math.floor(Math.random() * 2) % 2 === 0) {
            if (Math.floor(Math.random() * 2) % 2 === 0) {
                this.x = canvas.width + this.size * 2;
            }
            else {
                this.x = -this.size * 2;
            }
            this.y = Math.random() * (canvas.height + this.size * 2) - this.size * 2;
        }
        else {
            if (Math.floor(Math.random() * 2) % 2 === 0) {
                this.y = canvas.height + this.size * 2;
            }
            else {
                this.y = -this.size * 2;
            }
            this.x = Math.random() * (canvas.width + this.size * 2) - this.size * 2;
        }
        this.startX = this.x;
        this.startY = this.y;
        this.currentPositionX = camera.currentPosition.x;
        this.currentPositionY = camera.currentPosition.y;
        this.targetX = targetX;
        this.targetY = targetY;
        (this.x < targetX) ? this.speedX = this.constSpeed : this.speedX = -this.constSpeed;
        (this.y < targetY) ? this.speedY = this.constSpeed : this.speedY = -this.constSpeed;
        //@ts-ignore
        this.hypot = Math.abs(Math.hypot(this.startX - this.targetX, this.startY - this.targetY));
        this.sin = Math.abs((this.startY - this.targetY) / this.hypot);
        this.cos = Math.abs((this.startX - this.targetX) / this.hypot);
        this.image.src = './images/bullet/bullet.png';
    }
    Bullet.prototype.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    };
    Bullet.prototype.changePositions = function () {
        this.x += this.cos * this.speedX + (this.currentPositionX - camera.currentPosition.x);
        this.y += this.sin * this.speedY + (this.currentPositionY - camera.currentPosition.y);
        this.currentPositionX = camera.currentPosition.x;
        this.currentPositionY = camera.currentPosition.y;
        this.lifeTime++;
        this.draw();
    };
    return Bullet;
}());
export { Target, Bullet };
