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
import { ctx, field, keys, mapObjects, camera } from "../variables/variables.js";
import { player } from "./player.js";
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(x, y, size, typeImage) {
        var _this = _super.call(this, x, y, size) || this;
        _this.positioningError = Math.random() * field.sizeCell * 3 / 4;
        _this.image = new Image();
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.image.src = './images/items/items.png';
        _this.typeImage = parseInt(typeImage);
        return _this;
    }
    Item.prototype.draw = function () {
        ctx.drawImage(this.image, this.typeImage * 100, 0, 100, 100, this.itemX, this.itemY, this.size, this.size);
    };
    Item.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.itemX = this.x + this.positioningError;
        this.itemY = this.y + this.positioningError;
        this.draw();
    };
    Item.prototype.showHint = function () {
        if (!keys.f.pause) {
            ctx.fillStyle = 'rgba(0,0,0,.5)';
            ctx.fillRect(this.itemX - this.size * 2, this.itemY - this.size, this.size * 5, this.size / 2);
            ctx.fillStyle = 'white';
            ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText('жмякни "а", чтобы подобрать', this.itemX + this.size / 2, this.itemY - this.size * .75);
        }
    };
    Item.prototype.pickUp = function (indexItem) {
        if (keys.f.pressed && !keys.f.pause) {
            player.audio.pickUp.currentTime = 0;
            player.audio.pickUp.play();
            player.playerTasks.backpack.push("i".concat(this.typeImage));
            mapObjects.item.splice(indexItem, 1);
        }
    };
    return Item;
}(TemplateCell));
export { Item };
