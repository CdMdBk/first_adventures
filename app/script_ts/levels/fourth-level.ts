import {Player, player} from "../classes/player.js";
import {
  backpackButton,
  blackout,
  camera,
  canvas,
  ctx,
  halfCanvas,
  keys,
  level,
  mapObjects
} from "../variables/variables.js";
import {objAudio} from "../variables/list-audio.js";
import {
  behindDetector,
  collisionOfGameObjects,
  collisionWithPlayer,
  interaction, takingDamage
} from "../common/interaction-with-environment.js";
import {changePositions, renderingCountItems, adaptGameField, levelGeneration} from "../common/level-generation.js";
import {Tree, Wall, Water} from "../classes/obstacles.js";
import {Edge} from "../classes/control-points.js";
import {Decor, Floor} from "../classes/floor.js";
import {Item} from "../classes/items.js";
import {Tablet} from "../classes/tablets.js";
import {movingToNextLevel} from "../common/next-level.js";
import {Bullet, Target} from "../classes/bullets.js";
import {renderingFifthLevel} from "./fifth-level.js";

export function renderingFourthLevel():void {
  player.animationId = requestAnimationFrame(renderingFourthLevel);
  if (canvas.width > 4000) {
    ctx.clearRect(
      camera.beginningMap.x - 2000,
      camera.beginningMap.y - 2000,
      Math.abs(camera.beginningMap.x) + Math.abs(camera.edgeOfMap.x) + 4000,
      Math.abs(camera.beginningMap.y) + Math.abs(camera.edgeOfMap.y) + 4000);
  } else {
    ctx.clearRect(
      camera.beginningMap.x - 1000,
      camera.beginningMap.y - 1000,
      Math.abs(camera.beginningMap.x) + Math.abs(camera.edgeOfMap.x) + 2000,
      Math.abs(camera.beginningMap.y) + Math.abs(camera.edgeOfMap.y) + 2000);
  }

  if (player.numberOfCompletedFrames === 0) backpackButton.classList.remove('backpack-button_not_active');

  //audio--------------------------------------------------

  if (player.numberOfCompletedFrames === 0 || player.numberOfCompletedFrames % 5400 === 0) {
    objAudio.soundsOfLocations[3].currentTime = 0;
    objAudio.soundsOfLocations[3].play();
  }

  //player movement and collision detection--------------------------------------------------

  if (keys.a.pressed && player.x > mapObjects.edge[0].x && !player.thinks) {
    collisionWithPlayer('tablet', {x: -Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('tree', {x: -Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('wall', {x: -Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('water', {x: -Player.speed, y: 0});

    if (player.x + player.width/2 > halfCanvas.w + Player.speed || camera.currentPosition.x <= halfCanvas.w - Player.speed) {
      player.permissionMovement ? player.speedX = -Player.speed : player.speedX = 0;
    } else {
      if (player.permissionMovement) camera.currentPosition.x -= Player.speed;
    }
    (player.permissionMovement) ? player.audio.walkingLawn.play() : player.permissionMovement = true;
  }

  if (keys.d.pressed && player.x + player.width < mapObjects.edge[1].x + mapObjects.edge[1].size && !player.thinks) {
    collisionWithPlayer('tablet', {x: Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('tree', {x: Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('wall', {x: Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('water', {x: Player.speed, y: 0});

    if (player.x + player.width/2 < halfCanvas.w + Player.speed || camera.currentPosition.x >= camera.edgeOfMap.startX - halfCanvas.w - Player.speed) {
      player.permissionMovement ? player.speedX = Player.speed : player.speedX = 0;
    } else {
      if (player.permissionMovement) camera.currentPosition.x += Player.speed;
    }
    (player.permissionMovement) ? player.audio.walkingLawn.play() : player.permissionMovement = true;
  }

  if (keys.w.pressed && player.y > Player.speed && !player.thinks) {
    collisionWithPlayer('tablet', {x: 0, y: -Player.speed});
    if (player.permissionMovement) collisionWithPlayer('tree', {x: 0, y: -Player.speed});
    if (player.permissionMovement) collisionWithPlayer('wall', {x: 0, y: -Player.speed});
    if (player.permissionMovement) collisionWithPlayer('water', {x: 0, y: -Player.speed});

    if (player.y + player.height/2 > halfCanvas.h || camera.currentPosition.y <= halfCanvas.h) {
      (player.permissionMovement) ? player.speedY = -Player.speed : player.speedY = 0;
    } else {
      if (player.permissionMovement) camera.currentPosition.y -= Player.speed;
    }
    (player.permissionMovement) ? player.audio.walkingLawn.play() : player.permissionMovement = true;
  }

  if (keys.s.pressed && player.y + player.height < canvas.height - Player.speed && !player.thinks) {
    collisionWithPlayer('tablet', {x: 0, y: Player.speed});
    if (player.permissionMovement) collisionWithPlayer('tree', {x: 0, y: Player.speed});
    if (player.permissionMovement) collisionWithPlayer('wall', {x: 0, y: Player.speed});
    if (player.permissionMovement) collisionWithPlayer('water', {x: 0, y: Player.speed});

    if (player.y + player.height/2 < halfCanvas.h || camera.currentPosition.y >= camera.edgeOfMap.startY - halfCanvas.h) {
      (player.permissionMovement) ? player.speedY = Player.speed : player.speedY = 0;
    } else {
      if (player.permissionMovement) camera.currentPosition.y += Player.speed;
    }
    (player.permissionMovement) ? player.audio.walkingLawn.play() : player.permissionMovement = true;
  }

  changePositions();

  //final rendering of frame--------------------------------------------------

  mapObjects.edge.forEach((edge:Edge):void => {
    edge.changePositions();
  });
  mapObjects.endLevel.changePositions();
  mapObjects.target.forEach((target:Target):void => {
    target.changePositions();
  });

  mapObjects.water.forEach((water:Water):void => {
    water.changePositions();
  });

  mapObjects.floor.forEach((lawn:Floor):void => {
    lawn.changePositions();
  });
  mapObjects.decor.forEach((decor:Decor):void => {
    decor.changePositions();
  });

  mapObjects.item.forEach((item:Item):void => {
    item.changePositions();
  });

  mapObjects.tablet.forEach((tablet:Tablet):void => {
    tablet.changePositions();
  });

  mapObjects.tree.forEach((tree:Tree):void => {
    tree.changePositions();
  });

  mapObjects.bullet.forEach((bullet:Bullet):void => {
    bullet.changePositions();
  });

  collisionOfGameObjects('bullet', 'window');
  collisionOfGameObjects('bullet', 'tree');

  mapObjects.wall.forEach((wall:Wall):void => {
    wall.changePositions();
  });

  player.movementPlayer();
  player.numberOfCompletedFrames++;

  behindDetector('item');
  behindDetector('tree');
  behindDetector('tablet');
  behindDetector('wall');

  interaction('item');
  interaction('tablet');

  takingDamage('bullet');

  //rendering rest--------------------------------------------------

  renderingCountItems();

  //death at the level--------------------------------------------------

  if (player.numberOfLives <= 0) {
    blackout.classList.remove('blackout_behind-canvas');
    blackout.classList.add('blackout_active');

    objAudio.soundsOfLocations[3].currentTime = 0;
    objAudio.soundsOfLocations[3].pause();
    cancelAnimationFrame(player.animationId);
    removeEventListener('resize', adaptGameField);

    player.numberOfDeaths++;
    player.numberOfCompletedFrames = 0;
    player.numberOfLives = 100;
    objAudio.effects[1].play();

    setTimeout(():void => {
      blackout.classList.add('blackout_behind-canvas');
      blackout.classList.remove('blackout_active');

      levelGeneration(17, 29);
      renderingFourthLevel();
    }, 4000);
  }

  //end level--------------------------------------------------

  if (
    player.x + player.width >= mapObjects.endLevel.x &&
    player.x <= mapObjects.endLevel.x + mapObjects.endLevel.size &&
    player.y + player.height >= mapObjects.endLevel.y &&
    player.y + player.height <= mapObjects.endLevel.y + mapObjects.endLevel.size)
  {
    objAudio.soundsOfLocations[3].currentTime = 0;
    objAudio.soundsOfLocations[3].pause();

    level.currentLevel = 5;
    player.debuffSpeed = 1;
    movingToNextLevel(renderingFifthLevel, 'long', 'Lawn Of Lera', 7 ,5);
  }
}