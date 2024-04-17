import {canvas, camera, ctx, field} from "../variables/variables.js";
import {Positions} from "../variables/interfaces.js";
import {TemplateCell} from "./template.js";

class Water extends TemplateCell {
  public image:HTMLImageElement = new Image();
  public frame:number = 0;
  public countFrames:number = 0;
  constructor(x:number, y:number, size:number, src:string) {
    super(x, y, size);
    this.startX = this.x - 5;
    this.startY = this.y - 5;
    this.image.src = src;
  }

  draw():void {
    if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell && this.y <= canvas.height + 100) ctx.drawImage(this.image,
      400 * this.frame, 0, 400, 400,
      this.x, this.y, this.size + 5, this.size + 5);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();

    this.countFrames++;
    if (this.countFrames === 8) {
      this.frame++;
      this.countFrames = 0;
    }
    if (this.frame >= 30) this.frame = 0;
  }
}

class Tree extends TemplateCell {
  public width:number;
  public height:number;
  public treeX:number;
  public treeY:number;

  public image:HTMLImageElement = new Image();
  public frame:number = 0;
  public countFrames:number = 0;

  constructor(x:number, y:number, size:number, height:number, src) {
    super(x, y, size);
    this.startX = this.x;
    this.startY = this.y;
    this.width = this.size;
    this.height = height;
    this.image.src = src;
  }

  draw():void {
    ctx.drawImage(this.image,
      400 * this.frame, 0, 400, 540,
      this.treeX - this.width, this.treeY - this.width, this.height, this.height * 4/3);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.treeX = this.x + this.height/2 - this.width/2;
    this.treeY = this.y - this.height/3;
    this.draw();

    this.countFrames++;
    if (this.countFrames === 8) {
      this.frame++;
      this.countFrames = 0;
    }
    if (this.frame >= 30) this.frame = 0;
  }
}

class Wall extends TemplateCell {
  public width:number;
  public height:number;

  public image:HTMLImageElement = new Image();
  public typeImage:number;
  constructor(x:number, y:number, size:number, typeImage:string) {
    super(x, y, size);
    this.width = this.size;
    this.height = this.size * 1.5;
    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.image.src = './images/wall/wall.png';
    this.typeImage = parseInt(typeImage);
  }

  draw():void {
    if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell * 1.5 && this.y <= canvas.height + 100) ctx.drawImage(this.image,
      400 * this.typeImage + 1, 0, 395, 600,
      this.x, this.y, this.width + 5, this.height + 5);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();
  }
}

class CubicZirconia extends TemplateCell {
  public width:number;
  public height:number;

  public image = {
    aggressive: new Image(),
    neutral: new Image()
  };
  public frame:number = 0;
  public countFrames:number = 0;

  // public aggressive:boolean = true;
  public condition:'aggressive'|'neutral'|'absent';
  constructor(x:number, y:number, size:number, condition?:'aggressive'|'neutral'|'absent') {
    super(x, y, size);
    this.width = this.size;
    this.height = this.size * 1.5;
    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.image.aggressive.src = './images/wall/cubic-zirconia-wall.png';
    this.image.neutral.src = './images/wall/cleaned-wall.png';

    this.condition = 'aggressive';
    if (condition) this.condition = condition;
  }

  draw():void {
    switch(this.condition) {
      case 'aggressive':
        if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell * 1.5 && this.y <= canvas.height + 100) {
          ctx.drawImage(this.image.aggressive,
            400 * this.frame + 1, 0, 395, 600,
            this.x, this.y, this.width + 5, this.height + 5);
        }
        break;

      case 'neutral':
        if (this.x >= -field.sizeCell && this.x <= canvas.width + 100 && this.y >= -field.sizeCell * 1.5 && this.y <= canvas.height + 100) {
          ctx.drawImage(this.image.neutral,
            400 * this.frame + 1, 0, 395, 600,
            this.x, this.y, this.width + 5, this.height + 5);
        }
        break;
    }
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();

    this.countFrames++;
    if (this.countFrames === 8) {
      this.frame++;
      this.countFrames = 0;
    }
    if (this.frame >= 30) this.frame = 0;
  }
}

export {
  Water,
  Tree,
  Wall,
  CubicZirconia
}