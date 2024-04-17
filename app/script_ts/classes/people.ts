import {camera, ctx, field} from "../variables/variables.js";
import {TemplateCell} from "./template.js";

class People extends TemplateCell {
  public width:number;
  public height:number;

  public deviationX:number = Math.random() * field.sizeCell * .5;
  public deviationY:number = Math.random() * field.sizeCell * -.5;
  public peopleX:number;
  public peopleY:number;

  public image:HTMLImageElement = new Image();
  public typeImage:number;
  constructor(x:number, y:number, size:number, typeImage:string) {
    super(x, y, size);
    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.width = this.size * .5;
    this.height = this.size;

    this.image.src = './images/people/people.png';
    this.typeImage = parseInt(typeImage);
  }

  draw():void {
    ctx.drawImage(this.image, this.typeImage * 300 + 1, 0, 300, 560, this.peopleX, this.peopleY, this.width, this.height);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.peopleX = this.x + this.deviationX;
    this.peopleY = this.y + this.deviationY;
    this.draw();
  }
}

export {
  People
}