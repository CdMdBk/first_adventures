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
import { canvas, camera, ctx, field } from "../variables/variables.js";
import { TemplateCell } from "./template.js";
var Water = /** @class */ (function (_super) {
    __extends(Water, _super);
    function Water(x, y, size, src) {
        var _this = _super.call(this, x, y, size) || this;
        _this.image = new Image();
        _this.frame = 0;
        _this.countFrames = 0;
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.image.src = src;
        return _this;
    }
    Water.prototype.draw = function () {
        if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell && this.y <= canvas.height + 100)
            ctx.drawImage(this.image, 400 * this.frame, 0, 400, 400, this.x, this.y, this.size + 5, this.size + 5);
    };
    Water.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
        this.countFrames++;
        if (this.countFrames === 8) {
            this.frame++;
            this.countFrames = 0;
        }
        if (this.frame >= 30)
            this.frame = 0;
    };
    return Water;
}(TemplateCell));
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree(x, y, size, height, src) {
        var _this = _super.call(this, x, y, size) || this;
        _this.image = new Image();
        _this.frame = 0;
        _this.countFrames = 0;
        _this.startX = _this.x;
        _this.startY = _this.y;
        _this.width = _this.size;
        _this.height = height;
        _this.image.src = src;
        return _this;
    }
    Tree.prototype.draw = function () {
        ctx.drawImage(this.image, 400 * this.frame, 0, 400, 540, this.treeX - this.width, this.treeY - this.width, this.height, this.height * 4 / 3);
    };
    Tree.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.treeX = this.x + this.height / 2 - this.width / 2;
        this.treeY = this.y - this.height / 3;
        this.draw();
        this.countFrames++;
        if (this.countFrames === 8) {
            this.frame++;
            this.countFrames = 0;
        }
        if (this.frame >= 30)
            this.frame = 0;
    };
    return Tree;
}(TemplateCell));
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(x, y, size, typeImage) {
        var _this = _super.call(this, x, y, size) || this;
        _this.image = new Image();
        _this.width = _this.size;
        _this.height = _this.size * 1.5;
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.image.src = './images/wall/wall.png';
        _this.typeImage = parseInt(typeImage);
        return _this;
    }
    Wall.prototype.draw = function () {
        if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell * 1.5 && this.y <= canvas.height + 100)
            ctx.drawImage(this.image, 400 * this.typeImage + 1, 0, 395, 600, this.x, this.y, this.width + 5, this.height + 5);
    };
    Wall.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
    };
    return Wall;
}(TemplateCell));
var CubicZirconia = /** @class */ (function (_super) {
    __extends(CubicZirconia, _super);
    function CubicZirconia(x, y, size, condition) {
        var _this = _super.call(this, x, y, size) || this;
        _this.image = {
            aggressive: new Image(),
            neutral: new Image()
        };
        _this.frame = 0;
        _this.countFrames = 0;
        _this.width = _this.size;
        _this.height = _this.size * 1.5;
        _this.startX = _this.x - 5;
        _this.startY = _this.y - 5;
        _this.image.aggressive.src = './images/wall/cubic-zirconia-wall.png';
        _this.image.neutral.src = './images/wall/cleaned-wall.png';
        _this.condition = 'aggressive';
        if (condition)
            _this.condition = condition;
        return _this;
    }
    CubicZirconia.prototype.draw = function () {
        switch (this.condition) {
            case 'aggressive':
                if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell * 1.5 && this.y <= canvas.height + 100) {
                    ctx.drawImage(this.image.aggressive, 400 * this.frame + 1, 0, 395, 600, this.x, this.y, this.width + 5, this.height + 5);
                }
                break;
            case 'neutral':
                if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell * 1.5 && this.y <= canvas.height + 100) {
                    ctx.drawImage(this.image.neutral, 400 * this.frame + 1, 0, 395, 600, this.x, this.y, this.width + 5, this.height + 5);
                }
                break;
        }
    };
    CubicZirconia.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
        this.draw();
        this.countFrames++;
        if (this.countFrames === 8) {
            this.frame++;
            this.countFrames = 0;
        }
        if (this.frame >= 30)
            this.frame = 0;
    };
    return CubicZirconia;
}(TemplateCell));
export { Water, Tree, Wall, CubicZirconia };
