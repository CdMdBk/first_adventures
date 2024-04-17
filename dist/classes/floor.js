var __extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,e){t.__proto__=e}:function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}))(t,e)};return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}();import{camera,canvas,ctx,field}from"../variables/variables.js";import{TemplateCell}from"./template.js";var Floor=function(a){function t(t,e,i,r,s){t=a.call(this,t,e,i)||this;return t.image=new Image,t.startX=t.x-5,t.startY=t.y-5,t.image.src=r,t.typeImage=parseInt(s),t}return __extends(t,a),t.prototype.draw=function(){this.x>=-field.sizeCell&&this.x<=canvas.width+100&&this.y>=-field.sizeCell&&this.y<=canvas.height+100&&ctx.drawImage(this.image,400*this.typeImage+1,0,398,400,this.x,this.y,this.size+1,this.size+1)},t.prototype.changePositions=function(){this.x=this.startX+(camera.currentPosition.startX-camera.currentPosition.x),this.y=this.startY+(camera.currentPosition.startY-camera.currentPosition.y),this.draw()},t}(TemplateCell),Decor=function(a){function t(t,e,i,r,s){t=a.call(this,t,e,i)||this;return t.image=new Image,t.startX=t.x-5,t.startY=t.y-5,t.image.src=r,t.typeImage=parseInt(s),t}return __extends(t,a),t.prototype.draw=function(){this.x>=-field.sizeCell&&this.x<=canvas.width+100&&this.y>=-field.sizeCell&&this.y<=canvas.height+100&&ctx.drawImage(this.image,400*this.typeImage+1,0,400,400,this.x,this.y,this.size+5,this.size+5)},t.prototype.changePositions=function(){this.x=this.startX+(camera.currentPosition.startX-camera.currentPosition.x),this.y=this.startY+(camera.currentPosition.startY-camera.currentPosition.y),this.draw()},t}(TemplateCell);export{Floor,Decor};