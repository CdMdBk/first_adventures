import {TemplateCell} from "./template.js";
import {camera, canvas, ctx} from "../variables/variables.js";

class ParticlePlayer extends TemplateCell {
  public currentPositionX:number;
  public currentPositionY:number;

  public color:string = '224, 50, 154';
  public opacity:number = 1;

  public radian:number = Math.random() * 6.28;
  public sin:number = Math.sin(this.radian);
  public cos:number = Math.cos(this.radian);

  speed:number = Math.random() * (15 + 5) - 5;
  constructor(x:number, y:number, size:number) {
    super(x, y, size);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;
  }

  draw():void {
      ctx.beginPath();
      ctx.arc(this.x + this.size / 2, this.y + this.size * .5, this.size * .5, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
      ctx.closePath();
  }

  changePositions():void {
    this.x += this.cos * this.speed + (this.currentPositionX - camera.currentPosition.x);
    this.y += this.sin * this.speed + (this.currentPositionY - camera.currentPosition.y);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    this.draw();
    this.opacity -= .02;

    if (this.speed > 5) this.speed--;
  }
}

class ParticleDemon extends TemplateCell {
  public currentPositionX:number;
  public currentPositionY:number;

  public color:string = '137, 50, 224';
  public opacity:number = 1;

  public radian:number = Math.random() * 6.28;
  public sin:number = Math.sin(this.radian);
  public cos:number = Math.cos(this.radian);

  speed:number = Math.random() * (20 + 10) - 10;
  constructor(x:number, y:number, size:number) {
    super(x, y, size);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;
  }

  draw():void {
    ctx.beginPath();
    ctx.arc(this.x + this.size / 2, this.y + this.size * .5, this.size * .5, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  changePositions():void {
    this.x += this.cos * this.speed + (this.currentPositionX - camera.currentPosition.x);
    this.y += this.sin * this.speed + (this.currentPositionY - camera.currentPosition.y);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    this.draw();
    this.opacity -= .02;

    if (this.speed > 5) this.speed--;
  }
}

class ParticleBlick extends TemplateCell {
  public currentPositionX:number;
  public currentPositionY:number;

  public color:string = '101, 0, 201';
  public opacity:number = 1;

  public radian:number = Math.random() * 6.28;
  public sin:number = Math.sin(this.radian);
  public cos:number = Math.cos(this.radian);

  speed:number = Math.random() * (15 + 5) - 5;
  constructor(x:number, y:number, size:number) {
    super(x, y, size);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;
  }

  draw():void {
    ctx.beginPath();
    ctx.arc(this.x + this.size / 2, this.y + this.size * .5, this.size * .5, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  changePositions():void {
    this.x += this.cos * this.speed + (this.currentPositionX - camera.currentPosition.x);
    this.y += this.sin * this.speed + (this.currentPositionY - camera.currentPosition.y);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    this.draw();
    this.opacity -= .02;

    if (this.speed > 5) this.speed--;
  }
}

class ParticleDeadBlick extends TemplateCell {
  public startSize:number;

  public currentPositionX:number;
  public currentPositionY:number;

  public color:string = '101, 0, 201';
  public opacity:number = 1;

  public radian:number = Math.random() * 6.28;
  public sin:number = Math.sin(this.radian);
  public cos:number = Math.cos(this.radian);

  speed:number = Math.random() * (30 + 10) - 10;
  constructor(x:number, y:number, size:number) {
    super(x, y, size);
    this.startSize = this.size;
    this.size *= Math.random() * .4 + .1;
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;
  }

  draw():void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * .5, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  changePositions():void {
    this.x += this.cos * this.speed + (this.currentPositionX - camera.currentPosition.x);
    this.y += this.sin * this.speed + (this.currentPositionY - camera.currentPosition.y);
    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;

    this.draw();
    this.opacity -= .005;

    if (this.speed > 5) this.speed--;
  }
}

export {
  ParticlePlayer,
  ParticleDemon,
  ParticleBlick,
  ParticleDeadBlick
}