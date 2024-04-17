var __extends=this&&this.__extends||function(){var s=function(t,i){return(s=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,i){t.__proto__=i}:function(t,i){for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e])}))(t,i)};return function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function e(){this.constructor=t}s(t,i),t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)}}();import{canvas,camera,ctx,field}from"../variables/variables.js";import{TemplateCell}from"./template.js";var Water=function(a){function t(t,i,e,s){t=a.call(this,t,i,e)||this;return t.image=new Image,t.frame=0,t.countFrames=0,t.startX=t.x-5,t.startY=t.y-5,t.image.src=s,t}return __extends(t,a),t.prototype.draw=function(){this.x>=-field.sizeCell&&this.x<=canvas.width+100&&this.y>=-field.sizeCell&&this.y<=canvas.height+100&&ctx.drawImage(this.image,400*this.frame,0,400,400,this.x,this.y,this.size+5,this.size+5)},t.prototype.changePositions=function(){this.x=this.startX+(camera.currentPosition.startX-camera.currentPosition.x),this.y=this.startY+(camera.currentPosition.startY-camera.currentPosition.y),this.draw(),this.countFrames++,8===this.countFrames&&(this.frame++,this.countFrames=0),30<=this.frame&&(this.frame=0)},t}(TemplateCell),Tree=function(r){function t(t,i,e,s,a){t=r.call(this,t,i,e)||this;return t.image=new Image,t.frame=0,t.countFrames=0,t.startX=t.x,t.startY=t.y,t.width=t.size,t.height=s,t.image.src=a,t}return __extends(t,r),t.prototype.draw=function(){ctx.drawImage(this.image,400*this.frame,0,400,540,this.treeX-this.width,this.treeY-this.width,this.height,4*this.height/3)},t.prototype.changePositions=function(){this.x=this.startX+(camera.currentPosition.startX-camera.currentPosition.x),this.y=this.startY+(camera.currentPosition.startY-camera.currentPosition.y),this.treeX=this.x+this.height/2-this.width/2,this.treeY=this.y-this.height/3,this.draw(),this.countFrames++,8===this.countFrames&&(this.frame++,this.countFrames=0),30<=this.frame&&(this.frame=0)},t}(TemplateCell),Wall=function(a){function t(t,i,e,s){t=a.call(this,t,i,e)||this;return t.image=new Image,t.width=t.size,t.height=1.5*t.size,t.startX=t.x-5,t.startY=t.y-5,t.image.src="./images/wall/wall.png",t.typeImage=parseInt(s),t}return __extends(t,a),t.prototype.draw=function(){this.x>=-field.sizeCell&&this.x<=canvas.width+100&&this.y>=1.5*-field.sizeCell&&this.y<=canvas.height+100&&ctx.drawImage(this.image,400*this.typeImage+1,0,395,600,this.x,this.y,this.width+5,this.height+5)},t.prototype.changePositions=function(){this.x=this.startX+(camera.currentPosition.startX-camera.currentPosition.x),this.y=this.startY+(camera.currentPosition.startY-camera.currentPosition.y),this.draw()},t}(TemplateCell),CubicZirconia=function(a){function t(t,i,e,s){t=a.call(this,t,i,e)||this;return t.image={aggressive:new Image,neutral:new Image},t.frame=0,t.countFrames=0,t.width=t.size,t.height=1.5*t.size,t.startX=t.x-5,t.startY=t.y-5,t.image.aggressive.src="./images/wall/cubic-zirconia-wall.png",t.image.neutral.src="./images/wall/cleaned-wall.png",t.condition="aggressive",s&&(t.condition=s),t}return __extends(t,a),t.prototype.draw=function(){switch(this.condition){case"aggressive":this.x>=-field.sizeCell&&this.x<=canvas.width+100&&this.y>=1.5*-field.sizeCell&&this.y<=canvas.height+100&&ctx.drawImage(this.image.aggressive,400*this.frame+1,0,395,600,this.x,this.y,this.width+5,this.height+5);break;case"neutral":this.x>=-field.sizeCell&&this.x<=canvas.width+100&&this.y>=1.5*-field.sizeCell&&this.y<=canvas.height+100&&ctx.drawImage(this.image.neutral,400*this.frame+1,0,395,600,this.x,this.y,this.width+5,this.height+5)}},t.prototype.changePositions=function(){this.x=this.startX+(camera.currentPosition.startX-camera.currentPosition.x),this.y=this.startY+(camera.currentPosition.startY-camera.currentPosition.y),this.draw(),this.countFrames++,8===this.countFrames&&(this.frame++,this.countFrames=0),30<=this.frame&&(this.frame=0)},t}(TemplateCell);export{Water,Tree,Wall,CubicZirconia};