import { Player, player } from "../classes/player.js";
import { camera, canvas, ctx, halfCanvas, keys, level, mapObjects } from "../variables/variables.js";
import { objAudio } from "../variables/list-audio.js";
import { behindDetector, collisionWithPlayer, interaction } from "../common/interaction-with-environment.js";
import { changePositions, renderingCountItems } from "../common/level-generation.js";
import { movingToNextLevel } from "../common/next-level.js";
import { renderingSecondLevel } from "./second-level.js";
export function renderingFirstLevel() {
    player.animationId = requestAnimationFrame(renderingFirstLevel);
    if (canvas.width > 4000) {
        ctx.clearRect(camera.beginningMap.x - 2000, camera.beginningMap.y - 2000, Math.abs(camera.beginningMap.x) + Math.abs(camera.edgeOfMap.x) + 4000, Math.abs(camera.beginningMap.y) + Math.abs(camera.edgeOfMap.y) + 4000);
    }
    else {
        ctx.clearRect(camera.beginningMap.x - 1000, camera.beginningMap.y - 1000, Math.abs(camera.beginningMap.x) + Math.abs(camera.edgeOfMap.x) + 2000, Math.abs(camera.beginningMap.y) + Math.abs(camera.edgeOfMap.y) + 2000);
    }
    //audio--------------------------------------------------
    if (player.numberOfCompletedFrames === 0 || player.numberOfCompletedFrames % 7200 === 0) {
        objAudio.soundsOfLocations[0].volume = .2;
        objAudio.soundsOfLocations[0].currentTime = 0;
        objAudio.soundsOfLocations[0].play();
    }
    if (Math.random() * 10000 <= 2 && !player.thinks)
        player.audio.laLaLa.play();
    //player movement and collision detection--------------------------------------------------
    if (keys.a.pressed && player.x > mapObjects.edge[0].x && !player.thinks) {
        collisionWithPlayer('tablet', { x: -Player.speed, y: 0 });
        if (player.permissionMovement)
            collisionWithPlayer('tree', { x: -Player.speed, y: 0 });
        if (player.permissionMovement)
            collisionWithPlayer('water', { x: -Player.speed, y: 0 });
        if (player.x + player.width / 2 > halfCanvas.w + Player.speed || camera.currentPosition.x <= halfCanvas.w - Player.speed) {
            player.permissionMovement ? player.speedX = -Player.speed : player.speedX = 0;
        }
        else {
            if (player.permissionMovement)
                camera.currentPosition.x -= Player.speed;
        }
        (player.permissionMovement) ? player.audio.walkingLawn.play() : player.permissionMovement = true;
    }
    if (keys.d.pressed && player.x + player.width < mapObjects.edge[1].x + mapObjects.edge[1].size && !player.thinks) {
        collisionWithPlayer('tablet', { x: Player.speed, y: 0 });
        if (player.permissionMovement)
            collisionWithPlayer('tree', { x: Player.speed, y: 0 });
        if (player.permissionMovement)
            collisionWithPlayer('water', { x: Player.speed, y: 0 });
        if (player.x + player.width / 2 < halfCanvas.w + Player.speed || camera.currentPosition.x >= camera.edgeOfMap.startX - halfCanvas.w - Player.speed) {
            player.permissionMovement ? player.speedX = Player.speed : player.speedX = 0;
        }
        else {
            if (player.permissionMovement)
                camera.currentPosition.x += Player.speed;
        }
        (player.permissionMovement) ? player.audio.walkingLawn.play() : player.permissionMovement = true;
    }
    if (keys.w.pressed && player.y > Player.speed && !player.thinks) {
        collisionWithPlayer('tablet', { x: 0, y: -Player.speed });
        if (player.permissionMovement)
            collisionWithPlayer('tree', { x: 0, y: -Player.speed });
        if (player.permissionMovement)
            collisionWithPlayer('water', { x: 0, y: -Player.speed });
        if (player.y + player.height / 2 > halfCanvas.h || camera.currentPosition.y <= halfCanvas.h) {
            (player.permissionMovement) ? player.speedY = -Player.speed : player.speedY = 0;
        }
        else {
            if (player.permissionMovement)
                camera.currentPosition.y -= Player.speed;
        }
        (player.permissionMovement) ? player.audio.walkingLawn.play() : player.permissionMovement = true;
    }
    if (keys.s.pressed && player.y + player.height < canvas.height - Player.speed && !player.thinks) {
        collisionWithPlayer('tablet', { x: 0, y: Player.speed });
        if (player.permissionMovement)
            collisionWithPlayer('tree', { x: 0, y: Player.speed });
        if (player.permissionMovement)
            collisionWithPlayer('water', { x: 0, y: Player.speed });
        if (player.y + player.height / 2 < halfCanvas.h || camera.currentPosition.y >= camera.edgeOfMap.startY - halfCanvas.h) {
            (player.permissionMovement) ? player.speedY = Player.speed : player.speedY = 0;
        }
        else {
            if (player.permissionMovement)
                camera.currentPosition.y += Player.speed;
        }
        (player.permissionMovement) ? player.audio.walkingLawn.play() : player.permissionMovement = true;
    }
    changePositions();
    //final rendering of frame--------------------------------------------------
    mapObjects.edge.forEach(function (edge) {
        edge.changePositions();
    });
    mapObjects.endLevel.changePositions();
    mapObjects.water.forEach(function (water) {
        water.changePositions();
    });
    mapObjects.floor.forEach(function (lawn) {
        lawn.changePositions();
    });
    mapObjects.decor.forEach(function (decor) {
        decor.changePositions();
    });
    mapObjects.item.forEach(function (item) {
        item.changePositions();
    });
    mapObjects.npc.interlocutor.forEach(function (npc) {
        npc.changePositions();
    });
    mapObjects.tablet.forEach(function (tablet) {
        tablet.changePositions();
    });
    mapObjects.tree.forEach(function (tree) {
        tree.changePositions();
    });
    player.movementPlayer();
    player.numberOfCompletedFrames++;
    behindDetector('item');
    behindDetector('interlocutor');
    behindDetector('tablet');
    behindDetector('tree');
    //rendering rest
    interaction('interlocutor');
    interaction('item');
    interaction('tablet');
    renderingCountItems();
    //end level--------------------------------------------------
    if (player.x >= mapObjects.endLevel.x && player.y >= mapObjects.endLevel.y) {
        objAudio.soundsOfLocations[0].currentTime = 0;
        objAudio.soundsOfLocations[0].pause();
        player.audio.laLaLa.currentTime = 0;
        player.audio.laLaLa.pause();
        level.currentLevel = 2;
        movingToNextLevel(renderingSecondLevel, 'long', 'Night Parish', 8, 2.5);
    }
}
