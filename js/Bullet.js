"use strict";
function Bullet(options){
	var _defaults={
         bullet:null,
         speed:25,
         power:1,
         position:{x:0,y:0},
         class:"bullet"
	};
	options=options||{};
	for(var key in _defaults){
		this[key]=options[key]||_defaults[key];
	}
}
Bullet.prototype.die = function(ele){
 try{
 	this.bullet&&ele.removeChild(this.bullet)
 }catch(err){};
};
Bullet.prototype.fire = function(ele){
	this.bullet = document.createElement("i");
	this.bullet.className = this.class;
	ele.appendChild(this.bullet);
	this.bullet.style.left = this.position.x + "px";
	this.bullet.style.top = this.position.y + "px";
};
