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
import { canvas, ctx, field, keys, camera } from "../variables/variables.js";
import { player } from "./player.js";
var Tablet = /** @class */ (function (_super) {
    __extends(Tablet, _super);
    function Tablet(x, y, size, hint, srcImage, srcImageHint) {
        var _this = _super.call(this, x, y, size) || this;
        _this.hintIsActive = false;
        _this.lineHeight = field.sizeCell / 13;
        _this.image = new Image();
        _this.imageHint = new Image();
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.image.src = srcImage;
        _this.imageHint.src = srcImageHint;
        _this.hint = hint;
        return _this;
    }
    Tablet.prototype.draw = function () {
        ctx.drawImage(this.image, this.tabletX, this.tabletY, this.size, this.size);
    };
    Tablet.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.tabletX = this.x + this.size / 6;
        this.tabletY = this.y + this.size / 6;
        this.draw();
    };
    Tablet.prototype.showText = function () {
        if (!player.thinks) {
            ctx.fillStyle = 'rgba(0,0,0,.5)';
            ctx.fillRect(this.tabletX - this.size / 2, this.tabletY - this.size / 4, this.size * 2, this.size / 4);
            ctx.fillStyle = 'white';
            ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText('жмякни "а", чтобы прочитать', this.tabletX + this.size / 2, this.tabletY - this.size / 8);
        }
    };
    Tablet.prototype.toggleHint = function () {
        if (keys.f.pressed && !keys.f.pause) {
            player.audio.openTablet.currentTime = 0;
            player.audio.openTablet.play();
            (this.hintIsActive) ? this.hintIsActive = false : this.hintIsActive = true;
            keys.f.pause = true;
            (player.thinks) ? player.thinks = false : player.thinks = true;
            setTimeout(function () {
                keys.f.pause = false;
            }, 500);
        }
    };
    Tablet.prototype.showHint = function () {
        if (this.hintIsActive) {
            ctx.drawImage(this.imageHint, canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
            ctx.fillStyle = '#2C1208';
            ctx.font = "900 ".concat(field.sizeCell / 8, "px Pixel Art");
            this.lineHeight = field.sizeCell / 8;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            this.drawText();
        }
    };
    Tablet.prototype.drawText = function () {
        var _this = this;
        this.hint.split('\n').forEach(function (line, index) {
            ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (index - 3) * _this.lineHeight);
        });
    };
    return Tablet;
}(TemplateCell));
export { Tablet };
