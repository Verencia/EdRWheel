function initWheel(idCanvas) {
  theWheel = new Winwheel({
    'canvasId': idCanvas,


    'animation':                   // Note animation properties passed in constructor parameters.
    {
      'type': 'spinToStop',  // Type of animation.
      'duration': 5,             // How long the animation is to take in seconds.
      'spins': 10,              // The number of complete 360 degree rotations the wheel is to do.
      // Remember to do something after the animation has finished specify callback function.
      'callbackAfter': 'drawTriangle()',
      'callbackSound' : 'playTickSound()',
      'callbackFinished': 'alertPrize()'
    },
  });
}
// Updates segments of the wheel
function updateWheel(games) {
  /* if (theWheel.segments[1].text == '') {
    theWheel.segments[1].size = 0;
  } */
  let counter = 0;
  games.forEach(game => {
    if (game.weight != 0) {
      if (counter == 0 && theWheel.segments[1].text == '' ) {
        theWheel.segments[1].size = calcWeight(parseInt(game.weight));
        theWheel.segments[1].fillStyle = game.color;
        //theWheel.segments[1].text = replaceChar(game.title,"...",5);
        theWheel.segments[1].text = game.title;
        theWheel.segments[1].id = parseInt(game.id) - 1;
        theWheel.segments[1].image = ImgPath + game.imgName;
        theWheel.segments[1].textFillStyle = "#ffffff";
        theWheel.segments[1].textStrokeStyle = "#000000";
      } 
      else if (theWheel.segments[parseInt(game.id)]) {
        theWheel.segments[parseInt(game.id)].size = calcWeight(parseInt(game.weight));
        theWheel.segments[parseInt(game.id)].text = game.title;
      }
      else {
        theWheel.addSegment({ 
        'size': calcWeight(parseInt(game.weight)), 
        'fillStyle': game.color, 
        'text': game.title, 
        'id': parseInt(game.id) - 1, 
        'image': ImgPath + game.imgName, 
        'textFillStyle': "#ffffff", 
        'textStrokeStyle': "#000000" 
      });
      counter++;
      
    }
    
  }
  else if (theWheel.segments[parseInt(game.id)] && game.weight == 0){
    theWheel.segments[parseInt(game.id)].size = 0;
    theWheel.segments[parseInt(game.id)].text = ""; 
  }
  theWheel.updateSegmentSizes();
  });
  updateTextsWheel();
}

// function called when spin button is pressed
function startSpin() {
  //fadeDontCountSound();
  // Ensure that spinning can't be clicked again while already running.
  
  resetWheel();
  if (wheelSpinning == false) {
    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
    // to rotate with the duration of the animation the quicker the wheel spins.
    // if (wheelPower == 1) {
    //   theWheel.animation.spins = 1; //3
    // } else if (wheelPower == 2) {
    //   theWheel.animation.spins = 6;
    // } else if (wheelPower == 3) {
    //   theWheel.animation.spins = 10;
    // }

    // Disable the spin button so can't click again while wheel is spinning.
    //document.getElementById('spin_button').src = "../image/spin_off.png";
    //document.getElementById('spin_button').className = "";

    // Begin the spin animation by calling startAnimation on the wheel object.
    theWheel.startAnimation();
    drawTriangle();

    // Set to true so that power can't be changed and spin button re-enabled during
    // the current animation. The user will have to reset before spinning again.
    wheelSpinning = true;
  }
}
// reset wheel and audio
function resetWheel() {
  theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
  theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
  theWheel.draw();                // Call draw to render changes to the wheel.

  //document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
  //document.getElementById('pw2').className = "";
  //document.getElementById('pw3').className = "";
  TickAudio.pause();
  TickAudio.currentTime = 0;
  wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
  drawTriangle();
}

function updateTextsWheel(){
  theWheel.segments.forEach(element => {
    if (element != null) {
      //console.log((element.text).length );
      if ((element.text).length >= 17) {
        element.textFontSize = 16;
      }
      else if ((element.text).length >= 14) {
        element.textFontSize = 18;
      }
    }
    
  });
}
// Draws little triangle on the wheel
function drawTriangle() {
  let tcanvas = document.getElementById(theWheel.canvasId);

  if (tcanvas.getContext) {
    let tx = tcanvas.getContext('2d');
    let x = theWheel.centerX;
    let y = theWheel.centerY;
    tx.strokeStyle = '#000000';     // Set line colour.
    tx.fillStyle = '#a81000';        // Set fill colour.
    tx.lineWidth = 2;
    if (gamesHidden) {
      x *= 1.5;
      y *= 1.5;

      tx.beginPath();                 // Begin path.
      tx.moveTo(x, y - 280.5);             // Move to initial position.
      tx.lineTo(x + 7.5, y - 280.5);             // Draw lines to make the shape.
      tx.lineTo(x, y - 217, 5);
      tx.lineTo(x - 7.5, y - 280.5);
      tx.lineTo(x, y - 280.5);
      tx.stroke();                    // Complete the path by stroking (draw lines).
      tx.fill();                      // Then fill with colour.
      tx.closePath();

      tx.beginPath();
      tx.arc(x, y, 7.5, 2 * Math.PI, Math.PI);
      tx.stroke();
      tx.fill();
      tx.closePath();

      tx.beginPath();
      tx.lineTo(x + 7.5, y);             // Draw lines to make the shape.
      tx.lineTo(x, y - 67.5);
      tx.lineTo(x - 7.5, y);
      tx.stroke();                    // Complete the path by stroking (draw lines).
      tx.fill();
      tx.closePath();

      tx.beginPath();
      tx.arc(x, y - 279, 7.5, Math.PI, 2 * Math.PI);
      tx.stroke();
      tx.fill();
      tx.closePath();
    }
    else {
      tx.beginPath();
      tx.arc(x, y, 5, 2 * Math.PI, Math.PI);
      tx.stroke();
      tx.fill();
      tx.closePath();

      tx.beginPath();                 // Begin path.
      tx.moveTo(x, y - 200);             // Move to initial position.
      tx.lineTo(x + 5, y - 182);             // Draw lines to make the shape.
      tx.lineTo(x, y - 140);
      tx.lineTo(x - 5, y - 183);
      tx.stroke();                    // Complete the path by stroking (draw lines).
      tx.fill();                      // Then fill with colour.
      tx.closePath();

      tx.beginPath();
      tx.lineTo(x + 5, y);             // Draw lines to make the shape.
      tx.lineTo(x, y - 45);
      tx.lineTo(x - 5, y);
      tx.stroke();                    // Complete the path by stroking (draw lines).
      tx.fill();
      tx.closePath();

      tx.beginPath();
      tx.arc(x, y - 182, 5, Math.PI, 2 * Math.PI);
      tx.stroke();
      tx.fill();
      tx.closePath();
    }
  }

}
// Wheel gets bigger when menus are hidden
function resizeWheel() {
  let grid = document.getElementById("div_menu");
  let winLoseTotal = document.getElementById("score1");
  
  if (gamesHidden) {
    /* grid.style.position = 'fixed';
    grid.style.left = 0;
    grid.style.right = 0;
    grid.style.bottom = "0.1%";
    grid.style.height = "5%"; */
    //power_ctrl.classList.add("mt-36");
    theWheel.centerX = 213;
    theWheel.centerY = 220;
    canvas.width = 880;
    canvas.height = 800;
    theWheel.scaleFactor = 1.5;
    theWheel.draw();
    drawTriangle();
    winLoseTotal.style.marginBottom = "15%";
  }
  else {
    power_ctrl.classList.remove("mt-36");
    //grid.style.position = 'relative';
    //grid.style.height = "84.85%";
    theWheel.centerX = 315;
    theWheel.centerY = 188;
    canvas.width = 630;
    canvas.height = 376;
    theWheel.scaleFactor = 1;
    theWheel.draw();
    drawTriangle();
    winLoseTotal.style.marginBottom = "0%";
  }
}

// When a size changes, reload segments sizes
function changeSize(games) {
  updateWheel(games);
  games.forEach(game => {
    if (theWheel.segments[parseInt(game.id)]) {
      theWheel.segments[parseInt(game.id)].size = calcWeight(parseInt(game.weight));
    }
    
  });
  theWheel.updateSegmentSizes();
}

function hideGameOnWheel(id) {
  let hidden = document.getElementById("gameHidden"+id).innerText;
  let val = document.getElementById("weight"+id).value;
  let oldVal = document.getElementById("oldWeight"+id).innerText;
  if (hidden == "false") {
    document.getElementById("weight"+id).value = 0;
    document.getElementById("oldWeight"+id).innerText = val;
    document.getElementById("gameHidden"+id).innerText = "true";
  } else {
    document.getElementById("weight"+id).value = parseInt(oldVal);
    document.getElementById("gameHidden"+id).innerText = "false";
  }
  
  
  
  
  weightChanged = true;
  save();
  
}

// function called when wheel is spinning (plays a sound)
function playTickSound() {
  // Stop and rewind the sound (stops it if already playing).
  TickAudio.pause();
  //TickAudio.currentTime = 0;

  // Play the sound.
  TickAudio.play();
}
// function to select the power at which the wheel spins
function powerSelected(powerLevel) {
  // Ensure that power can't be changed while wheel is spinning.
  if (wheelSpinning == false) {
    // Reset all to grey incase this is not the first time the user has selected the power.
    //document.getElementById('pw1').className = "";
    //document.getElementById('pw2').className = "";
    //document.getElementById('pw3').className = "";

    // Now light up all cells below-and-including the one selected by changing the class.
    if (powerLevel >= 1) {
      document.getElementById('pw1').style.background = "#80ff80";
      document.getElementById('pw2').style.background = "#cccccc";
      document.getElementById('pw3').style.background = "#cccccc";
    }

    if (powerLevel >= 2) {

      document.getElementById('pw1').style.background = "#cccccc";
      document.getElementById('pw2').style.background = "#66b3ff";
      document.getElementById('pw3').style.background = "#cccccc";
    }

    if (powerLevel >= 3) {
      document.getElementById('pw1').style.background = "#cccccc";
      document.getElementById('pw2').style.background = "#cccccc";
      document.getElementById('pw3').style.background = "#ff3333";
    }
    // Set wheelPower var used when spin button is clicked.
    wheelPower = powerLevel;

    // Light up the spin button by changing it's source image and adding a clickable class to it.
    document.getElementById('spin_button').src = "../image/spin_on.png";
  }
}

// not used
function randomizeSegments() {
  let arrRandom = [];
  let game = localStorage.getItem("games").split(',');
  for (let index = 0; index < game.length; index += param) {
    console.log("index" + index);
    arrRandom.push(parseInt(game[index + 3]));
  }
  shuffleArray(arrRandom);
  for (let index = 0; index < game.length; index += param) {
    console.log("index" + index);
    game[index + 3] = arrRandom[arrRandom.length - 1];
    arrRandom.pop();
    //arrRandom.push(arrTemp);
  }
  console.log(game);
  for (let index = 0; index < game.length; index += param) {

    theWheel.segments[parseInt(game[index + 3])].size = calcWeight(parseInt(game[index + 1]));
    theWheel.segments[parseInt(game[index + 3])].fillStyle = game[index + 2];
    theWheel.segments[parseInt(game[index + 3])].text = game[index];
    theWheel.segments[parseInt(game[index + 3])].id = game[index + 3];
    theWheel.segments[parseInt(game[index + 3])].image = ImgPath + game[index + 4];
    theWheel.segments[parseInt(game[index + 3])].textFillStyle = "#ffffff";
    theWheel.segments[parseInt(game[index + 3])].textStrokeStyle = "#000000";

  }
  theWheel.updateSegmentSizes();
  theWheel.draw()
}