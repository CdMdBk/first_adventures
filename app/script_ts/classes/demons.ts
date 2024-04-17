import {camera, canvas, ctx, field, level, mapObjects} from "../variables/variables.js";
import {player} from "./player.js";
import {TemplateCell} from "./template.js";
import {ParticleDeadBlick} from "./particles.js";
import {objAudio} from "../variables/list-audio.js";

class Demon {
  public x:number;
  public y:number;
  public size:number;
  public startSize:number;

  public numberOfLives:number = 3;

  public startX:number;
  public startY:number;
  public currentPositionX:number;
  public currentPositionY:number;

  public color:string = '137, 50, 224';
  public colorGradient:CanvasGradient;
  public opacity:number = 1;
  public shadowX:number = 0;
  public shadowY:number = 0;

  public hypot:number;
  public sin:number;
  public cos:number;

  public constSpeed:number = canvas.height / 40 * .08;
  public speedX:number;
  public speedY:number;
  constructor(size:number) {
    this.size = size;
    this.startSize = this.size;

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

    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;
  }

  draw():void {
    while (this.opacity > 0) {
      this.colorGradient = ctx.createRadialGradient(this.x - this.shadowX, this.y - this.shadowY, this.size / 4, this.x - this.shadowX, this.y - this.shadowY, this.size * .6);
      this.colorGradient.addColorStop(.8, `rgb(${this.color}, ${this.opacity})`);
      this.colorGradient.addColorStop(1, `rgba(${this.color}, 0)`);

      ctx.fillStyle = this.colorGradient;
      ctx.fillRect(this.x - this.startSize - this.shadowX - this.startSize / 2, this.y - this.startSize - this.shadowX - this.startSize / 2, this.startSize * 3, this.startSize * 3);

      this.shadowX += this.speedX * this.cos * 4;
      this.shadowY += this.speedY * this.sin * 4;
      this.opacity -= .1;
      if (this.size > 4) this.size -= 4;
    }

    this.shadowX = 0;
    this.shadowY = 0;
    this.opacity = 1;
    this.size = this.startSize;
  }

  changePositions():void {
    (this.x <= player.x + player.width * .5) ? this.speedX = this.constSpeed : this.speedX = -this.constSpeed;
    (this.y <= player.y + player.width * .5) ? this.speedY = this.constSpeed : this.speedY = -this.constSpeed;

    //@ts-ignore
    this.hypot = Math.abs(Math.hypot(this.x - player.x - player.width * .5, this.y - player.y - player.width * .5));
    this.sin = Math.abs((this.y - player.y - player.width * .5) / this.hypot);
    this.cos = Math.abs((this.x - player.x - player.width * .5) / this.hypot);

    this.x += this.cos * this.speedX + (this.currentPositionX - camera.currentPosition.x);
    this.y += this.sin * this.speedY + (this.currentPositionY - camera.currentPosition.y);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    this.shadowX = 0;
    this.shadowY = 0;
    this.opacity = 1;
    this.size = this.startSize;
    this.draw();
  }
}

class CorruptedMadBlick {
  public x:number;
  public y:number;
  public size:number;
  public startSize:number;

  public numberOfLives:number = 100;
  public maxLives:number = 100;

  public startX:number;
  public startY:number;
  public currentPositionX:number;
  public currentPositionY:number;

  public color:string = '101, 0, 201';
  public colorGradient:CanvasGradient;
  public opacity:number = 1;
  public shadowX:number = 0;
  public shadowY:number = 0;

  public hypot:number;
  public sin:number;
  public cos:number;

  public constSpeed:number = canvas.height / 40 * .06;
  public speedX:number;
  public speedY:number;
  constructor(size:number) {
    this.size = size;
    this.startSize = this.size;

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

    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;
  }

  drawMove():void {
    while (this.opacity > 0) {
      this.colorGradient = ctx.createRadialGradient(this.x - this.shadowX, this.y - this.shadowY, this.size / 4, this.x - this.shadowX, this.y - this.shadowY, this.size * .6);
      this.colorGradient.addColorStop(.8, `rgb(${this.color}, ${this.opacity})`);
      this.colorGradient.addColorStop(1, `rgba(${this.color}, 0)`);

      ctx.fillStyle = this.colorGradient;
      ctx.fillRect(this.x - this.startSize - this.shadowX - this.startSize / 2, this.y - this.startSize - this.shadowX - this.startSize / 2, this.startSize * 3, this.startSize * 3);

      this.shadowX += this.speedX * this.cos * 10;
      this.shadowY += this.speedY * this.sin * 10;
      this.opacity -= .1;
      if (this.size > 10) this.size -= 10;
    }

    this.shadowX = 0;
    this.shadowY = 0;
    this.opacity = 1;
    this.size = this.startSize;
  }

  drawStationaryState():void {
    this.colorGradient = ctx.createRadialGradient(this.x, this.y, this.size / 4, this.x, this.y, this.size * .6);
    this.colorGradient.addColorStop(.8, `rgb(${this.color}, ${this.opacity})`);
    this.colorGradient.addColorStop(1, `rgba(${this.color}, 0)`);

    ctx.fillStyle = this.colorGradient;
    ctx.fillRect(this.x - this.startSize - this.startSize / 2, this.y - this.startSize - this.startSize / 2, this.startSize * 3, this.startSize * 3);
  }

  changePositions():void {
    if (this.numberOfLives > 0) {
      (this.x <= player.x + player.width * .5) ? this.speedX = this.constSpeed : this.speedX = -this.constSpeed;
      (this.y <= player.y + player.width * .5) ? this.speedY = this.constSpeed : this.speedY = -this.constSpeed;

      //@ts-ignore
      this.hypot = Math.abs(Math.hypot(this.x - player.x - player.width * .5, this.y - player.y - player.width * .5));
      this.sin = Math.abs((this.y - player.y - player.width * .5) / this.hypot);
      this.cos = Math.abs((this.x - player.x - player.width * .5) / this.hypot);

      this.x += this.cos * this.speedX + (this.currentPositionX - camera.currentPosition.x);
      this.y += this.sin * this.speedY + (this.currentPositionY - camera.currentPosition.y);
      this.currentPositionX = camera.currentPosition.x;
      this.currentPositionY = camera.currentPosition.y;

      this.drawMove();

      if (player.numberOfCompletedFrames % 100 === 0) {
        mapObjects.shellBlick.push(new ShellBlick(
          this.x - this.startSize / 2, this.y - this.startSize / 2, field.sizeCell / 8, this.startSize));
        objAudio.player[7].volume = .5;
        objAudio.player[7].currentTime = 0;
        objAudio.player[7].play();
      }
    } else {
      this.numberOfLives = 0;

      this.x += this.currentPositionX - camera.currentPosition.x;
      this.y += this.currentPositionY - camera.currentPosition.y;
      this.currentPositionX = camera.currentPosition.x;
      this.currentPositionY = camera.currentPosition.y;

      if (this.size > field.sizeCell * .3) {
        this.size -= .2;
      } else {
        player.bossFightStage = false;
        level.safeZone = true;
      }

      this.drawStationaryState();

      mapObjects.particleDeadBlick.push(new ParticleDeadBlick(this.x, this.y, field.sizeCell));
    }
  }
}

class ShellBlick extends TemplateCell {
  public currentPositionX:number;
  public currentPositionY:number;
  public startSize:number;

  public lifeTime:number = 0;

  public color:string = '101, 0, 201';
  public opacity:number = 1;
  public shadowX:number = 0;
  public shadowY:number = 0;
  public numberOfShadows:number = 5;

  public targetX:number;
  public targetY:number;

  public hypot:number;
  public sin:number;
  public cos:number;

  public constSpeed:number = canvas.height / 40 * .25;
  public speedX:number;
  public speedY:number;
  constructor(x:number, y:number, size:number, playerWidth:number) {
    super(x, y, size);
    this.startSize = this.size;
    this.x += playerWidth / 2 - this.size / 2;
    this.y += playerWidth / 2 - this.size / 2;
    this.startX = this.x;
    this.startY = this.y;
    this.targetX = player.x + player.width * .5;
    this.targetY = player.y + player.width * .5;

    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    (this.x < this.targetX) ? this.speedX = this.constSpeed : this.speedX = -this.constSpeed;
    (this.y < this.targetY) ? this.speedY = this.constSpeed : this.speedY = -this.constSpeed;

    //@ts-ignore
    this.hypot = Math.abs(Math.hypot(this.startX - this.targetX, this.startY - this.targetY));
    this.sin = Math.abs((this.startY - this.targetY) / this.hypot);
    this.cos = Math.abs((this.startX - this.targetX) / this.hypot);
  }

  draw():void {
    for (let i = 0; i < this.numberOfShadows; i++) {
      ctx.beginPath();
      ctx.arc(this.x + this.size / 2 - this.shadowX, this.y + this.size * .5 - this.shadowY, this.size * .5, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
      ctx.closePath();

      this.shadowX += this.speedX * this.cos;
      this.shadowY += this.speedY * this.sin;
      this.opacity -= .1;
      this.size -= 1;
    }
  }

  changePositions():void {
    this.x += this.cos * this.speedX + (this.currentPositionX - camera.currentPosition.x);
    this.y += this.sin * this.speedY + (this.currentPositionY - camera.currentPosition.y);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    this.lifeTime++;

    this.shadowX = 0;
    this.shadowY = 0;
    this.opacity = 1;
    this.size = this.startSize;
    if (player.numberOfCompletedFrames % 10 === 0 && this.numberOfShadows < 10) this.numberOfShadows++;

    this.draw();
  }
}

export {
  Demon,
  CorruptedMadBlick,
  ShellBlick
}