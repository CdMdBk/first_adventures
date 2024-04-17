import { canvas, field, level, mapObjects } from "../variables/variables.js";
import { player } from "../classes/player.js";
import { ParticlePlayer, ParticleDemon, ParticleBlick } from "../classes/particles.js";
import { objAudio } from "../variables/list-audio.js";
function collisionWithPlayer(typeElement, speed) {
    switch (typeElement) {
        case 'water':
            for (var _i = 0, _a = mapObjects.water; _i < _a.length; _i++) {
                var water = _a[_i];
                if (player.x + player.width + speed.x >= water.x - water.size * .2 &&
                    player.x + speed.x <= water.x + water.size * 1.2 &&
                    // player.y + player.height + speed.y >= water.y + water.size * .9 &&
                    player.y + player.height * 2 + speed.y >= water.y - water.size * .1 &&
                    player.y + player.height / 2 + speed.y <= water.y + water.size) {
                    player.permissionMovement = false;
                    break;
                }
            }
            break;
        case 'wall':
            for (var _b = 0, _c = mapObjects.wall; _b < _c.length; _b++) {
                var wall = _c[_b];
                if (player.x + player.width + speed.x >= wall.x &&
                    player.x + speed.x <= wall.x + wall.width &&
                    player.y + player.height + speed.y >= wall.y + wall.height / 3 &&
                    player.y + player.height * 3 / 4 + speed.y <= wall.y + wall.height) {
                    player.permissionMovement = false;
                    break;
                }
            }
            break;
        case 'cubicZirconia':
            for (var _d = 0, _e = mapObjects.cubicZirconia; _d < _e.length; _d++) {
                var cubicZirconia = _e[_d];
                if (cubicZirconia.condition !== 'absent' &&
                    player.x + player.width + speed.x >= cubicZirconia.x &&
                    player.x + speed.x <= cubicZirconia.x + cubicZirconia.width &&
                    player.y + player.width + speed.y >= cubicZirconia.y + cubicZirconia.height / 3 &&
                    player.y + player.width / 2 + speed.y <= cubicZirconia.y + cubicZirconia.height) {
                    player.permissionMovement = false;
                    break;
                }
                else {
                }
            }
            break;
        case 'tree':
            for (var _f = 0, _g = mapObjects.tree; _f < _g.length; _f++) {
                var tree = _g[_f];
                if (player.x + player.width + speed.x >= tree.treeX &&
                    player.x + speed.x <= tree.treeX + tree.width &&
                    player.y + player.height + speed.y >= tree.treeY + tree.height * .8 &&
                    player.y + player.height + speed.y <= tree.treeY + tree.height) {
                    player.permissionMovement = false;
                    break;
                }
            }
            break;
        case 'tablet':
            for (var _h = 0, _j = mapObjects.tablet; _h < _j.length; _h++) {
                var tablet = _j[_h];
                if (player.x + player.width + speed.x >= tablet.tabletX + tablet.size * .1 &&
                    player.x + speed.x <= tablet.tabletX + tablet.size * .9 &&
                    player.y + player.height + speed.y >= tablet.tabletY + tablet.size * .8 &&
                    player.y + player.height + speed.y <= tablet.tabletY + tablet.size * 1.2) {
                    player.permissionMovement = false;
                    break;
                }
            }
            break;
        case 'fence':
            for (var _k = 0, _l = mapObjects.fence; _k < _l.length; _k++) {
                var fence = _l[_k];
                if (player.x + player.width + speed.x >= fence.fenceX + fence.width * .1 &&
                    player.x + speed.x <= fence.fenceX + fence.width * .9 &&
                    player.y + player.height + speed.y >= fence.fenceY + fence.height - player.height * 2 / 3 &&
                    player.y + player.height * 2 / 3 + speed.y <= fence.fenceY + fence.height) {
                    player.permissionMovement = false;
                    break;
                }
            }
            break;
        case 'stage':
            for (var i = 0; i < mapObjects.stage.length; i++) {
                if (player.x + player.width >= mapObjects.stage[i].x &&
                    player.x <= mapObjects.stage[i].x + mapObjects.stage[i].size &&
                    player.y + player.height >= mapObjects.stage[i].y &&
                    player.y <= mapObjects.stage[i].y + mapObjects.stage[i].size) {
                    player.numberOfCompletedFrames = 0;
                    level.levelStage = mapObjects.stage[i].stageThatWillBeInclude;
                    for (var j = mapObjects.stage.length - 1; j >= 0; j--) {
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
function collisionOfGameObjects(firstObject, secondObject) {
    switch (firstObject) {
        case 'bullet':
            switch (secondObject) {
                case 'window':
                    for (var i = 0; i < mapObjects.bullet.length; i++) {
                        if ((mapObjects.bullet[i].x >= canvas.width ||
                            mapObjects.bullet[i].x + mapObjects.bullet[i].size <= 0 ||
                            mapObjects.bullet[i].y >= canvas.height ||
                            mapObjects.bullet[i].y + mapObjects.bullet[i].size <= 0) && mapObjects.bullet[i].lifeTime > 150) {
                            mapObjects.bullet.splice(i, 1);
                        }
                    }
                    break;
                case 'tree':
                    for (var i = 0; i < mapObjects.bullet.length; i++) {
                        for (var _i = 0, _a = mapObjects.tree; _i < _a.length; _i++) {
                            var tree = _a[_i];
                            if (mapObjects.bullet[i].x + mapObjects.bullet[i].size >= tree.treeX &&
                                mapObjects.bullet[i].x <= tree.treeX + tree.width &&
                                mapObjects.bullet[i].y + mapObjects.bullet[i].size >= tree.treeY + tree.height * .8 &&
                                mapObjects.bullet[i].y + mapObjects.bullet[i].size <= tree.treeY + tree.height) {
                                mapObjects.bullet.splice(i, 1);
                                break;
                            }
                        }
                    }
                    break;
            }
            break;
        case 'shell':
            switch (secondObject) {
                case 'window':
                    for (var i = 0; i < mapObjects.shell.length; i++) {
                        if ((mapObjects.shell[i].x >= canvas.width ||
                            mapObjects.shell[i].x + mapObjects.shell[i].size <= 0 ||
                            mapObjects.shell[i].y >= canvas.height ||
                            mapObjects.shell[i].y + mapObjects.shell[i].size <= 0)) {
                            mapObjects.shell.splice(i, 1);
                        }
                    }
                    break;
                case 'cubicZirconia':
                    for (var i = 0; i < mapObjects.shell.length; i++) {
                        for (var _b = 0, _c = mapObjects.cubicZirconia; _b < _c.length; _b++) {
                            var cubicZirconia = _c[_b];
                            if (mapObjects.shell[i].x + mapObjects.shell[i].size >= cubicZirconia.x &&
                                mapObjects.shell[i].x <= cubicZirconia.x + cubicZirconia.width &&
                                mapObjects.shell[i].y + mapObjects.shell[i].size >= cubicZirconia.y + cubicZirconia.width / 2 &&
                                mapObjects.shell[i].y <= cubicZirconia.y + cubicZirconia.height) {
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
                    for (var i = 0; i < mapObjects.shell.length; i++) {
                        for (var j = 0; j < mapObjects.demon.length; j++) {
                            if (
                            //@ts-ignore
                            Math.hypot(mapObjects.shell[i].x + mapObjects.shell[i].startSize / 2 - mapObjects.demon[j].x, mapObjects.shell[i].y + mapObjects.shell[i].startSize / 2 - mapObjects.demon[j].y) <= mapObjects.shell[i].startSize / 2 + mapObjects.demon[j].startSize / 2) {
                                mapObjects.demon[j].startSize -= mapObjects.shell[i].startSize * .2;
                                mapObjects.demon[j].numberOfLives--;
                                for (var k = 0; k < 10; k++) {
                                    mapObjects.particlePlayer.push(new ParticlePlayer(mapObjects.shell[i].x, mapObjects.shell[i].y, Math.random() * field.sizeCell * .05));
                                }
                                mapObjects.shell.splice(i, 1);
                                objAudio.player[8].volume = .5;
                                objAudio.player[8].currentTime = 0;
                                objAudio.player[8].play();
                                if (mapObjects.demon[j].numberOfLives === 0) {
                                    for (var k = 0; k < 20; k++) {
                                        mapObjects.particleDemon.push(new ParticleDemon(mapObjects.demon[j].x, mapObjects.demon[j].y, Math.random() * field.sizeCell * .1));
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
                    for (var i = 0; i < mapObjects.shell.length; i++) {
                        for (var j = 0; j < mapObjects.CorruptedMadBlick.length; j++) {
                            if (
                            //@ts-ignore
                            Math.hypot((mapObjects.shell[i].x + mapObjects.shell[i].startSize / 2) - mapObjects.CorruptedMadBlick[j].x, (mapObjects.shell[i].y + mapObjects.shell[i].startSize / 2) - mapObjects.CorruptedMadBlick[j].y) <= mapObjects.shell[i].startSize / 2 + mapObjects.CorruptedMadBlick[j].startSize / 2) {
                                mapObjects.CorruptedMadBlick[j].numberOfLives--;
                                if (mapObjects.CorruptedMadBlick[j].numberOfLives <= 0 && player.numberOfEnemiesKilled.CorruptedMadBlick === 0) {
                                    mapObjects.CorruptedMadBlick[j].numberOfLives = 0;
                                    for (var k = mapObjects.demon.length - 1; k >= 0; k--) {
                                        for (var g = 0; g < 20; g++) {
                                            mapObjects.particleDemon.push(new ParticleDemon(mapObjects.demon[k].x, mapObjects.demon[k].y, Math.random() * field.sizeCell * .1));
                                        }
                                        mapObjects.demon.splice(k, 1);
                                        player.numberOfEnemiesKilled.demon++;
                                    }
                                    player.numberOfEnemiesKilled.CorruptedMadBlick++;
                                }
                                for (var k = 0; k < 10; k++) {
                                    mapObjects.particlePlayer.push(new ParticlePlayer(mapObjects.shell[i].x, mapObjects.shell[i].y, Math.random() * field.sizeCell * .05));
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
            switch (secondObject) {
                case 'window':
                    for (var i = 0; i < mapObjects.shellBlick.length; i++) {
                        if ((mapObjects.shellBlick[i].x >= canvas.width ||
                            mapObjects.shellBlick[i].x + mapObjects.shellBlick[i].size <= 0 ||
                            mapObjects.shellBlick[i].y >= canvas.height ||
                            mapObjects.shellBlick[i].y + mapObjects.shellBlick[i].size <= 0) && mapObjects.shellBlick[i].lifeTime > 300) {
                            mapObjects.shellBlick.splice(i, 1);
                        }
                    }
                    break;
            }
            break;
        case 'people':
            switch (secondObject) {
                case 'wall':
                    mapObjects.people.forEach(function (people) {
                        mapObjects.wall.forEach(function (wall) {
                            if (people.x + people.height >= wall.x &&
                                people.x <= wall.x + wall.width &&
                                people.peopleY + people.height * .5 <= wall.y + wall.height &&
                                people.peopleY >= wall.y) {
                                people.draw();
                            }
                            if (people.x >= wall.x &&
                                people.x + people.height <= wall.x + wall.width &&
                                people.y + player.height >= wall.y &&
                                people.y + player.height <= wall.y + wall.height) {
                                wall.draw();
                            }
                        });
                    });
                    break;
            }
            break;
    }
}
function behindDetector(typeObjects) {
    switch (typeObjects) {
        case 'item':
            mapObjects.item.forEach(function (item) {
                if (player.x + player.width >= item.itemX &&
                    player.x <= item.itemX + item.size &&
                    player.y + player.height >= item.itemY &&
                    player.y + player.height <= item.itemY + item.size) {
                    item.draw();
                    mapObjects.wall.forEach(function (wall) {
                        if (item.itemX + item.size >= wall.x &&
                            item.itemX <= wall.x + wall.width &&
                            item.itemY + item.size >= wall.y &&
                            item.itemY <= wall.y + wall.height) {
                            wall.draw();
                        }
                    });
                }
            });
            break;
        case 'wall':
            for (var _i = 0, _a = mapObjects.wall; _i < _a.length; _i++) {
                var wall = _a[_i];
                if (player.x + player.width >= wall.x &&
                    player.x <= wall.x + wall.width &&
                    player.y + player.height <= wall.y + wall.height / 3 &&
                    player.y + player.height >= wall.y) {
                    // wall.draw();
                    mapObjects.wall.forEach(function (wall) { wall.draw(); });
                }
            }
            break;
        case 'cubicZirconia':
            for (var _b = 0, _c = mapObjects.cubicZirconia; _b < _c.length; _b++) {
                var cubicZirconia = _c[_b];
                if (player.x + player.width >= cubicZirconia.x &&
                    player.x <= cubicZirconia.x + cubicZirconia.width &&
                    player.y + player.height <= cubicZirconia.y + cubicZirconia.height / 2 &&
                    player.y + player.height >= cubicZirconia.y) {
                    // cubicZirconia.draw();
                    mapObjects.cubicZirconia.forEach(function (cubic) { cubic.draw(); });
                }
            }
            break;
        case 'tree':
            for (var _d = 0, _e = mapObjects.tree; _d < _e.length; _d++) {
                var tree = _e[_d];
                if (player.x + player.width >= tree.treeX - tree.width &&
                    player.x < tree.treeX + tree.width * 2 &&
                    player.y + player.height >= tree.treeY - tree.width &&
                    player.y + player.height <= tree.treeY + tree.height) {
                    mapObjects.tree.forEach(function (tree) { tree.changePositions(); });
                    break;
                }
            }
            break;
        case 'tablet':
            for (var _f = 0, _g = mapObjects.tablet; _f < _g.length; _f++) {
                var tablet = _g[_f];
                if (player.x + player.width >= tablet.tabletX &&
                    player.x <= tablet.tabletX + tablet.size &&
                    player.y + player.height >= tablet.tabletY &&
                    player.y + player.height <= tablet.tabletY + tablet.size) {
                    tablet.draw();
                }
            }
            break;
        case 'interlocutor':
            for (var _h = 0, _j = mapObjects.npc.interlocutor; _h < _j.length; _h++) {
                var npc = _j[_h];
                if (player.x + player.width >= npc.x &&
                    player.x < npc.x + npc.width &&
                    player.y + player.height >= npc.y &&
                    player.y + player.height <= npc.y + npc.height) {
                    mapObjects.npc.interlocutor.forEach(function (interlocutor) {
                        interlocutor.changePositions();
                    });
                    break;
                }
            }
            break;
        case 'wounded':
            for (var _k = 0, _l = mapObjects.npc.wounded; _k < _l.length; _k++) {
                var npc = _l[_k];
                if (player.x + player.width >= npc.x &&
                    player.x < npc.x + npc.width &&
                    player.y + player.height >= npc.y &&
                    player.y + player.height <= npc.y + npc.height) {
                    mapObjects.npc.wounded.forEach(function (wounded) {
                        wounded.changePositions();
                    });
                    break;
                }
            }
            break;
        case 'lera':
            for (var _m = 0, _o = mapObjects.npc.lera; _m < _o.length; _m++) {
                var npc = _o[_m];
                if (player.x + player.width >= npc.x &&
                    player.x < npc.x + npc.width &&
                    player.y + player.height >= npc.y &&
                    player.y + player.height <= npc.y + npc.height) {
                    mapObjects.npc.lera.forEach(function (lera) {
                        lera.changePositions();
                    });
                    break;
                }
            }
            break;
        case 'people':
            mapObjects.people.forEach(function (people) {
                if (player.x + player.width >= people.peopleX &&
                    player.x <= people.peopleX + people.width &&
                    player.y + player.height >= people.peopleY &&
                    player.y + player.height <= people.peopleY + people.height) {
                    people.changePositions();
                    mapObjects.wall.forEach(function (wall) {
                        if (people.x >= wall.x &&
                            people.x + people.height <= wall.x + wall.width &&
                            people.y + player.height >= wall.y &&
                            people.y + player.height <= wall.y + wall.height) {
                            wall.draw();
                        }
                    });
                }
            });
            break;
        case 'fence':
            for (var _p = 0, _q = mapObjects.fence; _p < _q.length; _p++) {
                var fence = _q[_p];
                if (player.x + player.width >= fence.fenceX + fence.width * .1 &&
                    player.x <= fence.fenceX + fence.width * .9 &&
                    player.y + player.height >= fence.fenceY &&
                    player.y + player.height <= fence.fenceY + fence.height) {
                    // fence.draw();
                    mapObjects.fence.forEach(function (fence) { fence.draw(); });
                }
            }
            break;
        case 'soul':
            for (var _r = 0, _s = mapObjects.soul; _r < _s.length; _r++) {
                var soul = _s[_r];
                if (player.x + player.width >= soul.x &&
                    player.x <= soul.x + soul.radius * 2 &&
                    player.y + player.height <= soul.y + soul.radius * 2 &&
                    player.y + player.height >= soul.y) {
                    soul.drawStationary();
                }
            }
            break;
    }
}
function interaction(typeObjects) {
    switch (typeObjects) {
        case 'tablet':
            for (var _i = 0, _a = mapObjects.tablet; _i < _a.length; _i++) {
                var tablet = _a[_i];
                if (player.x + player.width >= tablet.tabletX - tablet.size / 2 &&
                    player.x <= tablet.tabletX + tablet.size * 1.5 &&
                    player.y + player.height >= tablet.tabletY + tablet.size / 2 &&
                    player.y + player.height <= tablet.tabletY + tablet.size * 1.5) {
                    tablet.showText();
                    tablet.toggleHint();
                    tablet.showHint();
                    break;
                }
            }
            break;
        case 'item':
            mapObjects.item.forEach(function (item, index) {
                if (player.x + player.width >= item.itemX - item.size &&
                    player.x <= item.itemX + item.size * 2 &&
                    player.y + player.height >= item.itemY &&
                    player.y + player.height <= item.itemY + item.size * 2) {
                    item.showHint();
                    item.pickUp(index);
                }
            });
            break;
        case 'interlocutor':
            mapObjects.npc.interlocutor.forEach(function (npc) {
                if (player.x + player.width >= npc.x - npc.width &&
                    player.x <= npc.x + npc.width * 2 &&
                    player.y + player.height >= npc.y + npc.height - npc.width &&
                    player.y + player.height <= npc.y + npc.height + npc.width) {
                    npc.showHint();
                    npc.startDialog();
                }
            });
            break;
        case 'wounded':
            mapObjects.npc.wounded.forEach(function (npc) {
                if (player.x + player.width >= npc.x - npc.width &&
                    player.x <= npc.x + npc.width * 2 &&
                    player.y + player.height >= npc.y + npc.height - npc.width &&
                    player.y + player.height <= npc.y + npc.height + npc.width) {
                    npc.showHint();
                    npc.heals();
                    npc.startDialog();
                }
            });
            break;
        case 'lera':
            mapObjects.npc.lera.forEach(function (npc) {
                if (player.x + player.width >= npc.x - npc.width &&
                    player.x <= npc.x + npc.width * 2 &&
                    player.y + player.height >= npc.y + npc.height - npc.width &&
                    player.y + player.height <= npc.y + npc.height + npc.width) {
                    npc.showHint();
                    npc.startDialog();
                    npc.gettingHit();
                }
            });
            break;
        case 'soul':
            mapObjects.soul.forEach(function (soul) {
                if (player.x + player.width >= soul.x - soul.radius * 2 &&
                    player.x <= soul.x + soul.radius * 4 &&
                    player.y + player.height <= soul.y + soul.radius * 4 &&
                    player.y + player.height >= soul.y) {
                    soul.showHint();
                    soul.startDialog();
                }
            });
            break;
    }
}
function takingDamage(typeObjects) {
    switch (typeObjects) {
        case 'bullet':
            for (var i = 0; i < mapObjects.bullet.length; i++) {
                if (mapObjects.bullet[i].x + mapObjects.bullet[i].size >= player.x &&
                    mapObjects.bullet[i].x <= player.x + player.width &&
                    mapObjects.bullet[i].y + mapObjects.bullet[i].size >= player.y + mapObjects.bullet[i].size * 2 &&
                    mapObjects.bullet[i].y <= player.y + player.height - mapObjects.bullet[i].size * 2) {
                    player.numberOfLives -= 100;
                    break;
                }
            }
            break;
        case 'cubicZirconia':
            for (var i = 0; i < mapObjects.cubicZirconia.length; i++) {
                if (mapObjects.cubicZirconia[i].condition === 'aggressive' &&
                    player.x + player.width >= mapObjects.cubicZirconia[i].x - mapObjects.cubicZirconia[i].width * .2 &&
                    player.x <= mapObjects.cubicZirconia[i].x + mapObjects.cubicZirconia[i].width * 1.2 &&
                    player.y + player.width >= mapObjects.cubicZirconia[i].y + mapObjects.cubicZirconia[i].height / 3 - mapObjects.cubicZirconia[i].width * .2 &&
                    player.y + player.width / 2 <= mapObjects.cubicZirconia[i].y + mapObjects.cubicZirconia[i].height + mapObjects.cubicZirconia[i].width * .2 &&
                    !level.safeZone) {
                    player.numberOfLives -= .05;
                    if (player.numberOfLives < 0)
                        player.numberOfLives = 0;
                    player.takesDamage = true;
                    player.color = '#8932E0';
                    player.transparentColor = 'rgba(137,50,224,0)';
                    mapObjects.playerSimulator.forEach(function (playerSimulator) {
                        playerSimulator.color = '137, 50, 224';
                    });
                    break;
                }
                if (i === mapObjects.cubicZirconia.length - 1) {
                    player.color = '#e0329a';
                    player.transparentColor = 'rgba(224,50,154,0)';
                    mapObjects.playerSimulator.forEach(function (playerSimulator) {
                        playerSimulator.color = '224, 50, 154';
                    });
                }
            }
            break;
        case 'demon':
            for (var i = 0; i < mapObjects.demon.length; i++) {
                if (
                //@ts-ignore
                Math.hypot((player.x + player.width * .5) - mapObjects.demon[i].x, (player.y + player.width * .5) - mapObjects.demon[i].y) <= player.width * .5 + mapObjects.demon[i].startSize * .5 && !level.safeZone) {
                    player.numberOfLives -= .5;
                    if (player.numberOfLives < 0)
                        player.numberOfLives = 0;
                    player.takesDamage = true;
                    player.color = '#8932E0';
                    player.transparentColor = 'rgba(137,50,224,0)';
                    mapObjects.playerSimulator.forEach(function (playerSimulator) {
                        playerSimulator.color = '137, 50, 224';
                    });
                    break;
                }
                if (i === mapObjects.cubicZirconia.length - 1) {
                    player.color = '#e0329a';
                    player.transparentColor = 'rgba(224,50,154,0)';
                    mapObjects.playerSimulator.forEach(function (playerSimulator) {
                        playerSimulator.color = '224, 50, 154';
                    });
                }
            }
            break;
        case 'CorruptedMadBlick':
            for (var _i = 0, _a = mapObjects.CorruptedMadBlick; _i < _a.length; _i++) {
                var boss = _a[_i];
                if (
                //@ts-ignore
                Math.hypot((player.x + player.width * .5) - boss.x, (player.y + player.width * .5) - boss.y) <= player.width * .5 + boss.startSize * .5 && player.bossFightStage) {
                    player.numberOfLives -= 100;
                    if (player.numberOfLives < 0)
                        player.numberOfLives = 0;
                    player.color = '#6500C9';
                    player.transparentColor = 'rgba(101, 0, 201, 0)';
                    mapObjects.playerSimulator.forEach(function (playerSimulator) {
                        playerSimulator.color = '101, 0, 201';
                    });
                }
            }
            break;
        case 'shellBlick':
            for (var i = 0; i < mapObjects.shellBlick.length; i++) {
                if (
                //@ts-ignore
                Math.hypot((player.x + player.width * .5) - mapObjects.shellBlick[i].x + mapObjects.shellBlick[i].size / 2, (player.y + player.width * .5) - mapObjects.shellBlick[i].y + mapObjects.shellBlick[i].size / 2) <= player.width * .5 + mapObjects.shellBlick[i].size * .5) {
                    player.numberOfLives -= 20;
                    if (player.numberOfLives < 0)
                        player.numberOfLives = 0;
                    player.takesDamage = true;
                    for (var j = 0; j < 10; j++) {
                        mapObjects.particleBlick.push(new ParticleBlick(mapObjects.shellBlick[i].x, mapObjects.shellBlick[i].y, Math.random() * field.sizeCell * .05));
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
export { collisionWithPlayer, collisionOfGameObjects, behindDetector, interaction, takingDamage };
