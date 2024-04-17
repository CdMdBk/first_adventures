import { Player, player } from "../classes/player.js";
import { camera, canvas, ctx, field, halfCanvas, level, mapObjects, previousCanvas } from "../variables/variables.js";
import { maps } from "../variables/maps.js";
import { Tree, Water, Wall, CubicZirconia } from "../classes/obstacles.js";
import { Edge, EndLevel, ChangeStageOfLevel } from "../classes/control-points.js";
import { Decor, Floor } from "../classes/floor.js";
import { Tablet } from "../classes/tablets.js";
import { objHints } from "../variables/list-hints.js";
import { Item } from "../classes/items.js";
import { objAudio } from "../variables/list-audio.js";
import { resizeCanvas } from "./resize.js";
import { Fence } from "../classes/fence.js";
import { Interlocutor, Wounded, Lera } from "../classes/npc.js";
import { Target } from "../classes/bullets.js";
import { UniversityInFlesh } from "../classes/university-in-flesh.js";
import { People } from "../classes/people.js";
var itemIsNotSelected = true; //for rendering items
function levelGeneration(indexCellX, indexCellY) {
    //get all positions--------------------------------------------------
    initPositions(indexCellX, indexCellY);
    //generation game field--------------------------------------------------
    generationMap();
    //Add event resize for adapt game field--------------------------------------------------
    addEventListener('resize', adaptGameField);
}
function initPositions(indexCellX, indexCellY) {
    camera.currentPosition.x = indexCellX * field.sizeCell + field.sizeCell / 2;
    camera.currentPosition.y = indexCellY * field.sizeCell + field.sizeCell / 2;
    camera.currentPosition.startX = indexCellX * field.sizeCell + field.sizeCell / 2;
    camera.currentPosition.startY = indexCellY * field.sizeCell + field.sizeCell / 2;
    camera.beginningMap.x = 0 - (camera.currentPosition.startX - halfCanvas.w);
    camera.beginningMap.y = 0 - (camera.currentPosition.startY - halfCanvas.h);
    camera.beginningMap.startX = 0 - (camera.currentPosition.startX - halfCanvas.w);
    camera.beginningMap.startY = 0 - (camera.currentPosition.startY - halfCanvas.h);
    camera.edgeOfMap.x = maps[mapObjects.typeMap][0].length * field.sizeCell;
    camera.edgeOfMap.y = maps[mapObjects.typeMap].length * field.sizeCell;
    camera.edgeOfMap.startX = maps[mapObjects.typeMap][0].length * field.sizeCell;
    camera.edgeOfMap.startY = maps[mapObjects.typeMap].length * field.sizeCell;
}
function generationMap() {
    cleanMap();
    switch (mapObjects.typeMap) {
        case 'Tsaritsyno Park':
            player.x = canvas.width / 2 - field.sizeCell / 6;
            player.y = canvas.height / 2 - field.sizeCell / 4;
            player.width = field.sizeCell / 3;
            player.height = field.sizeCell / 2;
            player.image.stateOfRest.left.src = './images/player/state-of-rest-left.png';
            player.image.stateOfRest.right.src = './images/player/state-of-rest-right.png';
            player.image.movementStatus.left.src = './images/player/movement-status-left.png';
            player.image.movementStatus.right.src = './images/player/movement-status-right.png';
            player.image.heals.left.src = '';
            player.image.heals.right.src = '';
            player.image.beats.right.src = '';
            player.image.beats.left.src = '';
            maps[mapObjects.typeMap].forEach(function (row, indexRow) {
                row.forEach(function (cell, indexCell) {
                    if (cell.match(/\//)) {
                        mapObjects.edge.push(new Edge(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1));
                    }
                    if (cell.match(/end/)) {
                        mapObjects.endLevel = new EndLevel(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1);
                    }
                    if (cell.match(/\s/)) {
                        mapObjects.water.push(new Water(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/water/water-sprite.png'));
                    }
                    if (cell.match(/_\d+/)) {
                        mapObjects.floor.push(new Floor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/floor/lawn.png', cell.substr(cell.indexOf('_') + 1, 2)));
                    }
                    if (cell.match(/d\d+/)) {
                        mapObjects.decor.push(new Decor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/floor/decor.png', cell.substr(cell.indexOf('d') + 1, 2)));
                    }
                    if (cell.match(/t/)) {
                        mapObjects.tree.push(new Tree(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell / 3 + 1, field.sizeCell, './images/tree/tree-sprite.png'));
                    }
                    if (cell.match(/h\d+/)) {
                        mapObjects.tablet.push(new Tablet(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell * 3 / 4, objHints[parseInt(cell.substr(cell.indexOf('h') + 1, 2))], './images/tablet/tablet.png', './images/tablet/tablet-hint.png'));
                    }
                    if (cell.match(/i\d+/)) {
                        player.playerTasks.backpack.forEach(function (item) {
                            if (item === "i".concat(String(parseInt("".concat(cell[cell.indexOf('i') + 1]).concat(cell[cell.indexOf('i') + 2]))))) {
                                itemIsNotSelected = false;
                            }
                        });
                        if (itemIsNotSelected) {
                            mapObjects.item.push(new Item(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell / 4, cell.substr(cell.indexOf('i') + 1, 2)));
                        }
                        else
                            itemIsNotSelected = true;
                    }
                    if (cell.match(/n[A-Z]+/)) {
                        switch (cell[cell.indexOf('n') + 1]) {
                            case 'B':
                                mapObjects.npc.interlocutor.push(new Interlocutor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell * 2 / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) - field.sizeCell / 3, field.sizeCell / 3, field.sizeCell / 2 * 1.3, 'Borya', player.stageOfConversation.Borya, objAudio.NPC['Borya'], './images/characters/borya.png', 364));
                                break;
                            case 'D':
                                mapObjects.npc.interlocutor.push(new Interlocutor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) + field.sizeCell / 3, field.sizeCell / 3, field.sizeCell / 2 * 1.1, 'Danya', player.stageOfConversation.Danya, objAudio.NPC['Danya'], './images/characters/danya.png', 308));
                                break;
                            case 'M':
                                mapObjects.npc.interlocutor.push(new Interlocutor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) + field.sizeCell / 3, field.sizeCell / 3, field.sizeCell / 2 * 1.1, 'Mark', player.stageOfConversation.Mark, objAudio.NPC['Mark'], './images/characters/mark.png', 308));
                                break;
                            case 'A':
                                mapObjects.npc.interlocutor.push(new Interlocutor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell * 2 / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) + field.sizeCell / 3, field.sizeCell / 3, field.sizeCell / 2 * .9, 'Alina', player.stageOfConversation.Alina, objAudio.NPC['Alina'], './images/characters/alina.png', 252));
                                break;
                            case 'K':
                                mapObjects.npc.interlocutor.push(new Interlocutor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) + field.sizeCell / 3, field.sizeCell / 3, field.sizeCell / 2 * 1.1, 'Kolya', player.stageOfConversation.Kolya, objAudio.NPC['Kolya'], './images/characters/kolya.png', 308));
                                break;
                        }
                    }
                });
            });
            break;
        case 'Night Parish':
            player.x = field.sizeCell * 5 / 3;
            player.y = canvas.height / 2 - field.sizeCell / 4;
            player.width = field.sizeCell / 3;
            player.height = field.sizeCell / 2;
            player.currentDirection = 'right';
            player.image.stateOfRest.left.src = '';
            player.image.stateOfRest.right.src = './images/player/home-state-of-rest-right.png';
            player.image.movementStatus.left.src = '';
            player.image.movementStatus.right.src = '';
            player.image.heals.left.src = '';
            player.image.heals.right.src = '';
            player.image.beats.right.src = '';
            player.image.beats.left.src = '';
            if (mapObjects.UniversityInFlesh.length === 0) {
                mapObjects.UniversityInFlesh.push(new UniversityInFlesh(canvas.width - field.sizeCell * 3, field.sizeCell, field.sizeCell * 1.5, field.sizeCell * 2));
            }
            else {
                mapObjects.UniversityInFlesh[0].x = canvas.width - field.sizeCell * 3;
                mapObjects.UniversityInFlesh[0].y = field.sizeCell;
                mapObjects.UniversityInFlesh[0].currentPositionX = camera.currentPosition.x;
                mapObjects.UniversityInFlesh[0].currentPositionY = camera.currentPosition.y;
                mapObjects.UniversityInFlesh[0].width = field.sizeCell * 1.5;
                mapObjects.UniversityInFlesh[0].height = field.sizeCell * 2;
            }
            maps[mapObjects.typeMap].forEach(function (row, indexRow) {
                row.forEach(function (cell, indexCell) {
                    if (cell.match(/_\d+/)) {
                        mapObjects.floor.push(new Floor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell, './images/floor/wooden-floor.png', cell.substr(cell.indexOf('_') + 1, 2)));
                    }
                });
            });
            break;
        case 'Basements Of War':
            player.x = canvas.width / 2 - field.sizeCell / 6;
            player.y = canvas.height / 2 - field.sizeCell / 4;
            player.width = field.sizeCell / 3;
            player.height = field.sizeCell / 2;
            player.image.stateOfRest.left.src = './images/player/dungeon-state-of-rest-left.png';
            player.image.stateOfRest.right.src = './images/player/dungeon-state-of-rest-right.png';
            player.image.movementStatus.left.src = './images/player/dungeon-movement-status-left.png';
            player.image.movementStatus.right.src = './images/player/dungeon-movement-status-right.png';
            player.image.heals.left.src = './images/player/dungeon-heal-status-left.png';
            player.image.heals.right.src = './images/player/dungeon-heal-status-right.png';
            player.image.beats.right.src = '';
            player.image.beats.left.src = '';
            maps[mapObjects.typeMap].forEach(function (row, indexRow) {
                row.forEach(function (cell, indexCell) {
                    if (cell.match(/\//)) {
                        mapObjects.edge.push(new Edge(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1));
                    }
                    if (cell.match(/end/)) {
                        mapObjects.endLevel = new EndLevel(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1);
                    }
                    if (cell.match(/_\d+/)) {
                        mapObjects.floor.push(new Floor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell, './images/floor/stone-floor.png', cell.substr(cell.indexOf('_') + 1, 2)));
                    }
                    if (cell.match(/d\d+/)) {
                        mapObjects.decor.push(new Decor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/floor/dungeon-decor.png', cell.substr(cell.indexOf('d') + 1, 2)));
                    }
                    if (cell.match(/\|\d+/)) {
                        mapObjects.wall.push(new Wall(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - field.sizeCell / 2 - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell, cell.substr(cell.indexOf('|') + 1, 2)));
                    }
                    if (cell.match(/h\d+/)) {
                        mapObjects.tablet.push(new Tablet(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell * 3 / 4, objHints[parseInt(cell.substr(cell.indexOf('h') + 1, 2))], './images/tablet/dungeon-tablet.png', './images/tablet/dungeon-tablet-hint.png'));
                    }
                    if (cell.match(/i\d+/)) {
                        player.playerTasks.backpack.forEach(function (item) {
                            if (item === "i".concat(String(parseInt("".concat(cell[cell.indexOf('i') + 1]).concat(cell[cell.indexOf('i') + 2]))))) {
                                itemIsNotSelected = false;
                            }
                        });
                        if (itemIsNotSelected) {
                            mapObjects.item.push(new Item(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell / 4, cell.substr(cell.indexOf('i') + 1, 2)));
                        }
                        else
                            itemIsNotSelected = true;
                    }
                    if (cell.match(/n[A-Z]+/)) {
                        switch (cell[cell.indexOf('n') + 1]) {
                            case 'V':
                                mapObjects.npc.interlocutor.push(new Interlocutor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell * 2 / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) - field.sizeCell / 3, field.sizeCell / 3, field.sizeCell / 2 * 1.2, 'Vlad', player.stageOfConversation.Vlad, objAudio.NPC['Vlad'], './images/characters/vlad.png', 336));
                                break;
                            case 'D':
                                mapObjects.npc.interlocutor.push(new Interlocutor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) + field.sizeCell / 3, field.sizeCell / 3, field.sizeCell / 2, 'Drunk', player.stageOfConversation.Drunk, objAudio.NPC['Drunk'], './images/characters/drunk.png', 280));
                                break;
                            case 'W':
                                mapObjects.npc.wounded.push(new Wounded(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) + field.sizeCell / 3, field.sizeCell / 3, field.sizeCell / 2 * .8, 'Wounded', objAudio.NPC['Wounded'], 196, 224, player.playerTasks.completedDialogues.Wounded, player.stageOfConversation.Wounded));
                                break;
                        }
                    }
                    if (cell.match(/p\d+/)) {
                        mapObjects.people.push(new People(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell, cell.substr(cell.indexOf('p') + 1, 2)));
                    }
                });
            });
            break;
        case 'Battlefield':
            player.x = canvas.width / 2 - field.sizeCell / 6;
            player.y = canvas.height / 2 - field.sizeCell / 4;
            player.width = field.sizeCell / 3;
            player.height = field.sizeCell / 2;
            player.image.stateOfRest.left.src = './images/player/battlefield-state-of-rest-left.png';
            player.image.stateOfRest.right.src = './images/player/battlefield-state-of-rest-right.png';
            player.image.movementStatus.left.src = './images/player/battlefield-movement-status-left.png';
            player.image.movementStatus.right.src = './images/player/battlefield-movement-status-right.png';
            player.image.heals.left.src = '';
            player.image.heals.right.src = '';
            player.image.beats.right.src = '';
            player.image.beats.left.src = '';
            maps[mapObjects.typeMap].forEach(function (row, indexRow) {
                row.forEach(function (cell, indexCell) {
                    if (cell.match(/\//)) {
                        mapObjects.edge.push(new Edge(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1));
                    }
                    if (cell.match(/end/)) {
                        mapObjects.endLevel = new EndLevel(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1);
                    }
                    if (cell.match(/\s/)) {
                        mapObjects.water.push(new Water(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/water/dead-water-sprite.png'));
                    }
                    if (cell.match(/_\d+/)) {
                        mapObjects.floor.push(new Floor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/floor/dead-lawn.png', cell.substr(cell.indexOf('_') + 1, 2)));
                    }
                    if (cell.match(/d\d+/)) {
                        mapObjects.decor.push(new Decor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/floor/dead-decor.png', cell.substr(cell.indexOf('d') + 1, 2)));
                    }
                    if (cell.match(/[^et]t([^a]|$)/)) {
                        mapObjects.tree.push(new Tree(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell / 3 + 1, field.sizeCell, './images/tree/dead-tree-sprite.png'));
                    }
                    if (cell.match(/h\d+/)) {
                        mapObjects.tablet.push(new Tablet(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell * 3 / 4, objHints[parseInt(cell.substr(cell.indexOf('h') + 1, 2))], './images/tablet/dead-tablet.png', './images/tablet/dead-tablet-hint.png'));
                    }
                    if (cell.match(/i\d+/)) {
                        player.playerTasks.backpack.forEach(function (item) {
                            if (item === "i".concat(String(parseInt("".concat(cell[cell.indexOf('i') + 1]).concat(cell[cell.indexOf('i') + 2]))))) {
                                itemIsNotSelected = false;
                            }
                        });
                        if (itemIsNotSelected) {
                            mapObjects.item.push(new Item(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell / 4, cell.substr(cell.indexOf('i') + 1, 2)));
                        }
                        else
                            itemIsNotSelected = true;
                    }
                    if (cell.match(/\|\d+/)) {
                        mapObjects.wall.push(new Wall(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - field.sizeCell / 2 - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell, cell.substr(cell.indexOf('|') + 1, 2)));
                    }
                    if (cell.match(/target/)) {
                        mapObjects.target.push(new Target(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1));
                    }
                });
            });
            break;
        case 'Lawn Of Lera':
            player.x = canvas.width / 2 - field.sizeCell / 6;
            player.y = canvas.height / 2 - field.sizeCell / 4;
            player.width = field.sizeCell / 3;
            player.height = field.sizeCell / 2;
            player.image.stateOfRest.left.src = './images/player/state-of-rest-left.png';
            player.image.stateOfRest.right.src = './images/player/state-of-rest-right.png';
            player.image.movementStatus.left.src = './images/player/movement-status-left.png';
            player.image.movementStatus.right.src = './images/player/movement-status-right.png';
            player.image.heals.left.src = '';
            player.image.heals.right.src = '';
            player.image.beats.right.src = './images/player/beat-status-right.png';
            player.image.beats.left.src = './images/player/beat-status-left.png';
            maps[mapObjects.typeMap].forEach(function (row, indexRow) {
                row.forEach(function (cell, indexCell) {
                    if (cell.match(/\//)) {
                        mapObjects.edge.push(new Edge(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1));
                    }
                    if (cell.match(/end/)) {
                        mapObjects.endLevel = new EndLevel(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1);
                    }
                    if (cell.match(/\s/)) {
                        mapObjects.water.push(new Water(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/water/water-sprite.png'));
                    }
                    if (cell.match(/_\d+/)) {
                        mapObjects.floor.push(new Floor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/floor/lawn.png', cell.substr(cell.indexOf('_') + 1, 2)));
                    }
                    if (cell.match(/d\d+/)) {
                        mapObjects.decor.push(new Decor(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, './images/floor/decor.png', cell.substr(cell.indexOf('d') + 1, 2)));
                    }
                    if (cell.match(/t/)) {
                        mapObjects.tree.push(new Tree(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell / 3 + 1, field.sizeCell, './images/tree/tree-sprite.png'));
                    }
                    if (cell.match(/f\d+/g)) {
                        cell.match(/f\d+/g).forEach(function (fence) {
                            mapObjects.fence.push(new Fence(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell, './images/fence/fence.png', { x: +fence[fence.indexOf('f') + 1], y: +fence[fence.indexOf('f') + 2] }));
                        });
                    }
                    if (cell.match(/h\d+/)) {
                        mapObjects.tablet.push(new Tablet(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell * 3 / 4, objHints[parseInt(cell.substr(cell.indexOf('h') + 1, 2))], './images/tablet/tablet.png', './images/tablet/tablet-hint.png'));
                    }
                    if (cell.match(/i\d+/)) {
                        player.playerTasks.backpack.forEach(function (item) {
                            if (item === "i".concat(String(parseInt("".concat(cell[cell.indexOf('i') + 1]).concat(cell[cell.indexOf('i') + 2]))))) {
                                itemIsNotSelected = false;
                            }
                        });
                        if (itemIsNotSelected) {
                            mapObjects.item.push(new Item(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell / 4, cell.substr(cell.indexOf('i') + 1, 2)));
                        }
                        else
                            itemIsNotSelected = true;
                    }
                    if (cell.match(/n[A-Z]+/)) {
                        switch (cell[cell.indexOf('n') + 1]) {
                            case 'L':
                                mapObjects.npc.lera.push(new Lera(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w) + field.sizeCell * 2 / 3, indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h) - field.sizeCell / 3, field.sizeCell / 3 * .9, field.sizeCell / 2, 'Lera', player.stageOfConversation.Lera, objAudio.NPC['Lera'], 176, 280));
                        }
                    }
                });
            });
            break;
        case 'Inner World':
            player.x = canvas.width / 2 - field.sizeCell / 4;
            player.y = canvas.height / 2 - field.sizeCell / 4;
            player.width = field.sizeCell / 3;
            player.height = field.sizeCell / 3;
            player.image.stateOfRest.left.src = '';
            player.image.stateOfRest.right.src = '';
            player.image.movementStatus.left.src = '';
            player.image.movementStatus.right.src = '';
            player.image.heals.left.src = '';
            player.image.heals.right.src = '';
            player.image.beats.right.src = '';
            player.image.beats.left.src = '';
            maps[mapObjects.typeMap].forEach(function (row, indexRow) {
                row.forEach(function (cell, indexCell) {
                    if (cell.match(/\//)) {
                        mapObjects.edge.push(new Edge(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1));
                    }
                    if (cell.match(/stage\d/) && level.levelStage !== +cell[cell.indexOf('stage') + 5]) {
                        mapObjects.stage.push(new ChangeStageOfLevel(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell + 1, +cell[cell.indexOf('stage') + 5]));
                    }
                    if (cell.match(/\|\d?/)) {
                        if (level.levelStage === 3) {
                            mapObjects.cubicZirconia.push(new CubicZirconia(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - field.sizeCell / 2 - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell, 'neutral'));
                        }
                        else {
                            if (cell[cell.indexOf('|') + 1] === '0') {
                                mapObjects.cubicZirconia.push(new CubicZirconia(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - field.sizeCell / 2 - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell, 'absent'));
                            }
                            else {
                                mapObjects.cubicZirconia.push(new CubicZirconia(indexCell * field.sizeCell - (camera.currentPosition.startX - halfCanvas.w), indexRow * field.sizeCell - field.sizeCell / 2 - (camera.currentPosition.startY - halfCanvas.h), field.sizeCell));
                            }
                        }
                    }
                });
            });
            break;
    }
}
function cleanMap() {
    mapObjects.edge = [];
    mapObjects.target = [];
    mapObjects.stage = [];
    mapObjects.water = [];
    mapObjects.tree = [];
    mapObjects.wall = [];
    mapObjects.fence = [];
    mapObjects.cubicZirconia = [];
    mapObjects.floor = [];
    mapObjects.decor = [];
    mapObjects.tablet = [];
    mapObjects.item = [];
    mapObjects.npc.interlocutor = [];
    mapObjects.npc.wounded = [];
    mapObjects.npc.lera = [];
    mapObjects.people = [];
    mapObjects.playerSimulator = [];
    mapObjects.bullet = [];
    mapObjects.shell = [];
    mapObjects.demon = [];
    mapObjects.particlePlayer = [];
    mapObjects.particleDemon = [];
    mapObjects.particleBlick = [];
    mapObjects.particleDeadBlick = [];
    mapObjects.shellBlick = [];
}
function adaptGameField() {
    resizeCanvas();
    if (mapObjects.typeMap !== 'Introduction') {
        if (canvas.height === previousCanvas.h &&
            canvas.width !== previousCanvas.w) {
            player.x += (canvas.width - previousCanvas.w) / 2;
            if (player.x <= 1)
                player.x = 1;
            if (player.x + player.width >= canvas.width)
                player.x = canvas.width - player.width;
        }
        else {
            player.x += (canvas.width - previousCanvas.w) / 2;
            if (player.x <= 1)
                player.x = 1;
            if (player.x + player.width >= canvas.width)
                player.x = canvas.width - player.width;
            if (mapObjects.typeMap !== 'Night Parish') {
                if (player.x <= mapObjects.edge[0].x)
                    player.x = mapObjects.edge[0].x;
                if (player.x + player.width >= mapObjects.edge[1].x + mapObjects.edge[1].size)
                    player.x = mapObjects.edge[1].x + mapObjects.edge[1].size - player.width;
            }
            player.y = canvas.height / (previousCanvas.h / (player.y + player.height / 2)) - player.height / 2;
            player.width = field.sizeCell / 3;
            player.height = field.sizeCell / 2;
            Player.speed = field.speed * player.debuffSpeed;
            adaptingPositions(canvas.height / previousCanvas.h);
        }
    }
    generationMap();
    previousCanvas.w = canvas.width;
    previousCanvas.h = canvas.height;
}
function adaptingPositions(ratio) {
    camera.currentPosition.x *= ratio;
    camera.currentPosition.y *= ratio;
    camera.currentPosition.startX *= ratio;
    camera.currentPosition.startY *= ratio;
    camera.beginningMap.x *= ratio;
    camera.beginningMap.y *= ratio;
    camera.beginningMap.startX *= ratio;
    camera.beginningMap.startY *= ratio;
    camera.edgeOfMap.x *= ratio;
    camera.edgeOfMap.y *= ratio;
    camera.edgeOfMap.startX *= ratio;
    camera.edgeOfMap.startY *= ratio;
}
function changePositions() {
    camera.beginningMap.x = camera.beginningMap.startX - (camera.currentPosition.x - camera.currentPosition.startX);
    camera.beginningMap.y = camera.beginningMap.startY - (camera.currentPosition.y - camera.currentPosition.startY);
    camera.edgeOfMap.x = camera.edgeOfMap.startX - (camera.currentPosition.x - camera.currentPosition.startX);
    camera.edgeOfMap.y = camera.edgeOfMap.startY - (camera.currentPosition.y - camera.currentPosition.startY);
}
function renderingCountItems() {
    ctx.fillStyle = '#A32653';
    ctx.font = "900 ".concat(field.sizeCell / 10, "px Pixel Art");
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'start';
    ctx.fillText("\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u043D\u0430 \u043B\u043E\u043A\u0430\u0446\u0438\u0438: ".concat(mapObjects.item.length), field.sizeCell * .75, field.sizeCell / 3);
}
function renderingNumberOfLives() {
    ctx.fillStyle = '#57143c';
    ctx.fillRect(field.sizeCell / 8, field.sizeCell / 8, field.sizeCell, field.sizeCell / 8);
    ctx.fillStyle = '#E0329A';
    ctx.fillRect(field.sizeCell / 8, field.sizeCell / 8, field.sizeCell * (player.numberOfLives / 100), field.sizeCell / 8);
}
function renderingNumberOfLivesBoss(typeBoss) {
    switch (typeBoss) {
        case 'University':
            ctx.fillStyle = 'white';
            ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText('Универ Во Плоти', canvas.width / 2, field.sizeCell / 8);
            ctx.fillStyle = '#450015';
            ctx.fillRect(canvas.width / 2 - field.sizeCell, field.sizeCell / 4, field.sizeCell * 2, field.sizeCell / 8);
            ctx.fillStyle = '#A38787';
            ctx.fillRect(canvas.width / 2 - field.sizeCell, field.sizeCell / 4, field.sizeCell * 2 * mapObjects.UniversityInFlesh[0].numberOfLives / mapObjects.UniversityInFlesh[0].maxLives, field.sizeCell / 8);
            break;
        case 'Blick':
            ctx.fillStyle = 'white';
            ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText('Верховный демон', canvas.width / 2, field.sizeCell / 8);
            ctx.fillStyle = '#25004f';
            ctx.fillRect(canvas.width / 2 - field.sizeCell, field.sizeCell / 4, field.sizeCell * 2, field.sizeCell / 8);
            ctx.fillStyle = '#6500C9';
            ctx.fillRect(canvas.width / 2 - field.sizeCell, field.sizeCell / 4, field.sizeCell * 2 * mapObjects.CorruptedMadBlick[0].numberOfLives / mapObjects.CorruptedMadBlick[0].maxLives, field.sizeCell / 8);
            break;
    }
}
export { levelGeneration, initPositions, generationMap, cleanMap, adaptGameField, adaptingPositions, changePositions, renderingCountItems, renderingNumberOfLives, renderingNumberOfLivesBoss };
