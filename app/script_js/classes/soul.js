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
import { backpack, camera, ctx, field, keys } from "../variables/variables.js";
import { player } from "./player.js";
import { TemplateCell } from "./template.js";
var Soul = /** @class */ (function (_super) {
    __extends(Soul, _super);
    function Soul(x, y, size, color, condition, distanceFromCenter, radian) {
        var _this = _super.call(this, x, y, size) || this;
        _this.amplitude = 0;
        _this.amplitudeSpeed = .1;
        _this.opacity = 1;
        _this.speed = 5;
        _this.speedConst = .002;
        _this.stage = 0;
        _this.frame = 0;
        _this.currentFrame = 0;
        _this.radius = _this.size;
        _this.startRadius = _this.radius;
        _this.condition = condition;
        _this.color = color;
        _this.currentPositionX = camera.currentPosition.x;
        _this.currentPositionY = camera.currentPosition.y;
        if (distanceFromCenter)
            _this.distanceFromCenter = distanceFromCenter;
        if (radian || radian === 0)
            _this.radian = radian;
        return _this;
    }
    Soul.prototype.drawStationary = function () {
        ctx.fillStyle = this.colorGradient;
        ctx.fillRect(this.x - this.startRadius * .2, this.y - this.startRadius * .2 + this.amplitude, this.startRadius * 2.4, this.startRadius * 2.4);
    };
    Soul.prototype.drawInCircle = function (centerX, centerY) {
        while (this.opacity > 0 && this.startRadius > 1.1) {
            this.colorGradient = ctx.createRadialGradient(this.x + this.startRadius, this.y + this.startRadius, this.radius / 2, this.x + this.startRadius, this.y + this.startRadius, this.radius * 1.2);
            this.colorGradient.addColorStop(.8, "rgb(".concat(this.color, ", ").concat(this.opacity, ")"));
            this.colorGradient.addColorStop(1, "rgba(".concat(this.color, ", 0)"));
            ctx.fillStyle = this.colorGradient;
            ctx.fillRect(this.x - this.startRadius * 2, this.y - this.startRadius * 2, this.radius * 6, this.radius * 6);
            this.opacity -= .05;
            if (this.radius > 1.1)
                this.radius -= 1;
            this.radian -= this.speedConst;
            this.x = centerX - this.startRadius;
            this.y = centerY - this.startRadius;
            this.x += Math.cos(this.radian) * this.distanceFromCenter;
            this.y += Math.sin(this.radian) * this.distanceFromCenter;
        }
        this.opacity = 1;
        this.radian = this.startRadian;
        this.radius = this.startRadius;
    };
    Soul.prototype.changePositions = function (centerX, centerY) {
        switch (this.condition) {
            case 'stationary':
                if (player.numberOfCompletedFrames === 0)
                    this.frame = 0;
                this.x += this.currentPositionX - camera.currentPosition.x;
                this.y += this.currentPositionY - camera.currentPosition.y;
                this.currentPositionX = camera.currentPosition.x;
                this.currentPositionY = camera.currentPosition.y;
                if (this.frame === 0) {
                    this.amplitude += this.amplitudeSpeed;
                    if (this.amplitude >= 12)
                        this.frame = 1;
                }
                else {
                    this.amplitude -= this.amplitudeSpeed;
                    if (this.amplitude <= 0)
                        this.frame = 0;
                }
                this.colorGradient = ctx.createRadialGradient(this.x + this.startRadius, this.y + this.startRadius + this.amplitude, this.radius / 2, this.x + this.startRadius, this.y + this.startRadius + this.amplitude, this.radius * 1.2);
                this.colorGradient.addColorStop(.8, "rgb(".concat(this.color, ", ").concat(this.opacity, ")"));
                this.colorGradient.addColorStop(1, "rgba(".concat(this.color, ", 0)"));
                this.drawStationary();
                break;
            case 'circle':
                switch (this.stage) {
                    case 0:
                        this.speedConst = .002;
                        break;
                    case 1:
                        if (this.speedConst < .01 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst += .0002;
                        this.distanceFromCenter -= .2;
                        break;
                    case 2:
                        if (this.speedConst < .02 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst += .0004;
                        this.distanceFromCenter -= .2;
                        break;
                    case 3:
                        if (this.speedConst > .01 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst -= .0004;
                        if (this.distanceFromCenter > this.radius * 1.3)
                            this.distanceFromCenter -= .2;
                        break;
                    case 4:
                        if (this.speedConst > .004 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst -= .0002;
                        break;
                    case 5:
                        if (this.speedConst < .01 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst += .0002;
                        break;
                    case 6:
                        if (this.speedConst < .02 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst += .0002;
                        this.distanceFromCenter -= .4;
                        break;
                    case 7:
                        if (this.speedConst < .03 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst += .0002;
                        this.distanceFromCenter -= 1;
                        break;
                    case 8:
                        if (this.speedConst > .01 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst -= .0004;
                        this.distanceFromCenter -= .2;
                        break;
                    case 10:
                        if (this.speedConst < .03 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst += .0002;
                        if (this.distanceFromCenter < 200)
                            this.distanceFromCenter += 1;
                        break;
                    case 11:
                        if (this.speedConst > .01 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst -= .0004;
                        if (this.distanceFromCenter < this.startRadius * 1.3)
                            this.distanceFromCenter += .1;
                        break;
                    case 12:
                        if (this.speedConst < .1 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst += .0002;
                        if (this.distanceFromCenter > this.startRadius * 1.3)
                            this.distanceFromCenter -= .05;
                        break;
                    case 13:
                        if (this.speedConst > .01 && player.numberOfCompletedFrames % 6 === 0)
                            this.speedConst -= .0004;
                        if (this.distanceFromCenter > this.startRadius * 1.1)
                            this.distanceFromCenter -= .04;
                        this.startRadius -= .02;
                        break;
                }
                this.x = centerX - this.startRadius;
                this.y = centerY - this.startRadius;
                this.radian += this.speedConst;
                this.startRadian = this.radian;
                this.x += Math.cos(this.startRadian) * this.distanceFromCenter;
                this.y += Math.sin(this.startRadian) * this.distanceFromCenter;
                this.drawInCircle(centerX, centerY);
                break;
        }
    };
    Soul.prototype.showHint = function () {
        if (!keys.f.pause) {
            ctx.fillStyle = 'rgba(0,0,0,.5)';
            ctx.fillRect(this.x - this.radius * 3, this.y - this.radius * 1.5, this.radius * 8, this.radius);
            ctx.fillStyle = 'white';
            ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText('жмякни "а"', this.x + this.radius, this.y - this.radius);
        }
    };
    Soul.prototype.startDialog = function () {
        if (keys.f.pressed && !keys.f.pause && !backpack.classList.contains('backpack_active')) {
            keys.f.pause = true;
            player.thinks = true;
            player.playerTasks.completedDialogues.soulKolya = true;
        }
    };
    return Soul;
}(TemplateCell));
export { Soul };
