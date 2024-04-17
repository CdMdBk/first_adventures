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
import { camera, canvas, ctx, field } from "../variables/variables.js";
import { TemplateCell } from "./template.js";
var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    function Floor(x, y, size, src, typeImage) {
        var _this = _super.call(this, x, y, size) || this;
        _this.image = new Image();
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.image.src = src;
        _this.typeImage = parseInt(typeImage);
        return _this;
    }
    Floor.prototype.draw = function () {
        if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell && this.y <= canvas.height + 100)
            ctx.drawImage(this.image, this.typeImage * 400 + 1, 0, 398, 400, this.x, this.y, this.size + 1, this.size + 1);
    };
    Floor.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
    };
    return Floor;
}(TemplateCell));
var Decor = /** @class */ (function (_super) {
    __extends(Decor, _super);
    function Decor(x, y, size, src, typeImage) {
        var _this = _super.call(this, x, y, size) || this;
        _this.image = new Image();
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.image.src = src;
        _this.typeImage = parseInt(typeImage);
        return _this;
    }
    Decor.prototype.draw = function () {
        if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell && this.y <= canvas.height + 100)
            ctx.drawImage(this.image, this.typeImage * 400 + 1, 0, 400, 400, this.x, this.y, this.size + 5, this.size + 5);
    };
    Decor.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
    };
    return Decor;
}(TemplateCell));
export { Floor, Decor };
