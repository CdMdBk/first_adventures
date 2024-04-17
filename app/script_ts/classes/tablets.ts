import {TemplateCell} from "./template.js";
import {canvas, ctx, field, keys, camera} from "../variables/variables.js";
import {Positions} from "../variables/interfaces.js";
import {objAudio} from "../variables/list-audio.js";
import {player} from "./player.js";

class Tablet extends TemplateCell {
  public tabletX:number;
  public tabletY:number;

  public hint:string;
  public hintIsActive:boolean = false;
  public lineHeight:number = field.sizeCell / 13;

  public image:HTMLImageElement = new Image();
  public imageHint:HTMLImageElement = new Image();
  constructor(x:number, y:number, size:number, hint:string, srcImage:string, srcImageHint:string) {
    super(x, y, size);
    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.image.src = srcImage;
    this.imageHint.src = srcImageHint;
    this.hint = hint;
  }

  draw():void {
    ctx.drawImage(this.image, this.tabletX, this.tabletY, this.size, this.size);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.tabletX = this.x + this.size / 6;
    this.tabletY = this.y + this.size / 6;
    this.draw();
  }

  showText():void {
    if (!player.thinks) {
      ctx.fillStyle = 'rgba(0,0,0,.5)';
      ctx.fillRect(this.tabletX - this.size / 2, this.tabletY - this.size / 4, this.size * 2, this.size / 4);

      ctx.fillStyle = 'white';
      ctx.font = `900 ${field.sizeCell / 13}px Pixel Art`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText('жмякни "а", чтобы прочитать', this.tabletX + this.size / 2, this.tabletY - this.size / 8);
    }
  }

  toggleHint() {
    if (keys.f.pressed && !keys.f.pause) {
      player.audio.openTablet.currentTime = 0;
      player.audio.openTablet.play();
      (this.hintIsActive) ? this.hintIsActive = false : this.hintIsActive = true;

      keys.f.pause = true;
      (player.thinks) ? player.thinks = false : player.thinks = true;

      setTimeout(():void => {
        keys.f.pause = false;
      }, 500);
    }
  }

  showHint():void {
    if (this.hintIsActive) {
      ctx.drawImage(this.imageHint, canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);

      ctx.fillStyle = '#2C1208';
      ctx.font = `900 ${field.sizeCell / 8}px Pixel Art`;
      this.lineHeight = field.sizeCell / 8;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      this.drawText();
    }
  }

  drawText() {
    this.hint.split('\n').forEach((line:string, index:number):void => {
      ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (index - 3) * this.lineHeight);
    });
  }
}

export {
  Tablet
}