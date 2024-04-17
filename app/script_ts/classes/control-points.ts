import {TemplateCell} from "./template.js";
import {camera, ctx} from "../variables/variables.js";

class Edge extends TemplateCell {
  constructor(x:number, y:number, size:number) {
    super(x, y, size);
    this.startX = this.x;
    this.startY = this.y;
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
  }
}

class EndLevel extends TemplateCell {
  constructor(x:number, y:number, size:number) {
    super(x, y, size);
    this.startX = this.x;
    this.startY = this.y;
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
  }
}

class ChangeStageOfLevel extends TemplateCell {
  public stageThatWillBeInclude:number;
  constructor(x:number, y:number, size:number, stageThatWillBeInclude:number) {
    super(x, y, size);
    this.startX = this.x;
    this.startY = this.y;

    this.stageThatWillBeInclude = stageThatWillBeInclude;
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
  }
}

export {
  Edge,
  EndLevel,
  ChangeStageOfLevel
}