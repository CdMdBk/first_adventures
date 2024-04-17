import {backpackButton, blackout, mapObjects} from '../variables/variables.js';
import {player} from "../classes/player.js";
import {levelGeneration, adaptGameField} from "./level-generation.js";
import {resizeCanvas} from "./resize.js";
import {Player} from "../classes/player.js";
import {field} from "../variables/variables.js";

// function movingToNextLevel--------------------------------------------------

export function movingToNextLevel(renderingFunction:Function, typeMove:'long'|'quickly'|'remark', typeMap?:typeof mapObjects.typeMap, indexCellX?:number, indexCellY?:number):void {
  switch(typeMove) {
    case 'long':
      blackout.classList.remove('blackout_behind-canvas');
      blackout.classList.add('blackout_active');
      mapObjects.typeMap = typeMap;

      player.numberOfCompletedFrames = 0;
      cancelAnimationFrame(player.animationId);
      removeEventListener('resize', adaptGameField);

      setTimeout(():void => {
        blackout.classList.remove('blackout_active');
        (mapObjects.typeMap !== 'Night Parish' && mapObjects.typeMap !== 'Inner World') ?
          backpackButton.classList.remove('backpack-button_not_active') :
          backpackButton.classList.add('backpack-button_not_active');

        resizeCanvas();
        Player.speed = field.speed * player.debuffSpeed;

        levelGeneration(indexCellX, indexCellY);
        renderingFunction();
      }, 8000);

      setTimeout(():void => {blackout.classList.add('blackout_behind-canvas')}, 16000);
      break;

    case 'quickly':
      mapObjects.typeMap = typeMap;
      player.numberOfCompletedFrames = 0;

      (mapObjects.typeMap !== 'Night Parish' && mapObjects.typeMap !== 'Inner World') ?
        backpackButton.classList.remove('backpack-button_not_active') :
        backpackButton.classList.add('backpack-button_not_active');

      resizeCanvas();
      Player.speed = field.speed * player.debuffSpeed;

      removeEventListener('resize', adaptGameField);
      cancelAnimationFrame(player.animationId);
      levelGeneration(indexCellX, indexCellY);
      renderingFunction();

      blackout.classList.remove('blackout_active');
      setTimeout(():void => {blackout.classList.add('blackout_behind-canvas')}, 8000);
      break;

    case 'remark':
      cancelAnimationFrame(player.animationId);
      removeEventListener('resize', adaptGameField);
      player.numberOfCompletedFrames = 0;

      blackout.classList.remove('blackout_behind-canvas');
      blackout.classList.add('blackout_active');

      setTimeout(renderingFunction, 8000);
      break;
  }
}