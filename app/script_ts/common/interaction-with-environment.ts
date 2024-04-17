import {canvas, ctx, field, level, mapObjects} from "../variables/variables.js";
import {player, PlayerSimulator} from "../classes/player.js";
import {Item} from "../classes/items.js";
import {Interlocutor, Wounded, Lera} from "../classes/npc.js";
import {CubicZirconia, Tree, Wall} from "../classes/obstacles.js";
import {Fence} from "../classes/fence.js";
import {ParticlePlayer, ParticleDemon, ParticleBlick} from "../classes/particles.js";
import {objAudio} from "../variables/list-audio.js";
import {Soul} from "../classes/soul.js";
import {People} from "../classes/people.js";


function collisionWithPlayer(typeElement:'water'|'wall'|'tree'|'tablet'|'fence'|'cubicZirconia'|'stage', speed?:{x:number, y:number}):void {
  switch(typeElement) {
    case 'water':
      for (let water of mapObjects.water) {
        if (
          player.x + player.width + speed.x >= water.x - water.size * .2 &&
          player.x + speed.x <= water.x + water.size * 1.2 &&
          // player.y + player.height + speed.y >= water.y + water.size * .9 &&
          player.y + player.height * 2 + speed.y >= water.y - water.size * .1 &&
          player.y + player.height / 2 + speed.y <= water.y + water.size
        ) {
          player.permissionMovement = false;
          break;
        }
      }
      break;

    case 'wall':
      for (let wall of mapObjects.wall) {
        if (
          player.x + player.width + speed.x >= wall.x &&
          player.x + speed.x <= wall.x + wall.width &&
          player.y + player.height + speed.y >= wall.y + wall.height / 3 &&
          player.y + player.height * 3/4 + speed.y <= wall.y + wall.height
        ) {
          player.permissionMovement = false;
          break;
        }
      }
      break;

    case 'cubicZirconia':
      for (let cubicZirconia of mapObjects.cubicZirconia) {
        if (
          cubicZirconia.condition !== 'absent' &&
          player.x + player.width + speed.x >= cubicZirconia.x &&
          player.x + speed.x <= cubicZirconia.x + cubicZirconia.width &&
          player.y + player.width + speed.y >= cubicZirconia.y + cubicZirconia.height / 3 &&
          player.y + player.width / 2 + speed.y <= cubicZirconia.y + cubicZirconia.height
        ) {
          player.permissionMovement = false;
          break;
        } else {
        }
      }
      break;

    case 'tree':
      for (let tree of mapObjects.tree) {
        if (
          player.x + player.width + speed.x >= tree.treeX &&
          player.x + speed.x <= tree.treeX + tree.width &&
          player.y + player.height + speed.y >= tree.treeY + tree.height * .8 &&
          player.y + player.height + speed.y <= tree.treeY + tree.height
        ) {
          player.permissionMovement = false;
          break;
        }
      }
      break;

    case 'tablet':
      for (let tablet of mapObjects.tablet) {
        if (
          player.x + player.width + speed.x >= tablet.tabletX + tablet.size * .1 &&
          player.x + speed.x <= tablet.tabletX + tablet.size * .9 &&
          player.y + player.height + speed.y >= tablet.tabletY + tablet.size * .8 &&
          player.y + player.height + speed.y <= tablet.tabletY + tablet.size * 1.2
        ) {
          player.permissionMovement = false;
          break;
        }
      }
      break;

    case 'fence':
      for (let fence of mapObjects.fence) {
        if (
          player.x + player.width + speed.x >= fence.fenceX + fence.width * .1 &&
          player.x + speed.x <= fence.fenceX + fence.width * .9 &&
          player.y + player.height + speed.y >= fence.fenceY + fence.height - player.height * 2/3 &&
          player.y + player.height * 2/3 + speed.y <= fence.fenceY + fence.height
        ) {
          player.permissionMovement = false;
          break;
        }
      }
      break;

    case 'stage':
      for (let i = 0; i < mapObjects.stage.length; i++) {
        if (
          player.x + player.width >= mapObjects.stage[i].x &&
          player.x <= mapObjects.stage[i].x + mapObjects.stage[i].size &&
          player.y + player.height >= mapObjects.stage[i].y &&
          player.y <= mapObjects.stage[i].y + mapObjects.stage[i].size
        ) {
          player.numberOfCompletedFrames = 0;
          level.levelStage = mapObjects.stage[i].stageThatWillBeInclude;

          for (let j = mapObjects.stage.length - 1; j >= 0; j--) {
            if (mapObjects.stage[j].stageThatWillBeInclude === level.levelStage) {
              mapObjects.stage.splice(j, 1);
            }
          }
          break;
        }
      }
      break;
  }
}

function collisionOfGameObjects(firstObject:string, secondObject:string):void {
  switch(firstObject) {
    case 'bullet':
      switch(secondObject) {
        case 'window':
          for (let i = 0; i < mapObjects.bullet.length; i++) {
            if (
              (mapObjects.bullet[i].x >= canvas.width ||
                mapObjects.bullet[i].x + mapObjects.bullet[i].size <= 0 ||
                mapObjects.bullet[i].y >= canvas.height ||
                mapObjects.bullet[i].y + mapObjects.bullet[i].size <= 0) && mapObjects.bullet[i].lifeTime > 150
            ) {
              mapObjects.bullet.splice(i, 1);
            }
          }
          break;
        case 'tree':
          for (let i = 0; i < mapObjects.bullet.length; i++) {
            for (let tree of mapObjects.tree) {
              if (
                mapObjects.bullet[i].x + mapObjects.bullet[i].size >= tree.treeX &&
                mapObjects.bullet[i].x <= tree.treeX + tree.width &&
                mapObjects.bullet[i].y + mapObjects.bullet[i].size >= tree.treeY + tree.height * .8 &&
                mapObjects.bullet[i].y + mapObjects.bullet[i].size <= tree.treeY + tree.height
              ) {
                mapObjects.bullet.splice(i, 1);
                break;
              }
            }
          }
          break;
      }
      break;

    case 'shell':
      switch(secondObject) {
        case 'window':
          for (let i = 0; i < mapObjects.shell.length; i++) {
            if (
              (mapObjects.shell[i].x >= canvas.width ||
                mapObjects.shell[i].x + mapObjects.shell[i].size <= 0 ||
                mapObjects.shell[i].y >= canvas.height ||
                mapObjects.shell[i].y + mapObjects.shell[i].size <= 0)
            ) {
              mapObjects.shell.splice(i, 1);
            }
          }
          break;

        case 'cubicZirconia':
          for (let i = 0; i < mapObjects.shell.length; i++) {
            for (let cubicZirconia of mapObjects.cubicZirconia) {
              if (
                mapObjects.shell[i].x + mapObjects.shell[i].size >= cubicZirconia.x &&
                mapObjects.shell[i].x <= cubicZirconia.x + cubicZirconia.width &&
                mapObjects.shell[i].y + mapObjects.shell[i].size >= cubicZirconia.y + cubicZirconia.width / 2 &&
                mapObjects.shell[i].y <= cubicZirconia.y + cubicZirconia.height
              ) {
                mapObjects.shell.splice(i, 1);
                objAudio.player[8].volume = .5;
                objAudio.player[8].currentTime = 0;
                objAudio.player[8].play();
                break;
              }
            }
          }
          break;

        case 'demon':
          for (let i = 0; i < mapObjects.shell.length; i++) {
            for (let j = 0; j < mapObjects.demon.length; j++) {
              if (
                //@ts-ignore
                Math.hypot(
                  mapObjects.shell[i].x + mapObjects.shell[i].startSize / 2 - mapObjects.demon[j].x, mapObjects.shell[i].y + mapObjects.shell[i].startSize / 2 - mapObjects.demon[j].y) <= mapObjects.shell[i].startSize / 2 + mapObjects.demon[j].startSize / 2
              ) {
                mapObjects.demon[j].startSize -= mapObjects.shell[i].startSize * .2;
                mapObjects.demon[j].numberOfLives--;

                for (let k = 0; k < 10; k++) {
                  mapObjects.particlePlayer.push(new ParticlePlayer(
                    mapObjects.shell[i].x,
                    mapObjects.shell[i].y,
                    Math.random() * field.sizeCell * .05));
                }
                mapObjects.shell.splice(i, 1);
                objAudio.player[8].volume = .5;
                objAudio.player[8].currentTime = 0;
                objAudio.player[8].play();

                if (mapObjects.demon[j].numberOfLives === 0) {
                  for (let k = 0; k < 20; k++) {
                    mapObjects.particleDemon.push(new ParticleDemon(
                      mapObjects.demon[j].x,
                      mapObjects.demon[j].y,
                      Math.random() * field.sizeCell * .1));
                  }
                  mapObjects.demon.splice(j, 1);
                  player.numberOfEnemiesKilled.demon++;
                }
                break;
              }
            }
          }
          break;

        case 'CorruptedMadBlick':
          for (let i = 0; i < mapObjects.shell.length; i++) {
            for (let j = 0; j < mapObjects.CorruptedMadBlick.length; j++) {
              if (
                //@ts-ignore
                Math.hypot((
                  mapObjects.shell[i].x + mapObjects.shell[i].startSize / 2) - mapObjects.CorruptedMadBlick[j].x, (mapObjects.shell[i].y + mapObjects.shell[i].startSize / 2) - mapObjects.CorruptedMadBlick[j].y) <= mapObjects.shell[i].startSize / 2 + mapObjects.CorruptedMadBlick[j].startSize / 2
              ) {
                mapObjects.CorruptedMadBlick[j].numberOfLives--;

                if (mapObjects.CorruptedMadBlick[j].numberOfLives <= 0 && player.numberOfEnemiesKilled.CorruptedMadBlick === 0) {
                  mapObjects.CorruptedMadBlick[j].numberOfLives = 0;

                  for (let k = mapObjects.demon.length - 1; k >= 0; k--) {
                    for (let g = 0; g < 20; g++) {
                      mapObjects.particleDemon.push(new ParticleDemon(
                        mapObjects.demon[k].x, mapObjects.demon[k].y,
                        Math.random() * field.sizeCell * .1));
                    }
                    mapObjects.demon.splice(k, 1);
                    player.numberOfEnemiesKilled.demon++;
                  }

                  player.numberOfEnemiesKilled.CorruptedMadBlick++;
                }

                for (let k = 0; k < 10; k++) {
                  mapObjects.particlePlayer.push(new ParticlePlayer(
                    mapObjects.shell[i].x,
                    mapObjects.shell[i].y,
                    Math.random() * field.sizeCell * .05));
                }
                mapObjects.shell.splice(i, 1);
                objAudio.player[8].volume = .5;
                objAudio.player[8].currentTime = 0;
                objAudio.player[8].play();
                break;
              }
            }
          }
          break;
      }
      break;

    case 'shellBlick':
      switch(secondObject) {
        case 'window':
          for (let i = 0; i < mapObjects.shellBlick.length; i++) {
            if (
              (mapObjects.shellBlick[i].x >= canvas.width ||
                mapObjects.shellBlick[i].x + mapObjects.shellBlick[i].size <= 0 ||
                mapObjects.shellBlick[i].y >= canvas.height ||
                mapObjects.shellBlick[i].y + mapObjects.shellBlick[i].size <= 0) && mapObjects.shellBlick[i].lifeTime > 300
            ) {
              mapObjects.shellBlick.splice(i, 1);
            }
          }
          break;
      }
      break;

    case 'people':
      switch(secondObject) {
        case 'wall':
          mapObjects.people.forEach((people:People):void => {
            mapObjects.wall.forEach((wall: Wall): void => {
              if (
                people.x + people.height >= wall.x &&
                people.x <= wall.x + wall.width &&
                people.peopleY + people.height * .5 <= wall.y + wall.height &&
                people.peopleY >= wall.y
              ) {
                people.draw();
              }

              if (
                people.x >= wall.x &&
                people.x + people.height <= wall.x + wall.width &&
                people.y + player.height >= wall.y &&
                people.y + player.height <= wall.y + wall.height
              ) {
                wall.draw();
              }
            });
          });
          break;
      }
      break;
  }
}

function behindDetector(typeObjects:'item'|'memory'|'wall'|'tree'|'tablet'|'interlocutor'|'wounded'|'lera'|'people'|'fence'|'cubicZirconia'|'soul'):void {
  switch(typeObjects) {
    case 'item':
      mapObjects.item.forEach((item:Item):void => {
        if (
          player.x + player.width >= item.itemX &&
          player.x <= item.itemX + item.size &&
          player.y + player.height >= item.itemY &&
          player.y + player.height <= item.itemY + item.size
        ) {
          item.draw();

          mapObjects.wall.forEach((wall:Wall):void => {
            if (
              item.itemX + item.size >= wall.x &&
              item.itemX <= wall.x + wall.width &&
              item.itemY + item.size >= wall.y &&
              item.itemY <= wall.y + wall.height
            ) {
              wall.draw();
            }
          });
        }
      });
      break;

    case 'wall':
      for (let wall of mapObjects.wall) {
        if (
          player.x + player.width >= wall.x &&
          player.x <= wall.x + wall.width &&
          player.y + player.height <= wall.y + wall.height / 3 &&
          player.y + player.height >= wall.y
        ) {
          // wall.draw();
          mapObjects.wall.forEach((wall:Wall):void => {wall.draw()});
        }
      }
      break;

    case 'cubicZirconia':
      for (let cubicZirconia of mapObjects.cubicZirconia) {
        if (
          player.x + player.width >= cubicZirconia.x &&
          player.x <= cubicZirconia.x + cubicZirconia.width &&
          player.y + player.height <= cubicZirconia.y + cubicZirconia.height / 2 &&
          player.y + player.height >= cubicZirconia.y
        ) {
          // cubicZirconia.draw();
          mapObjects.cubicZirconia.forEach((cubic:CubicZirconia):void => {cubic.draw()});
        }
      }
      break;

    case 'tree':
      for (let tree of mapObjects.tree) {
        if (
          player.x + player.width >= tree.treeX - tree.width &&
          player.x < tree.treeX + tree.width * 2 &&
          player.y + player.height >= tree.treeY - tree.width &&
          player.y + player.height <= tree.treeY + tree.height
        ) {
          mapObjects.tree.forEach((tree:Tree):void => {tree.changePositions()});
          break;
        }
      }
      break;

    case 'tablet':
      for (let tablet of mapObjects.tablet) {
        if (
          player.x + player.width >= tablet.tabletX &&
          player.x <= tablet.tabletX + tablet.size &&
          player.y + player.height >= tablet.tabletY &&
          player.y + player.height <= tablet.tabletY + tablet.size
        ) {
          tablet.draw();
        }
      }
      break;

    case 'interlocutor':
      for (let npc of mapObjects.npc.interlocutor) {
        if (
          player.x + player.width >= npc.x &&
          player.x < npc.x + npc.width &&
          player.y + player.height >= npc.y &&
          player.y + player.height <= npc.y + npc.height
        ) {
          mapObjects.npc.interlocutor.forEach((interlocutor:Interlocutor):void => {
            interlocutor.changePositions();
          });
          break;
        }
      }
      break;

    case 'wounded':
      for (let npc of mapObjects.npc.wounded) {
        if (
          player.x + player.width >= npc.x &&
          player.x < npc.x + npc.width &&
          player.y + player.height >= npc.y &&
          player.y + player.height <= npc.y + npc.height
        ) {
          mapObjects.npc.wounded.forEach((wounded:Wounded):void => {
            wounded.changePositions();
          });
          break;
        }
      }
      break;

    case 'lera':
      for (let npc of mapObjects.npc.lera) {
        if (
          player.x + player.width >= npc.x &&
          player.x < npc.x + npc.width &&
          player.y + player.height >= npc.y &&
          player.y + player.height <= npc.y + npc.height
        ) {
          mapObjects.npc.lera.forEach((lera:Lera):void => {
            lera.changePositions();
          });
          break;
        }
      }
      break;

    case 'people':
      mapObjects.people.forEach((people:People):void => {
        if (
          player.x + player.width >= people.peopleX &&
          player.x <= people.peopleX + people.width &&
          player.y + player.height >= people.peopleY &&
          player.y + player.height <= people.peopleY + people.height
        ) {
          people.changePositions();

          mapObjects.wall.forEach((wall:Wall):void => {
            if (
              people.x >= wall.x &&
              people.x + people.height <= wall.x + wall.width &&
              people.y + player.height >= wall.y &&
              people.y + player.height <= wall.y + wall.height
            ) {
              wall.draw();
            }
          });
        }
      });
      break;

    case 'fence':
      for (let fence of mapObjects.fence) {
        if (
          player.x + player.width >= fence.fenceX + fence.width * .1 &&
          player.x <= fence.fenceX + fence.width * .9 &&
          player.y + player.height >= fence.fenceY &&
          player.y + player.height <= fence.fenceY + fence.height
        ) {
          // fence.draw();
          mapObjects.fence.forEach((fence:Fence):void => {fence.draw()});
        }
      }
      break;

    case 'soul':
      for (let soul of mapObjects.soul) {
        if (
          player.x + player.width >= soul.x &&
          player.x <= soul.x + soul.radius * 2 &&
          player.y + player.height <= soul.y + soul.radius * 2 &&
          player.y + player.height >= soul.y
        ) {
          soul.drawStationary();
        }
      }
      break;
  }
}

function interaction(typeObjects:'tablet'|'item'|'memory'|'interlocutor'|'wounded'|'lera'|'soul'):void {
  switch(typeObjects) {
    case 'tablet':
      for (let tablet of mapObjects.tablet) {
        if (
          player.x + player.width >= tablet.tabletX - tablet.size / 2 &&
          player.x <= tablet.tabletX + tablet.size * 1.5 &&
          player.y + player.height >= tablet.tabletY + tablet.size / 2 &&
          player.y + player.height <= tablet.tabletY + tablet.size * 1.5
        ) {
          tablet.showText();
          tablet.toggleHint();
          tablet.showHint();
          break;
        }
      }
      break;

    case 'item':
      mapObjects.item.forEach((item:Item, index:number):void => {
        if (
          player.x + player.width >= item.itemX - item.size &&
          player.x <= item.itemX + item.size * 2 &&
          player.y + player.height >= item.itemY &&
          player.y + player.height <= item.itemY + item.size * 2
        ) {
          item.showHint();
          item.pickUp(index);
        }
      });
      break;

    case 'interlocutor':
      mapObjects.npc.interlocutor.forEach((npc:Interlocutor):void => {
        if (
          player.x + player.width >= npc.x - npc.width &&
          player.x <= npc.x + npc.width * 2 &&
          player.y + player.height >= npc.y + npc.height - npc.width &&
          player.y + player.height <= npc.y + npc.height + npc.width
        ) {
          npc.showHint();
          npc.startDialog();
        }
      });
      break;

    case 'wounded':
      mapObjects.npc.wounded.forEach((npc:Wounded):void => {
        if (
          player.x + player.width >= npc.x - npc.width &&
          player.x <= npc.x + npc.width * 2 &&
          player.y + player.height >= npc.y + npc.height - npc.width &&
          player.y + player.height <= npc.y + npc.height + npc.width
        ) {
          npc.showHint();
          npc.heals();
          npc.startDialog();
        }
      });
      break;

    case 'lera':
      mapObjects.npc.lera.forEach((npc:Lera):void => {
        if (
          player.x + player.width >= npc.x - npc.width &&
          player.x <= npc.x + npc.width * 2 &&
          player.y + player.height >= npc.y + npc.height - npc.width &&
          player.y + player.height <= npc.y + npc.height + npc.width
        ) {
          npc.showHint();
          npc.startDialog();
          npc.gettingHit();
        }
      });
      break;

    case 'soul':
      mapObjects.soul.forEach((soul:Soul):void => {
        if (
          player.x + player.width >= soul.x - soul.radius * 2 &&
          player.x <= soul.x + soul.radius * 4 &&
          player.y + player.height <= soul.y + soul.radius * 4 &&
          player.y + player.height >= soul.y
        ) {
          soul.showHint();
          soul.startDialog();
        }
      });
      break;
  }
}

function takingDamage(typeObjects:'cubicZirconia'|'bullet'|'demon'|'CorruptedMadBlick'|'shellBlick') {
  switch(typeObjects) {
    case 'bullet':
      for (let i = 0; i < mapObjects.bullet.length; i++) {
        if (
          mapObjects.bullet[i].x + mapObjects.bullet[i].size >= player.x &&
          mapObjects.bullet[i].x <= player.x + player.width &&
          mapObjects.bullet[i].y + mapObjects.bullet[i].size >= player.y + mapObjects.bullet[i].size * 2 &&
          mapObjects.bullet[i].y <= player.y + player.height - mapObjects.bullet[i].size * 2
        ) {
          player.numberOfLives -= 100;
          break;
        }
      }
      break;

    case 'cubicZirconia':
      for (let i = 0; i < mapObjects.cubicZirconia.length; i++) {
        if (
          mapObjects.cubicZirconia[i].condition === 'aggressive' &&
          player.x + player.width >= mapObjects.cubicZirconia[i].x - mapObjects.cubicZirconia[i].width * .2 &&
          player.x <= mapObjects.cubicZirconia[i].x + mapObjects.cubicZirconia[i].width * 1.2 &&
          player.y + player.width >= mapObjects.cubicZirconia[i].y + mapObjects.cubicZirconia[i].height / 3 - mapObjects.cubicZirconia[i].width * .2 &&
          player.y + player.width / 2 <= mapObjects.cubicZirconia[i].y + mapObjects.cubicZirconia[i].height + mapObjects.cubicZirconia[i].width * .2 &&
          !level.safeZone
        ) {
          player.numberOfLives -= .05;
          if (player.numberOfLives < 0) player.numberOfLives = 0;
          player.takesDamage = true;

          player.color = '#8932E0';
          player.transparentColor = 'rgba(137,50,224,0)';
          mapObjects.playerSimulator.forEach((playerSimulator:PlayerSimulator):void => {
            playerSimulator.color = '137, 50, 224';
          });
          break;
        }

        if (i === mapObjects.cubicZirconia.length - 1) {
          player.color = '#e0329a';
          player.transparentColor = 'rgba(224,50,154,0)';
          mapObjects.playerSimulator.forEach((playerSimulator:PlayerSimulator):void => {
            playerSimulator.color = '224, 50, 154';
          });
        }
      }
      break;

    case 'demon':
      for (let i = 0; i < mapObjects.demon.length; i++) {
        if (
          //@ts-ignore
          Math.hypot((player.x + player.width * .5) - mapObjects.demon[i].x, (player.y + player.width * .5) - mapObjects.demon[i].y) <= player.width * .5 + mapObjects.demon[i].startSize * .5 && !level.safeZone
        ) {
          player.numberOfLives -= .5;
          if (player.numberOfLives < 0) player.numberOfLives = 0;
          player.takesDamage = true;

          player.color = '#8932E0';
          player.transparentColor = 'rgba(137,50,224,0)';
          mapObjects.playerSimulator.forEach((playerSimulator:PlayerSimulator):void => {
            playerSimulator.color = '137, 50, 224';
          });
          break;
        }

        if (i === mapObjects.cubicZirconia.length - 1) {
          player.color = '#e0329a';
          player.transparentColor = 'rgba(224,50,154,0)';
          mapObjects.playerSimulator.forEach((playerSimulator:PlayerSimulator):void => {
            playerSimulator.color = '224, 50, 154';
          });
        }
      }
      break;

    case 'CorruptedMadBlick':
      for (let boss of mapObjects.CorruptedMadBlick) {
        if (
          //@ts-ignore
          Math.hypot((player.x + player.width * .5) - boss.x, (player.y + player.width * .5) - boss.y) <= player.width * .5 + boss.startSize * .5 && player.bossFightStage
        ) {
          player.numberOfLives -= 100;
          if (player.numberOfLives < 0) player.numberOfLives = 0;

          player.color = '#6500C9';
          player.transparentColor = 'rgba(101, 0, 201, 0)';
          mapObjects.playerSimulator.forEach((playerSimulator: PlayerSimulator): void => {
            playerSimulator.color = '101, 0, 201';
          });
        }
      }
      break;

    case 'shellBlick':
      for (let i = 0; i < mapObjects.shellBlick.length; i++) {
        if (
          //@ts-ignore
          Math.hypot((player.x + player.width * .5) - mapObjects.shellBlick[i].x + mapObjects.shellBlick[i].size / 2, (player.y + player.width * .5) - mapObjects.shellBlick[i].y + mapObjects.shellBlick[i].size / 2) <= player.width * .5 + mapObjects.shellBlick[i].size * .5
        ) {
          player.numberOfLives -= 20;
          if (player.numberOfLives < 0) player.numberOfLives = 0;
          player.takesDamage = true;

          for (let j = 0; j < 10; j++) {
            mapObjects.particleBlick.push(new ParticleBlick(
              mapObjects.shellBlick[i].x,
              mapObjects.shellBlick[i].y,
              Math.random() * field.sizeCell * .05));
          }
          mapObjects.shellBlick.splice(i, 1);
          objAudio.player[8].volume = .5;
          objAudio.player[8].currentTime = 0;
          objAudio.player[8].play();
        }
      }
      break;
  }
}

export {
  collisionWithPlayer,
  collisionOfGameObjects,
  behindDetector,
  interaction,
  takingDamage
}