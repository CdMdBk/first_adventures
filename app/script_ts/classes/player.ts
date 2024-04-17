import {camera, canvas, ctx, field, keys, mapObjects, spacePalette} from "../variables/variables.js";
import {StageOfConversation, PlayerTasks, NumberOfEnemiesKilled} from "../variables/interfaces.js";
import {objAudio} from "../variables/list-audio.js";
import {TemplateCell} from "./template.js";

class Player {
  public x:number;
  public y:number;
  public width:number;
  public height:number;

  public amplitude:number = 0;
  public amplitudeSpeed:number = .1;

  public animationId:number;
  public action:'moving'|'beats'|'heals'|'worth' = 'worth';
  public currentDirection:'left'|'right' = 'right';

  public image = {
    stateOfRest: {
      left: new Image(),
      right: new Image()
    },
    movementStatus: {
      left: new Image(),
      right: new Image()
    },
    beats: {
      left: new Image(),
      right: new Image()
    },
    heals: {
      left: new Image(),
      right: new Image()
    }
  };

  public numberOfCompletedFrames:number = 0;
  public frame:number = -1;
  public numberOfFrames:number = 10;

  public color:string = '#e0329a';
  public transparentColor:string = 'rgba(224,50,154,0)';
  public colorGradient:CanvasGradient;

  static speed:number = 8;
  public speedX:number = 0;
  public speedY:number = 0;
  public debuffSpeed:number = 1;

  public numberOfLives:number = 100;
  public numberOfDeaths:number = 0;
  public takesDamage:boolean = false;

  public bossFightStage:boolean = false;
  public attack:boolean = false;
  public recharge:number = 0;
  public timeWithoutAttacks:number = 0;

  public mouseX:number = 0;
  public mouseY:number = 0;

  public numberOfEnemiesKilled:NumberOfEnemiesKilled = {
    demon: 0,
    CorruptedMadBlick: 0
  }

  public audio:{[key:string]:HTMLAudioElement} = {
    walkingLawn: objAudio.player[0],
    walkingStone: objAudio.player[1],
    flight: objAudio.player[2],
    pickUp: objAudio.player[3],
    openTablet: objAudio.player[4],
    laLaLa: objAudio.player[5],
    la: objAudio.player[6]
  };

  public thinks:boolean = false; //for stop movement, типо игрок думает, ходить нельзя
  public permissionMovement:boolean = true; //разрешение на движение (collision detection)

  public stageOfConversation:StageOfConversation = {
    Borya: 0,
    Danya: 0,
    Mark: 0,
    Alina: 0,
    Kolya: 0,
    Vlad: 0,
    Drunk: 0,
    Wounded: 0,
    Lera: 0
  }

  public playerTasks:PlayerTasks = {
    completedDialogues: {
      Borya: false,
      Danya: false,
      Mark: false,
      Alina: false,
      Kolya: false,
      Vlad: false,
      Drunk: false,
      Wounded: false,
      Lera: false,
      soulKolya: false
    },
    backpack: [],
    //@ts-ignore
    memories: new Set()
  }

  drawPlayer():void {
    switch(this.action) {
      case 'worth':
        ctx.drawImage(this.image.stateOfRest[this.currentDirection], 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height);
        break;
      case 'moving':
        ctx.drawImage(this.image.movementStatus[this.currentDirection], 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height);
        break;
      case 'heals':
        (this.currentDirection === 'left') ?
          ctx.drawImage(this.image.heals.left, 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height) :
          ctx.drawImage(this.image.heals.right, 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height);
        break;
      case 'beats':
        (this.currentDirection === 'left') ?
          ctx.drawImage(this.image.beats.left, 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height) :
          ctx.drawImage(this.image.beats.right, 196 * this.frame + 1, 0, 195, 280, this.x, this.y, this.width, this.height);
        break;
    }
  }

  drawSoul():void {
    ctx.fillStyle = this.colorGradient;
    ctx.fillRect(this.x - this.width * .1, this.y - this.width * .1 + this.amplitude, this.width * 1.2, this.width * 1.2);
  }

  motionless():void {
    this.action = 'worth';
    this.numberOfFrames = 27;

    if (this.numberOfCompletedFrames % 8 === 0) {
      this.frame++;
    }
    if (this.frame >= this.numberOfFrames) this.frame = 0;

    this.drawPlayer();
  }

  movementPlayer():void {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.action !== 'heals' && this.action !== 'beats') {
      if (keys.a.pressed || keys.d.pressed || keys.w.pressed || keys.s.pressed) {
        this.action = 'moving'
        this.numberOfFrames = 16;
      } else {
        this.action = 'worth'
        this.numberOfFrames = 27;
      }
    }
    if (this.action === 'heals') this.numberOfFrames = 14;
    if (this.action === 'beats') this.numberOfFrames = 8;


    if (this.numberOfCompletedFrames % 8 === 0) {
      this.frame++;
    }
    if (this.frame >= this.numberOfFrames) {
      if (this.action === 'heals' || this.action === 'beats') {
        this.action = 'worth';
        this.thinks = false;
        keys.f.pause = false;
      }
      this.frame = 0;
    }

    this.drawPlayer();
    this.speedX = 0;
    this.speedY = 0;
  }

  movementSoul():void {
    if (this.numberOfCompletedFrames === 0) this.frame = 0;

    this.x += this.speedX;
    this.y += this.speedY;

    (keys.a.pressed || keys.d.pressed || keys.w.pressed || keys.s.pressed) ? this.action = 'moving' : this.action = 'worth';

    if (this.frame === 0) {
      this.amplitude += this.amplitudeSpeed;
      if (this.amplitude >= 12) this.frame = 1;
    } else {
      this.amplitude -= this.amplitudeSpeed;
      if (this.amplitude <= 0) this.frame = 0;
    }

    this.colorGradient = ctx.createRadialGradient(this.x + this.width / 2, this.y + this.width / 2 + this.amplitude, this.width / 4, this.x + this.width / 2, this.y + this.width / 2 + this.amplitude, this.width * .6);
    this.colorGradient.addColorStop(.8, this.color);
    this.colorGradient.addColorStop(1, this.transparentColor);

    this.drawSoul();
    this.speedX = 0;
    this.speedY = 0;
  }
}

class PlayerSimulator extends TemplateCell {
  // public amplitude:number = 0;
  // public frame:number = 0;

  public opacity:number = 1;
  public colorGradient:CanvasGradient;
  public color:string = '224, 50, 154';

  public startPositionX:number;
  public startPositionY:number;
  constructor(x:number, y:number, size:number) {
    super(x, y, size);
    this.x += this.size * .5;
    this.y += this.size * .5;

    this.startX = this.x;
    this.startY = this.y;
    this.startPositionX = camera.currentPosition.x;
    this.startPositionY = camera.currentPosition.y;
  }

  draw():void {
    ctx.fillStyle = this.colorGradient;
    ctx.fillRect(this.x - this.size * .6, this.y - this.size * .6, this.size * 1.2, this.size * 1.2);

    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.size * .5, 0, Math.PI * 2, false);
    // ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    // ctx.fill();
    // ctx.closePath();
  }

  changePositions():void {
    this.x = this.startX + (this.startPositionX - camera.currentPosition.x);
    this.y = this.startY + (this.startPositionY - camera.currentPosition.y);
    this.size *= .98;

    // if (player.numberOfCompletedFrames % 120 === 0) {
    //   this.frame++;
    // }
    // if (this.frame >= 2) this.frame = 0;
    // (!this.frame) ? this.amplitude += .1 : this.amplitude -= .1;

    this.opacity -= .05;
    this.colorGradient = ctx.createRadialGradient(this.x, this.y, this.size / 4, this.x, this.y, this.size * .6);
    this.colorGradient.addColorStop(.8, `rgba(${this.color}, ${this.opacity})`);
    this.colorGradient.addColorStop(1, `rgba(${this.color}, 0)`);

    this.draw();
  }
}

class Shell extends TemplateCell {
  public currentPositionX:number;
  public currentPositionY:number;
  public startSize:number;

  public color:string = '224, 50, 154';
  public colorGradient:CanvasGradient;

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
  constructor(x:number, y:number, size:number, playerWidth:number, attackX:number, attackY:number) {
    super(x, y, size);
    this.startSize = this.size;
    this.x += playerWidth / 2 - this.size / 2;
    this.y += playerWidth / 2 - this.size / 2;
    this.startX = this.x;
    this.startY = this.y;
    this.targetX = attackX * 2 - this.size / 2;
    this.targetY = attackY * 2 - this.size / 2;

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
      this.colorGradient = ctx.createRadialGradient(this.x + this.size * .5 - this.shadowX, this.y + this.size * .5 - this.shadowY, this.size / 4, this.x + this.size * .5 - this.shadowX, this.y + this.size * .5 - this.shadowY, this.size * .6);
      this.colorGradient.addColorStop(.8, `rgb(${this.color}, ${this.opacity})`);
      this.colorGradient.addColorStop(1, `rgba(${this.color}, 0)`);

      ctx.fillStyle = this.colorGradient;
      ctx.fillRect(this.x - this.size - this.shadowX, this.y - this.size - this.shadowY, this.size * 3, this.size * 3);

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

    this.shadowX = 0;
    this.shadowY = 0;
    this.opacity = 1;
    this.size = this.startSize;
    if (player.numberOfCompletedFrames % 10 === 0 && this.numberOfShadows < 10) this.numberOfShadows++;

    this.draw();
  }
}

const player:Player = new Player();

export {
  Player,
  PlayerSimulator,
  Shell,
  player
}