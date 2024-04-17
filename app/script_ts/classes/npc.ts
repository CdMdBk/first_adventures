import {backpack, ctx, camera} from "../variables/variables.js";
import {TemplateCell} from "./template.js";
import {field} from "../variables/variables.js";
import {keys} from "../variables/variables.js";
import {Player, player} from "./player.js";
import {objAudio} from "../variables/list-audio.js";

class NPC extends TemplateCell {
  public width:number;
  public height:number;

  public name:string;

  public frame:number = 0;
  public numberOfFrames:number = 27;
}

class Interlocutor extends NPC {
  public stageOfConversation:number;
  public phrases:HTMLAudioElement[] = [];
  public image:HTMLImageElement = new Image();

  public heightImage:number;

  constructor(x:number, y:number, size:number, height:number, name:string, stageOfConversation:number, phrases:HTMLAudioElement[], src:string, heightImage:number) {
    super(x, y, size);
    this.width = this.size;
    this.height = height;
    this.heightImage = heightImage;

    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.name = name;
    this.stageOfConversation = stageOfConversation;
    this.phrases = phrases;

    this.image.src = src;
    this.frame = 0;
    this.numberOfFrames = 9;
  }

  draw():void {
    ctx.drawImage(this.image, this.frame * 196 + 1,0,195,this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();

    if (player.numberOfCompletedFrames % 24 === 0) {
      this.frame++;
    }
    if (this.frame >= this.numberOfFrames) this.frame = 0;
  }

  showHint():void {
    if (!keys.f.pause) {
      ctx.fillStyle = 'rgba(0,0,0,.5)';
      ctx.fillRect(this.x - this.width * 1.5, this.y - this.width * .75, this.width * 4, this.width / 2);

      ctx.fillStyle = 'white';
      ctx.font = `900 ${field.sizeCell / 13}px Pixel Art`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText('жмякни "а", чтобы поболтать', this.x + this.width / 2, this.y - this.width / 2);
    }
  }

  startDialog():void {
    if (keys.f.pressed && !keys.f.pause && !backpack.classList.contains('backpack_active')) {
      this.phrases[this.stageOfConversation].play();

      keys.f.pause = true;
      player.thinks = true;
      player.audio.laLaLa.currentTime = 0;
      player.audio.laLaLa.pause();

      this.phrases[this.stageOfConversation].addEventListener('ended', this.endDialog);
      if (!keys.f.pause) this.phrases[this.stageOfConversation].removeEventListener('ended', this.endDialog);

      if (this.stageOfConversation < this.phrases.length - 1) {
        this.stageOfConversation++;
        player.stageOfConversation[this.name]++;
      } else player.playerTasks.completedDialogues[this.name] = true;
    }
  }

  endDialog():void {
    keys.f.pause = false;
    if (!backpack.classList.contains('backpack_active')) player.thinks = false;
  }
}

class Wounded extends NPC {
  public phrases:HTMLAudioElement[] = [];
  public textHint:string = 'вылечить девушку';

  public image = {
    woundedCondition: new Image(),
    healthyCondition: new Image()
  }
  public widthImage:number;
  public heightImage:number;

  public condition:'wounded'|'healthy' = 'wounded';
  public healingProcess:boolean = false;
  public stageOfConversation:number = 0;

  constructor(x:number, y:number, size:number, height:number, name:string, phrases:HTMLAudioElement[], widthImage:number, heightImage:number, healingProcess:boolean, stageOfConversation:number) {
    super(x, y, size);
    this.width = this.size;
    this.height = height;
    this.widthImage = widthImage;
    this.heightImage = heightImage;

    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.name = name;
    this.phrases = phrases;
    this.healingProcess = healingProcess;
    this.stageOfConversation = stageOfConversation;

    this.image.woundedCondition.src = './images/characters/wounded.png';
    this.image.healthyCondition.src = './images/characters/healthy.png';
    this.frame = 0;
    this.numberOfFrames = 8;
  }

  draw():void {
    switch(this.condition) {
      case 'wounded':
        ctx.drawImage(this.image.woundedCondition, this.frame * this.widthImage + 1, 0, this.widthImage - 1, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
        break;
      case 'healthy':
        ctx.drawImage(this.image.healthyCondition, this.frame * this.widthImage + 1, 0, this.widthImage, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
        break;
    }
  }

  changePositions():void {
    if (this.healingProcess) this.textHint = 'жмякни "а", чтобы поговорить';
    if (this.healingProcess && this.condition === 'wounded' && player.action !== 'heals') {
      this.condition = 'healthy';
      this.frame = 0;
      this.numberOfFrames = 9;

      player.thinks = false;
      keys.f.pause = false;
    }

    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();

    if (this.frame >= this.numberOfFrames) this.frame = 0;
  }

  showHint():void {
    if (!keys.f.pause) {
      ctx.fillStyle = 'rgba(0,0,0,.5)';
      ctx.fillRect(this.x - this.width * 1.5, this.y - this.width * .75, this.width * 4, this.width / 2);

      ctx.fillStyle = 'white';
      ctx.font = `900 ${field.sizeCell / 13}px Pixel Art`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(this.textHint, this.x + this.width / 2, this.y - this.width / 2);
    }
  }

  heals():void {
    if (
      keys.f.pressed &&
      !keys.f.pause &&
      this.condition === 'wounded' &&
      !backpack.classList.contains('backpack_active'
    )) {
      player.debuffSpeed = .5;
      Player.speed *= player.debuffSpeed;

      player.playerTasks.completedDialogues[this.name] = true;
      player.frame = 0;
      player.action = 'heals';

      player.thinks = true;
      keys.f.pause = true;

      this.healingProcess = true;
    }
  }

  startDialog():void {
    if (
      keys.f.pressed &&
      !keys.f.pause &&
      this.condition === 'healthy' &&
      !backpack.classList.contains('backpack_active'
    )) {
      this.phrases[this.stageOfConversation].play();
      keys.f.pause = true;
      player.thinks = true;

      this.phrases[this.stageOfConversation].addEventListener('ended', this.endDialog);
      if (!keys.f.pause) this.phrases[this.stageOfConversation].removeEventListener('ended', this.endDialog);

      if (this.stageOfConversation < this.phrases.length - 1) {
        this.stageOfConversation++;
        player.stageOfConversation[this.name]++;
      }
    }
  }

  endDialog():void {
    keys.f.pause = false;
    player.thinks = false;
    if (!backpack.classList.contains('backpack_active')) player.thinks = false;
  }
}

class Lera extends NPC {
  public stageOfConversation:number;
  public phrases:HTMLAudioElement[] = [];
  public outrageAudioArray:HTMLAudioElement[] = objAudio.outrage;
  public textHint:string = 'жмякни "а", чтобы поболтать';

  public image = {
    stateOfRest: new Image(),
    gettingHit: new Image()
  }
  public widthImage:number;
  public heightImage:number;

  public action:'worth'|'getting hit' = 'worth';

  constructor(x:number, y:number, size:number, height:number, name:string, stageOfConversation:number, phrases:HTMLAudioElement[], widthImage:number, heightImage:number) {
    super(x, y, size);
    this.width = this.size;
    this.height = height;
    this.widthImage = widthImage;
    this.heightImage = heightImage;

    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.name = name;
    this.stageOfConversation = stageOfConversation;
    this.phrases = phrases;

    this.image.stateOfRest.src = './images/characters/lera-state.png';
    this.image.gettingHit.src = './images/characters/lera-getting-hit.png';
    this.frame = 0;
    this.numberOfFrames = 9;
  }

  draw():void {
    switch(this.action) {
      case 'worth':
        ctx.drawImage(this.image.stateOfRest, this.frame * this.widthImage + 1, 0, this.widthImage - 1, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
        break;
      case 'getting hit':
        ctx.drawImage(this.image.gettingHit, this.frame * this.widthImage + 1, 0, this.widthImage, this.heightImage, this.x, this.y, this.width + 5, this.height + 5);
        break;
    }

  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.draw();

    if (this.action === 'worth' && player.numberOfCompletedFrames % 24 === 0) this.frame++;
    if (this.action === 'getting hit' && player.numberOfCompletedFrames % 12 === 0) this.frame++;

    if (this.frame === 10) {
      this.action = 'worth';
      this.numberOfFrames = 9
    }
    if (this.frame >= this.numberOfFrames) this.frame = 0;
  }

  showHint():void {
    if (!keys.f.pause) {
      ctx.fillStyle = 'rgba(0,0,0,.5)';
      ctx.fillRect(this.x - this.width * 1.5, this.y - this.width * .75, this.width * 4, this.width / 2);

      ctx.fillStyle = 'white';
      ctx.font = `900 ${field.sizeCell / 13}px Pixel Art`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(this.textHint, this.x + this.width / 2, this.y - this.width / 2);
    }
  }

  startDialog():void {
    if (keys.f.pressed &&
      !keys.f.pause &&
      this.stageOfConversation < this.phrases.length &&
      !backpack.classList.contains('backpack_active'))
    {
      this.phrases[this.stageOfConversation].play();
      keys.f.pause = true;
      player.thinks = true;
      player.audio.la.currentTime = 0;
      player.audio.la.pause();

      this.phrases[this.stageOfConversation].addEventListener('ended', this.endDialog);
      if (!keys.f.pause) this.phrases[this.stageOfConversation].removeEventListener('ended', this.endDialog);

      this.stageOfConversation++;
      player.stageOfConversation[this.name]++;
    }
  }

  endDialog():void {
    keys.f.pause = false;
    if (!backpack.classList.contains('backpack_active')) player.thinks = false;
  }

  gettingHit():void {
    if (this.stageOfConversation >= this.phrases.length) this.textHint = 'пни её уже!';

    if (
      keys.f.pressed &&
      !keys.f.pause &&
      !player.thinks &&
      this.stageOfConversation >= this.phrases.length &&
      !backpack.classList.contains('backpack_active'))
    {
      player.audio.la.currentTime = 0;
      player.audio.la.pause();

      player.thinks = true;
      keys.f.pause = true;

      this.action = 'getting hit';
      this.frame = 0;
      this.numberOfFrames = 10;

      player.playerTasks.completedDialogues[this.name] = true;
      player.frame = 0;
      player.action = 'beats';
      objAudio.player[9].currentTime = 0;
      objAudio.player[9].play();

      this.outrageAudioArray.forEach((audio:HTMLAudioElement):void => {
        audio.currentTime = 0;
        audio.pause();
      });
      this.outrageAudioArray[Math.floor(Math.random() * this.outrageAudioArray.length)].play();
    }
  }
}

export {
  Interlocutor,
  Wounded,
  Lera
}