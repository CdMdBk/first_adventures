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
import { camera } from "../variables/variables.js";
var Edge = /** @class */ (function (_super) {
    __extends(Edge, _super);
    function Edge(x, y, size) {
        var _this = _super.call(this, x, y, size) || this;
        _this.startX = _this.x;
        _this.startY = _this.y;
        return _this;
    }
    Edge.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    };
    return Edge;
}(TemplateCell));
var EndLevel = /** @class */ (function (_super) {
    __extends(EndLevel, _super);
    function EndLevel(x, y, size) {
        var _this = _super.call(this, x, y, size) || this;
        _this.startX = _this.x;
        _this.startY = _this.y;
        return _this;
    }
    EndLevel.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    };
    return EndLevel;
}(TemplateCell));
var ChangeStageOfLevel = /** @class */ (function (_super) {
    __extends(ChangeStageOfLevel, _super);
    function ChangeStageOfLevel(x, y, size, stageThatWillBeInclude) {
        var _this = _super.call(this, x, y, size) || this;
        _this.startX = _this.x;
        _this.startY = _this.y;
        _this.stageThatWillBeInclude = stageThatWillBeInclude;
        return _this;
    }
    ChangeStageOfLevel.prototype.changePositions = function () {
        this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
        this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    };
    return ChangeStageOfLevel;
}(TemplateCell));
export { Edge, EndLevel, ChangeStageOfLevel };
