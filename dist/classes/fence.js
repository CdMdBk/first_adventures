var __extends=this&&this.__extends||function(){var i=function(t,e){return(i=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,e){t.__proto__=e}:function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}))(t,e)};return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();import{TemplateCell}from"./template.js";import{camera,canvas,ctx,field}from"../variables/variables.js";var Fence=function(o){function t(t,e,n,i,r){t=o.call(this,t,e,n)||this;return t.image=new Image,t.width=t.size/3,t.height=t.size,t.fenceX=t.x+t.width*r.x,t.fenceY=t.y-2*t.width+t.width*r.y,t.startX=t.fenceX,t.startY=t.fenceY,t.image.src=i,t}return __extends(t,o),t.prototype.draw=function(){this.fenceX>=-field.sizeCell&&this.fenceX<=canvas.width+100&&this.fenceY>=-field.sizeCell&&this.fenceY<=canvas.height+100&&ctx.drawImage(this.image,this.fenceX,this.fenceY,this.width,this.height)},t.prototype.changePositions=function(){this.fenceX=this.startX+(camera.currentPosition.startX-camera.currentPosition.x),this.fenceY=this.startY+(camera.currentPosition.startY-camera.currentPosition.y),this.draw()},t}(TemplateCell);export{Fence};