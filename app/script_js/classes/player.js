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
import { camera, canvas, ctx, keys } from "../variables/variables.js";
import { objAudio } from "../variables/list-audio.js";
import { TemplateCell } from "./template.js";
var Player = /** @class */ (function () {
    function Player() {
        this.amplitude = 0;
        this.amplitudeSpeed = .1;
        this.action = 'worth';
        this.currentDirection = 'right';
        this.image = {
            stateOfRest: {
                left: new Image(),
                right: new Image()
            },
            movementStatus: {
                left: new Image(),
                right: new Image()
            },
            beats: {
                left: new Image(),
                right: new Image()
            },
            heals: {
                left: new Image(),
                right: new Image()
            }
        };
        this.numberOfCompletedFrames = 0;
        this.frame = -1;
        this.numberOfFrames = 10;
        this.color = '#e0329a';
        this.transparentColor = 'rgba(224,50,154,0)';
        this.speedX = 0;
        this.speedY = 0;
        this.debuffSpeed = 1;
        this.numberOfLives = 100;
        this.numberOfDeaths = 0;
        this.takesDamage = false;
        this.bossFightStage = false;
        this.attack = false;
        this.recharge = 0;
        this.timeWithoutAttacks = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.numberOfEnemiesKilled = {
            demon: 0,
            CorruptedMadBlick: 0
        };
        this.audio = {
            walkingLawn: objAudio.player[0],
            walkingStone: objAudio.player[1],
            flight: objAudio.player[2],
            pickUp: objAudio.player[3],
            openTablet: objAudio.player[4],
            laLaLa: objAudio.player[5],
            la: objAudio.player[6]
        };
        this.thinks = false; //for stop movement, типо игрок думает, ходить нельзя
        this.permissionMovement = true; //разрешение на движение (collision detection)
        this.stageOfConversation = {
            Borya: 0,
            Danya: 0,
            Mark: 0,
            Alina: 0,
            Kolya: 0,
            Vlad: 0,
            Drunk: 0,
            Wounded: 0,
            Lera: 0
        };
        this.playerTasks = {
            completedDialogues: {
                Borya: false,
                Danya: false,
                Mark: false,
                Alina: false,
                Kolya: false,
                Vlad: false,
                Drunk: false,
                Wounded: false,
                Lera: false,
                soulKolya: false
            },
            backpack: [],
            //@ts-ignore
            memories: new Set()
        };
    }
    Player.prototype.drawPlayer = function () {
        switch (this.action) {
            case 'worth':
                ctx.drawImage(this.image.stateOfRest[this.currentDirection], 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height);
                break;
            case 'moving':
                ctx.drawImage(this.image.movementStatus[this.currentDirection], 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height);
                break;
            case 'heals':
                (this.currentDirection === 'left') ?
                    ctx.drawImage(this.image.heals.left, 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height) :
                    ctx.drawImage(this.image.heals.right, 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height);
                break;
            case 'beats':
                (this.currentDirection === 'left') ?
                    ctx.drawImage(this.image.beats.left, 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height) :
                    ctx.drawImage(this.image.beats.right, 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height);
                break;
        }
    };
    Player.prototype.drawSoul = function () {
        ctx.fillStyle = this.colorGradient;
        ctx.fillRect(this.x - this.width * .1, this.y - this.width * .1 + this.amplitude, this.width * 1.2, this.width * 1.2);
    };
    Player.prototype.motionless = function () {
        this.action = 'worth';
        this.numberOfFrames = 27;
        if (this.numberOfCompletedFrames % 8 === 0) {
            this.frame++;
        }
        if (this.frame >= this.numberOfFrames)
            this.frame = 0;
        this.drawPlayer();
    };
    Player.prototype.movementPlayer = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.action !== 'heals' && this.action !== 'beats') {
            if (keys.a.pressed || keys.d.pressed || keys.w.pressed || keys.s.pressed) {
                this.action = 'moving';
                this.numberOfFrames = 16;
            }
            else {
                this.action = 'worth';
                this.numberOfFrames = 27;
            }
        }
        if (this.action === 'heals')
            this.numberOfFrames = 14;
        if (this.action === 'beats')
            this.numberOfFrames = 8;
        if (this.numberOfCompletedFrames % 8 === 0) {
            this.frame++;
        }
        if (this.frame >= this.numberOfFrames) {
            if (this.action === 'heals' || this.action === 'beats') {
                this.action = 'worth';
                this.thinks = false;
                keys.f.pause = false;
            }
            this.frame = 0;
        }
        this.drawPlayer();
        this.speedX = 0;
        this.speedY = 0;
    };
    Player.prototype.movementSoul = function () {
        if (this.numberOfCompletedFrames === 0)
            this.frame = 0;
        this.x += this.speedX;
        this.y += this.speedY;
        (keys.a.pressed || keys.d.pressed || keys.w.pressed || keys.s.pressed) ? this.action = 'moving' : this.action = 'worth';
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
        this.colorGradient = ctx.createRadialGradient(this.x + this.width / 2, this.y + this.width / 2 + this.amplitude, this.width / 4, this.x + this.width / 2, this.y + this.width / 2 + this.amplitude, this.width * .6);
        this.colorGradient.addColorStop(.8, this.color);
        this.colorGradient.addColorStop(1, this.transparentColor);
        this.drawSoul();
        this.speedX = 0;
        this.speedY = 0;
    };
    Player.speed = 8;
    return Player;
}());
var PlayerSimulator = /** @class */ (function (_super) {
    __extends(PlayerSimulator, _super);
    function PlayerSimulator(x, y, size) {
        var _this = _super.call(this, x, y, size) || this;
        // public amplitude:number = 0;
        // public frame:number = 0;
        _this.opacity = 1;
        _this.color = '224, 50, 154';
        _this.x += _this.size * .5;
        _this.y += _this.size * .5;
        _this.startX = _this.x;
        _this.startY = _this.y;
        _this.startPositionX = camera.currentPosition.x;
        _this.startPositionY = camera.currentPosition.y;
        return _this;
    }
    PlayerSimulator.prototype.draw = function () {
        ctx.fillStyle = this.colorGradient;
        ctx.fillRect(this.x - this.size * .6, this.y - this.size * .6, this.size * 1.2, this.size * 1.2);
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.size * .5, 0, Math.PI * 2, false);
        // ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        // ctx.fill();
        // ctx.closePath();
    };
    PlayerSimulator.prototype.changePositions = function () {
        this.x = this.startX + (this.startPositionX - camera.currentPosition.x);
        this.y = this.startY + (this.startPositionY - camera.currentPosition.y);
        this.size *= .98;
        // if (player.numberOfCompletedFrames % 120 === 0) {
        //   this.frame++;
        // }
        // if (this.frame >= 2) this.frame = 0;
        // (!this.frame) ? this.amplitude += .1 : this.amplitude -= .1;
        this.opacity -= .05;
        this.colorGradient = ctx.createRadialGradient(this.x, this.y, this.size / 4, this.x, this.y, this.size * .6);
        this.colorGradient.addColorStop(.8, "rgba(".concat(this.color, ", ").concat(this.opacity, ")"));
        this.colorGradient.addColorStop(1, "rgba(".concat(this.color, ", 0)"));
        this.draw();
    };
    return PlayerSimulator;
}(TemplateCell));
var Shell = /** @class */ (function (_super) {
    __extends(Shell, _super);
    function Shell(x, y, size, playerWidth, attackX, attackY) {
        var _this = _super.call(this, x, y, size) || this;
        _this.color = '224, 50, 154';
        _this.opacity = 1;
        _this.shadowX = 0;
        _this.shadowY = 0;
        _this.numberOfShadows = 5;
        _this.constSpeed = canvas.height / 40 * .25;
        _this.startSize = _this.size;
        _this.x += playerWidth / 2 - _this.size / 2;
        _this.y += playerWidth / 2 - _this.size / 2;
        _this.startX = _this.x;
        _this.startY = _this.y;
        _this.targetX = attackX * 2 - _this.size / 2;
        _this.targetY = attackY * 2 - _this.size / 2;
        _this.currentPositionX = camera.currentPosition.x;
        _this.currentPositionY = camera.currentPosition.y;
        (_this.x < _this.targetX) ? _this.speedX = _this.constSpeed : _this.speedX = -_this.constSpeed;
        (_this.y < _this.targetY) ? _this.speedY = _this.constSpeed : _this.speedY = -_this.constSpeed;
        //@ts-ignore
        _this.hypot = Math.abs(Math.hypot(_this.startX - _this.targetX, _this.startY - _this.targetY));
        _this.sin = Math.abs((_this.startY - _this.targetY) / _this.hypot);
        _this.cos = Math.abs((_this.startX - _this.targetX) / _this.hypot);
        return _this;
    }
    Shell.prototype.draw = function () {
        for (var i = 0; i < this.numberOfShadows; i++) {
            this.colorGradient = ctx.createRadialGradient(this.x + this.size * .5 - this.shadowX, this.y + this.size * .5 - this.shadowY, this.size / 4, this.x + this.size * .5 - this.shadowX, this.y + this.size * .5 - this.shadowY, this.size * .6);
            this.colorGradient.addColorStop(.8, "rgb(".concat(this.color, ", ").concat(this.opacity, ")"));
            this.colorGradient.addColorStop(1, "rgba(".concat(this.color, ", 0)"));
            ctx.fillStyle = this.colorGradient;
            ctx.fillRect(this.x - this.size - this.shadowX, this.y - this.size - this.shadowY, this.size * 3, this.size * 3);
            this.shadowX += this.speedX * this.cos;
            this.shadowY += this.speedY * this.sin;
            this.opacity -= .1;
            this.size -= 1;
        }
    };
    Shell.prototype.changePositions = function () {
        this.x += this.cos * this.speedX + (this.currentPositionX - camera.currentPosition.x);
        this.y += this.sin * this.speedY + (this.currentPositionY - camera.currentPosition.y);
        this.currentPositionX = camera.currentPosition.x;
        this.currentPositionY = camera.currentPosition.y;
        this.shadowX = 0;
        this.shadowY = 0;
        this.opacity = 1;
        this.size = this.startSize;
        if (player.numberOfCompletedFrames % 10 === 0 && this.numberOfShadows < 10)
            this.numberOfShadows++;
        this.draw();
    };
    return Shell;
}(TemplateCell));
var player = new Player();
export { Player, PlayerSimulator, Shell, player };
