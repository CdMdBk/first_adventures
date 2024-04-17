import {
  backpackButton,
  buttonStart,
  backpack,
  cross,
  arrow,
  previousCanvas,
  canvas,
  mapObjects,
  spacePalette, keys, formQuestion, bonus, level
} from "../variables/variables.js";
import {showBackpack, hideBackpack, hideItemInfo} from "../common/backpack.js";
import {resizeCanvas} from "../common/resize.js";
import {Star} from "../classes/stars.js";
import {player} from "../classes/player.js";
import {getCoordinates} from "../common/get-coordinates.js";
import {movingToNextLevel} from "../common/next-level.js";
import {renderingFirstLevel} from "./first-level.js";
import {renderingSixthLevel} from "./sixth-level.js";

//DOM elements--------------------------------------------------

addEventListener('keydown', (event:KeyboardEvent):void => {
  if (event.code === 'KeyB' &&
    mapObjects.typeMap !== 'Night Parish' &&
    mapObjects.typeMap !== 'Inner World')
  {
    (!backpack.classList.contains('backpack_active')) ? showBackpack() : hideBackpack();
  }
});
backpackButton.addEventListener('click', ():void => {
  showBackpack();
});

cross.addEventListener('click', ():void => {
  hideBackpack();
});

arrow.addEventListener('click', ():void => {
  hideItemInfo();
});

formQuestion.addEventListener('submit', (event:MouseEvent):void => {
  event.preventDefault();
  //@ts-ignore
  mapObjects.UniversityInFlesh[0].checkAnswer(event.target.children[0].children[1].value);
  //@ts-ignore
  event.target.children[0].children[1].value = '';
});

//shells--------------------------------------------------

addEventListener('mousedown', (event:MouseEvent):void => {
  if (//@ts-ignore
    event.target.tagName !== 'INPUT' &&
    //@ts-ignore
    !bonus.classList.contains('bonus_active')
  ) event.preventDefault();

  keys.mouseLeft.pressed = true;
  player.mouseX = event.clientX;
  player.mouseY = event.clientY;
});

addEventListener('mouseup', (event:MouseEvent):void => {
  event.preventDefault();
  keys.mouseLeft.pressed = false;
});

addEventListener('mousemove', getCoordinates);

//basic settings--------------------------------------------------

resizeCanvas();
previousCanvas.w = canvas.width;
previousCanvas.h = canvas.height;

//init stars--------------------------------------------------

for (let i = 0; i < 400; i++) {
  mapObjects.star.push(new Star(
    canvas.width / 2, canvas.height / 2, Math.random() * (4 - 1) + 1,
    spacePalette[Math.floor(Math.random() * spacePalette.length)], 'circle', Math.random() * (canvas.width - 100) + 100));
}

//start game--------------------------------------------------

buttonStart.addEventListener('click', ():void => {
  buttonStart.remove();
  resizeCanvas();

  mapObjects.star.forEach((star:Star):void => {
    star.movement(canvas.width / 2, canvas.height / 2);
  });

  level.currentLevel = 1;
  movingToNextLevel(renderingFirstLevel, 'quickly', 'Tsaritsyno Park', 10, 9);
});