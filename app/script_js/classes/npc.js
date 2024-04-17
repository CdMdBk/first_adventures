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
import { backpack, ctx, camera } from "../variables/variables.js";
import { TemplateCell } from "./template.js";
import { field } from "../variables/variables.js";
import { keys } from "../variables/variables.js";
import { Player, player } from "./player.js";
import { objAudio } from "../variables/list-audio.js";
var NPC = /** @class */ (function (_super) {
    __extends(NPC, _super);
    function NPC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frame = 0;
        _this.numberOfFrames = 27;
        return _this;
    }
    return NPC;
}(TemplateCell));
var Interlocutor = /** @class */ (function (_super) {
    __extends(Interlocutor, _super);
    function Interlocutor(x, y, size, height, name, stageOfConversation, phrases, src, heightImage) {
        var _this = _super.call(this, x, y, size) || this;
        _this.phrases = [];
        _this.image = new Image();
        _this.width = _this.size;
        _this.height = height;
        _this.heightImage = heightImage;
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.name = name;
        _this.stageOfConversation = stageOfConversation;
        _this.phrases = phrases;
        _this.image.src = src;
        _this.frame = 0;
        _this.numberOfFrames = 9;
        return _this;
    }
    Interlocutor.prototype.draw = function () {
        ctx.drawImage(this.image, this.frame * 196 + 1, 0, 195, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
    };
    Interlocutor.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
        if (player.numberOfCompletedFrames % 24 === 0) {
            this.frame++;
        }
        if (this.frame >= this.numberOfFrames)
            this.frame = 0;
    };
    Interlocutor.prototype.showHint = function () {
        if (!keys.f.pause) {
            ctx.fillStyle = 'rgba(0,0,0,.5)';
            ctx.fillRect(this.x - this.width * 1.5, this.y - this.width * .75, this.width * 4, this.width / 2);
            ctx.fillStyle = 'white';
            ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText('жмякни "а", чтобы поболтать', this.x + this.width / 2, this.y - this.width / 2);
        }
    };
    Interlocutor.prototype.startDialog = function () {
        if (keys.f.pressed && !keys.f.pause && !backpack.classList.contains('backpack_active')) {
            this.phrases[this.stageOfConversation].play();
            keys.f.pause = true;
            player.thinks = true;
            player.audio.laLaLa.currentTime = 0;
            player.audio.laLaLa.pause();
            this.phrases[this.stageOfConversation].addEventListener('ended', this.endDialog);
            if (!keys.f.pause)
                this.phrases[this.stageOfConversation].removeEventListener('ended', this.endDialog);
            if (this.stageOfConversation < this.phrases.length - 1) {
                this.stageOfConversation++;
                player.stageOfConversation[this.name]++;
            }
            else
                player.playerTasks.completedDialogues[this.name] = true;
        }
    };
    Interlocutor.prototype.endDialog = function () {
        keys.f.pause = false;
        if (!backpack.classList.contains('backpack_active'))
            player.thinks = false;
    };
    return Interlocutor;
}(NPC));
var Wounded = /** @class */ (function (_super) {
    __extends(Wounded, _super);
    function Wounded(x, y, size, height, name, phrases, widthImage, heightImage, healingProcess, stageOfConversation) {
        var _this = _super.call(this, x, y, size) || this;
        _this.phrases = [];
        _this.textHint = 'вылечить девушку';
        _this.image = {
            woundedCondition: new Image(),
            healthyCondition: new Image()
        };
        _this.condition = 'wounded';
        _this.healingProcess = false;
        _this.stageOfConversation = 0;
        _this.width = _this.size;
        _this.height = height;
        _this.widthImage = widthImage;
        _this.heightImage = heightImage;
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.name = name;
        _this.phrases = phrases;
        _this.healingProcess = healingProcess;
        _this.stageOfConversation = stageOfConversation;
        _this.image.woundedCondition.src = './images/characters/wounded.png';
        _this.image.healthyCondition.src = './images/characters/healthy.png';
        _this.frame = 0;
        _this.numberOfFrames = 8;
        return _this;
    }
    Wounded.prototype.draw = function () {
        switch (this.condition) {
            case 'wounded':
                ctx.drawImage(this.image.woundedCondition, this.frame * this.widthImage + 1, 0, this.widthImage - 1, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
                break;
            case 'healthy':
                ctx.drawImage(this.image.healthyCondition, this.frame * this.widthImage + 1, 0, this.widthImage, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
                break;
        }
    };
    Wounded.prototype.changePositions = function () {
        if (this.healingProcess)
            this.textHint = 'жмякни "а", чтобы поговорить';
        if (this.healingProcess && this.condition === 'wounded' && player.action !== 'heals') {
            this.condition = 'healthy';
            this.frame = 0;
            this.numberOfFrames = 9;
            player.thinks = false;
            keys.f.pause = false;
        }
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
        if (this.frame >= this.numberOfFrames)
            this.frame = 0;
    };
    Wounded.prototype.showHint = function () {
        if (!keys.f.pause) {
            ctx.fillStyle = 'rgba(0,0,0,.5)';
            ctx.fillRect(this.x - this.width * 1.5, this.y - this.width * .75, this.width * 4, this.width / 2);
            ctx.fillStyle = 'white';
            ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(this.textHint, this.x + this.width / 2, this.y - this.width / 2);
        }
    };
    Wounded.prototype.heals = function () {
        if (keys.f.pressed &&
            !keys.f.pause &&
            this.condition === 'wounded' &&
            !backpack.classList.contains('backpack_active')) {
            player.debuffSpeed = .5;
            Player.speed *= player.debuffSpeed;
            player.playerTasks.completedDialogues[this.name] = true;
            player.frame = 0;
            player.action = 'heals';
            player.thinks = true;
            keys.f.pause = true;
            this.healingProcess = true;
        }
    };
    Wounded.prototype.startDialog = function () {
        if (keys.f.pressed &&
            !keys.f.pause &&
            this.condition === 'healthy' &&
            !backpack.classList.contains('backpack_active')) {
            this.phrases[this.stageOfConversation].play();
            keys.f.pause = true;
            player.thinks = true;
            this.phrases[this.stageOfConversation].addEventListener('ended', this.endDialog);
            if (!keys.f.pause)
                this.phrases[this.stageOfConversation].removeEventListener('ended', this.endDialog);
            if (this.stageOfConversation < this.phrases.length - 1) {
                this.stageOfConversation++;
                player.stageOfConversation[this.name]++;
            }
        }
    };
    Wounded.prototype.endDialog = function () {
        keys.f.pause = false;
        player.thinks = false;
        if (!backpack.classList.contains('backpack_active'))
            player.thinks = false;
    };
    return Wounded;
}(NPC));
var Lera = /** @class */ (function (_super) {
    __extends(Lera, _super);
    function Lera(x, y, size, height, name, stageOfConversation, phrases, widthImage, heightImage) {
        var _this = _super.call(this, x, y, size) || this;
        _this.phrases = [];
        _this.outrageAudioArray = objAudio.outrage;
        _this.textHint = 'жмякни "а", чтобы поболтать';
        _this.image = {
            stateOfRest: new Image(),
            gettingHit: new Image()
        };
        _this.action = 'worth';
        _this.width = _this.size;
        _this.height = height;
        _this.widthImage = widthImage;
        _this.heightImage = heightImage;
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.name = name;
        _this.stageOfConversation = stageOfConversation;
        _this.phrases = phrases;
        _this.image.stateOfRest.src = './images/characters/lera-state.png';
        _this.image.gettingHit.src = './images/characters/lera-getting-hit.png';
        _this.frame = 0;
        _this.numberOfFrames = 9;
        return _this;
    }
    Lera.prototype.draw = function () {
        switch (this.action) {
            case 'worth':
                ctx.drawImage(this.image.stateOfRest, this.frame * this.widthImage + 1, 0, this.widthImage - 1, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
                break;
            case 'getting hit':
                ctx.drawImage(this.image.gettingHit, this.frame * this.widthImage + 1, 0, this.widthImage, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
                break;
        }
    };
    Lera.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
        if (this.action === 'worth' && player.numberOfCompletedFrames % 24 === 0)
            this.frame++;
        if (this.action === 'getting hit' && player.numberOfCompletedFrames % 12 === 0)
            this.frame++;
        if (this.frame === 10) {
            this.action = 'worth';
            this.numberOfFrames = 9;
        }
        if (this.frame >= this.numberOfFrames)
            this.frame = 0;
    };
    Lera.prototype.showHint = function () {
        if (!keys.f.pause) {
            ctx.fillStyle = 'rgba(0,0,0,.5)';
            ctx.fillRect(this.x - this.width * 1.5, this.y - this.width * .75, this.width * 4, this.width / 2);
            ctx.fillStyle = 'white';
            ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(this.textHint, this.x + this.width / 2, this.y - this.width / 2);
        }
    };
    Lera.prototype.startDialog = function () {
        if (keys.f.pressed &&
            !keys.f.pause &&
            this.stageOfConversation < this.phrases.length &&
            !backpack.classList.contains('backpack_active')) {
            this.phrases[this.stageOfConversation].play();
            keys.f.pause = true;
            player.thinks = true;
            player.audio.la.currentTime = 0;
            player.audio.la.pause();
            this.phrases[this.stageOfConversation].addEventListener('ended', this.endDialog);
            if (!keys.f.pause)
                this.phrases[this.stageOfConversation].removeEventListener('ended', this.endDialog);
            this.stageOfConversation++;
            player.stageOfConversation[this.name]++;
        }
    };
    Lera.prototype.endDialog = function () {
        keys.f.pause = false;
        if (!backpack.classList.contains('backpack_active'))
            player.thinks = false;
    };
    Lera.prototype.gettingHit = function () {
        if (this.stageOfConversation >= this.phrases.length)
            this.textHint = 'пни её уже!';
        if (keys.f.pressed &&
            !keys.f.pause &&
            !player.thinks &&
            this.stageOfConversation >= this.phrases.length &&
            !backpack.classList.contains('backpack_active')) {
            player.audio.la.currentTime = 0;
            player.audio.la.pause();
            player.thinks = true;
            keys.f.pause = true;
            this.action = 'getting hit';
            this.frame = 0;
            this.numberOfFrames = 10;
            player.playerTasks.completedDialogues[this.name] = true;
            player.frame = 0;
            player.action = 'beats';
            objAudio.player[9].currentTime = 0;
            objAudio.player[9].play();
            this.outrageAudioArray.forEach(function (audio) {
                audio.currentTime = 0;
                audio.pause();
            });
            this.outrageAudioArray[Math.floor(Math.random() * this.outrageAudioArray.length)].play();
        }
    };
    return Lera;
}(NPC));
export { Interlocutor, Wounded, Lera };
