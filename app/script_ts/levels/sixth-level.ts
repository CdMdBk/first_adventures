import {Player, PlayerSimulator, player, Shell} from "../classes/player.js";
import {
  blackout,
  camera,
  canvas,
  ctx,
  field,
  halfCanvas,
  keys,
  mapObjects,
  level,
  spacePalette
} from "../variables/variables.js";
import {
  behindDetector, collisionOfGameObjects,
  collisionWithPlayer,
  interaction,
  takingDamage
} from "../common/interaction-with-environment.js";
import {
  adaptGameField,
  changePositions,
  levelGeneration,
  renderingNumberOfLives,
  renderingNumberOfLivesBoss
} from "../common/level-generation.js";
import {CubicZirconia} from "../classes/obstacles.js";
import {ChangeStageOfLevel, Edge} from "../classes/control-points.js";
import {Star} from "../classes/stars.js";
import {renderingBlackout} from "../common/blackout.js";
import {objAudio} from "../variables/list-audio.js";
import {maps} from "../variables/maps.js";
import {Demon, CorruptedMadBlick, ShellBlick} from "../classes/demons.js";
import {ParticleDemon, ParticleBlick, ParticlePlayer, ParticleDeadBlick} from "../classes/particles.js";
import {Soul} from "../classes/soul.js";

export function renderingSixthLevel():void {
  player.animationId = requestAnimationFrame(renderingSixthLevel);
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

  if (level.levelStage === 2) {
    if (player.numberOfCompletedFrames === 0 || player.numberOfCompletedFrames % 14400 === 0) {
      objAudio.soundsOfLocations[5].pause();
      objAudio.soundsOfLocations[6].currentTime = 0;
      objAudio.soundsOfLocations[6].play();
    }
  } else {
    if (player.numberOfCompletedFrames === 0 || player.numberOfCompletedFrames % 14400 === 0) {
      objAudio.soundsOfLocations[6].pause();
      objAudio.soundsOfLocations[5].volume = .1;
      objAudio.soundsOfLocations[5].currentTime = 0;
      objAudio.soundsOfLocations[5].play();
    }
  }

  if (player.action !== 'moving' && player.audio.flight.volume > .02) {
    player.audio.flight.volume -= .01;
  } else if (player.action !== 'moving' && player.audio.flight.volume < .02) {
    player.audio.flight.currentTime = 0;
    player.audio.flight.pause();
    player.audio.flight.volume = 1;
  } else if (player.action === 'moving' && player.audio.flight.volume < 1) {
    player.audio.flight.volume += .01;
  }

  //player movement and collision--------------------------------------------------

  if (keys.a.pressed && player.x > mapObjects.edge[0].x && !player.thinks) {
    collisionWithPlayer('cubicZirconia', {x: -Player.speed, y: 0});

    if (player.x + player.width / 2 > halfCanvas.w + Player.speed || camera.currentPosition.x <= halfCanvas.w - Player.speed) {
      player.permissionMovement ? player.speedX = -Player.speed : player.speedX = 0;
    } else {
      if (player.permissionMovement) {
        camera.currentPosition.x -= Player.speed;
      }
    }
    (player.permissionMovement) ? player.audio.flight.play() : player.permissionMovement = true;
  }

  if (keys.d.pressed && player.x + player.width < mapObjects.edge[1].x + mapObjects.edge[1].size && !player.thinks) {
    collisionWithPlayer('cubicZirconia', {x: Player.speed, y: 0});

    if (player.x + player.width/2 < halfCanvas.w + Player.speed || camera.currentPosition.x >= camera.edgeOfMap.startX - halfCanvas.w - Player.speed) {
      player.permissionMovement ? player.speedX = Player.speed : player.speedX = 0;
    } else {
      if (player.permissionMovement) camera.currentPosition.x += Player.speed;
    }
    (player.permissionMovement) ? player.audio.flight.play() : player.permissionMovement = true;
  }

  if (keys.w.pressed && player.y > Player.speed && !player.thinks) {
    collisionWithPlayer('cubicZirconia', {x: 0, y: -Player.speed});

    if (player.y + player.height/2 > halfCanvas.h || camera.currentPosition.y <= halfCanvas.h) {
      (player.permissionMovement) ? player.speedY = -Player.speed : player.speedY = 0;
    } else {
      if (player.permissionMovement) camera.currentPosition.y -= Player.speed;
    }
    (player.permissionMovement) ? player.audio.flight.play() : player.permissionMovement = true;
  }

  if (keys.s.pressed && player.y + player.height < canvas.height - Player.speed && !player.thinks) {
    collisionWithPlayer('cubicZirconia', {x: 0, y: Player.speed});

    if (player.y + player.height/2 < halfCanvas.h || camera.currentPosition.y >= camera.edgeOfMap.startY - halfCanvas.h) {
      (player.permissionMovement) ? player.speedY = Player.speed : player.speedY = 0;
    } else {
      if (player.permissionMovement) camera.currentPosition.y += Player.speed;
    }
    (player.permissionMovement) ? player.audio.flight.play() : player.permissionMovement = true;
  }

  changePositions();

  //generation player simulator--------------------------------------------------

  if (player.action === 'moving') {
    mapObjects.playerSimulator.push(new PlayerSimulator(
      player.x, player.y + player.amplitude, player.width
    ));
  }
  if (mapObjects.playerSimulator.length >= 30 || player.action !== 'moving') mapObjects.playerSimulator.splice(0, 1);

  //generation shells--------------------------------------------------

  if (keys.mouseLeft.pressed && player.timeWithoutAttacks > 60 && !level.safeZone) player.attack = true;
  if (!keys.mouseLeft.pressed) player.attack = false;

  if (player.attack) {
    player.recharge++;
    player.timeWithoutAttacks = -1;
  } else {
    player.timeWithoutAttacks++;
    player.recharge = -1;
  }

  if (player.attack && (player.recharge === 0 || player.recharge % 60 === 0) && !level.safeZone) {
    mapObjects.shell.push(new Shell(
      player.x, player.y, field.sizeCell / 10, player.width, player.mouseX, player.mouseY));
    objAudio.player[7].volume = .5;
    objAudio.player[7].currentTime = 0;
    objAudio.player[7].play();
  }

  //generation enemies--------------------------------------------------

  if (level.levelStage === 2) {
    if (player.numberOfEnemiesKilled.demon >= 0 && player.numberOfEnemiesKilled.demon < 10) {
      level.spawnRate = 500;
    } else if (player.numberOfEnemiesKilled.demon >= 10 && player.numberOfEnemiesKilled.demon < 25) {
      level.spawnRate = 350;
    } else if (player.numberOfEnemiesKilled.demon >= 25 && player.numberOfEnemiesKilled.demon < 50) {
      level.spawnRate = 200;
    } else if (player.numberOfEnemiesKilled.demon >= 50 && player.numberOfEnemiesKilled.CorruptedMadBlick === 0) {
      level.spawnRate = 1000;
      if (!player.bossFightStage) {
        mapObjects.CorruptedMadBlick[0] = new CorruptedMadBlick(field.sizeCell);
        player.bossFightStage = true;
      }
    } else {
      level.spawnRate = 0;
    }

    if (player.numberOfCompletedFrames % level.spawnRate === 0 &&
      mapObjects.demon.length < 5) mapObjects.demon.push(new Demon(field.sizeCell / 3));
  }

  //final rendering of frame--------------------------------------------------

  takingDamage('cubicZirconia');
  takingDamage('demon');
  takingDamage('CorruptedMadBlick');
  takingDamage('shellBlick');

  mapObjects.star.forEach((star:Star):void => {
    star.movement(canvas.width / 2, canvas.height / 2);
  });

  mapObjects.edge.forEach((edge:Edge):void => {
    edge.changePositions();
  });
  mapObjects.stage.forEach((stage:ChangeStageOfLevel):void => {
    if (level.levelStage === 1) stage.changePositions();
  });

  mapObjects.shell.forEach((shell:Shell, index:number):void => {
    shell.changePositions();
  });
  mapObjects.shellBlick.forEach((shellBlick:ShellBlick):void => {
    shellBlick.changePositions();
  });

  if (level.levelStage === 2) mapObjects.demon.forEach((demon:Demon, index:number):void => {
    demon.changePositions();
  });
  if (level.levelStage === 2) mapObjects.CorruptedMadBlick.forEach((boss:CorruptedMadBlick):void => {
    boss.changePositions()
  });

  mapObjects.cubicZirconia.forEach((cubicZirconia:CubicZirconia):void => {
    if (level.levelStage === 2 && cubicZirconia.condition === 'absent') cubicZirconia.condition = 'aggressive';
    cubicZirconia.changePositions();
  });

  mapObjects.soul.forEach((soul:Soul):void => {
    soul.currentFrame = 0;
    soul.changePositions();
    soul.currentFrame = 1;
  });

  collisionOfGameObjects('shell', 'window');
  collisionOfGameObjects('shellBlick', 'window');
  collisionOfGameObjects('shell', 'cubicZirconia');
  collisionOfGameObjects('shell', 'demon');
  if (player.bossFightStage) collisionOfGameObjects('shell', 'CorruptedMadBlick');

  mapObjects.playerSimulator.forEach((playerSimulator:PlayerSimulator):void => {
    playerSimulator.changePositions();
  });
  player.movementSoul();
  player.numberOfCompletedFrames++;

  mapObjects.particlePlayer.forEach((particle:ParticlePlayer, index:number):void => {
    if (particle.opacity <= .1) mapObjects.particlePlayer.splice(index, 1);
    particle.changePositions();
  });
  mapObjects.particleDemon.forEach((particle:ParticleDemon, index:number):void => {
    if (particle.opacity <= .1) mapObjects.particleDemon.splice(index, 1);
    particle.changePositions();
  });
  mapObjects.particleBlick.forEach((particle:ParticleBlick, index:number):void => {
    if (particle.opacity <= .1) mapObjects.particleBlick.splice(index, 1);
    particle.changePositions();
  });
  mapObjects.particleDeadBlick.forEach((particle:ParticleDeadBlick, index:number):void => {
    if (particle.opacity <= .1) mapObjects.particleDeadBlick.splice(index, 1);
    particle.changePositions();
  });

  collisionWithPlayer('stage');

  behindDetector('memory');
  behindDetector('cubicZirconia');
  behindDetector('soul');

  interaction('memory');
  interaction('soul');

  //rendering rest--------------------------------------------------

  if (player.takesDamage) renderingBlackout('damage');
  if (!level.safeZone) renderingNumberOfLives();
  if (player.bossFightStage) renderingNumberOfLivesBoss('Blick');

  //transition to stage 3--------------------------------------------------

  if (player.bossFightStage) {
    if (mapObjects.CorruptedMadBlick[0].size <= field.sizeCell * .3 && !blackout.classList.contains('blackout_active') && level.levelStage === 2) {
      blackout.classList.remove('blackout_behind-canvas');
      blackout.classList.add('blackout_active');

      setTimeout(():void => {
        level.levelStage = 3;
        mapObjects.cubicZirconia.forEach((cubicZirconia:CubicZirconia):void => {
          cubicZirconia.condition = 'neutral';
        });
        mapObjects.soul.push(new Soul(mapObjects.CorruptedMadBlick[0].x, mapObjects.CorruptedMadBlick[0].y, player.width / 2, '239, 100, 81', 'stationary'));

        player.numberOfCompletedFrames = 0;
        objAudio.soundsOfLocations[6].currentTime = 0;
        objAudio.soundsOfLocations[6].pause();
        blackout.classList.add('blackout_behind-canvas');
        blackout.classList.remove('blackout_active');
      }, 8000);
    }
  }

  //death at the level--------------------------------------------------

  if (player.numberOfLives <= 0) {
    blackout.classList.remove('blackout_behind-canvas');
    blackout.classList.add('blackout_active');

    objAudio.soundsOfLocations[5].currentTime = 0;
    objAudio.soundsOfLocations[5].pause();
    objAudio.soundsOfLocations[6].currentTime = 0;
    objAudio.soundsOfLocations[6].pause();
    cancelAnimationFrame(player.animationId);
    removeEventListener('resize', adaptGameField);

    player.numberOfDeaths++;
    player.numberOfCompletedFrames = 0;
    player.numberOfLives = 100;
    objAudio.effects[1].play();

    player.attack = false;
    player.recharge = -1;
    player.timeWithoutAttacks = -1;

    setTimeout(():void => {
      blackout.classList.add('blackout_behind-canvas');
      blackout.classList.remove('blackout_active');

      if (level.levelStage === 1) {
        levelGeneration(42, 2);
      } else if (level.levelStage !== 1) {
        player.numberOfEnemiesKilled.demon = 0;
        player.bossFightStage = false;
        mapObjects.CorruptedMadBlick = [];

        canvas.style.backgroundColor = spacePalette[0];
        level.levelStage = 2;

        mapObjects.cubicZirconia.forEach((cubicZirconia:CubicZirconia):void => {
          cubicZirconia.condition = 'aggressive';
        });
        maps[mapObjects.typeMap].forEach((row:string[], indexRow:number):void => {
          row.forEach((cell: string, indexCell: number): void => {
            if (cell.match(/\|0/)) {
              maps[mapObjects.typeMap][indexRow][indexCell] = '|';
            }
          });
        });
        levelGeneration(10, 13);
      }
      renderingSixthLevel();
    }, 4000);
  }

  //regeneration--------------------------------------------------

  if (!player.takesDamage) {
    player.numberOfLives += .01;
    if (player.numberOfLives > 100) player.numberOfLives = 100;
  }
  player.takesDamage = false;

  //end level--------------------------------------------------

  if (player.playerTasks.completedDialogues.soulKolya) {
    objAudio.soundsOfLocations[5].currentTime = 0;
    objAudio.soundsOfLocations[5].pause();
    objAudio.soundsOfLocations[6].currentTime = 0;
    objAudio.soundsOfLocations[6].pause();
    player.audio.flight.currentTime = 0;
    player.audio.flight.pause();

    blackout.classList.remove('blackout_behind-canvas');
    blackout.classList.add('blackout_active');

    setInterval(():void => {
      cancelAnimationFrame(player.animationId);
    }, 8000);
  }
}