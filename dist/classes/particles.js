var __extends=this&&this.__extends||function(){var o=function(t,i){return(o=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,i){t.__proto__=i}:function(t,i){for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}))(t,i)};return function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=t}o(t,i),t.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}();import{TemplateCell}from"./template.js";import{camera,ctx}from"../variables/variables.js";var ParticlePlayer=function(o){function t(t,i,r){t=o.call(this,t,i,r)||this;return t.color="224, 50, 154",t.opacity=1,t.radian=6.28*Math.random(),t.sin=Math.sin(t.radian),t.cos=Math.cos(t.radian),t.speed=20*Math.random()-5,t.currentPositionX=camera.currentPosition.x,t.currentPositionY=camera.currentPosition.y,t}return __extends(t,o),t.prototype.draw=function(){ctx.beginPath(),ctx.arc(this.x+this.size/2,this.y+.5*this.size,.5*this.size,0,2*Math.PI,!1),ctx.fillStyle="rgba(".concat(this.color,", ").concat(this.opacity,")"),ctx.fill(),ctx.closePath()},t.prototype.changePositions=function(){this.x+=this.cos*this.speed+(this.currentPositionX-camera.currentPosition.x),this.y+=this.sin*this.speed+(this.currentPositionY-camera.currentPosition.y),this.currentPositionX=camera.currentPosition.x,this.currentPositionY=camera.currentPosition.y,this.draw(),this.opacity-=.02,5<this.speed&&this.speed--},t}(TemplateCell),ParticleDemon=function(o){function t(t,i,r){t=o.call(this,t,i,r)||this;return t.color="137, 50, 224",t.opacity=1,t.radian=6.28*Math.random(),t.sin=Math.sin(t.radian),t.cos=Math.cos(t.radian),t.speed=30*Math.random()-10,t.currentPositionX=camera.currentPosition.x,t.currentPositionY=camera.currentPosition.y,t}return __extends(t,o),t.prototype.draw=function(){ctx.beginPath(),ctx.arc(this.x+this.size/2,this.y+.5*this.size,.5*this.size,0,2*Math.PI,!1),ctx.fillStyle="rgba(".concat(this.color,", ").concat(this.opacity,")"),ctx.fill(),ctx.closePath()},t.prototype.changePositions=function(){this.x+=this.cos*this.speed+(this.currentPositionX-camera.currentPosition.x),this.y+=this.sin*this.speed+(this.currentPositionY-camera.currentPosition.y),this.currentPositionX=camera.currentPosition.x,this.currentPositionY=camera.currentPosition.y,this.draw(),this.opacity-=.02,5<this.speed&&this.speed--},t}(TemplateCell),ParticleBlick=function(o){function t(t,i,r){t=o.call(this,t,i,r)||this;return t.color="101, 0, 201",t.opacity=1,t.radian=6.28*Math.random(),t.sin=Math.sin(t.radian),t.cos=Math.cos(t.radian),t.speed=20*Math.random()-5,t.currentPositionX=camera.currentPosition.x,t.currentPositionY=camera.currentPosition.y,t}return __extends(t,o),t.prototype.draw=function(){ctx.beginPath(),ctx.arc(this.x+this.size/2,this.y+.5*this.size,.5*this.size,0,2*Math.PI,!1),ctx.fillStyle="rgba(".concat(this.color,", ").concat(this.opacity,")"),ctx.fill(),ctx.closePath()},t.prototype.changePositions=function(){this.x+=this.cos*this.speed+(this.currentPositionX-camera.currentPosition.x),this.y+=this.sin*this.speed+(this.currentPositionY-camera.currentPosition.y),this.currentPositionX=camera.currentPosition.x,this.currentPositionY=camera.currentPosition.y,this.draw(),this.opacity-=.02,5<this.speed&&this.speed--},t}(TemplateCell),ParticleDeadBlick=function(o){function t(t,i,r){t=o.call(this,t,i,r)||this;return t.color="101, 0, 201",t.opacity=1,t.radian=6.28*Math.random(),t.sin=Math.sin(t.radian),t.cos=Math.cos(t.radian),t.speed=40*Math.random()-10,t.startSize=t.size,t.size*=.4*Math.random()+.1,t.currentPositionX=camera.currentPosition.x,t.currentPositionY=camera.currentPosition.y,t}return __extends(t,o),t.prototype.draw=function(){ctx.beginPath(),ctx.arc(this.x,this.y,.5*this.size,0,2*Math.PI,!1),ctx.fillStyle="rgba(".concat(this.color,", ").concat(this.opacity,")"),ctx.fill(),ctx.closePath()},t.prototype.changePositions=function(){this.x+=this.cos*this.speed+(this.currentPositionX-camera.currentPosition.x),this.y+=this.sin*this.speed+(this.currentPositionY-camera.currentPosition.y),this.currentPositionX=camera.currentPosition.x,this.currentPositionY=camera.currentPosition.y,this.draw(),this.opacity-=.005,5<this.speed&&this.speed--},t}(TemplateCell);export{ParticlePlayer,ParticleDemon,ParticleBlick,ParticleDeadBlick};