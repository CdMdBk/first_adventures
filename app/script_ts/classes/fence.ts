import {TemplateCell} from "./template.js";
import {camera, canvas, ctx, field} from "../variables/variables.js";

class Fence extends TemplateCell {
  public width:number;
  public height:number;
  public fenceX:number;
  public fenceY:number;

  public image:HTMLImageElement = new Image();
  constructor(x:number, y:number, size:number, src:string, position:{x:number, y:number}) {
    super(x, y, size);
    this.width = this.size / 3;
    this.height = this.size;

    this.fenceX = this.x + this.width * position.x;
    this.fenceY = (this.y - this.width * 2) + (this.width * position.y);

    this.startX = this.fenceX;
    this.startY = this.fenceY;

    this.image.src = src;
  }

  draw():void {
    if (this.fenceX >= -field.sizeCell && this.fenceX <= canvas.width + 100 && this.fenceY >= -field.sizeCell && this.fenceY <= canvas.height + 100) ctx.drawImage(this.image, this.fenceX, this.fenceY, this.width, this.height);
  }

  changePositions():void {
    this.fenceX = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.fenceY = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();
  }
}

export {
  Fence
}