import{Player,player}from"../classes/player.js";import{camera,canvas,ctx,halfCanvas,keys,level,mapObjects}from"../variables/variables.js";import{objAudio}from"../variables/list-audio.js";import{behindDetector,collisionWithPlayer,interaction}from"../common/interaction-with-environment.js";import{changePositions,renderingCountItems}from"../common/level-generation.js";import{movingToNextLevel}from"../common/next-level.js";import{renderingSecondLevel}from"./second-level.js";function renderingFirstLevel(){player.animationId=requestAnimationFrame(renderingFirstLevel),4e3<canvas.width?ctx.clearRect(camera.beginningMap.x-2e3,camera.beginningMap.y-2e3,Math.abs(camera.beginningMap.x)+Math.abs(camera.edgeOfMap.x)+4e3,Math.abs(camera.beginningMap.y)+Math.abs(camera.edgeOfMap.y)+4e3):ctx.clearRect(camera.beginningMap.x-1e3,camera.beginningMap.y-1e3,Math.abs(camera.beginningMap.x)+Math.abs(camera.edgeOfMap.x)+2e3,Math.abs(camera.beginningMap.y)+Math.abs(camera.edgeOfMap.y)+2e3),0!==player.numberOfCompletedFrames&&player.numberOfCompletedFrames%7200!=0||(objAudio.soundsOfLocations[0].volume=.2,objAudio.soundsOfLocations[0].currentTime=0,objAudio.soundsOfLocations[0].play()),1e4*Math.random()<=2&&!player.thinks&&player.audio.laLaLa.play(),keys.a.pressed&&player.x>mapObjects.edge[0].x&&!player.thinks&&(collisionWithPlayer("tablet",{x:-Player.speed,y:0}),player.permissionMovement&&collisionWithPlayer("tree",{x:-Player.speed,y:0}),player.permissionMovement&&collisionWithPlayer("water",{x:-Player.speed,y:0}),player.x+player.width/2>halfCanvas.w+Player.speed||camera.currentPosition.x<=halfCanvas.w-Player.speed?player.permissionMovement?player.speedX=-Player.speed:player.speedX=0:player.permissionMovement&&(camera.currentPosition.x-=Player.speed),player.permissionMovement?player.audio.walkingLawn.play():player.permissionMovement=!0),keys.d.pressed&&player.x+player.width<mapObjects.edge[1].x+mapObjects.edge[1].size&&!player.thinks&&(collisionWithPlayer("tablet",{x:Player.speed,y:0}),player.permissionMovement&&collisionWithPlayer("tree",{x:Player.speed,y:0}),player.permissionMovement&&collisionWithPlayer("water",{x:Player.speed,y:0}),player.x+player.width/2<halfCanvas.w+Player.speed||camera.currentPosition.x>=camera.edgeOfMap.startX-halfCanvas.w-Player.speed?player.permissionMovement?player.speedX=Player.speed:player.speedX=0:player.permissionMovement&&(camera.currentPosition.x+=Player.speed),player.permissionMovement?player.audio.walkingLawn.play():player.permissionMovement=!0),keys.w.pressed&&player.y>Player.speed&&!player.thinks&&(collisionWithPlayer("tablet",{x:0,y:-Player.speed}),player.permissionMovement&&collisionWithPlayer("tree",{x:0,y:-Player.speed}),player.permissionMovement&&collisionWithPlayer("water",{x:0,y:-Player.speed}),player.y+player.height/2>halfCanvas.h||camera.currentPosition.y<=halfCanvas.h?player.permissionMovement?player.speedY=-Player.speed:player.speedY=0:player.permissionMovement&&(camera.currentPosition.y-=Player.speed),player.permissionMovement?player.audio.walkingLawn.play():player.permissionMovement=!0),keys.s.pressed&&player.y+player.height<canvas.height-Player.speed&&!player.thinks&&(collisionWithPlayer("tablet",{x:0,y:Player.speed}),player.permissionMovement&&collisionWithPlayer("tree",{x:0,y:Player.speed}),player.permissionMovement&&collisionWithPlayer("water",{x:0,y:Player.speed}),player.y+player.height/2<halfCanvas.h||camera.currentPosition.y>=camera.edgeOfMap.startY-halfCanvas.h?player.permissionMovement?player.speedY=Player.speed:player.speedY=0:player.permissionMovement&&(camera.currentPosition.y+=Player.speed),player.permissionMovement?player.audio.walkingLawn.play():player.permissionMovement=!0),changePositions(),mapObjects.edge.forEach(function(e){e.changePositions()}),mapObjects.endLevel.changePositions(),mapObjects.water.forEach(function(e){e.changePositions()}),mapObjects.floor.forEach(function(e){e.changePositions()}),mapObjects.decor.forEach(function(e){e.changePositions()}),mapObjects.item.forEach(function(e){e.changePositions()}),mapObjects.npc.interlocutor.forEach(function(e){e.changePositions()}),mapObjects.tablet.forEach(function(e){e.changePositions()}),mapObjects.tree.forEach(function(e){e.changePositions()}),player.movementPlayer(),player.numberOfCompletedFrames++,behindDetector("item"),behindDetector("interlocutor"),behindDetector("tablet"),behindDetector("tree"),interaction("interlocutor"),interaction("item"),interaction("tablet"),renderingCountItems(),player.x>=mapObjects.endLevel.x&&player.y>=mapObjects.endLevel.y&&(objAudio.soundsOfLocations[0].currentTime=0,objAudio.soundsOfLocations[0].pause(),player.audio.laLaLa.currentTime=0,player.audio.laLaLa.pause(),level.currentLevel=2,movingToNextLevel(renderingSecondLevel,"long","Night Parish",8,2.5))}export{renderingFirstLevel};