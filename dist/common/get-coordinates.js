import{player}from"../classes/player.js";import{bonus}from"../variables/variables.js";function getCoordinates(e){bonus.classList.contains("bonus_active")||e.preventDefault(),player.mouseX=e.clientX,player.mouseY=e.clientY}export{getCoordinates};