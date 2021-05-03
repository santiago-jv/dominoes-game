var mySound = new buzz.sound("./audio", {
    formats: [  "mp3"],
    preload: true,
    autoplay: true,
    loop: false
});
//una librería xd 
mySound.stop();
const icon = document.querySelector('#icon');
let play = false;

function changeStateVolume(){
   
   let className;    

    if(play){
        mySound.stop();
        className = 'far fa-play-circle';
    }
    else{
        mySound.play();
     
        className = 'far fa-stop-circle';
    }
    icon.className = className;
    play = !play;
}