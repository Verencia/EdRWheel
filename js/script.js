const PrizeAudio = new Audio("../sounds/congratulation.mp3");
const TickAudio = new Audio("../sounds/tick.mp3");
const PirateAudio = new Audio("../sounds/pirate.mp3");
const ButtonSelectAudio = new Audio("../sounds/button.mp3");
const ButtonSelectAudio2 = new Audio("../sounds/button2.mp3");
var audioTab = []
audioTab.push(ButtonSelectAudio,ButtonSelectAudio2)
const HoverAudio = new Audio("../sounds/hover.mp3");
const CloseAudio = new Audio("../sounds/close.mp3");
const OpenAudio = new Audio("../sounds/open.mp3");
const ImgPath = "../image/";
var canvas = document.getElementById("myCanvas");
var wheelPower = 0;
var wheelSpinning = false;
var gameAdded = true;
var gamesArr = [];
var gameNotDeleted = true;
var isNullSegDeleted = false;
var gamesHidden = false;
var histoHidden = false;
var colorChanged = false;
var weightChanged = false;
var titleChanged = false;
var imageChanged = false;
var histoChanged = false;
var resultChanged = false;
var archiveChanged = true;
var playedCountChanged = false;
var ongletHistoActive = false;
var ongletResumeActive = false;
var ongletGameActive = true;
var param = 13;
var winTotal = localStorage.getItem("winTotal");
var loseTotal = localStorage.getItem("loseTotal");
var histoCount = window.localStorage.getItem("histoCount");
var archiveCheated = localStorage.getItem("archiveCheated");
var count = window.localStorage.getItem("count").toString();
var oldCount = count;
var histo = window.localStorage.getItem("histo");
var Tweight = window.localStorage.getItem("Tweight");
var resultsHisto = window.localStorage.getItem("resultsHisto");
var histoTirage = window.localStorage.getItem("histoTirage");
var archive = window.localStorage.getItem("archive");
var alertDiv = document.getElementById("alert");
var animationsDiv = document.getElementById("animations");
var div_canvas = document.getElementById("div_canvas");
var power_ctrl = document.getElementById("power_ctrl");

function hoverSound() {
  HoverAudio.play();
}

function clickSound() {
  let random = Math.floor(Math.random() * audioTab.length);
  audioTab[random].play()
  //ButtonSelectAudio.play();
  
}
// Catch user leaving if draws are not archived
window.onbeforeunload = function (){
  histo = window.localStorage.getItem("histo");
	if(histo.length > 0){
		return confirm("Vous n\'avez pas sauvegardé vos changements !, Voulez vous quitter ?");
	}
}
if (Tweight == null) {
  Tweight = 0;
  window.localStorage.setItem("Tweight", Tweight);
}
if (winTotal == null) {
  winTotal = 0;
  window.localStorage.setItem("winTotal", winTotal);
}
if (loseTotal == null) {
  loseTotal = 0;
  window.localStorage.setItem("loseTotal", loseTotal);
}
if (histo == null) {
  histo = [];
  window.localStorage.setItem("histo", histo);
}

if (histoCount == null) {
  histoCount = 0;
  window.localStorage.setItem("histoCount", histoCount);
}

if (resultsHisto == null) {
  resultsHisto = [];
  window.localStorage.setItem("resultsHisto", resultsHisto);
}

if (archive == null) {
  console.log("archive est null !")
  archive = [];
  window.localStorage.setItem("archive", archive);
}
if (archiveCheated == null) {
  console.log("archarchiveCheatedive est null !")
  archiveCheated = [];
  window.localStorage.setItem("archiveCheated", archiveCheated);
}
if (histoTirage == null) {
  console.log("histoTirage est null !")
  histoTirage = [];
  window.localStorage.setItem("histoTirage", histoTirage);
}

var theWheel = new Winwheel({
  'canvasId': 'myCanvas2',
  //'responsive'   : true,

  'animation':                   // Note animation properties passed in constructor parameters.
  {
    'type': 'spinToStop',  // Type of animation.
    'duration': 5,    // Duration in seconds.
    'spins': 10,               // The number of complete 360 degree rotations the wheel is to do.
    // Remember to do something after the animation has finished specify callback function.
    'callbackSound' : 'playTickSound()',
    'callbackAfter': 'drawTriangle()',
    'callbackFinished': 'alertPrize()'
  },
});
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
// function called when spin button is pressed
function startSpin() {
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
// shows a popup with the game chosen
function alertPrize() {
  // Call getIndicatedSegment() function to return pointer to the segment pointed to on wheel.
  let winningSegment = theWheel.getIndicatedSegment();
  while (alertDiv.firstChild) { // while there is still a child inside the parent
    alertDiv.removeChild(alertDiv.firstChild); // remove the first child
  }
  alertDiv.style.width = "300px";
  alertDiv.style.height = "fit-content";
  alertDiv.style.left= "42%";
  alertDiv.classList.add("appear");
  let textGame = document.getElementById("title"+winningSegment.id).value;
  // Basic alert of the segment text which is the prize name.
  PrizeAudio.play();
  let text = document.createElement("label");
  text.innerHTML = "Tu vas runner sur <b>" + winningSegment.text + "</b> ! (" + winwheelDegreesToPercent(winningSegment.size) + "%)";

  let img = document.createElement("img");
  img.src = ImgPath + winningSegment.image;
  img.alt = "Normalement y'a une image du jeu là";
  img.style.height = "200px";
  img.style.width = "200px";
  img.classList.add("mb-1", "mt-1", "border-2", "border-black");

  let div = document.createElement("div");
  div.classList.add("flex", "justify-center");
  
  let buttonCount = document.createElement("button");
  buttonCount.innerText = "Compter";
  buttonCount.setAttribute("onclick", "countTrue(" + winningSegment.id + ",'" + winningSegment.text + "'," + winningSegment.size + ")");
  buttonCount.classList.add("menuButton", "text-white", "font-bold", "mr-2", "py-2", "px-2", "rounded")
  //menuButton  text-white font-bold py-2 px-4 rounded
  let buttonHide = document.createElement("button");
  buttonHide.innerText = "Ne pas compter";
  buttonHide.setAttribute("onclick", "cheatCount(" + winningSegment.id  + ",'" + winningSegment.text + "'," + winningSegment.size + ")");
  buttonHide.classList.add("menuButton", "text-white", "font-bold", "py-2", "px-2", "rounded")

  let buttonClose = document.createElement("button");
  buttonClose.innerText = "Fermer";
  buttonClose.setAttribute("onclick", "closeDialog()");
  buttonClose.classList.add("resetButton", "text-white", "font-bold", "py-2", "px-4", "rounded", "mt-1")

  //alertDiv.appendChild(divLight);
  alertDiv.appendChild(text);
  div.appendChild(img);
  alertDiv.appendChild(div);
  alertDiv.appendChild(buttonCount);
  alertDiv.appendChild(buttonHide);
  alertDiv.appendChild(buttonClose);

  alertDiv.style.display = "block";
  animationsDiv.style.display = "block";

  //alert("You have won " + winningSegment.text + " ! " + winwheelDegreesToPercent(winningSegment.size) + "%");
}
// Close button of the popup
function closeDialog() {
  alertDiv.style.display = "none";
  animationsDiv.style.display = "none";
  animationsDiv.classList.remove("appear");
}

// Get the ID and text of the winning segment
// Update count in the dom and add to histo
// User agreed to count this
function countTrue(winningSegmentId, winningSegmentText, winningSegmentSize) {
  //console.log("winningSegmentId " + winningSegmentId)
  //console.log("winningSegmentId-- " + winningSegmentId)
  document.getElementById("trueCount" + winningSegmentId).innerText = parseInt(document.getElementById("trueCount" + winningSegmentId).innerText) + 1;
  //document.getElementById("cheatCount" + winningSegmentId).innerText = parseInt(document.getElementById("cheatCount" + winningSegmentId).innerText) + 1;
  alertDiv.style.display = "none";
  histoChanged = true;
  document.getElementById("played" + winningSegmentId).value = parseInt(document.getElementById("played" + winningSegmentId).value) + 1;
  document.getElementById("playedSession" + winningSegmentId).innerText = parseInt(document.getElementById("playedSession" + winningSegmentId).innerText) + 1;
  document.getElementById("tas" + winningSegmentId).value = parseInt(document.getElementById("tas" + winningSegmentId).value) + 1;
  addToHisto(true, winningSegmentText, winningSegmentId, winningSegmentSize);

}
// Manually add a played game
function addPlayedGame(winningSegmentId, winningSegmentText, winningSegmentSize) {
  //console.log("winningSegmentId " + winningSegmentId)
  //console.log("winningSegmentId-- " + winningSegmentId)
  clickSound();
  histoChanged = true;
  document.getElementById("trueCount" + winningSegmentId).innerText = parseInt(document.getElementById("trueCount" + winningSegmentId).innerText) + 1;
  document.getElementById("cheatCount" + winningSegmentId).innerText = parseInt(document.getElementById("cheatCount" + winningSegmentId).innerText) + 1;
  addToHisto("manu", winningSegmentText, winningSegmentId, winningSegmentSize);

}
// Get the ID and text of the winning segment
// Update count in the dom and add to histo
// User didn't want to count this
function cheatCount(winningSegmentId, winningSegmentText, winningSegmentSize) {
  //onsole.log("winningSegmentId " + winningSegmentId)
  document.getElementById("cheatCount" + winningSegmentId).innerText = parseInt(document.getElementById("cheatCount" + winningSegmentId).innerText) + 1;
  //console.log("winningSegmentId-- " + winningSegmentId)
  alertDiv.style.display = "none";
  histoChanged = true;
  document.getElementById("tasIgnored" + winningSegmentId).value = parseInt(document.getElementById("tasIgnored" + winningSegmentId).value) + 1;
  addToHisto(false, winningSegmentText, winningSegmentId, winningSegmentSize);
}
// bool = counted or cheated
// Add to histo in localStorage
function addToHisto(bool, winningSegmentText, winningSegmentId, winningSegmentSize) {
  histoCount = localStorage.getItem('histoCount');
  histo = (localStorage.getItem('histo'));
  resultsHisto = localStorage.getItem("resultsHisto");
  if (histo != "") {
    histo = (JSON.parse(localStorage.getItem("histo")));
  } else {
    histo = [];
  }
  if (resultsHisto != "") {
    resultsHisto = (JSON.parse(localStorage.getItem("resultsHisto")));
  } else {
    resultsHisto = [];
  }
  //console.log(winningSegmentId);
  let trueCount = document.getElementById("trueCount" + winningSegmentId).innerText;
  let cheatCount = document.getElementById("cheatCount" + winningSegmentId).innerText;
  histo.push({"bool":bool,
    "title":winningSegmentText,
    "trueCount":trueCount,
    "cheatCount":cheatCount,
    "percent":winwheelDegreesToPercent(winningSegmentSize),
    "id":winningSegmentId
  })
  localStorage.setItem('histo', JSON.stringify(histo));
  if (bool == false) {
    console.log("CEST CHEATER");
    resultsHisto.push({
      "id":parseInt(histoCount),
      "result": "cheated"});
    resultsHisto = localStorage.setItem('resultsHisto', JSON.stringify(resultsHisto));
  }
  histoCount++;
  histoCount = localStorage.setItem('histoCount', histoCount);
  updateHisto();
  closeDialog();
}

function delButton(histoCount2,winningSegmentId){
  
  if (!confirm("Veux tu vraiment supprimer cette run ?"))
 {
    return;
  }
  clickSound();
  histo = (JSON.parse(localStorage.getItem("histo")));
  let deleted = histo.splice(histoCount2,1);
  histoCount = localStorage.getItem("histoCount");
  histoCount--;
  localStorage.setItem("histoCount",histoCount);

  let trueCount = 0;
  let cheatCount = 0;
  let title = deleted[0].title;
  let counter = 0;
  let win = false;
  let lose = false;
  let cheated = false

  if (resultsHisto != "") {
    resultsHisto = (JSON.parse(localStorage.getItem("resultsHisto")));
  } else {
    resultsHisto = [];
  }
  resultsHisto.forEach(result => {
    console.log("histo2 " + histoCount2);
    if (result.id == histoCount2) {
      if (result.result == "cheated") {
        console.log("c est cheaté ça");
        cheated = true;
      }
      else if (result.result == true) {
        console.log("c est win");
        winTotal = localStorage.getItem("winTotal");
        localStorage.setItem("winTotal",parseInt(winTotal)-1);
        win = true;
      } else {
        console.log("c est lose");
        loseTotal = localStorage.getItem("loseTotal");
        localStorage.setItem("loseTotal",parseInt(loseTotal)-1);
        lose = true;
      }
      resultsHisto.splice(resultsHisto.indexOf(result),1);
    }  
  });
  console.log(resultsHisto);
  resultsHisto.forEach(result => {
    if (result.id > histoCount2) {
      result.id-=1;
    }
    
  });
  console.log(resultsHisto);
  window.localStorage.setItem("resultsHisto", JSON.stringify(resultsHisto));

  if (deleted[0].bool == 'manu') {
    trueCount += 1;
    cheatCount += 1;
  } else if (deleted[0].bool == true) {
    trueCount += 1;
  }
  else {
    
    cheatCount += 1;
  }
  console.log("CHECK HISTO");
  console.log(histo);
  histo.forEach(tirage => {
    console.log(counter + " " + histoCount2);
    if (counter >= histoCount2  && tirage.title == title ) {
      if (tirage.bool == 'manu') {
        console.log("C'est une run manu");
        tirage.trueCount = (parseInt(tirage.trueCount) - 1);
        tirage.cheatCount = (parseInt(tirage.cheatCount) - 1);
      } else if (tirage.bool == true) {
        console.log("C'est une run true");
        tirage.trueCount = (parseInt(tirage.trueCount) - 1);
      }
      else {
        console.log("C'est une run cheat");
        tirage.cheatCount = (parseInt(tirage.cheatCount) - 1);
      }
    }
    counter++;
  });
  console.log("CHECK HISTO 2");
  console.log(histo);
  console.log(trueCount +" " + cheatCount);
  games = JSON.parse(localStorage.getItem("games"));
  games.forEach(game => {
    if (game.title == title) {
      game.trueCount = parseInt(game.trueCount) - trueCount;
      game.cheatCount = parseInt(game.cheatCount) - cheatCount;
      if (win || lose) {
        if (win) {
          game.win--;
          game.winSession--;
        }
        if (lose) {
          game.lose--;
          game.loseSession--;
        }
        game.played--;
        game.playedSession--;
      } 
      
      console.log(game);
    }
  });
  histoChanged = true;
  window.localStorage.setItem("histo", JSON.stringify(histo));
  window.localStorage.setItem("games", JSON.stringify(games));
  gameAdded = true;
  
  load();
  updateHisto();
  //load();
}
// Show histo[id,%,cheatCount,trueCount,text,bool] reverse
function updateHisto() {
  
  divHisto = document.getElementById("historique");
  histo = (localStorage.getItem('histo'));
  resultsHisto = localStorage.getItem("resultsHisto");
  if (histo != "") {
    histo = (JSON.parse(localStorage.getItem("histo")));
  } else {
    histo = [];
  }
  if (resultsHisto != "") {
    resultsHisto = (JSON.parse(localStorage.getItem("resultsHisto")));
  } else {
    resultsHisto = [];
  }
  //console.log(resultsHisto);
  //histo.reverse();
  //console.log(histo);
  while (divHisto.firstChild) { // while there is still a child inside the parent
    divHisto.removeChild(divHisto.firstChild); // remove the first child
  }
  //console.log("avant for");
  let histoCount = 0;
  histo.forEach(tirage => {
    let winningSegmentId = tirage.id;
    let winningSegmentTitle = tirage.title;
    let div = document.createElement("div");
    let divTexte = document.createElement("div");
    let divButton = document.createElement("div");
    let divResultat = document.createElement("div");

    let buttonDelete = document.createElement("button");
    let buttonW = document.createElement("button");
    let buttonL = document.createElement("button");
    let buttonArrow = document.createElement("button");
    let imgArrow = document.createElement("img");
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    let pResultChosen = document.createElement("p");
    let pResult = document.createElement("p");
    let pIdGame = document.createElement("p");
    let pPosition = document.createElement("p");

    div.style.backgroundColor = "#ffe88f";
    div.classList.add("grid","grid-cols-2","border-solid", "border-2", "border-black", "mb-1","justify-center")

    divTexte.classList.add("text-right")

    divButton.id = "divButton" + histoCount;
    divButton.classList.add("flex","justify-items-start","ml-5");

    divResultat.id = "divResultat" + histoCount;
    divResultat.classList.add("hideContent", "ml-4");

    buttonDelete.classList.add("delButton","absolute","pl-1", "pr-1", "mr-1","ml-1","font-bold", "text-red-600", "justify-self-end");
    buttonDelete.innerText = "X";
    buttonDelete.setAttribute("onclick", "delButton(" + histoCount + "," + winningSegmentId + ")");

    buttonW.classList.add("pl-1", "pr-1", "mr-1","ml-1", "font-bold", "text-green-600", "bg-white", "border", "border-black", "justify-self-end");
    buttonW.innerText = "W";
    buttonW.setAttribute("onclick", "winButton(" + histoCount + "," + winningSegmentId + ")");

    buttonL.classList.add("pl-1", "pr-1", "font-bold", "text-red-600", "bg-white", "border", "border-black", "justify-self-end");
    buttonL.innerText = "L";
    buttonL.setAttribute("onclick", "loseButton(" + histoCount + "," + winningSegmentId + ")");

    buttonArrow.id = "buttonArrow" + histoCount;
    buttonArrow.setAttribute("onclick", "swapResult(" + histoCount + "," + winningSegmentId + ")");
    imgArrow.src = ImgPath + "arrowR.svg";
    imgArrow.style.height = "20px";
    imgArrow.style.weight = "20px";
    p.classList.add("font-bold");
    p2.classList.add("font-bold", "mr-2");

    pResultChosen.id = "pResultChosen" + histoCount;
    pResultChosen.classList.add("hideContent");
    pResult.id = "pResult" + histoCount;
    pResult.classList.add("hideContent");
    pIdGame.id = "pIdGame" + histoCount;
    pPosition.id = "pPosition" + histoCount;
    pResultChosen.innerText = "false";
    pResult.innerText = "";
    resultsHisto.forEach(results => {
      if (histoCount == parseInt(results.id)) {
          pResultChosen.innerText = "true";
          pResult.innerText = results.result;
          divButton.style.display = "none";
          divResultat.classList.remove("hideContent");
          divResultat.classList.add("flex");
          if (results.result == true) {
            console.log(" RUN WIN");
            p2.innerText = "Run gagnée";
            p2.classList.add("text-green-600");
          }
          else if (results.result == false) {
            console.log(" RUN LOSE");
            p2.innerText = "Run perdue";
            p2.classList.add("text-red-600");
          }
          else if (results.result == "cheated") {
            console.log(" RUN CHEATE");
            p2.innerText = "Run cheaté";
            p2.classList.add("text-blue-600");
          }
      }
      /* else {
        pResultChosen.innerText = "false";
        pResult.innerText = "";
      } */
    });
    pIdGame.innerText = winningSegmentId;
    pIdGame.classList.add("hideContent");
    pPosition.innerText = histoCount;
    pPosition.classList.add("hideContent");
    //console.log("ici !" +tirage.bool)
    if (tirage.bool == true) {
      p.innerText = "Vous avez tiré " + tirage.title + " - Joué " + tirage.trueCount+ "(" + tirage.cheatCount + ")" + " - (" + tirage.percent+ "%)";
    } else if (tirage.bool == "manu") {
      p.innerText = "Vous avez ajouté une run de : " + tirage.title + " - " + tirage.trueCount+ "(" + tirage.cheatCount + ")";
    }
    else {
      p.innerText = "Vous avez tiré " + tirage.title + " - Cheaté " + tirage.trueCount + "(" + tirage.cheatCount + ")" + " - (" + tirage.percent+ "%)";
    }
    divTexte.appendChild(p);

    divResultat.appendChild(p2);
    if (tirage.bool == true || tirage.bool == "manu") {
      divButton.appendChild(buttonW);
      divButton.appendChild(buttonL);

      buttonArrow.appendChild(imgArrow);
      divResultat.appendChild(buttonArrow);
    }
    divButton.appendChild(buttonDelete);
    divResultat.appendChild(pResultChosen);
    divResultat.appendChild(pResult);
    divResultat.appendChild(pIdGame);
    divResultat.appendChild(pPosition);
    div.appendChild(divTexte);
    div.appendChild(divButton);
    div.appendChild(divResultat);
    div.appendChild(buttonDelete);
    divHisto.appendChild(div);
    histoCount++;    
  });
  if (histoCount != 0) {
    document.getElementById("textHisto").classList.add("hideContent");
    document.getElementById("textHisto").classList.remove("showContent");
  }
      
  save();
}
//resultsHisto[idHisto,resultChosen,result]
function updateIdHisto() {
  histo = (localStorage.getItem('histo'));
  if (histo != "") {
    histo = (JSON.parse(localStorage.getItem("histo")));
  } else {
    histo = [];
  }
  games = JSON.parse(localStorage.getItem("games"));

  games.forEach(game => {
    let id = game.id;
    let title = game.title;
    histo.forEach(tirage => {
      if (tirage.title == String(title)) {
        console.log("Oui c'est égale");
        tirage.id = id - 1;
        console.log(tirage.id );
      }
    });
  });
  localStorage.setItem('histo', JSON.stringify(histo));
  updateHisto();
}
// When you clicked on W button
// Add result to resultsHisto
function winButton(histoCount, winningSegmentId) {
  let divButton = document.getElementById("divButton" + histoCount);
  let divResultat = document.getElementById("divResultat" + histoCount);
  let pResultChosen = document.getElementById("pResultChosen" + histoCount);
  let pResult = document.getElementById("pResult" + histoCount);
  //let games = JSON.parse(window.localStorage.getItem("games"));
  /* let winningSegmentId;
  games.forEach(game => {
    if (game.title == winningSegmentTitle) {
      winningSegmentId = game.id - 1;
    }
  }); */
  let win = document.getElementById("win" + winningSegmentId);
  let winSession = document.getElementById("winSession" + winningSegmentId);
  resultsHisto = localStorage.getItem("resultsHisto");
  if (resultsHisto != "") {
    resultsHisto = (JSON.parse(localStorage.getItem("resultsHisto")));
  } else {
    resultsHisto = [];
  }

  divButton.style.display = "none";
  divResultat.classList.remove("hideContent");
  divResultat.classList.add("flex");
  divResultat.firstElementChild.innerText = "Run gagnée";
  divResultat.firstElementChild.classList.add("text-green-600");

  pResultChosen.innerText = "true";
  pResult.innerText = "true";

  resultsHisto.push({"id":histoCount, "result":true});
  window.localStorage.setItem("resultsHisto", JSON.stringify(resultsHisto));
  win.innerText = parseInt(win.innerText) + 1;
  winSession.innerText = parseInt(winSession.innerText) + 1;
  resultChanged = true;
  addWinTotal();
  save();
}
// When you clicked on L button
// Add result to resultsHisto
function loseButton(histoCount, winningSegmentId) {
  let divButton = document.getElementById("divButton" + histoCount);
  let divResultat = document.getElementById("divResultat" + histoCount);
  let pResultChosen = document.getElementById("pResultChosen" + histoCount);
  let pResult = document.getElementById("pResult" + histoCount);
  let lose = document.getElementById("lose" + winningSegmentId);
  let loseSession = document.getElementById("loseSession" + winningSegmentId)

  resultsHisto = localStorage.getItem("resultsHisto");
  if (resultsHisto != "") {
    resultsHisto = (JSON.parse(localStorage.getItem("resultsHisto")));
  } else {
    resultsHisto = [];
  }

  divButton.style.display = "none";
  divResultat.classList.remove("hideContent");
  divResultat.classList.add("flex");
  divResultat.firstElementChild.innerText = "Run perdue";
  divResultat.firstElementChild.classList.add("text-red-600");

  pResultChosen.innerText = "true";
  pResult.innerText = "false";

  resultsHisto.push({"id":histoCount, "result":false});
  window.localStorage.setItem("resultsHisto", JSON.stringify(resultsHisto));
  console.log(resultsHisto);
  lose.innerText = parseInt(lose.innerText) + 1;
  loseSession.innerText = parseInt(loseSession.innerText) + 1;

  resultChanged = true;
  addLoseTotal();
  save();

}
// You swap the result of a played game
function swapResult(histoCount, winningSegmentId) {
  console.log("laaaaaaaaaaaaaa " +winningSegmentId);
  let divResultat = document.getElementById("divResultat" + histoCount);
  let pResult = document.getElementById("pResult" + histoCount);
  console.log(pResult);
  
  let win = document.getElementById("win" + winningSegmentId);
  let winSession = document.getElementById("winSession" + winningSegmentId);
  let lose = document.getElementById("lose" + winningSegmentId);
  let loseSession = document.getElementById("loseSession" + winningSegmentId)
  resultsHisto = localStorage.getItem("resultsHisto");
  if (resultsHisto != "") {
    resultsHisto = (JSON.parse(localStorage.getItem("resultsHisto")));
  } else {
    resultsHisto = [];
  }

  if (pResult.innerText == "true") {
    console.log("LAAAAAAAAAAAAAAAAAAAAA")
    pResult.innerText = "false";
    divResultat.firstElementChild.innerText = "Run perdue";
    divResultat.firstElementChild.classList.add("text-red-600");
    divResultat.firstElementChild.classList.remove("text-green-600");
    lose.innerText = parseInt(lose.innerText) + 1;
    loseSession.innerText = parseInt(loseSession.innerText) + 1;
    win.innerText = parseInt(win.innerText) - 1;
    winSession.innerText = parseInt(winSession.innerText) - 1;
    resultsHisto.forEach(result => {
      if (result.id == histoCount) {
        console.log("JE SWAP");
        result.result = false;
        window.localStorage.setItem("resultsHisto", JSON.stringify(resultsHisto));
      }
    });
    swapWinTotal();
  }
  else {
    pResult.innerText = "true";
    divResultat.firstElementChild.innerText = "Run gagnée";
    divResultat.firstElementChild.classList.add("text-green-600");
    divResultat.firstElementChild.classList.remove("text-red-600");
    lose.innerText = parseInt(lose.innerText) - 1;
    loseSession.innerText = parseInt(loseSession.innerText) - 1;
    win.innerText = parseInt(win.innerText) + 1;
    winSession.innerText = parseInt(winSession.innerText) + 1;
    resultsHisto.forEach(result => {
      //console.log(resultsHisto[index]);
      if (result.id == histoCount) {
        console.log("JE SWAP");
        result.result = true;
        window.localStorage.setItem("resultsHisto", JSON.stringify(resultsHisto));
      }
    });
    swapLoseTotal();
  }
  resultChanged = true;
  save();

}
// Add zeros to date
function addZero(i) {
  if (i < 10) { i = "0" + i }
  return i;
}
// histo[bool,text,trueCount,cheatCount,%,id]
// game[title,weight,color,id,imgName,trueCount,cheatCount,played,win,lose,winSession,loseSession,playedSession]
// Archive draws 
function archiveSession() {
  
  histoCount = window.localStorage.getItem("histoCount", histoCount);
  if (histoCount ==0)return;
  histoCount = 0;
  window.localStorage.setItem("histoCount", histoCount);
  
  archiveChanged = true;
  histo = (localStorage.getItem('histo'));
  resultsHisto = localStorage.getItem("resultsHisto");
   archiveCheated = localStorage.getItem("archiveCheated");

  if (histo != "") {
    histo = (JSON.parse(localStorage.getItem("histo")));
  } else {
    histo = [];
  }
  if (resultsHisto != "") {
    resultsHisto = (JSON.parse(localStorage.getItem("resultsHisto")));
  } else {
    resultsHisto = [];
  }
  if (archiveCheated != "") {
    archiveCheated = (JSON.parse(localStorage.getItem("archiveCheated")));
  } else {
    archiveCheated = [];
  }
  for (let index = 0; index < histo.length; index++) {
    if (document.getElementById("pResultChosen" + index).innerText == "false") {
      confirm("Merci de choisir un résultat pour les runs terminées");
      return;
    }
  }
  document.getElementById("textHisto").classList.remove("hideContent");
  document.getElementById("textHisto").classList.add("showContent");
  let games = JSON.parse(window.localStorage.getItem("games"));
  histoTirage = (localStorage.getItem("histoTirage"));
  if (histoTirage != "") {
    histoTirage = (JSON.parse(localStorage.getItem("histoTirage")));
  } else {
    histoTirage = [];
  }
  let arrTirage = [];
  let arrTirageCheat = {};
  histo.forEach(tirage => {
    resultsHisto.forEach(result => {
      if (histoCount == parseInt(result.id)) {
        arrTirage.push({ "id": tirage.id, "percent": tirage.percent, "cheatCount": tirage.cheatCount, "trueCount": tirage.trueCount, "text": tirage.title, "trueOrCheat": tirage.bool, "wonOrLost": result.result });
        if (tirage.bool ==  false) {
          if (!(tirage.title in arrTirageCheat)) {
            // no order found, add this one
            arrTirageCheat[tirage.title] = 1
          } else{
            // order found, add the date
            arrTirageCheat[tirage.title] += 1
          }
        }
      }
    });
    
    histoCount++;
  });
  archiveCheated.push(arrTirageCheat);
  localStorage.setItem("archiveCheated", JSON.stringify(archiveCheated));
  histo = [];
  resultsHisto = [];
  archive = (localStorage.getItem("archive"));
  if (archive != "") {
    archive = (JSON.parse(localStorage.getItem("archive")));
  } else {
    archive = [];
  }
  let arrArchive = [];
  arrArchive.push({"date": today()});
  games.forEach(game => {
    if (parseInt(game.playedSession) != 0) {
      var toBeArchived = { "title": game.title, "win": game.winSession, "lose": game.loseSession, "played": game.playedSession, "date": today() };
      arrArchive.push(toBeArchived);
    }
  });

  archive.push(arrArchive);
  histoTirage.push(arrTirage);
  histoTirage = JSON.stringify(histoTirage);
  localStorage.setItem("histoTirage", histoTirage);
  archive = JSON.stringify(archive);
  localStorage.setItem("archive", archive);
  archive = JSON.parse(localStorage.getItem("archive"));
  localStorage.setItem("histo", histo);
  localStorage.setItem("resultsHisto", resultsHisto);
  updateHisto();
  updateResumeSession();
  resetSession();
}
// get today's date
function today(){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  let h = addZero(today.getHours());
  let m = addZero(today.getMinutes());
  //let s = addZero(today.getSeconds());

  today = dd + '/' + mm + '/' + yyyy + " " + h + ":" + m;
  return today;
}
// Show archived game sessions
function updateResumeSession() {
  let resumeSession = document.getElementById("resumeSession");
  while (resumeSession.firstChild) { // while there is still a child inside the parent
    resumeSession.removeChild(resumeSession.firstChild); // remove the first child
  }
  let winTotal = 0;
  let loseTotal = 0;
  let sessionCount = 0;
  archive = (JSON.parse(localStorage.getItem("archive")));
  archiveCheated = localStorage.getItem("archiveCheated");
  
  if (archiveCheated != "") {
    archiveCheated = (JSON.parse(localStorage.getItem("archiveCheated")));
  } else {
    archiveCheated = [];
  }
  archive.forEach(archivedGame => {
    let win = 0;
    let lose = 0;
    let div = document.createElement("div");
    let divLeft = document.createElement("div");
    let divRight = document.createElement("div");
    let sessionDate = document.createElement("p");
    let score = document.createElement("p");
    //let scoreTotal = document.createElement("p");
    let buttonShowTirage = document.createElement("button");
    buttonShowTirage.setAttribute("onclick", "showTirage(" + sessionCount + ",'" + archivedGame[0].date + "')");

    buttonShowTirage.classList.add("bg-white", "p-1", "border-2", "border-black", "font-bold", "mb-1", "mt-1");
    buttonShowTirage.innerText = "Voir tirage";
    divLeft.classList.add("border-r", "border-gray-400")
    div.classList.add("flex", "grid", "grid-cols-2", "session", "m-2", "rounded", "font-medium");


    archivedGame.forEach(gameResults => {
      //console.log(gameResults);
      if (gameResults.win || gameResults.lose) {
      win += parseInt(gameResults.win);
      lose += parseInt(gameResults.lose);
      winTotal += parseInt(gameResults.win);
      loseTotal += parseInt(gameResults.lose);
      let p = document.createElement("p");
      p.innerText = gameResults.title + " " + gameResults.win + "W / " + gameResults.lose + "L";
      divRight.prepend(p);
      }
    });
    
    let object = archiveCheated[sessionCount];
    if (!isEmpty(object)) {
      let p = document.createElement("p");
      p.innerText = "Run cheatées : ";
      divRight.appendChild(p);
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          let p = document.createElement("p");
          p.innerText = key + " | " + object[key];
          divRight.appendChild(p);
        }
      }
    }
    
      
    sessionDate.innerText = "Résumé session " + archivedGame[0].date;
    divLeft.appendChild(sessionDate);
    score.innerText = "Score : " + win + "W / " + lose + "L " + " | Score Total : " + winTotal + "W / " + loseTotal + "L";
    divLeft.appendChild(score);
    //scoreTotal.innerText = "Score Total : " + winTotal +"W / " + loseTotal + "L";
    //divLeft.appendChild(scoreTotal);
    divLeft.appendChild(buttonShowTirage);
    div.appendChild(divLeft);
    div.appendChild(divRight);
    resumeSession.appendChild(div);
    //localStorage.setItem("winTotal", winTotal);
    //localStorage.setItem("loseTotal", loseTotal);
    sessionCount++;

  });
  //updateWinLoseTotal();
}
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}
// Allows to see draws of selected session
function showTirage(sessionCount, date) {
  histoTirage = localStorage.getItem("histoTirage");
  let buttonClose = document.createElement("button");
  let p3 = document.createElement("p");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  let histoCount = 0;
  alertDiv.style.width = "700px";
  alertDiv.style.height = "400px";
  alertDiv.classList.remove("appear");
  animationsDiv.style.display = "none";
  if (histoTirage != "") {
    histoTirage = (JSON.parse(localStorage.getItem("histoTirage")));
    tirageToShow = histoTirage[sessionCount];

    while (alertDiv.firstChild) { // while there is still a child inside the parent
      alertDiv.removeChild(alertDiv.firstChild); // remove the first child
    }

    if (tirageToShow.length > 10) {
      div3.classList.add("h-5/6", "overflow-y-scroll", "[&::-webkit-scrollbar]:w-2", "[&::-webkit-scrollbar-track]:bg-gray-100", "[&::-webkit-scrollbar-thumb]:bg-gray-300");
      div2.classList.add("h-1/2");
    }
    tirageToShow.forEach(tirage => {
      let div = document.createElement("div");

      let divTexte = document.createElement("div");
      let divResultat = document.createElement("div");
      let p = document.createElement("p");
      let p2 = document.createElement("p");
      let pResultChosen = document.createElement("p");
      let pResult = document.createElement("p");
      let pIdGame = document.createElement("p");
      let pPosition = document.createElement("p");

      div.style.backgroundColor = "#ffe88f";
      div.classList.add("border-solid", "border-2", "border-black", "mb-1","grid","grid-cols-3")

      divTexte.classList.add( "ml-1","flex","col-span-2")

      divResultat.id = "divResultat" + histoCount;
      divResultat.classList.add("ml-4");

      p.classList.add("font-bold");
      p2.classList.add("font-bold", "mr-2", "text-left");

      pResultChosen.id = "pResultChosen" + histoCount;
      pResultChosen.classList.add("hideContent");
      pResult.id = "pResult" + histoCount;
      pResult.classList.add("hideContent");
      pIdGame.id = "pIdGame" + histoCount;
      pPosition.id = "pPosition" + histoCount;

      if (tirage.trueOrCheat == true || tirage.trueOrCheat == "manu" ) {
        if (tirage.wonOrLost == true) {
          p2.innerText = "Run gagnée";
          p2.classList.add("text-green-600");

        } else {
          p2.innerText = "Run perdue";
          p2.classList.add("text-red-600");
        }
      } else {
        p2.innerText = "Run cheatée";
        p2.classList.add("text-blue-600");
      }

      pPosition.innerText = histoCount;
      pPosition.classList.add("hideContent");
      //console.log(histo);
      if (tirage.text.length > 19) {
        tirage.text = replaceChar(tirage.text,"...",16);
      }
      if (tirage.trueOrCheat == true) {
        p.innerText = "Vous avez tiré " + tirage.text + " - Joué " + tirage.trueCount + "(" + tirage.cheatCount + ")" + " - (" + tirage.percent + "%)";
      } else if (tirage.trueOrCheat == "manu") {
        p.innerText = "Vous avez ajouté " + tirage.text + " - Joué " + tirage.trueCount + "(" + tirage.cheatCount + ")" + " - (" + tirage.percent + "%)";
      }
      else {
        p.innerText = "Vous avez tiré " + tirage.text + " - Cheaté " + tirage.trueCount + "(" + tirage.cheatCount + ")" + " - (" + tirage.percent + "%)";
      }
      divTexte.appendChild(p);
      divResultat.appendChild(p2);
      divResultat.appendChild(pResultChosen);
      divResultat.appendChild(pResult);
      divResultat.appendChild(pIdGame);
      divResultat.appendChild(pPosition);
      div.appendChild(divTexte);
      div.appendChild(divResultat);
      div2.appendChild(div);

      histoCount++;

    });
  
    p3.innerText = "Tirage session  " + date + " (" + histoCount + " tirages)";
    p3.classList.add("font-semibold");
    alertDiv.appendChild(p3);
    buttonClose.innerText = "Close";
    buttonClose.setAttribute("onclick", "closeDialog()");
    buttonClose.classList.add("resetButton", "text-white", "font-bold", "py-2", "px-4", "rounded", "mt-1");
    buttonClose.style.display = "absolute";
    buttonClose.style.bottom = "0px";
    div3.appendChild(div2);
    div3.classList.add("h-5/6");
    alertDiv.appendChild(div3);
    alertDiv.appendChild(buttonClose);
    alertDiv.style.display = "block";
    alertDiv.style.left = "33%";
  }
  console.log(histoTirage[sessionCount]);
}
// Resets counters after archiving
function resetSession() {
  for (let index = 0; index < parseInt(count); index++) {
    document.getElementById("winSession" + index).innerText = 0;
    document.getElementById("loseSession" + index).innerText = 0;
    document.getElementById("playedSession" + index).innerText = 0;
    resultChanged = true;
    save();
  }
}
function replaceChar(origString, replaceChar, index) {
  let firstPart = origString.substr(0, index);
  //let lastPart = origString.substr(index + 1);
    
  let newString = firstPart + replaceChar;
  return newString;
}
// Updates totals wins and loses
function updateWinLoseTotal() {
  winTotal = localStorage.getItem("winTotal");
  loseTotal = localStorage.getItem("loseTotal");
  let divWinTotal = document.getElementById("winTotal");
  let divLoseTotal = document.getElementById("loseTotal");
  divWinTotal.innerText = winTotal;
  divLoseTotal.innerText = loseTotal;
}
function addWinTotal() {
  winTotal = localStorage.getItem("winTotal");
  localStorage.setItem("winTotal",parseInt(winTotal)+1);
  updateWinLoseTotal();
}

function addLoseTotal() {
  loseTotal = localStorage.getItem("loseTotal");
  localStorage.setItem("loseTotal",parseInt(loseTotal)+1);
  updateWinLoseTotal();
}

function swapWinTotal() {
  winTotal = localStorage.getItem("winTotal");
  loseTotal = localStorage.getItem("loseTotal");
  localStorage.setItem("winTotal",parseInt(winTotal)-1);
  localStorage.setItem("loseTotal",parseInt(loseTotal)+1);
  updateWinLoseTotal();
  
}

function swapLoseTotal() {
  winTotal = localStorage.getItem("winTotal");
  loseTotal = localStorage.getItem("loseTotal");
  localStorage.setItem("winTotal",parseInt(winTotal)+1);
  localStorage.setItem("loseTotal",parseInt(loseTotal)-1);
  updateWinLoseTotal();
}
// Converts segments degrees to a percentage
function winwheelDegreesToPercent(deg) {
  return (deg * 100 / 360).toFixed(2);
}
// When you click on "Add game"
// Creates a new div in game section
function addGame() {
  
  gameAdded = true;
  let div = document.createElement("div");
  let divDetails = document.createElement("div");
  let divGrid = document.createElement("div");

  divDetails.classList.add("divDetail");

  div.id = "div_" + count;
  div.classList.add("flex", "pb-5","box");
  div.setAttribute('draggable', true);

  divDetails.id = "div_det_" + count;
  divDetails.classList.add("flex", "grid", "grid-cols-2", "border-solid", "border-2", "borderGame2", "rounded-md", "p-1");

  divGrid.id = "div_grid" + count;
  divGrid.classList.add("flex", "grid", "grid-cols-2", "col-span-2", "gap-y-1");

  let labelTitle = document.createElement("label");
  labelTitle.for = "title" + count;
  labelTitle.innerText = "Titre du jeu : ";

  let title = document.createElement("input");
  title.type = "text";
  title.name = "title" + count;
  title.id = "title" + count;
  title.value = "";
  title.setAttribute("onchange", "titlesChanged()");
  title.setAttribute("onfocusout", "save()");
  title.classList.add("border-solid", "border-2", "borderGame","title");

  let labelWeight = document.createElement("label");
  labelWeight.for = "weight" + count;
  labelWeight.innerText = "Poids : ";

  let weight = document.createElement("input");
  weight.type = "number";
  weight.name = "weight" + count;
  weight.id = "weight" + count;
  weight.value = "0";
  weight.setAttribute("onchange", "weightsChanged()");
  weight.setAttribute("onfocusout", "save()");
  weight.setAttribute("min", 0);
  weight.classList.add("border-solid", "border-2", "borderGame","weight");

  let color = document.createElement("input");
  color.type = "color";
  color.name = "color" + count;
  color.value = "#f6b73c";
  color.id = "color" + count;
  color.classList.add("border-solid", "border-2", "borderGame","color");
  color.setAttribute("onchange", "colorsChanged()");
  color.setAttribute("onfocusout", "save()");

  let labelColor = document.createElement("label");
  labelColor.for = "color" + count;
  labelColor.innerText = "Couleur : ";

  let labelImg = document.createElement("label")
  labelImg.for = "img" + count;
  labelImg.innerText = "Image : ";

  let imgSelect = document.createElement("input");
  imgSelect.type = "file";
  imgSelect.name = "img" + count;
  imgSelect.id = "img" + count;
  imgSelect.classList.add("border-solid", "border-2", "borderGame");
  imgSelect.setAttribute("onchange", "imagesChanged(this)");
  imgSelect.setAttribute("onfocusout", "save()");

  let imgName = document.createElement("p");
  imgName.id = "imgName" + count;
  imgName.style = "display:none";
  imgName.classList.add("imgName");

  let img = document.createElement("img");
  img.id = "imgShow" + count;
  img.classList.add("mr-2", "ml-1");
  img.style.height = "200px";
  img.style.width = "200px";

  let trueCount = document.createElement("p");
  trueCount.id = "trueCount" + count;
  trueCount.style = "display:none";
  trueCount.innerText = 0;
  trueCount.classList.add("trueCount");

  let cheatCount = document.createElement("p");
  cheatCount.id = "cheatCount" + count;
  cheatCount.style = "display:none";
  cheatCount.innerText = 0;
  cheatCount.classList.add("cheatCount");

  let buttonDelete = document.createElement("button");
  buttonDelete.id = "buttonDelete" + count;
  buttonDelete.classList.add("text-white", "bg-red-700", "col-span-2","buttonDelete");
  buttonDelete.innerText = "DELETE";
  buttonDelete.setAttribute("onclick", "deleteGame(" + count + ")");
  buttonDelete.setAttribute("onmouseover", "hoverSound()");

  let titleResult = document.createElement("p");
  titleResult.innerText = "Résultats";
  titleResult.classList.add("col-span-2");

  let labelTas = document.createElement("label");
  labelTas.for = "labelTas" + count;
  labelTas.innerText = ": Tirage au sort";

  let tas = document.createElement("input");
  tas.id = "tas" + count;
  tas.type = "number";
  tas.classList.add("border-solid", "border-2", "borderGame", "ltr");

  let labelTasIgnored = document.createElement("label");
  labelTasIgnored.for = "labelTas" + count;
  labelTasIgnored.innerText = ": Tirage ignoré";

  let tasIgnored = document.createElement("input");
  tasIgnored.id = "tasIgnored" + count;
  tasIgnored.type = "number";
  tasIgnored.classList.add("border-solid", "border-2", "borderGame", "ltr");

  let labelPlayed = document.createElement("label");
  labelPlayed.for = "labelPlayed" + count;
  labelPlayed.innerText = ": Parties jouées";
  labelPlayed.classList.add("align-middle");

  let played = document.createElement("input");
  played.id = "played" + count;
  played.value = "0";
  played.type = "number";
  played.classList.add("border-solid", "border-2","played", "borderGame", "ltr");
  played.setAttribute("onchange", "playedChanged()");
  played.setAttribute("onfocusout", "save()");
  played.setAttribute('disabled', '');

  let divEmpty = document.createElement("div");

  let addPlayed = document.createElement("button");
  addPlayed.id = "addPlayed" + count;
  addPlayed.innerText = "Ajouter partie";
  addPlayed.classList.add("text-white", "bg-blue-700", "mr-1","addPlayed");
  addPlayed.setAttribute("onclick", "addPlayed(" + count + ")");
  addPlayed.setAttribute("onmouseover", "hoverSound()");

  let win = document.createElement("p");
  win.id = "win" + count;
  win.innerText = "0";
  win.classList.add("hideContent","win");

  let lose = document.createElement("p");
  lose.id = "lose" + count;
  lose.innerText = "0";
  lose.classList.add("hideContent","lose");

  let winSession = document.createElement("p");
  winSession.id = "winSession" + count;
  winSession.innerText = 0;
  winSession.classList.add("hideContent","winSession");

  let loseSession = document.createElement("p");
  loseSession.id = "loseSession" + count;
  loseSession.innerText = 0;
  loseSession.classList.add("hideContent","loseSession");

  let playedSession = document.createElement("p");
  playedSession.id = "playedSession" + count;
  playedSession.innerText = 0;
  playedSession.classList.add("hideContent","playedSession");

  let oldWeight = document.createElement("p");
  oldWeight.id = "oldWeight" + count;
  oldWeight.innerText = 0;
  oldWeight.classList.add("hideContent","oldWeight");

  let gameHidden = document.createElement("p");
  gameHidden.id = "gameHidden" + count;
  gameHidden.innerText = "false"
  gameHidden.classList.add("hideContent","gameHidden");  

  div.appendChild(img);
  divGrid.appendChild(titleResult);
  divGrid.appendChild(title);
  divGrid.appendChild(labelTitle);

  divGrid.appendChild(tas);
  divGrid.appendChild(labelTas);
  divGrid.appendChild(weight);
  divGrid.appendChild(labelWeight);

  divGrid.appendChild(tasIgnored);
  divGrid.appendChild(labelTasIgnored);
  divGrid.appendChild(color);
  divGrid.appendChild(labelColor);

  divGrid.appendChild(played);
  divGrid.appendChild(labelPlayed);
  divGrid.appendChild(imgSelect);
  divGrid.appendChild(labelImg);

  divGrid.appendChild(trueCount);
  divGrid.appendChild(cheatCount);
  divGrid.appendChild(imgName);

  divGrid.appendChild(buttonDelete);
  divGrid.appendChild(divEmpty);
  divGrid.appendChild(addPlayed);
  divGrid.appendChild(divEmpty);

  divGrid.appendChild(win);
  divGrid.appendChild(lose);
  divGrid.appendChild(winSession);
  divGrid.appendChild(loseSession);
  divGrid.appendChild(playedSession);
  divGrid.appendChild(oldWeight);
  divGrid.appendChild(gameHidden);

  divDetails.appendChild(divGrid);
  div.appendChild(divDetails);
  //document.getElementById("games").appendChild(div);
  document.getElementById("games").insertBefore(div, document.getElementById("games").firstChild)
  gamesArr.push(div);
  count++;
  save();
}
function showGameDetails(id) {
  let detailsOpened = document.getElementById("detailsOpened"+id);
  let title = document.getElementById("title"+id);
  let div = document.getElementById("div_"+id);
  let divDetails = document.getElementById("div_det_"+id);
  let weight = document.getElementById("weight"+id);
  let imgShow = document.getElementById("imgShow"+id);
  let color = document.getElementById("color"+id);
  let labelImg = document.getElementById("labelImg"+id);
  let imgSelect = document.getElementById("img"+id);
  let titleResult = document.getElementById("titleResult"+id);
  let labelTas = document.getElementById("labelTas"+id);
  let tas = document.getElementById("tas"+id);
  let labelTasIgnored = document.getElementById("labelTasIgnored"+id);
  let tasIgnored = document.getElementById("tasIgnored"+id);
  let labelPlayed = document.getElementById("labelPlayed"+id);
  let played = document.getElementById("played"+id);
  let divEmpty = document.getElementById("divEmpty"+id);
  let divEmpty2 = document.getElementById("divEmpty2"+id);
  let divGrid = document.getElementById("div_grid"+id);
  let array = [];
  array.push(labelImg,imgSelect,titleResult,labelTas,tas,labelTasIgnored,tasIgnored,labelPlayed,played,divEmpty,divEmpty2)
  if (detailsOpened.innerText == "false") {
    detailsOpened.innerText = "true";

    array.forEach(element => {
      element.classList.remove("hideContent");
      element.classList.add("showContent","place-self-center");
    });
    title.classList.add("h-fit","w-full","place-self-center");
    tas.classList.add("h-fit","w-full","place-self-center");
    tasIgnored.classList.add("h-fit","w-full","place-self-center");
    played.classList.add("h-fit","w-full","place-self-center");
    weight.classList.add("h-fit","w-full","place-self-center");
    imgSelect.classList.remove("place-self-center");
    color.classList.remove("place-self-center");
    imgShow.style.height = "200px";
    imgShow.style.width = "200px";
    divGrid.classList.remove("flex-row","space-x-8","pr-2");
    divGrid.classList.add("grid","grid-cols-4","gap-y-1");
    divDetails.style.width = "78%";
    //div.classList.add("justify-start")
  } else {
    detailsOpened.innerText = "false";

    array.forEach(element => {
      element.classList.add("hideContent");
      element.classList.remove("showContent","place-self-center");
    });
    title.classList.remove("h-fit","w-full","place-self-center");
    tas.classList.remove("h-fit","w-full","place-self-center");
    tasIgnored.classList.remove("h-fit","w-full","place-self-center");
    played.classList.remove("h-fit","w-full","place-self-center");
    weight.classList.remove("h-fit","w-full","place-self-center");
    imgSelect.classList.add("place-self-center");
    color.classList.add("place-self-center");
    imgShow.style.height = "50px";
    imgShow.style.width = "50px";
    divGrid.classList.add("flex-row","space-x-8","pr-2");
    divGrid.classList.remove("grid","grid-cols-4","gap-y-1");
    divDetails.style.width = "89.8%";
  }


}
$( function() {
  $( "#games" ).sortable({
    stop: function( event, ui ) {
      colorChanged = true;
      imageChanged = true;
      weightChanged = true;
      titleChanged = true;
      gameAdded = true;
      save();
      updateIdHisto();

      
    }
  });
} );
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
// Load already existing games
function addGames(games) {
  var lilcount = 0;

  /* while (document.getElementById("games").firstChild) { // while there is still a child inside the parent
    document.getElementById("games").removeChild(document.getElementById("games").firstChild); // remove the first child
  } */
  $("#games").empty();
  games.forEach(game => {
    let div = document.createElement("div");
    let divDetails = document.createElement("div");
    let divGrid = document.createElement("div");

    divDetails.classList.add("divDetail");

    div.id = "div_" + lilcount;
    div.classList.add("flex", "pb-5","ltr","box");
    div.setAttribute('draggable', true);

    let cogImage = document.createElement("img");
    cogImage.classList.add("hideMenu","self-center","ml-1","mr-2");
    cogImage.src = ImgPath + "cog.svg";
    cogImage.style.height = "25px";
    cogImage.style.width = "25px";
    cogImage.setAttribute("onclick", "showGameDetails("+lilcount+")");

    let hideImage = document.createElement("img");
    hideImage.classList.add("hideMenu","self-center","mr-1");
    hideImage.src = ImgPath + "hide.png";
    hideImage.style.height = "25px";
    hideImage.style.width = "25px";
    hideImage.setAttribute("onclick", "hideGameOnWheel("+lilcount+")");

    divDetails.id = "div_det_" + lilcount;
    divDetails.classList.add("flex","border-solid", "border-2", "borderGame2", "rounded-md", "p-1");
    divDetails.style.width = "89.8%";

    divGrid.id = "div_grid" + lilcount;
    divGrid.classList.add("flex","flex-row","space-x-8");

    let labelTitle = document.createElement("label");
    labelTitle.id = "labelTitle"+lilcount;
    labelTitle.for = "title" + lilcount;
    labelTitle.innerText = "Titre du jeu :";
    labelTitle.classList.add("place-self-center","p-2");

    let title = document.createElement("input");
    title.type = "text";
    title.name = "title" + lilcount;
    title.id = "title" + lilcount;
    title.value = game.title;
    title.setAttribute("onchange", "titlesChanged()");
    title.setAttribute("onfocusout", "save()");
    title.classList.add("border-solid", "border-2", "borderGame", "ltr","title")
    

    let labelWeight = document.createElement("label");
    labelWeight.id = "labelWeight"+lilcount;
    labelWeight.for = "weight" + lilcount;
    labelWeight.innerText = "Poids :";
    labelWeight.classList.add("place-self-center")

    let weight = document.createElement("input");
    weight.type = "number";
    weight.name = "weight" + lilcount;
    weight.id = "weight" + lilcount;
    weight.setAttribute("onchange", "weightsChanged()");
    weight.setAttribute("onfocusout", "save()");
    weight.setAttribute("min", 0);
    weight.value = game.weight;
    weight.classList.add("border-solid", "border-2", "borderGame", "ltr","weight");

    let color = document.createElement("input");
    color.type = "color";
    color.name = "color" + lilcount;
    color.id = "color" + lilcount;
    color.classList.add("border-solid", "border-2", "borderGame","place-self-center","color");
    color.value = game.color;
    color.setAttribute("onchange", "colorsChanged()");
    color.setAttribute("onfocusout", "save()");


    let labelColor = document.createElement("label");
    labelColor.id = "labelColor"+lilcount;
    labelColor.for = "color" + lilcount;
    labelColor.innerText = "Couleur :";
    labelColor.classList.add("place-self-center")

    let labelImg = document.createElement("label")
    labelImg.id = "labelImg"+lilcount;
    labelImg.for = "img" + lilcount;
    labelImg.innerText = "Image :";
    labelImg.classList.add("hideContent","place-self-center");

    let imgSelect = document.createElement("input");
    imgSelect.type = "file";
    imgSelect.name = "img" + lilcount;
    imgSelect.id = "img" + lilcount;
    imgSelect.classList.add("border-solid", "border-2", "borderGame", "ltr","hideContent");
    imgSelect.setAttribute("onchange", "imagesChanged(this)");
    imgSelect.setAttribute("onfocusout", "save()");

    let imgName = document.createElement("p");
    imgName.id = "imgName" + lilcount;
    imgName.innerText = game.imgName;
    imgName.style = "display:none";
    imgName.classList.add("imgName");

    let img = document.createElement("img");
    img.id = "imgShow" + lilcount;
    img.src = ImgPath + game.imgName;
    img.classList.add("mr-2", "ml-1");
    img.style.height = "50px";
    img.style.width = "50px";

    let trueCount = document.createElement("p");
    trueCount.id = "trueCount" + lilcount;
    trueCount.innerText = game.trueCount;
    trueCount.style = "display:none";
    trueCount.classList.add("trueCount");

    let cheatCount = document.createElement("p");
    cheatCount.id = "cheatCount" + lilcount;
    cheatCount.innerText = game.cheatCount;
    cheatCount.style = "display:none";
    cheatCount.classList.add("cheatCount");

    let buttonDelete = document.createElement("button");
    buttonDelete.id = "buttonDelete" + lilcount;
    buttonDelete.classList.add("text-white", "bg-red-700","px-2","rounded","buttonDelete");
    buttonDelete.innerText = "SUPPRIMER";
    buttonDelete.setAttribute("onclick", "deleteGame(" + lilcount + ")");
    buttonDelete.setAttribute("onmouseover", "hoverSound()");
    
    let titleResult = document.createElement("p");
    titleResult.id = "titleResult"+lilcount;
    titleResult.innerText = "Résultats";
    titleResult.classList.add("col-span-2","hideContent","place-self-center");

    let labelTas = document.createElement("label");
    labelTas.id = "labelTas"+lilcount;
    labelTas.for = "labelTas" + lilcount;
    labelTas.innerText = "Tirage au sort :";
    labelTas.classList.add("hideContent","place-self-center")

    let tas = document.createElement("input");
    tas.id = "tas" + lilcount;
    tas.value = game.trueCount;
    tas.type = "number";
    tas.classList.add("border-solid", "border-2", "borderGame", "ltr","hideContent");
    tas.setAttribute("onchange", "resultsChanged()");
    tas.setAttribute("onfocusout", "save()");
    tas.setAttribute('disabled', '');

    let labelTasIgnored = document.createElement("label");
    labelTasIgnored.id = "labelTasIgnored"+lilcount;
    labelTasIgnored.for = "labelTas" + lilcount;
    labelTasIgnored.innerText = "Tirage ignoré :";
    labelTasIgnored.classList.add("hideContent","place-self-center")

    let tasIgnored = document.createElement("input");
    tasIgnored.id = "tasIgnored" + lilcount;
    tasIgnored.value = game.cheatCount;
    tasIgnored.type = "number";
    tasIgnored.classList.add("border-solid", "border-2", "borderGame", "ltr","hideContent");
    tasIgnored.setAttribute("onchange", "resultsChanged()");
    tasIgnored.setAttribute("onfocusout", "save()");
    tasIgnored.setAttribute('disabled', '');

    let labelPlayed = document.createElement("label");
    labelPlayed.id = "labelPlayed"+lilcount;
    labelPlayed.for = "labelPlayed" + lilcount;
    labelPlayed.innerText = "Parties jouées :";
    labelPlayed.classList.add("align-middle","hideContent","place-self-center");

    let played = document.createElement("input");
    played.id = "played" + lilcount;
    played.type = "number";
    played.value = game.played;
    played.classList.add("border-solid", "border-2", "borderGame", "ltr","played","hideContent");
    played.setAttribute("onchange", "playedChanged(" + lilcount + ")");
    played.setAttribute("onfocusout", "save()");
    played.setAttribute('disabled', '');

    let divEmpty = document.createElement("div");
    divEmpty.classList.add("hideContent");
    divEmpty.id = "divEmpty"+lilcount;

    let divEmpty2 = document.createElement("div");
    divEmpty2.classList.add("hideContent");
    divEmpty2.id = "divEmpty2"+lilcount;

    let addPlayed = document.createElement("button");
    addPlayed.id = "addPlayed" + lilcount;
    addPlayed.innerText = "Ajouter partie";
    addPlayed.classList.add("text-white", "bg-blue-700", "mr-1","px-2","rounded","addPlayed");
    addPlayed.setAttribute("onclick", "addPlayed(" + lilcount + ")");
    addPlayed.setAttribute("onmouseover", "hoverSound()");

    let win = document.createElement("p");
    win.id = "win" + lilcount;
    win.innerText = game.win;
    win.classList.add("hideContent","win");

    let lose = document.createElement("p");
    lose.id = "lose" + lilcount;
    lose.innerText = game.lose;
    lose.classList.add("hideContent","lose");

    let winSession = document.createElement("p");
    winSession.id = "winSession" + lilcount;
    winSession.innerText = game.winSession;
    winSession.classList.add("hideContent","winSession");

    let loseSession = document.createElement("p");
    loseSession.id = "loseSession" + lilcount;
    loseSession.innerText = game.loseSession;
    loseSession.classList.add("hideContent","loseSession");

    let playedSession = document.createElement("p");
    playedSession.id = "playedSession" + lilcount;
    playedSession.innerText = game.playedSession;
    playedSession.classList.add("hideContent","playedSession");

    let detailsOpened = document.createElement("p");
    detailsOpened.id = "detailsOpened" + lilcount;
    detailsOpened.innerText = "false";
    detailsOpened.classList.add("hideContent");

    let oldWeight = document.createElement("p");
    oldWeight.id = "oldWeight" + lilcount;
    oldWeight.innerText = game.oldWeight;
    oldWeight.classList.add("hideContent","oldWeight");

    let gameHidden = document.createElement("p");
    gameHidden.id = "gameHidden" + lilcount;
    if (game.weight == 0) {
      gameHidden.innerText = "true";
    }else {
      gameHidden.innerText = "false"
    }
    gameHidden.classList.add("hideContent","gameHidden");

    /* let no = document.createElement("img");
    no.src = ImgPath + "giphy.gif";
    no.style.height = "50px";
    no.style.width = "50px"; */
    
    divGrid.appendChild(labelTitle);
    divGrid.appendChild(title);
    divGrid.appendChild(titleResult);
    
    
    divGrid.appendChild(labelWeight);
    divGrid.appendChild(weight);
    divGrid.appendChild(labelTas);
    divGrid.appendChild(tas);
    
    divGrid.appendChild(labelColor);
    divGrid.appendChild(color);
    divGrid.appendChild(labelTasIgnored);
    divGrid.appendChild(tasIgnored);
    

    divGrid.appendChild(labelImg);
    divGrid.appendChild(imgSelect);
    divGrid.appendChild(labelPlayed);
    divGrid.appendChild(played);
    
    divGrid.appendChild(divEmpty);
    divGrid.appendChild(divEmpty2);
    divGrid.appendChild(addPlayed);
    divGrid.appendChild(buttonDelete);
    
    
    divGrid.appendChild(trueCount);
    divGrid.appendChild(cheatCount);
    divGrid.appendChild(imgName);
    //divGrid.appendChild(no);

    divGrid.appendChild(win);
    divGrid.appendChild(lose);
    divGrid.appendChild(winSession);
    divGrid.appendChild(loseSession);
    divGrid.appendChild(playedSession);
    divGrid.appendChild(detailsOpened);
    divGrid.appendChild(oldWeight);
    divGrid.appendChild(gameHidden);

    divDetails.appendChild(divGrid);
    div.appendChild(img);
    div.appendChild(divDetails);
    div.appendChild(cogImage);
    div.appendChild(hideImage);
    document.getElementById("games").appendChild(div);
    gamesArr.push(div);
    lilcount++;
  });
}
// When users wants to play a certain game
// Add a 100% draw to histo
function addPlayed(count) {
  //console.log("hello");
  document.getElementById("textHisto").classList.add("hideContent");
  document.getElementById("textHisto").classList.remove("showContent");
  let title = document.getElementById("title" + count).value;
  let played = document.getElementById("played" + count);
  let playedSession = document.getElementById("playedSession" + count);
  played.value = parseInt(played.value) + 1;
  playedSession.innerText = parseInt(playedSession.innerText) + 1;
  addPlayedGame(count, title, 360);
}

// Calculates the size of the segments with their weights
function calcWeight(weight) {
  return (weight / Tweight) * 360;
}
// Deletes a game
function deleteGame(id) {
  console.log("JE SUPPRIME " + id);
  clickSound();
  if (confirm("Voulez vous vraiment supprimer ce jeu ?") && theWheel.segments.length > 1) {
    let deleted = false;
    let games = JSON.parse(window.localStorage.getItem("games"));
    console.log("avant");
    games.forEach(game => {
      console.log("gameId "+ game.id + " id +1 " + id+1)
      if (game.id == id + 1 && !deleted) {
        console.log("DELETE")
        Tweight -= parseInt(game.weight);
        window.localStorage.setItem("Tweight", Tweight)
        games.splice(games.indexOf(game), 1);
        deleted = true;
      }
      //if (deleted && game.id > id + 1) game.id = game.id - 1;
    });
    theWheel.deleteSegment(id + 1);
    theWheel.segments.pop();
    count--;
    window.localStorage.setItem("count", parseInt(count));
    window.localStorage.setItem("games", JSON.stringify(games));
    gameAdded = true;
    addGames(games);
    save();
  }
}
// When a color changes, reload segments color
function changeColor(games) {
  games.forEach(game => {
    console.log(game.id)
    theWheel.segments[parseInt(game.id)].fillStyle = game.color;
  });
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
// When an image changes, reload segments image path
function changeImage(games) {
  games.forEach(game => {
    theWheel.segments[parseInt(game.id)].image = ImgPath + game.imgName;
  });
}
// When a title changes, reload segments titles
function changeTitle(games) {

  games.forEach(game => {
    if (theWheel.segments[parseInt(game.id)]) {
      theWheel.segments[parseInt(game.id)].text = game.title;
    }
  });
}
// When an image changes, change image path in game div
function imagesChanged(image) {
  console.log("image a changé ");
  console.log((image.id).match(/\d+/));
  document.getElementById("imgName" + (image.id).match(/\d+/)).innerText = (image.value).replace("C:\\fakepath\\", "");
  document.getElementById("imgShow" + (image.id).match(/\d+/)).src = ImgPath + (image.value).replace("C:\\fakepath\\", "");
  if (!gameAdded) imageChanged = true;
  save();
}
// When a color changes allow to save
function colorsChanged() {
  console.log("La couleur a changé");
  if (!gameAdded) colorChanged = true;
  save();
}
// When a title changes allow to save
function titlesChanged() {
  console.log("Le titre a changé");
  if (!gameAdded) titleChanged = true;
  save();
}
// When a weight changes allow to save
function weightsChanged() {
  console.log("Le poids a changé");
  if (!gameAdded) weightChanged = true;
  save();
}
// When a result changes allow to save
function resultsChanged() {
  console.log("Les résultats ont changé");
  if (!gameAdded) resultChanged = true;
  save();
}
// When played count changes allow to save
function playedChanged(lilcount) {
  console.log("Les parties jouées ont changé");
  //let title = document.getElementById("title" + lilcount).value;
  console.log(lilcount);
  if (!gameAdded) playedCountChanged = true;
  //addPlayedGame(lilcount, title, 360);
}
// not used
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {

    // Generate random number 
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
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
// Hide games menu
function hideGames() {
  if(ongletGameActive) {
    if (gamesHidden) {
      menuOpened();
      gamesHidden = false;
      div_menu.classList.remove("hideGamesAnimation");
      div_menu.classList.add("appearAnimation");
      div_buttons.classList.remove("hideContent");
      div_buttons.classList.add("showContentFlex");
      gamesArr.forEach(element => {
        element.style = "display:flex";
      });
    }
    else {
      gamesHidden = true;
      menuClosed();
      div_menu.classList.remove("appearAnimation");
      div_menu.classList.add("hideGamesAnimation");
      div_buttons.classList.add("hideContent");
      div_buttons.classList.remove("showContentFlex");
    }
    resizeWheel();
  } else {
    ongletGameClicked();
  }
}
function hideMenu() {

  if (ongletGameActive) {
    hideGames();
  } else if (ongletHistoActive) {
    hideHisto();
  } else if (ongletResumeActive) {
    hideResume();
  }
}
// Hide histo menu
function hideHisto() {
  let histo = document.getElementById("historique");
  let archive = document.getElementById("buttonArchive");
  if(ongletHistoActive) {
    if (gamesHidden) {
      menuOpened();
      gamesHidden = false;
      div_menu.classList.remove("hideGamesAnimation");
      histo.classList.remove("hideGamesAnimation2");
      div_menu.classList.add("appearAnimation");
      histo.classList.add("appearAnimation");
      archive.classList.remove("hideContent");
      archive.classList.add("showContent");
    }
    else {
      menuClosed();
      gamesHidden = true;
      div_menu.classList.remove("appearAnimation");
      histo.classList.remove("appearAnimation");
      div_menu.classList.add("hideGamesAnimation");
      histo.classList.add("hideGamesAnimation2");
      archive.classList.remove("showContent");
      archive.classList.add("hideContent");
    }
    resizeWheel();
  } else {
    ongletHistoClicked();
  }
}

function hideResume() {
  let resumeSession = document.getElementById("resumeSession");

  
  if(ongletResumeActive) {
    if (gamesHidden) {
      menuOpened();
      gamesHidden = false;
      div_menu.classList.remove("hideGamesAnimation");
      resumeSession.classList.remove("hideGamesAnimation2");
      div_menu.classList.add("appearAnimation");
      resumeSession.classList.add("appearAnimation");
    }
    else {
      menuClosed();
      gamesHidden = true;
      div_menu.classList.remove("appearAnimation");
      resumeSession.classList.remove("appearAnimation");
      div_menu.classList.add("hideGamesAnimation");
      resumeSession.classList.add("hideGamesAnimation2");
    }
    resizeWheel();
  } else {
    ongletResumeClicked();
  }
}
function ongletGameClicked() {
  let ongletHisto = document.getElementById("ongletHisto");
  let ongletResume = document.getElementById("ongletResume");
  let ongletGame = document.getElementById("ongletGame");
  let games = document.getElementById("games")
  let historique = document.getElementById("historique");
  let resumeSession = document.getElementById("resumeSession");
  let buttonArchive = document.getElementById("buttonArchive");

  if (!ongletGameActive) {
    ongletResumeActive = false;
    ongletHistoActive = false;
    ongletGameActive = true;
    
    if (gamesHidden) {
      hideGames();
    }
    ongletGame.classList.remove("ongletNotChosen");
    ongletGame.classList.add("ongletChosen","menuGame");

    div_buttons.classList.remove("hideContent");
    div_buttons.classList.add("showContentFlex");

    ongletResume.classList.remove("ongletChosen");
    ongletResume.classList.add("ongletNotChosen");

    ongletHisto.classList.remove("ongletChosen");
    ongletHisto.classList.add("ongletNotChosen");

    games.classList.remove("hideContent");
    games.classList.add("showContentFlex");  

    resumeSession.classList.remove("showContentFlex");
    resumeSession.classList.add("hideContent");

    historique.classList.remove("showContentFlex");
    historique.classList.add("hideContent");

    buttonArchive.classList.remove("showContent");
    buttonArchive.classList.add("hideContent");

    document.getElementById("textHisto").classList.add("hideContent");
    document.getElementById("textHisto").classList.remove("showContent");
  } else {
    hideGames();
  }
}
// When you click on histo tab
function ongletHistoClicked() {
  let ongletHisto = document.getElementById("ongletHisto");
  let ongletResume = document.getElementById("ongletResume");
  let ongletGame = document.getElementById("ongletGame");
  let games = document.getElementById("games")
  let historique = document.getElementById("historique");
  let resumeSession = document.getElementById("resumeSession");
  let buttonArchive = document.getElementById("buttonArchive");
  let div_buttons = document.getElementById("div_buttons");

  if (!ongletHistoActive) {
    ongletHistoActive = true;
    ongletResumeActive = false;
    ongletGameActive = false;
    if (gamesHidden) {
      hideHisto();
    }
    ongletGame.classList.remove("ongletChosen","menuGame");
    ongletGame.classList.add("ongletNotChosen");

    div_buttons.classList.add("hideContent");
    div_buttons.classList.remove("showContentFlex");

    ongletResume.classList.remove("ongletChosen");
    ongletResume.classList.add("ongletNotChosen");

    ongletHisto.classList.remove("ongletNotChosen");
    ongletHisto.classList.add("ongletChosen");

    games.classList.remove("showContentFlex");
    games.classList.add("hideContent");    

    resumeSession.classList.remove("showContentFlex");
    resumeSession.classList.add("hideContent");

    historique.classList.remove("hideContent");
    historique.classList.add("showContentFlex");

    buttonArchive.classList.remove("hideContent");
    buttonArchive.classList.add("showContent");

    if ($('#historique').is(':empty')) {
      document.getElementById("textHisto").classList.remove("hideContent");
      document.getElementById("textHisto").classList.add("showContent");
    }

  } else {
    hideHisto();
  }
}
// When you click on resume session tab
function ongletResumeClicked() {
  let ongletHisto = document.getElementById("ongletHisto");
  let ongletResume = document.getElementById("ongletResume");
  let ongletGame = document.getElementById("ongletGame");
  let games = document.getElementById("games")
  let historique = document.getElementById("historique");
  let resumeSession = document.getElementById("resumeSession");
  let buttonArchive = document.getElementById("buttonArchive");
  let div_buttons = document.getElementById("div_buttons")
  if (!ongletResumeActive) {
    ongletResumeActive = true;
    ongletHistoActive = false;
    ongletGameActive = false;
    if (gamesHidden) {
      hideResume();
    }

    ongletGame.classList.remove("ongletChosen","menuGame");
    ongletGame.classList.add("ongletNotChosen");

    div_buttons.classList.add("hideContent");
    div_buttons.classList.remove("showContentFlex");

    ongletResume.classList.remove("ongletNotChosen");
    ongletResume.classList.add("ongletChosen");

    ongletHisto.classList.remove("ongletChosen");
    ongletHisto.classList.add("ongletNotChosen");

    games.classList.remove("showContentFlex");
    games.classList.add("hideContent");  

    resumeSession.classList.remove("hideContent");
    resumeSession.classList.add("showContentFlex");

    historique.classList.remove("showContentFlex");
    historique.classList.add("hideContent");

    buttonArchive.classList.remove("showContent");
    buttonArchive.classList.add("hideContent");

    document.getElementById("textHisto").classList.add("hideContent");
    document.getElementById("textHisto").classList.remove("showContent");
  }
  else {
    hideResume();
  }
}
// game[title,weight,color,id,imgName,trueCount,cheatCount,played,win,lose,winSession,loseSession,playedSession]
// Save all attributes
function save() {
  if (count != oldCount || gameAdded || playedCountChanged || resultChanged || histoChanged || weightChanged || colorChanged || titleChanged || imageChanged) {
    console.log("Je save");
    var games = [];
    //console.log(games);
    Tweight = 0;
    let counter = 1;
    $('#games').children('.box').each(function () {
      console.log(this.querySelector('.title').value);
      let game = ({
        'title':this.querySelector('.title').value, 
        "weight":this.querySelector('.weight').value, 
        "color":this.querySelector('.color').value,
        "id":counter, 
        "imgName":this.querySelector('.imgName').innerText, 
        "trueCount":this.querySelector('.trueCount').innerText, 
        "cheatCount":this.querySelector('.cheatCount').innerText,
        "played":this.querySelector('.played').value,
        "win":parseInt(this.querySelector('.win').innerText),
        "lose":parseInt(this.querySelector('.lose').innerText),
        "winSession":parseInt(this.querySelector('.winSession').innerText),
        "loseSession":parseInt(this.querySelector('.loseSession').innerText),
        "playedSession":parseInt(this.querySelector('.playedSession').innerText),
        "oldWeight":parseInt(this.querySelector('.oldWeight').innerText), 

      });
      //$("#buttonDelete"+(counter-1)).attr("onclick","");
      //$("#addPlayed"+(counter-1)).attr("onclick","");
      //console.log(this.querySelector('.buttonDelete'+(counter-1)).innerText)
      this.querySelector('.addPlayed').setAttribute("onclick", "addPlayed(" + (counter-1) + ")");
      this.querySelector('.buttonDelete').setAttribute("onclick", "deleteGame(" + (counter-1) + ")");
      //$("#buttonDelete"+(counter-1)).attr("onclick","deleteGame("+(counter-1)+")");
      //$("#addPlayed"+(counter-1)).attr("onclick","addPlayed("+(counter-1)+")");
      Tweight += parseInt(this.querySelector('.weight').value)
      window.localStorage.setItem("Tweight", Tweight);
      counter++;
      games.push(game);
    });
    /* for (let index = 0; index < parseInt(count); index++) {
      let game = ({'title':document.getElementById("title" + index).value, 
        "weight":document.getElementById("weight" + index).value, 
        "color":document.getElementById("color" + index).value,
        "id":index+1, 
        "imgName":document.getElementById("imgName" + index).innerText, 
        "trueCount":document.getElementById("trueCount" + index).innerText, 
        "cheatCount":document.getElementById("cheatCount" + index).innerText,
        "played":document.getElementById("played" + index).value,
        "win":parseInt(document.getElementById("win" + index).innerText),
        "lose":parseInt(document.getElementById("lose" + index).innerText),
        "winSession":parseInt(document.getElementById("winSession" + index).innerText),
        "loseSession":parseInt(document.getElementById("loseSession" + index).innerText),
        "playedSession":parseInt(document.getElementById("playedSession" + index).innerText),
      }); */
      
    //}
    window.localStorage.setItem("count", parseInt(count));
    window.localStorage.setItem("games", JSON.stringify(games));
    //console.log(JSON.parse(localStorage.getItem("games")));
    oldCount = count;
    load();
  }

}
function menuOpened() {
  OpenAudio.play()
  let games = JSON.parse(window.localStorage.getItem("games"));
  let score1 = document.getElementById("score1");
  let score2 = document.getElementById("score2");
  var canvas = document.getElementById("div_canvas");
  var canvas2 = document.getElementById("div_canvas2");
  
  moveToRightSide();
  score2.innerHTML = score1.innerHTML;
  $("#score1").empty();
  score1.classList.add("hideContent");
  score1.classList.remove("showContent");

  score2.classList.add("showContent");
  score2.classList.remove("hideContent");

  canvas2.classList.add("showContent");
  canvas2.classList.remove("absolute");
  canvas2.classList.remove("opacity-0");
  canvas2.classList.add("opacity-100");
  initWheel("myCanvas2");
  updateWheel(games);
  
  //canvas2.classList.remove("backToMiddle");
} 

function menuClosed() {
  CloseAudio.play()
  let games = JSON.parse(window.localStorage.getItem("games"));
  let score1 = document.getElementById("score1");
  let score2 = document.getElementById("score2");
  var canvas = document.getElementById("div_canvas");
  var canvas2 = document.getElementById("div_canvas2");
  backToMiddle();
  score1.innerHTML = score2.innerHTML;
  $("#score2").empty();
  score2.classList.add("hideContent");
  score2.classList.remove("showContent");

  score1.classList.add("showContent");
  score1.classList.remove("hideContent");

  canvas2.classList.remove("showContent");
  canvas2.classList.add("absolute");
  canvas2.classList.add("opacity-0");
  canvas2.classList.remove("opacity-100");
  initWheel("myCanvas");
  updateWheel(games);
  //canvas.classList.remove("moveToRightSide");
  
}
function backToMiddle() {
  let canvas = document.getElementById("div_canvas");
  let canvas2 = document.getElementById("div_canvas2");
  let score1 = document.getElementById("score1");
  let score2 = document.getElementById("score2");

  score1.classList.add("slideUp");
  score2.classList.remove("slideDown");

  canvas.classList.add("backToMiddle");
  canvas.classList.remove("moveToRightSide");

  canvas2.classList.add("backToMiddle2");
  canvas2.classList.remove("moveToRightSide2");
  
}
function easter(){
  let bato = document.getElementById("bateau");
  bato.style.height = "300px";
  bato.style.width = "300px";
  bato.classList.add("easterShip");
  PirateAudio.play();
}
function moveToRightSide() {
  let canvas = document.getElementById("div_canvas");
  let canvas2 = document.getElementById("div_canvas2");
  let score1 = document.getElementById("score1");
  let score2 = document.getElementById("score2");

  score1.classList.remove("slideUp");
  score2.classList.add("slideDown");

  canvas.classList.add("moveToRightSide");
  canvas.classList.remove("backToMiddle");

  canvas2.classList.add("moveToRightSide2");
  canvas2.classList.remove("backToMiddle2");
  
}

function copyWheel() {
  var destinationCtx;
  var canvas2 = document.getElementById("div_canvas2");
  
  
  canvas2.classList.add("showContent");
  canvas2.classList.remove("hideContent");
  initWheel("myCanvas2");

//copy the data
  //destinationCtx.drawImage(canvas, 0, 0);
}
// game = [title, weight, color, id, image, trueCount, cheatCount, played]
// Load games, histo, resume session
function load() {
  console.log("Je load");
  window.localStorage.getItem("count") == null ? window.localStorage.setItem("count", 0) : null;
  let games = JSON.parse(window.localStorage.getItem("games"));
  if (games == null) games = [];
  Tweight = localStorage.getItem("Tweight");
  //copyWheel();

  if (weightChanged) {
    changeSize(games);
    weightChanged = false;
  }

  if (titleChanged) {
    changeTitle(games);
    titleChanged = false;
  }
  if (imageChanged) {
    changeImage(games);
    imageChanged = false;
  }
  if (colorChanged) {
    changeColor(games);
    colorChanged = false;
  }
  if (gameAdded) {
    addGames(games);
    gameAdded = false;
  }
  if (histoChanged) {
    histoChanged = false;
  }
  if (resultChanged) {
    resultChanged = false;
  }

  if (playedCountChanged) {
    playedCountChanged = false;
  }
  updateWheel(games);


  if (histo != '') {
    updateHisto();
  }
  if (archive != '' && archiveChanged) {
    archiveChanged = false;
    updateResumeSession();
  }
  theWheel.draw();
  drawTriangle();
  updateWinLoseTotal();
}
