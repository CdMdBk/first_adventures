import {Player, player} from "../classes/player.js";
import {
  camera,
  canvas,
  ctx,
  halfCanvas,
  keys, level,
  mapObjects, spacePalette
} from "../variables/variables.js";
import {behindDetector, collisionWithPlayer, interaction} from "../common/interaction-with-environment.js";
import {changePositions, renderingCountItems} from "../common/level-generation.js";
import {Tree, Water} from "../classes/obstacles.js";
import {Edge} from "../classes/control-points.js";
import {Decor, Floor} from "../classes/floor.js";
import {Item} from "../classes/items.js";
import {Tablet} from "../classes/tablets.js";
import {Fence} from "../classes/fence.js";
import {objAudio} from "../variables/list-audio.js";
import {movingToNextLevel} from "../common/next-level.js";
import {Lera} from "../classes/npc.js";
import {Star} from "../classes/stars.js";
import {renderingSixthLevel} from "./sixth-level.js";

export function renderingFifthLevel():void {
  player.animationId = requestAnimationFrame(renderingFifthLevel);
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

  //audio--------------------------------------------------

  if (player.numberOfCompletedFrames === 0 || player.numberOfCompletedFrames % 3600 === 0) {
    objAudio.soundsOfLocations[4].currentTime = 0;
    objAudio.soundsOfLocations[4].play();
  }
  if (Math.random() * 10000 <= 2 && !player.thinks) player.audio.la.play();

  //player movement and collision detection--------------------------------------------------

  if (keys.a.pressed && player.x > mapObjects.edge[0].x && !player.thinks) {
    collisionWithPlayer('tablet', {x: -Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('fence', {x: -Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('tree', {x: -Player.speed, y: 0});
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
    if (player.permissionMovement) collisionWithPlayer('fence', {x: Player.speed, y: 0});
    if (player.permissionMovement) collisionWithPlayer('tree', {x: Player.speed, y: 0});
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
    if (player.permissionMovement) collisionWithPlayer('fence', {x: 0, y: -Player.speed});
    if (player.permissionMovement) collisionWithPlayer('tree', {x: 0, y: -Player.speed});
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
    if (player.permissionMovement) collisionWithPlayer('fence', {x: 0, y: Player.speed});
    if (player.permissionMovement) collisionWithPlayer('tree', {x: 0, y: Player.speed});
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

  // player.arrayOfOObjectsAbovePlayer = [];

  mapObjects.edge.forEach((edge:Edge):void => {
    edge.changePositions();
  });
  mapObjects.endLevel.changePositions();

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

  mapObjects.npc.lera.forEach((npc:Lera):void => {
    npc.changePositions();
  });

  mapObjects.tablet.forEach((tablet:Tablet):void => {
    tablet.changePositions();
  });

  mapObjects.fence.forEach((fence:Fence):void => {
    fence.changePositions();
  });

  mapObjects.tree.forEach((tree:Tree):void => {
    tree.changePositions();
  });

  player.movementPlayer();
  player.numberOfCompletedFrames++;

  behindDetector('item');
  behindDetector('tree');
  behindDetector('tablet');
  behindDetector('lera');
  behindDetector('fence');

  //rendering rest--------------------------------------------------

  interaction('interlocutor');
  interaction('item');
  interaction('tablet');
  interaction('lera');

  renderingCountItems();

  //end level--------------------------------------------------

  if (
    player.x + player.width >= mapObjects.endLevel.x &&
    player.x <= mapObjects.endLevel.x + mapObjects.endLevel.size &&
    player.y + player.height >= mapObjects.endLevel.y &&
    player.y + player.height <= mapObjects.endLevel.y + mapObjects.endLevel.size)
  {
    objAudio.soundsOfLocations[4].currentTime = 0;
    objAudio.soundsOfLocations[4].pause();
    player.audio.la.currentTime = 0;
    player.audio.la.pause();

    level.currentLevel = 6;
    level.levelStage = 1;

    mapObjects.star = [];
    for (let i = 0; i < 300; i++) {
      mapObjects.star.push(new Star(
        canvas.width / 2, canvas.height / 2, Math.random() * (4 - 1) + 1,
        spacePalette[Math.floor(Math.random() * spacePalette.length)], 'circle', Math.random() * (canvas.width - 100) + 100));
    }

    movingToNextLevel(renderingSixthLevel, 'long', 'Inner World', 42, 2);
  }
}