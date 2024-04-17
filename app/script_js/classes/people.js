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
import { camera, ctx, field } from "../variables/variables.js";
import { TemplateCell } from "./template.js";
var People = /** @class */ (function (_super) {
    __extends(People, _super);
    function People(x, y, size, typeImage) {
        var _this = _super.call(this, x, y, size) || this;
        _this.deviationX = Math.random() * field.sizeCell * .5;
        _this.deviationY = Math.random() * field.sizeCell * -.5;
        _this.image = new Image();
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.width = _this.size * .5;
        _this.height = _this.size;
        _this.image.src = './images/people/people.png';
        _this.typeImage = parseInt(typeImage);
        return _this;
    }
    People.prototype.draw = function () {
        ctx.drawImage(this.image, this.typeImage * 300 + 1, 0, 300, 560, this.peopleX, this.peopleY, this.width, this.height);
    };
    People.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.peopleX = this.x + this.deviationX;
        this.peopleY = this.y + this.deviationY;
        this.draw();
    };
    return People;
}(TemplateCell));
export { People };
