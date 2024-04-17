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
import { camera, ctx } from "../variables/variables.js";
var ParticlePlayer = /** @class */ (function (_super) {
    __extends(ParticlePlayer, _super);
    function ParticlePlayer(x, y, size) {
        var _this = _super.call(this, x, y, size) || this;
        _this.color = '224, 50, 154';
        _this.opacity = 1;
        _this.radian = Math.random() * 6.28;
        _this.sin = Math.sin(_this.radian);
        _this.cos = Math.cos(_this.radian);
        _this.speed = Math.random() * (15 + 5) - 5;
        _this.currentPositionX = camera.currentPosition.x;
        _this.currentPositionY = camera.currentPosition.y;
        return _this;
    }
    ParticlePlayer.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size * .5, this.size * .5, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(".concat(this.color, ", ").concat(this.opacity, ")");
        ctx.fill();
        ctx.closePath();
    };
    ParticlePlayer.prototype.changePositions = function () {
        this.x += this.cos * this.speed + (this.currentPositionX - camera.currentPosition.x);
        this.y += this.sin * this.speed + (this.currentPositionY - camera.currentPosition.y);
        this.currentPositionX = camera.currentPosition.x;
        this.currentPositionY = camera.currentPosition.y;
        this.draw();
        this.opacity -= .02;
        if (this.speed > 5)
            this.speed--;
    };
    return ParticlePlayer;
}(TemplateCell));
var ParticleDemon = /** @class */ (function (_super) {
    __extends(ParticleDemon, _super);
    function ParticleDemon(x, y, size) {
        var _this = _super.call(this, x, y, size) || this;
        _this.color = '137, 50, 224';
        _this.opacity = 1;
        _this.radian = Math.random() * 6.28;
        _this.sin = Math.sin(_this.radian);
        _this.cos = Math.cos(_this.radian);
        _this.speed = Math.random() * (20 + 10) - 10;
        _this.currentPositionX = camera.currentPosition.x;
        _this.currentPositionY = camera.currentPosition.y;
        return _this;
    }
    ParticleDemon.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size * .5, this.size * .5, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(".concat(this.color, ", ").concat(this.opacity, ")");
        ctx.fill();
        ctx.closePath();
    };
    ParticleDemon.prototype.changePositions = function () {
        this.x += this.cos * this.speed + (this.currentPositionX - camera.currentPosition.x);
        this.y += this.sin * this.speed + (this.currentPositionY - camera.currentPosition.y);
        this.currentPositionX = camera.currentPosition.x;
        this.currentPositionY = camera.currentPosition.y;
        this.draw();
        this.opacity -= .02;
        if (this.speed > 5)
            this.speed--;
    };
    return ParticleDemon;
}(TemplateCell));
var ParticleBlick = /** @class */ (function (_super) {
    __extends(ParticleBlick, _super);
    function ParticleBlick(x, y, size) {
        var _this = _super.call(this, x, y, size) || this;
        _this.color = '101, 0, 201';
        _this.opacity = 1;
        _this.radian = Math.random() * 6.28;
        _this.sin = Math.sin(_this.radian);
        _this.cos = Math.cos(_this.radian);
        _this.speed = Math.random() * (15 + 5) - 5;
        _this.currentPositionX = camera.currentPosition.x;
        _this.currentPositionY = camera.currentPosition.y;
        return _this;
    }
    ParticleBlick.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size * .5, this.size * .5, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(".concat(this.color, ", ").concat(this.opacity, ")");
        ctx.fill();
        ctx.closePath();
    };
    ParticleBlick.prototype.changePositions = function () {
        this.x += this.cos * this.speed + (this.currentPositionX - camera.currentPosition.x);
        this.y += this.sin * this.speed + (this.currentPositionY - camera.currentPosition.y);
        this.currentPositionX = camera.currentPosition.x;
        this.currentPositionY = camera.currentPosition.y;
        this.draw();
        this.opacity -= .02;
        if (this.speed > 5)
            this.speed--;
    };
    return ParticleBlick;
}(TemplateCell));
var ParticleDeadBlick = /** @class */ (function (_super) {
    __extends(ParticleDeadBlick, _super);
    function ParticleDeadBlick(x, y, size) {
        var _this = _super.call(this, x, y, size) || this;
        _this.color = '101, 0, 201';
        _this.opacity = 1;
        _this.radian = Math.random() * 6.28;
        _this.sin = Math.sin(_this.radian);
        _this.cos = Math.cos(_this.radian);
        _this.speed = Math.random() * (30 + 10) - 10;
        _this.startSize = _this.size;
        _this.size *= Math.random() * .4 + .1;
        _this.currentPositionX = camera.currentPosition.x;
        _this.currentPositionY = camera.currentPosition.y;
        return _this;
    }
    ParticleDeadBlick.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * .5, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(".concat(this.color, ", ").concat(this.opacity, ")");
        ctx.fill();
        ctx.closePath();
    };
    ParticleDeadBlick.prototype.changePositions = function () {
        this.x += this.cos * this.speed + (this.currentPositionX - camera.currentPosition.x);
        this.y += this.sin * this.speed + (this.currentPositionY - camera.currentPosition.y);
        this.currentPositionX = camera.currentPosition.x;
        this.currentPositionY = camera.currentPosition.y;
        this.draw();
        this.opacity -= .005;
        if (this.speed > 5)
            this.speed--;
    };
    return ParticleDeadBlick;
}(TemplateCell));
export { ParticlePlayer, ParticleDemon, ParticleBlick, ParticleDeadBlick };
