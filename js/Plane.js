"use strict";
function Plane(options){
    var _defaults={
        plane:null,
        position:{x:0,y:0},
        score:0,
        class:'',
        container:document.body
    };
    options=options||{};
    for(var key in _defaults){
        this[key]=options[key]||_defaults[key];
    }
}
Plane.prototype.add=function(){
    var _this=this;
    this.plane=document.createElement('i');
    this.plane.className=this.class;
    this.container.appendChild(_this.plane);
};
Plane.prototype.bomb=function(){
      var _this=this,
          bombImg,
          x=_this.plane.offsetLeft,
          y=_this.plane.offsetTop;
    _this.die();
    bombImg=document.createElement('i');
    bombImg.className='bang'+_this.class.slice(3);
    bombImg.style.left=x+'px';
    bombImg.style.top=y+'px';
    _this.container.appendChild(bombImg);
    setTimeout(function(){
        _this.container.removeChild(bombImg)
    },500)
};
Plane.prototype.die=function(){
    var _this=this;
    try{_this.plane&&_this.container.removeChild(_this.plane)}catch(err){};
};
/*player plane*/
function Player(){}
Player.prototype=new Plane({class:'myPlane',position:{x:"45%",y:460}});
Player.prototype.move=function(){
    var stage=document.body,
         _this=this;
         /*switch(keyCode){
            case 37
            x=2
         }*/
        _this.plane.onmouseover=function(e){
        stage.onmousemove=function(e){
            var evt=e||event;
            _this.position.x=evt.clientX - _this.plane.offsetWidth / 2;
            _this.position.y=evt.clientY - _this.plane.offsetHeight / 2;
            _this.plane.style.left=_this.position.x+'px';
            _this.plane.style.top=_this.position.y+'px';
        }
    };
    stage.onmouseout=function(){
        _this.onmousemove=null
    };
    /*stage.onclick=function(){
        stage.onmousemove=null
    }*/
};
Player.prototype.fire = function(){
    this.position = {
        x:this.plane.offsetLeft + this.plane.offsetWidth/2 - 2,
        y:this.plane.offsetTop
    };
    var b = new Bullet();
    this.bullets = b;
    this.bullets.position = this.position;
    this.bullets.fire(this.container);
};
Player.prototype.stop=function () {
  this.plane.onmouseover=document.body.onmousemove=null;
}
/*npc*/

function NpcPlane(options){
  options=options||{};
  for(var key in options){
    this[key]=options[key];
  }
}
NpcPlane.prototype = new Plane();
NpcPlane.prototype.show=function(){
    var _ele=document.body;
    this.position.x=Math.random()*(_ele.offsetWidth-this.plane.offsetWidth-40);
    this.plane.style.left=this.position.x+'px';
    this.plane.style.top=-600+'px';
};
