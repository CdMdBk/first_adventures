import {camera, canvas, ctx, field} from "../variables/variables.js";
import {Positions} from "../variables/interfaces.js";
import {TemplateCell} from "./template.js";

class Floor extends TemplateCell {
  public image:HTMLImageElement = new Image();
  public typeImage:number;
  constructor(x:number, y:number, size:number, src:string, typeImage:string) {
    super(x, y, size);
    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.image.src = src;
    this.typeImage = parseInt(typeImage);
  }

  draw():void {
    if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell && this.y <= canvas.height + 100) ctx.drawImage(this.image, this.typeImage * 400 + 1,0,398,400, this.x, this.y, this.size + 1, this.size + 1);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();
  }
}

class Decor extends TemplateCell {
  public image:HTMLImageElement = new Image();
  public typeImage:number;
  constructor(x:number, y:number, size:number, src:string, typeImage:string) {
    super(x, y, size);
    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.image.src = src;
    this.typeImage = parseInt(typeImage);
  }

  draw():void {
    if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell && this.y <= canvas.height + 100) ctx.drawImage(this.image, this.typeImage * 400 + 1,0,400,400, this.x, this.y, this.size + 5, this.size + 5);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();
  }
}

export {
  Floor,
  Decor
}