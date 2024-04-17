import{canvas,ctx,field}from"../variables/variables.js";import{player}from"../classes/player.js";var blackout=new Image,blackoutCenter=(blackout.src="./images/blackout/blackout.png",new Image),blackoutFrame=(blackoutCenter.src="./images/blackout/blackout-center.png",new Image),blackoutDamage=(blackoutFrame.src="./images/blackout/blackout-frame.png",new Image);function renderingBlackout(e){switch(e){case"center":ctx.drawImage(blackoutCenter,player.x+player.width/2-1.5*field.sizeCell,player.y+player.height/2-1.5*field.sizeCell,3*field.sizeCell,3*field.sizeCell),ctx.drawImage(blackout,0,0,400,400,0,0,player.x+player.width/2-1.5*field.sizeCell+2,canvas.height),ctx.drawImage(blackout,0,0,400,400,player.x+player.width/2-1.5*field.sizeCell,0,canvas.width-(player.x+player.width/2-1.5*field.sizeCell),player.y+player.height/2-1.5*field.sizeCell+1),ctx.drawImage(blackout,0,0,400,400,player.x+player.width/2+1.5*field.sizeCell-1,player.y+player.height/2-1.5*field.sizeCell,canvas.width-(player.x+player.width/2+1.5*field.sizeCell-1),canvas.height-(player.y+player.height/2-1.5*field.sizeCell)),ctx.drawImage(blackout,0,0,400,400,player.x+player.width/2-1.5*field.sizeCell,player.y+player.height/2+1.5*field.sizeCell-1,player.x+player.width/2+1.5*field.sizeCell-(player.x+player.width/2-1.5*field.sizeCell)+10,canvas.height-(player.y+player.height/2+1.5*field.sizeCell)+10);break;case"window":ctx.drawImage(blackoutFrame,0,0,canvas.width,canvas.height);break;case"damage":ctx.drawImage(blackoutDamage,0,0,canvas.width,canvas.height)}}blackoutDamage.src="./images/blackout/blackout-damage.png";export{renderingBlackout};