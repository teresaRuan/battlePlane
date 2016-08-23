var lo=setInterval(yujiazai,1000);
var imgSrc=['img/player.png','img/npc1.png','img/npc2.png','img/npc3.png'];
var audioSrc=['./music/Bounce.mp3','./music/explosion5.mp3'];
var obImg=false,obAudio=false;
function yujiazai(){
  //try{
  if(loading){
      console.log('enter');
               var img=new Image();
       img.src=imgSrc[0];
       var audio=new Audio();
       audio.src=audioSrc[0];

    var s=img.width;
       if(s!=0) {
         imgSrc.shift();
         if (imgSrc.length <= 0) {
           obImg=true;
         }
       }
    if(audio.canPlayType('audio/mpeg')=="probably"){
      audioSrc.shift();
      if (audioSrc.length<=0){
        obAudio=true;
      }
    }
    if (obImg&&obAudio){
      init();
      clearInterval(lo);
      return;
    }
  }
//}catch(err){}
}
function  init(){
  document.getElementById('load').style.display='none';
  document.getElementById('container').style.display='block';
  document.getElementById('container').className+='active';
  gameMusic.bgm.play();
}
