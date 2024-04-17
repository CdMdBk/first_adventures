import{backpackButton,buttonStart,backpack,cross,arrow,previousCanvas,canvas,mapObjects,spacePalette,keys,formQuestion,bonus,level}from"../variables/variables.js";import{showBackpack,hideBackpack,hideItemInfo}from"../common/backpack.js";import{resizeCanvas}from"../common/resize.js";import{Star}from"../classes/stars.js";import{player}from"../classes/player.js";import{getCoordinates}from"../common/get-coordinates.js";import{movingToNextLevel}from"../common/next-level.js";import{renderingFirstLevel}from"./first-level.js";addEventListener("keydown",function(e){"KeyB"===e.code&&"Night Parish"!==mapObjects.typeMap&&"Inner World"!==mapObjects.typeMap&&(backpack.classList.contains("backpack_active")?hideBackpack:showBackpack)()}),backpackButton.addEventListener("click",function(){showBackpack()}),cross.addEventListener("click",function(){hideBackpack()}),arrow.addEventListener("click",function(){hideItemInfo()}),formQuestion.addEventListener("submit",function(e){e.preventDefault(),mapObjects.UniversityInFlesh[0].checkAnswer(e.target.children[0].children[1].value),e.target.children[0].children[1].value=""}),addEventListener("mousedown",function(e){"INPUT"===e.target.tagName||bonus.classList.contains("bonus_active")||e.preventDefault(),keys.mouseLeft.pressed=!0,player.mouseX=e.clientX,player.mouseY=e.clientY}),addEventListener("mouseup",function(e){e.preventDefault(),keys.mouseLeft.pressed=!1}),addEventListener("mousemove",getCoordinates),resizeCanvas(),previousCanvas.w=canvas.width,previousCanvas.h=canvas.height;for(var i=0;i<400;i++)mapObjects.star.push(new Star(canvas.width/2,canvas.height/2,3*Math.random()+1,spacePalette[Math.floor(Math.random()*spacePalette.length)],"circle",Math.random()*(canvas.width-100)+100));buttonStart.addEventListener("click",function(){buttonStart.remove(),resizeCanvas(),mapObjects.star.forEach(function(e){e.movement(canvas.width/2,canvas.height/2)}),level.currentLevel=1,movingToNextLevel(renderingFirstLevel,"quickly","Tsaritsyno Park",10,9)});