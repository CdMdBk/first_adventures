import { Player, player } from "../classes/player.js";
import { camera, canvas, ctx, halfCanvas, keys, level, mapObjects } from "../variables/variables.js";
import { objAudio } from "../variables/list-audio.js";
import { behindDetector, collisionOfGameObjects, collisionWithPlayer, interaction } from "../common/interaction-with-environment.js";
import { changePositions, renderingCountItems } from "../common/level-generation.js";
import { renderingBlackout } from "../common/blackout.js";
import { movingToNextLevel } from "../common/next-level.js";
import { renderingFourthLevel } from "./fourth-level.js";
export function renderingThirdLevel() {
    player.animationId = requestAnimationFrame(renderingThirdLevel);
    if (canvas.width > 4000) {
        ctx.clearRect(camera.beginningMap.x - 2000, camera.beginningMap.y - 2000, Math.abs(camera.beginningMap.x) + Math.abs(camera.edgeOfMap.x) + 4000, Math.abs(camera.beginningMap.y) + Math.abs(camera.edgeOfMap.y) + 4000);
    }
    else {
        ctx.clearRect(camera.beginningMap.x - 1000, camera.beginningMap.y - 1000, Math.abs(camera.beginningMap.x) + Math.abs(camera.edgeOfMap.x) + 2000, Math.abs(camera.beginningMap.y) + Math.abs(camera.edgeOfMap.y) + 2000);
    }
    //audio--------------------------------------------------
    if (player.numberOfCompletedFrames === 0 || player.numberOfCompletedFrames % 3600 === 0) {
        objAudio.soundsOfLocations[2].currentTime = 0;
        objAudio.soundsOfLocations[2].play();
    }
    if (Math.random() * 10000 <= 1)
        objAudio.effects[0].play();
    //player movement and collision detection--------------------------------------------------
    if (keys.a.pressed && player.x > mapObjects.edge[0].x && !player.thinks) {
        collisionWithPlayer('tablet', { x: -Player.speed, y: 0 });
        if (player.permissionMovement)
            collisionWithPlayer('wall', { x: -Player.speed, y: 0 });
        if (player.x + player.width / 2 > halfCanvas.w + Player.speed || camera.currentPosition.x <= halfCanvas.w - Player.speed) {
            player.permissionMovement ? player.speedX = -Player.speed : player.speedX = 0;
        }
        else {
            if (player.permissionMovement)
                camera.currentPosition.x -= Player.speed;
        }
        (player.permissionMovement) ? player.audio.walkingStone.play() : player.permissionMovement = true;
    }
    if (keys.d.pressed && player.x + player.width < mapObjects.edge[1].x + mapObjects.edge[1].size && !player.thinks) {
        collisionWithPlayer('tablet', { x: Player.speed, y: 0 });
        if (player.permissionMovement)
            collisionWithPlayer('wall', { x: Player.speed, y: 0 });
        if (player.x + player.width / 2 < halfCanvas.w + Player.speed || camera.currentPosition.x >= camera.edgeOfMap.startX - halfCanvas.w - Player.speed) {
            player.permissionMovement ? player.speedX = Player.speed : player.speedX = 0;
        }
        else {
            if (player.permissionMovement)
                camera.currentPosition.x += Player.speed;
        }
        (player.permissionMovement) ? player.audio.walkingStone.play() : player.permissionMovement = true;
    }
    if (keys.w.pressed && player.y > Player.speed && !player.thinks) {
        collisionWithPlayer('tablet', { x: 0, y: -Player.speed });
        if (player.permissionMovement)
            collisionWithPlayer('wall', { x: 0, y: -Player.speed });
        if (player.y + player.height / 2 > halfCanvas.h || camera.currentPosition.y <= halfCanvas.h) {
            (player.permissionMovement) ? player.speedY = -Player.speed : player.speedY = 0;
        }
        else {
            if (player.permissionMovement)
                camera.currentPosition.y -= Player.speed;
        }
        (player.permissionMovement) ? player.audio.walkingStone.play() : player.permissionMovement = true;
    }
    if (keys.s.pressed && player.y + player.height < canvas.height - Player.speed && !player.thinks) {
        collisionWithPlayer('tablet', { x: 0, y: Player.speed });
        if (player.permissionMovement)
            collisionWithPlayer('wall', { x: 0, y: Player.speed });
        if (player.y + player.height / 2 < halfCanvas.h || camera.currentPosition.y >= camera.edgeOfMap.startY - halfCanvas.h) {
            (player.permissionMovement) ? player.speedY = Player.speed : player.speedY = 0;
        }
        else {
            if (player.permissionMovement)
                camera.currentPosition.y += Player.speed;
        }
        (player.permissionMovement) ? player.audio.walkingStone.play() : player.permissionMovement = true;
    }
    changePositions();
    //final rendering of frame--------------------------------------------------
    mapObjects.edge.forEach(function (edge) {
        edge.changePositions();
    });
    mapObjects.endLevel.changePositions();
    mapObjects.floor.forEach(function (lawn) {
        lawn.changePositions();
    });
    mapObjects.decor.forEach(function (decor) {
        decor.changePositions();
    });
    mapObjects.item.forEach(function (item) {
        item.changePositions();
    });
    mapObjects.people.forEach(function (people) {
        people.changePositions();
    });
    mapObjects.wall.forEach(function (wall) {
        wall.changePositions();
    });
    collisionOfGameObjects('people', 'wall');
    mapObjects.npc.interlocutor.forEach(function (npc) {
        npc.changePositions();
    });
    mapObjects.npc.wounded.forEach(function (npc) {
        npc.changePositions();
    });
    mapObjects.tablet.forEach(function (tablet) {
        tablet.changePositions();
    });
    player.movementPlayer();
    player.numberOfCompletedFrames++;
    behindDetector('item');
    behindDetector('interlocutor');
    behindDetector('wounded');
    behindDetector('tablet');
    behindDetector('people');
    behindDetector('wall');
    //rendering rest--------------------------------------------------
    interaction('interlocutor');
    interaction('wounded');
    interaction('item');
    renderingBlackout("center");
    interaction('tablet');
    renderingCountItems();
    //end level--------------------------------------------------
    if (player.x + player.width >= mapObjects.endLevel.x &&
        player.x <= mapObjects.endLevel.x + mapObjects.endLevel.size &&
        player.y + player.height >= mapObjects.endLevel.y &&
        player.y + player.height <= mapObjects.endLevel.y + mapObjects.endLevel.size) {
        objAudio.soundsOfLocations[2].currentTime = 0;
        objAudio.soundsOfLocations[2].pause();
        objAudio.effects[0].currentTime = 0;
        objAudio.effects[0].pause();
        level.currentLevel = 4;
        movingToNextLevel(renderingFourthLevel, 'long', 'Battlefield', 17, 29);
    }
}
