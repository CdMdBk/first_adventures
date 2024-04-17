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
import { camera, canvas, ctx, field } from "../variables/variables.js";
var Fence = /** @class */ (function (_super) {
    __extends(Fence, _super);
    function Fence(x, y, size, src, position) {
        var _this = _super.call(this, x, y, size) || this;
        _this.image = new Image();
        _this.width = _this.size / 3;
        _this.height = _this.size;
        _this.fenceX = _this.x + _this.width * position.x;
        _this.fenceY = (_this.y - _this.width * 2) + (_this.width * position.y);
        _this.startX = _this.fenceX;
        _this.startY = _this.fenceY;
        _this.image.src = src;
        return _this;
    }
    Fence.prototype.draw = function () {
        if (this.fenceX >= -field.sizeCell && this.fenceX <= canvas.width + 100 && this.fenceY >= -field.sizeCell && this.fenceY <= canvas.height + 100)
            ctx.drawImage(this.image, this.fenceX, this.fenceY, this.width, this.height);
    };
    Fence.prototype.changePositions = function () {
        this.fenceX = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.fenceY = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
    };
    return Fence;
}(TemplateCell));
export { Fence };
