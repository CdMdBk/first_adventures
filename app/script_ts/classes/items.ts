import {TemplateCell} from "./template.js";
import {ctx, field, keys, mapObjects, camera} from "../variables/variables.js";
import {Positions} from "../variables/interfaces.js";
import {player} from "./player.js";
import {objAudio} from "../variables/list-audio.js";

class Item extends TemplateCell {
  public positioningError:number = Math.random() * field.sizeCell * 3/4;
  public itemX:number;
  public itemY:number;

  public image:HTMLImageElement = new Image();
  public typeImage:number;
  constructor(x:number, y:number, size:number, typeImage:string) {
    super(x, y, size);
    this.startX = this.x - 5;
    this.startY = this.y - 5;

    this.image.src = './images/items/items.png';
    this.typeImage = parseInt(typeImage);
  }

  draw():void {
    ctx.drawImage(this.image, this.typeImage * 100, 0, 100, 100, this.itemX, this.itemY, this.size, this.size);
  }

  changePositions():void {
    this.x = this.startX + (camera.currentPosition.startX - camera.currentPosition.x);
    this.y = this.startY + (camera.currentPosition.startY - camera.currentPosition.y);
    this.itemX = this.x + this.positioningError;
    this.itemY = this.y + this.positioningError;
    this.draw();
  }

  showHint():void {
    if (!keys.f.pause) {
      ctx.fillStyle = 'rgba(0,0,0,.5)';
      ctx.fillRect(this.itemX - this.size * 2, this.itemY - this.size, this.size * 5, this.size / 2);

      ctx.fillStyle = 'white';
      ctx.font = `900 ${field.sizeCell / 13}px Pixel Art`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText('жмякни "а", чтобы подобрать', this.itemX + this.size / 2, this.itemY - this.size * .75);
    }
  }

  pickUp(indexItem:number) {
    if (keys.f.pressed && !keys.f.pause) {
      player.audio.pickUp.currentTime = 0;
      player.audio.pickUp.play();
      player.playerTasks.backpack.push(`i${this.typeImage}`);
      mapObjects.item.splice(indexItem, 1);
    }
  }
}

export {
  Item
}