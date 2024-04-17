import {TemplateCell} from "./template.js";
import {camera, canvas, ctx, field, mapObjects} from "../variables/variables.js";
import {player} from "./player.js";
import {objAudio} from "../variables/list-audio.js";

class Target extends TemplateCell {
  constructor(x:number, y:number, size:number) {
    super(x, y, size);
    this.startX = this.x - 5;
    this.startY = this.y - 5;
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);

    if (
      this.x >= 0 &&
      this.x + this.size <= canvas.width &&
      this.y >= 0 &&
      this.y + this.size <= canvas.height &&
      player.numberOfCompletedFrames % 300 === 0
    ) {
      objAudio.effects[3].play();
      setTimeout(():void => {mapObjects.bullet.push(new Bullet(field.sizeCell / 10, this.x, this.y));}, 400);
    }
  }
}

class Bullet {
  public image:HTMLImageElement = new Image();
  public x:number;
  public y:number;
  public lifeTime:number = 0;

  public startX:number;
  public startY:number;
  public currentPositionX:number;
  public currentPositionY:number;

  public targetX:number;
  public targetY:number;

  public size:number;
  public hypot:number;
  public sin:number;
  public cos:number;

  public constSpeed:number = canvas.height / 40 * .3;
  public speedX:number;
  public speedY:number;

  // public radian:number;.
  constructor(size:number, targetX:number, targetY:number) {
    this.size = size;

    if (Math.floor(Math.random() * 2) % 2 === 0) {
      if (Math.floor(Math.random() * 2) % 2 === 0) {
        this.x = canvas.width + this.size * 2;
      } else {
        this.x = -this.size * 2;
      }
      this.y = Math.random() * (canvas.height + this.size * 2) - this.size * 2;
    } else {
      if (Math.floor(Math.random() * 2) % 2 === 0) {
        this.y = canvas.height + this.size * 2;
      } else {
        this.y = -this.size * 2;
      }
      this.x = Math.random() * (canvas.width + this.size * 2) - this.size * 2;
    }

    this.startX = this.x;
    this.startY = this.y;
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    this.targetX = targetX;
    this.targetY = targetY;
    (this.x < targetX) ? this.speedX = this.constSpeed : this.speedX = -this.constSpeed;
    (this.y < targetY) ? this.speedY = this.constSpeed : this.speedY = -this.constSpeed;

    //@ts-ignore
    this.hypot = Math.abs(Math.hypot(this.startX - this.targetX, this.startY - this.targetY));
    this.sin = Math.abs((this.startY - this.targetY) / this.hypot);
    this.cos = Math.abs((this.startX - this.targetX) / this.hypot);
    this.image.src = './images/bullet/bullet.png';
  }

  draw():void {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

  changePositions():void {
    this.x += this.cos * this.speedX + (this.currentPositionX - camera.currentPosition.x);
    this.y += this.sin * this.speedY + (this.currentPositionY - camera.currentPosition.y);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    this.lifeTime++;
    this.draw();
  }
}

export {
  Target,
  Bullet
}