import{backpackButton,blackout,mapObjects}from"../variables/variables.js";import{player}from"../classes/player.js";import{levelGeneration,adaptGameField}from"./level-generation.js";import{resizeCanvas}from"./resize.js";import{Player}from"../classes/player.js";import{field}from"../variables/variables.js";function movingToNextLevel(e,a,t,s,c){switch(a){case"long":blackout.classList.remove("blackout_behind-canvas"),blackout.classList.add("blackout_active"),mapObjects.typeMap=t,player.numberOfCompletedFrames=0,cancelAnimationFrame(player.animationId),removeEventListener("resize",adaptGameField),setTimeout(function(){blackout.classList.remove("blackout_active"),"Night Parish"!==mapObjects.typeMap&&"Inner World"!==mapObjects.typeMap?backpackButton.classList.remove("backpack-button_not_active"):backpackButton.classList.add("backpack-button_not_active"),resizeCanvas(),Player.speed=field.speed*player.debuffSpeed,levelGeneration(s,c),e()},8e3),setTimeout(function(){blackout.classList.add("blackout_behind-canvas")},16e3);break;case"quickly":mapObjects.typeMap=t,player.numberOfCompletedFrames=0,"Night Parish"!==mapObjects.typeMap&&"Inner World"!==mapObjects.typeMap?backpackButton.classList.remove("backpack-button_not_active"):backpackButton.classList.add("backpack-button_not_active"),resizeCanvas(),Player.speed=field.speed*player.debuffSpeed,removeEventListener("resize",adaptGameField),cancelAnimationFrame(player.animationId),levelGeneration(s,c),e(),blackout.classList.remove("blackout_active"),setTimeout(function(){blackout.classList.add("blackout_behind-canvas")},8e3);break;case"remark":cancelAnimationFrame(player.animationId),removeEventListener("resize",adaptGameField),player.numberOfCompletedFrames=0,blackout.classList.remove("blackout_behind-canvas"),blackout.classList.add("blackout_active"),setTimeout(e,8e3)}}export{movingToNextLevel};