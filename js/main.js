  "use strict";
var gameMusic={
    	bgm:document.getElementById('bgm'),
    	bun:document.getElementById('boun')
    };
var baseSpace={
      stopEvent:function(evt){
        evt.stopPropagation();
        evt.cancelBubble=true;
      }
    };
var battlePlane={
     _defaults:{
                stage:document.body,
                start:true
                  },
      action:false,
      npcDesity:[50,200,1000],
      npcSpeed:[4,3,2],
      score:0,
      highest:0,
      restart:false,
      _player:null,
      num:0,
      fps:30,
      gameRun:null,
     arrBullets:[],
     arrPlane:[],
     initPlayer:function(){
         this._player=new Player();
         this._player.add();
         this._player.move();
     },
     addPlane:function (num,data,index) {
       if(num%data==0){
         var npc=new NpcPlane({
           class:'npc'+(index+1),
           score:index==1? 300:index==0? 200:500,
           speed:this.npcSpeed[index],
           vita:index==1? 3:index==0? 1:6
         });
         npc.add();
         npc.show();
         this.arrPlane.push(npc);
         index==2&&(this.num=0);
         return
       }
     },
     run:function(){
       //console.log(this);
       var _this=battlePlane,
        stage=document.body;
       //console.log(_this);
         _this.num++;
         if (_this.num%5==0) {
          _this._player.fire();
         _this.arrBullets.push(_this._player.bullets);
          }
         _this.arrBullets.forEach(function(val,index){
             val.bullet.offsetTop<100&&(val.die(_this._defaults.stage),_this.arrBullets.splice(index,1));
             //val.bullet.outside&&_this.arrBullets.splice(index,1);
           }
         )
         _this.npcDesity.forEach(function (data,index) {
           _this.addPlane(_this.num,data,index);
         })

         _this.arrPlane.forEach(function(v,index){
           v.plane.offsetTop>stage.offsetHeight&&(v.die(_this._defaults.stage),_this.arrPlane.splice(index,1));
           _this.collide(v.plane,_this._player.plane)&&_this.gameOver();
           v.plane.style.top=v.plane.offsetTop+v.speed+'px';
         });
         _this.arrBullets.forEach(function (v1,index1) {
           v1.bullet.style.top=v1.bullet.offsetTop-v1.speed+'px';
           _this.arrPlane.forEach(function(v2,index2){
             if(_this.collide(v2.plane,v1.bullet)){
               v1.die(_this._defaults.stage);
               v2.vita--;
               if(v2.vita<=0){
                 v2.bomb();
                 _this.score+=v2.score;
                 _this.arrPlane.splice(index2,1)
               }
             }
           })
         })

         /*highest score*/
         document.getElementById("score").innerHTML = "得分：" + _this.score;
         _this.highest=localStorage.getItem('highest');
         _this.highest<=(_this.score)&&(_this.highest=_this.score);
         document.getElementById('highest').innerHTML="最高分："+_this.highest;
         localStorage.setItem('highest',_this.highest);


       	if(_this.scores>8000){
       		_this.npcSpeed = [10,8,6];
       		_this.npcDensity = [10,200,500];
       	}
        else if(_this.scores>4000){
          _this.npcSpeed = [8,7,6];
          _this.npcDensity = [15,100,400];
        }
        else if(_this.scores>2000){
           _this.npcSpeed = [5,4,3];
           _this.npcDensity = [15,200,600];
         }
     },
     gameOver:function(){
       clearInterval(this.gameRun);
       this._player.stop();
       this._player.bomb();
     	gameMusic.bun.play();
      gameMusic.bgm.pause();
      this.clear();
     	setTimeout(function(){
     		var re= document.getElementById("again_btn");
     		re.style.display = "block";
     	},500);
    },
    pause:function(){
      clearInterval(this.gameRun);
      this._player.stop();
    },
    clear:function () {
      this.arrBullets.forEach(function (val) {
        val.die();
      });
      //try{
      this.arrPlane.forEach(function(val,index){
        val.die();
    });//}catch(err){}
      this.arrBullets=[];
      this.arrPlane=[];
      this._player.die();
    },
    collide:function (ele1,ele2) {

      var top=Math.abs(ele1.offsetTop-ele2.offsetTop),
      left=Math.abs(ele1.offsetLeft-ele2.offsetLeft),
      maxWidth=Math.max(ele1.offsetWidth,ele2.offsetWidth),
      maxHeight=Math.max(ele1.offsetHeight,ele2.offsetHeight)/2;
      return top<=maxHeight&&left<=maxWidth;
      /*var a1=ele1.offsetLeft,
      b1=ele.offsetLeft+*/
    },
    begin:function () {
       this.gameRun=setInterval(this.run,this.fps);
       this._player.move();
    },
    init:function () {
      /*if (this.restart) {
        this.clear();
          this.restart=!this.restart;
      }*/
      this.score=0;
      this.num=0;
       this.initPlayer();
       this.gameRun=setInterval(this.run,this.fps)
    }

};
window.onload=function(){
  var btn={
    begin:document.querySelector('#begin_btn'),
    pause:document.querySelector('#pause_btn'),
    again:document.querySelector('#again_btn')
  };
  btn.begin.onclick = function(e){
    var evt = e||event;
    baseSpace.stopEvent(evt);
    begin_btn.style.display = "none";
    battlePlane.action=true;
    setTimeout(function(){
      battlePlane.init();
    },2500);
    start=true;
    //container.removeChild( renderer.domElement );
  };
window.onclick=function () {
  if(battlePlane.action){
  btn.pause.style.display = "block";
  battlePlane.pause();}
}
  btn.pause.onclick = function(e){
    var evt = e||event;
    battlePlane.begin();
    this.style.display = "none";
    baseSpace.stopEvent(evt);
  };
  btn.again.onclick = function(e){
    var evt=e||event;
    baseSpace.stopEvent(evt);
    btn.again.style.display='none'
    battlePlane.init();
    //window.location.reload();
    //container.appendChild( renderer.domElement );
  };



/*canvas*/
var camera,scene, renderer,light1, light2, light3;
var container=document.getElementById('container'),m;
var start=false;
var score=0;
var sc;
var ob;
init();
animate();
function init(){


    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z=1000;
    scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x00020 ) );
    scene.fog = new THREE.FogExp2( 0xefd1b5,2.5);


    var geometry = new THREE.Geometry();

    for ( var i = 0; i < 1000; i ++ ) {

        var vertex = new THREE.Vector3();
        vertex.x = THREE.Math.randFloatSpread( 2000 );
        vertex.y = THREE.Math.randFloatSpread( 5000 );
        vertex.z = THREE.Math.randFloatSpread( 2000 );

        geometry.vertices.push( vertex );

    }

    var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
    scene.add( particles );

    m=Math.random()*200-100;




    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
}
function animate() {

    requestAnimationFrame( animate );
    render();

}
function render(){
    var r = Date.now() * 0.0005;
    if(!start) {
        camera.position.x = 200 * Math.cos(r);
        camera.position.z = 200 * Math.sin(r);
        camera.position.y = 200 * Math.sin(r);
    } else{
        (camera.position.y<=2500)&&(camera.position.y+=20*Math.abs(Math.sin(r)));
        (camera.position.y>=2500)&&(start=false);
    }
    renderer.render( scene, camera );
}
}
var loading=true;
