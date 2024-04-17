import { player } from "../classes/player.js";
import { camera, canvas, ctx, level, mapObjects } from "../variables/variables.js";
import { objAudio } from "../variables/list-audio.js";
import { renderingBlackout } from "../common/blackout.js";
import { movingToNextLevel } from "../common/next-level.js";
import { renderingNumberOfLivesBoss } from "../common/level-generation.js";
import { renderingThirdLevel } from "./third-level.js";
export function renderingSecondLevel() {
    player.animationId = requestAnimationFrame(renderingSecondLevel);
    if (canvas.width > 4000) {
        ctx.clearRect(camera.beginningMap.x - 2000, camera.beginningMap.y - 2000, Math.abs(camera.beginningMap.x) + Math.abs(camera.edgeOfMap.x) + 4000, Math.abs(camera.beginningMap.y) + Math.abs(camera.edgeOfMap.y) + 4000);
    }
    else {
        ctx.clearRect(camera.beginningMap.x - 1000, camera.beginningMap.y - 1000, Math.abs(camera.beginningMap.x) + Math.abs(camera.edgeOfMap.x) + 2000, Math.abs(camera.beginningMap.y) + Math.abs(camera.edgeOfMap.y) + 2000);
    }
    //audio--------------------------------------------------
    if (player.numberOfCompletedFrames === 0) {
        objAudio.effects[2].play();
        objAudio.effects[2].addEventListener('ended', function () {
            mapObjects.UniversityInFlesh[0].stageOfFight = 'key phrases';
        }, { once: true });
    }
    if (player.numberOfCompletedFrames === 0 || player.numberOfCompletedFrames % 7200 === 0) {
        objAudio.soundsOfLocations[1].volume = .1;
        objAudio.soundsOfLocations[1].currentTime = 0;
        objAudio.soundsOfLocations[1].play();
    }
    //final rendering of frame--------------------------------------------------
    mapObjects.star.forEach(function (star) {
        star.movement(canvas.width / 2, canvas.height / 2);
    });
    mapObjects.floor.forEach(function (cell) {
        cell.changePositions();
    });
    mapObjects.UniversityInFlesh.forEach(function (boss) {
        boss.changePositions();
    });
    player.motionless();
    player.numberOfCompletedFrames++;
    //rendering rest--------------------------------------------------
    renderingBlackout('window');
    renderingNumberOfLivesBoss('University');
    if (mapObjects.UniversityInFlesh[0].previousStageOfFight === 'transitions' || (mapObjects.UniversityInFlesh[0].previousStageOfFight === 'key phrases' && mapObjects.UniversityInFlesh[0].stageOfKeyPhrase === 0))
        mapObjects.UniversityInFlesh[0].showSkipText();
    //end level--------------------------------------------------
    if ((mapObjects.UniversityInFlesh[0].stageOfFight === 'victory' ||
        mapObjects.UniversityInFlesh[0].stageOfFight === 'defeat') &&
        !player.bossFightStage) {
        objAudio.soundsOfLocations[1].currentTime = 0;
        objAudio.soundsOfLocations[1].pause();
        level.currentLevel = 3;
        movingToNextLevel(renderingThirdLevel, 'long', 'Basements Of War', 33, 12);
    }
}
