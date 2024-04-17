import { keys, mapObjects } from "../variables/variables.js";
import { player } from "../classes/player.js";
//pressing keys--------------------------------------------------
addEventListener('keydown', function (event) {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
        keys.a.pressed = true;
        keys.d.pressed = false;
        if (player.action !== 'moving' &&
            player.action !== 'beats' &&
            player.action !== 'heals' &&
            mapObjects.typeMap !== 'Night Parish')
            player.frame = 0;
        if (mapObjects.typeMap !== 'Night Parish' && player.action !== 'beats' && player.action !== 'heals')
            player.currentDirection = 'left';
    }
    else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
        keys.d.pressed = true;
        keys.a.pressed = false;
        if (player.action !== 'moving' &&
            player.action !== 'beats' &&
            player.action !== 'heals' &&
            mapObjects.typeMap !== 'Night Parish')
            player.frame = 0;
        if (mapObjects.typeMap !== 'Night Parish' && player.action !== 'beats' && player.action !== 'heals')
            player.currentDirection = 'right';
    }
    else if (event.code === 'ArrowUp' || event.code === 'KeyW') {
        keys.w.pressed = true;
        keys.s.pressed = false;
        if (player.action !== 'moving' &&
            player.action !== 'beats' &&
            player.action !== 'heals' &&
            mapObjects.typeMap !== 'Night Parish')
            player.frame = 0;
    }
    else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
        keys.s.pressed = true;
        keys.w.pressed = false;
        if (player.action !== 'moving' &&
            player.action !== 'beats' &&
            player.action !== 'heals' &&
            mapObjects.typeMap !== 'Night Parish')
            player.frame = 0;
    }
    else if (event.code === 'KeyF')
        keys.f.pressed = true;
});
//releasing keys--------------------------------------------------
addEventListener('keyup', function (event) {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
        keys.a.pressed = false;
    }
    else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
        keys.d.pressed = false;
    }
    else if (event.code === 'ArrowUp' || event.code === 'KeyW') {
        keys.w.pressed = false;
    }
    else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
        keys.s.pressed = false;
    }
    else if (event.code === 'KeyF')
        keys.f.pressed = false;
});
