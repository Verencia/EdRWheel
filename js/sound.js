// SOUND CONTROL
function countSound(){
  CountAudio.play();
}
function fadeDontCountSound(){
  var fadeAudio = setInterval(function () {

    // Only fade if past the fade out point or not at zero already
    if (DontCountAudio.volume !== 0.0) {
      DontCountAudio.volume -= 0.1;
    }
    // When volume at zero stop all the intervalling
    if (DontCountAudio.volume < 0.003) {
        clearInterval(fadeAudio);
    }
}, 200);
}

function dontCountSound(){
  DontCountAudio.volume = 1;
  DontCountAudio.play();
  
}
function clickSound() {
  let random = Math.floor(Math.random() * audioTab.length);
  audioTab[random].play()
  //ButtonSelectAudio.play();
  
}
function hoverSound() {
  HoverAudio.play();
}
function stopSound(){
  if (wheelSpinning) {
    StopAudio.play();
  } else {
    Stop2Audio.play();
  }
  
}