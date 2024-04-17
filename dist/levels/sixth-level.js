import{Player,PlayerSimulator,player,Shell}from"../classes/player.js";import{blackout,camera,canvas,ctx,field,halfCanvas,keys,mapObjects,level,spacePalette}from"../variables/variables.js";import{behindDetector,collisionOfGameObjects,collisionWithPlayer,interaction,takingDamage}from"../common/interaction-with-environment.js";import{adaptGameField,changePositions,levelGeneration,renderingNumberOfLives,renderingNumberOfLivesBoss}from"../common/level-generation.js";import{renderingBlackout}from"../common/blackout.js";import{objAudio}from"../variables/list-audio.js";import{maps}from"../variables/maps.js";import{Demon,CorruptedMadBlick}from"../classes/demons.js";import{Soul}from"../classes/soul.js";function renderingSixthLevel(){player.animationId=requestAnimationFrame(renderingSixthLevel),4e3<canvas.width?ctx.clearRect(camera.beginningMap.x-2e3,camera.beginningMap.y-2e3,Math.abs(camera.beginningMap.x)+Math.abs(camera.edgeOfMap.x)+4e3,Math.abs(camera.beginningMap.y)+Math.abs(camera.edgeOfMap.y)+4e3):ctx.clearRect(camera.beginningMap.x-1e3,camera.beginningMap.y-1e3,Math.abs(camera.beginningMap.x)+Math.abs(camera.edgeOfMap.x)+2e3,Math.abs(camera.beginningMap.y)+Math.abs(camera.edgeOfMap.y)+2e3),2===level.levelStage?0!==player.numberOfCompletedFrames&&player.numberOfCompletedFrames%14400!=0||(objAudio.soundsOfLocations[5].pause(),objAudio.soundsOfLocations[6].currentTime=0,objAudio.soundsOfLocations[6].play()):0!==player.numberOfCompletedFrames&&player.numberOfCompletedFrames%14400!=0||(objAudio.soundsOfLocations[6].pause(),objAudio.soundsOfLocations[5].volume=.1,objAudio.soundsOfLocations[5].currentTime=0,objAudio.soundsOfLocations[5].play()),"moving"!==player.action&&.02<player.audio.flight.volume?player.audio.flight.volume-=.01:"moving"!==player.action&&player.audio.flight.volume<.02?(player.audio.flight.currentTime=0,player.audio.flight.pause(),player.audio.flight.volume=1):"moving"===player.action&&player.audio.flight.volume<1&&(player.audio.flight.volume+=.01),keys.a.pressed&&player.x>mapObjects.edge[0].x&&!player.thinks&&(collisionWithPlayer("cubicZirconia",{x:-Player.speed,y:0}),player.x+player.width/2>halfCanvas.w+Player.speed||camera.currentPosition.x<=halfCanvas.w-Player.speed?player.permissionMovement?player.speedX=-Player.speed:player.speedX=0:player.permissionMovement&&(camera.currentPosition.x-=Player.speed),player.permissionMovement?player.audio.flight.play():player.permissionMovement=!0),keys.d.pressed&&player.x+player.width<mapObjects.edge[1].x+mapObjects.edge[1].size&&!player.thinks&&(collisionWithPlayer("cubicZirconia",{x:Player.speed,y:0}),player.x+player.width/2<halfCanvas.w+Player.speed||camera.currentPosition.x>=camera.edgeOfMap.startX-halfCanvas.w-Player.speed?player.permissionMovement?player.speedX=Player.speed:player.speedX=0:player.permissionMovement&&(camera.currentPosition.x+=Player.speed),player.permissionMovement?player.audio.flight.play():player.permissionMovement=!0),keys.w.pressed&&player.y>Player.speed&&!player.thinks&&(collisionWithPlayer("cubicZirconia",{x:0,y:-Player.speed}),player.y+player.height/2>halfCanvas.h||camera.currentPosition.y<=halfCanvas.h?player.permissionMovement?player.speedY=-Player.speed:player.speedY=0:player.permissionMovement&&(camera.currentPosition.y-=Player.speed),player.permissionMovement?player.audio.flight.play():player.permissionMovement=!0),keys.s.pressed&&player.y+player.height<canvas.height-Player.speed&&!player.thinks&&(collisionWithPlayer("cubicZirconia",{x:0,y:Player.speed}),player.y+player.height/2<halfCanvas.h||camera.currentPosition.y>=camera.edgeOfMap.startY-halfCanvas.h?player.permissionMovement?player.speedY=Player.speed:player.speedY=0:player.permissionMovement&&(camera.currentPosition.y+=Player.speed),player.permissionMovement?player.audio.flight.play():player.permissionMovement=!0),changePositions(),"moving"===player.action&&mapObjects.playerSimulator.push(new PlayerSimulator(player.x,player.y+player.amplitude,player.width)),(30<=mapObjects.playerSimulator.length||"moving"!==player.action)&&mapObjects.playerSimulator.splice(0,1),keys.mouseLeft.pressed&&60<player.timeWithoutAttacks&&!level.safeZone&&(player.attack=!0),keys.mouseLeft.pressed||(player.attack=!1),player.attack?(player.recharge++,player.timeWithoutAttacks=-1):(player.timeWithoutAttacks++,player.recharge=-1),!player.attack||0!==player.recharge&&player.recharge%60!=0||level.safeZone||(mapObjects.shell.push(new Shell(player.x,player.y,field.sizeCell/10,player.width,player.mouseX,player.mouseY)),objAudio.player[7].volume=.5,objAudio.player[7].currentTime=0,objAudio.player[7].play()),2===level.levelStage&&(0<=player.numberOfEnemiesKilled.demon&&player.numberOfEnemiesKilled.demon<10?level.spawnRate=500:10<=player.numberOfEnemiesKilled.demon&&player.numberOfEnemiesKilled.demon<25?level.spawnRate=350:25<=player.numberOfEnemiesKilled.demon&&player.numberOfEnemiesKilled.demon<50?level.spawnRate=200:50<=player.numberOfEnemiesKilled.demon&&0===player.numberOfEnemiesKilled.CorruptedMadBlick?(level.spawnRate=1e3,player.bossFightStage||(mapObjects.CorruptedMadBlick[0]=new CorruptedMadBlick(field.sizeCell),player.bossFightStage=!0)):level.spawnRate=0,player.numberOfCompletedFrames%level.spawnRate==0)&&mapObjects.demon.length<5&&mapObjects.demon.push(new Demon(field.sizeCell/3)),takingDamage("cubicZirconia"),takingDamage("demon"),takingDamage("CorruptedMadBlick"),takingDamage("shellBlick"),mapObjects.star.forEach(function(e){e.movement(canvas.width/2,canvas.height/2)}),mapObjects.edge.forEach(function(e){e.changePositions()}),mapObjects.stage.forEach(function(e){1===level.levelStage&&e.changePositions()}),mapObjects.shell.forEach(function(e,a){e.changePositions()}),mapObjects.shellBlick.forEach(function(e){e.changePositions()}),2===level.levelStage&&mapObjects.demon.forEach(function(e,a){e.changePositions()}),2===level.levelStage&&mapObjects.CorruptedMadBlick.forEach(function(e){e.changePositions()}),mapObjects.cubicZirconia.forEach(function(e){2===level.levelStage&&"absent"===e.condition&&(e.condition="aggressive"),e.changePositions()}),mapObjects.soul.forEach(function(e){e.currentFrame=0,e.changePositions(),e.currentFrame=1}),collisionOfGameObjects("shell","window"),collisionOfGameObjects("shellBlick","window"),collisionOfGameObjects("shell","cubicZirconia"),collisionOfGameObjects("shell","demon"),player.bossFightStage&&collisionOfGameObjects("shell","CorruptedMadBlick"),mapObjects.playerSimulator.forEach(function(e){e.changePositions()}),player.movementSoul(),player.numberOfCompletedFrames++,mapObjects.particlePlayer.forEach(function(e,a){e.opacity<=.1&&mapObjects.particlePlayer.splice(a,1),e.changePositions()}),mapObjects.particleDemon.forEach(function(e,a){e.opacity<=.1&&mapObjects.particleDemon.splice(a,1),e.changePositions()}),mapObjects.particleBlick.forEach(function(e,a){e.opacity<=.1&&mapObjects.particleBlick.splice(a,1),e.changePositions()}),mapObjects.particleDeadBlick.forEach(function(e,a){e.opacity<=.1&&mapObjects.particleDeadBlick.splice(a,1),e.changePositions()}),collisionWithPlayer("stage"),behindDetector("memory"),behindDetector("cubicZirconia"),behindDetector("soul"),interaction("memory"),interaction("soul"),player.takesDamage&&renderingBlackout("damage"),level.safeZone||renderingNumberOfLives(),player.bossFightStage&&renderingNumberOfLivesBoss("Blick"),player.bossFightStage&&mapObjects.CorruptedMadBlick[0].size<=.3*field.sizeCell&&!blackout.classList.contains("blackout_active")&&2===level.levelStage&&(blackout.classList.remove("blackout_behind-canvas"),blackout.classList.add("blackout_active"),setTimeout(function(){level.levelStage=3,mapObjects.cubicZirconia.forEach(function(e){e.condition="neutral"}),mapObjects.soul.push(new Soul(mapObjects.CorruptedMadBlick[0].x,mapObjects.CorruptedMadBlick[0].y,player.width/2,"239, 100, 81","stationary")),player.numberOfCompletedFrames=0,objAudio.soundsOfLocations[6].currentTime=0,objAudio.soundsOfLocations[6].pause(),blackout.classList.add("blackout_behind-canvas"),blackout.classList.remove("blackout_active")},8e3)),player.numberOfLives<=0&&(blackout.classList.remove("blackout_behind-canvas"),blackout.classList.add("blackout_active"),objAudio.soundsOfLocations[5].currentTime=0,objAudio.soundsOfLocations[5].pause(),objAudio.soundsOfLocations[6].currentTime=0,objAudio.soundsOfLocations[6].pause(),cancelAnimationFrame(player.animationId),removeEventListener("resize",adaptGameField),player.numberOfDeaths++,player.numberOfCompletedFrames=0,player.numberOfLives=100,objAudio.effects[1].play(),player.attack=!1,player.recharge=-1,player.timeWithoutAttacks=-1,setTimeout(function(){blackout.classList.add("blackout_behind-canvas"),blackout.classList.remove("blackout_active"),1===level.levelStage?levelGeneration(42,2):1!==level.levelStage&&(player.numberOfEnemiesKilled.demon=0,player.bossFightStage=!1,mapObjects.CorruptedMadBlick=[],canvas.style.backgroundColor=spacePalette[0],level.levelStage=2,mapObjects.cubicZirconia.forEach(function(e){e.condition="aggressive"}),maps[mapObjects.typeMap].forEach(function(e,i){e.forEach(function(e,a){e.match(/\|0/)&&(maps[mapObjects.typeMap][i][a]="|")})}),levelGeneration(10,13)),renderingSixthLevel()},4e3)),player.takesDamage||(player.numberOfLives+=.01,100<player.numberOfLives&&(player.numberOfLives=100)),player.takesDamage=!1,player.playerTasks.completedDialogues.soulKolya&&(objAudio.soundsOfLocations[5].currentTime=0,objAudio.soundsOfLocations[5].pause(),objAudio.soundsOfLocations[6].currentTime=0,objAudio.soundsOfLocations[6].pause(),player.audio.flight.currentTime=0,player.audio.flight.pause(),blackout.classList.remove("blackout_behind-canvas"),blackout.classList.add("blackout_active"),setInterval(function(){cancelAnimationFrame(player.animationId)},8e3))}export{renderingSixthLevel};