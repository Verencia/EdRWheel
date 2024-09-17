const PrizeAudio = new Audio("../sounds/congratulation.mp3");
const TickAudio = new Audio("../sounds/tick.mp3");
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
var ongletHistoActive = true;
var ongletResumeActive = false;
var param = 13;
var winTotal = localStorage.getItem("winTotal");
var loseTotal = localStorage.getItem("loseTotal");
var histoCount = window.localStorage.getItem("histoCount");
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

if (histoTirage == null) {
  console.log("histoTirage est null !")
  histoTirage = [];
  window.localStorage.setItem("histoTirage", histoTirage);
}

var theWheel = new Winwheel({
  'canvasId': 'myCanvas',
  //'responsive'   : true,

  'animation':                   // Note animation properties passed in constructor parameters.
  {
    'type': 'spinToStop',  // Type of animation.
    'duration': 1,    // Duration in seconds.
    'spins': 1,               // The number of complete 360 degree rotations the wheel is to do.
    // Remember to do something after the animation has finished specify callback function.
    'callbackAfter': 'drawTriangle()',
    //'callbackSound' : 'playTickSound()',
    'callbackFinished': 'alertPrize()'


  },


});
function playTickSound() {
  // Stop and rewind the sound (stops it if already playing).
  TickAudio.pause();
  //TickAudio.currentTime = 0;

  // Play the sound.
  TickAudio.play();
}
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
function startSpin() {
  // Ensure that spinning can't be clicked again while already running.
  resetWheel();
  if (wheelSpinning == false) {
    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
    // to rotate with the duration of the animation the quicker the wheel spins.
    if (wheelPower == 1) {
      theWheel.animation.spins = 1; //3
    } else if (wheelPower == 2) {
      theWheel.animation.spins = 6;
    } else if (wheelPower == 3) {
      theWheel.animation.spins = 10;
    }

    // Disable the spin button so can't click again while wheel is spinning.
    document.getElementById('spin_button').src = "../image/spin_off.png";
    //document.getElementById('spin_button').className = "";

    // Begin the spin animation by calling startAnimation on the wheel object.
    theWheel.startAnimation();
    drawTriangle();

    // Set to true so that power can't be changed and spin button re-enabled during
    // the current animation. The user will have to reset before spinning again.
    wheelSpinning = true;
  }
}
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
function initWheel() {
  var theWheel = new Winwheel({
    'canvasId': 'myCanvas',


    'animation':                   // Note animation properties passed in constructor parameters.
    {
      'type': 'spinToStop',  // Type of animation.
      'duration': 5,             // How long the animation is to take in seconds.
      'spins': 8,              // The number of complete 360 degree rotations the wheel is to do.
      // Remember to do something after the animation has finished specify callback function.
      'callbackFinished': 'alertPrize()'


    },


  });
}
function alertPrize() {
  // Call getIndicatedSegment() function to return pointer to the segment pointed to on wheel.
  let winningSegment = theWheel.getIndicatedSegment();
  while (alertDiv.firstChild) { // while there is still a child inside the parent
    alertDiv.removeChild(alertDiv.firstChild); // remove the first child
  }
  alertDiv.style.width = "300px";
  alertDiv.classList.add("appear");
  // Basic alert of the segment text which is the prize name.
  //audio.play();
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
  buttonHide.setAttribute("onclick", "cheatCount(" + winningSegment.id + ",'" + winningSegment.text + "'," + winningSegment.size + ")");
  buttonHide.classList.add("menuButton", "text-white", "font-bold", "py-2", "px-2", "rounded")

  let buttonClose = document.createElement("button");
  buttonClose.innerText = "Close";
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
  alertDiv.style.display = "none";
  histoChanged = true;
  document.getElementById("played" + winningSegmentId).value = parseInt(document.getElementById("played" + winningSegmentId).value) + 1;
  document.getElementById("playedSession" + winningSegmentId).innerText = parseInt(document.getElementById("playedSession" + winningSegmentId).innerText) + 1;
  document.getElementById("tas" + winningSegmentId).value = parseInt(document.getElementById("tas" + winningSegmentId).value) + 1;
  addToHisto(true, winningSegmentText, winningSegmentId, winningSegmentSize);

}
function addPlayedGame(winningSegmentId, winningSegmentText, winningSegmentSize) {
  //console.log("winningSegmentId " + winningSegmentId)
  //console.log("winningSegmentId-- " + winningSegmentId)
  histoChanged = true;
  addToHisto(true, winningSegmentText, winningSegmentId, winningSegmentSize);

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
  histo = localStorage.getItem('histo').split(',');
  histoCount = localStorage.getItem('histoCount');
  resultsHisto = window.localStorage.getItem("resultsHisto").split(',');
  if (resultsHisto[0] == "") resultsHisto.pop();
  if (histo[0] == "") histo.pop();
  //console.log(winningSegmentId);
  let trueCount = document.getElementById("trueCount" + winningSegmentId).innerText;
  let cheatCount = document.getElementById("cheatCount" + winningSegmentId).innerText;
  histo.push(bool);
  histo.push(winningSegmentText);
  histo.push(trueCount);
  histo.push(cheatCount);
  histo.push(winwheelDegreesToPercent(winningSegmentSize));
  histo.push(winningSegmentId);
  localStorage.setItem('histo', histo);
  if (bool == false) {
    console.log("CEST CHEATER");
    resultsHisto.push(parseInt(histoCount), true, "cheated");
    resultsHisto = localStorage.setItem('resultsHisto', resultsHisto);
  }
  histoCount++;
  histoCount = localStorage.setItem('histoCount', histoCount);
  updateHisto();
  closeDialog();
}
// Show histo[id,%,cheatCount,trueCount,text,bool] reverse
function updateHisto() {
  divHisto = document.getElementById("historique");
  histo = localStorage.getItem('histo').split(',');
  if (histo[0] == "") histo.pop();
  resultsHisto = window.localStorage.getItem("resultsHisto").split(',');
  if (resultsHisto[0] == "") resultsHisto.pop();
  console.log(resultsHisto);
  //histo.reverse();
  //console.log(histo);
  while (divHisto.firstChild) { // while there is still a child inside the parent
    divHisto.removeChild(divHisto.firstChild); // remove the first child
  }
  //console.log("avant for");
  let histoCount = 0;
  for (let index = 0; index < histo.length; index += 6) {
    if (histo[index] != '') {
      //console.log(histo[index+1]);
      let winningSegmentId = histo[index + 5];
      let div = document.createElement("div");
      let divTexte = document.createElement("div");
      let divButton = document.createElement("div");
      let divResultat = document.createElement("div");

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
      div.classList.add("border-solid", "border-2", "border-black", "mb-1", "grid", "grid-cols-6")

      divTexte.classList.add("col-span-4", "text-right")

      divButton.id = "divButton" + histoCount;

      divResultat.id = "divResultat" + histoCount;
      divResultat.classList.add("hideContent", "ml-4");

      buttonW.classList.add("pl-1", "pr-1", "mr-1", "font-bold", "text-green-600", "bg-white", "border", "border-black", "justify-self-end");
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

      for (let index2 = 0; index2 < resultsHisto.length; index2 += 3) {
        if (histoCount == parseInt(resultsHisto[index2])) {
          //console.log("OUICAMARCHE");
          if (resultsHisto[index2 + 1] != undefined) {
            console.log("ici" + resultsHisto[index2 + 2]);
            //console.log("JEPASSE");
            pResultChosen.innerText = "true";
            pResult.innerText = resultsHisto[index2 + 1];
            divButton.style.display = "none";
            divResultat.classList.remove("hideContent");
            divResultat.classList.add("flex");
            if (resultsHisto[index2 + 2] == "true") {
              console.log(" RUN WIN");
              p2.innerText = "Run gagnée";
              p2.classList.add("text-green-600");
            }
            else if (resultsHisto[index2 + 2] == "false") {
              console.log(" RUN LOSE");
              p2.innerText = "Run perdue";
              p2.classList.add("text-red-600");
            }
            else if (resultsHisto[index2 + 2] == "cheated") {
              console.log(" RUN CHEATE");
              p2.innerText = "Run cheaté";
              p2.classList.add("text-blue-600");
            }
          } else {
            pResultChosen.innerText = "false";
            pResult.innerText = "";
          }
          console.log(resultsHisto);
          console.log(resultsHisto[index2 - 1]);
        }

      }
      pIdGame.innerText = winningSegmentId;
      pIdGame.classList.add("hideContent");
      pPosition.innerText = histoCount;
      pPosition.classList.add("hideContent");
      //console.log(histo);
      if (histo[index] == 'true') {
        p.innerText = "Vous avez tiré " + histo[index + 1] + " - Auto " + histo[index + 2] + "(" + histo[index + 3] + ")" + " - (" + histo[index + 4] + "%)";
      } else {
        p.innerText = "Vous avez tiré " + histo[index + 1] + " - Cheaté " + histo[index + 2] + "(" + histo[index + 3] + ")" + " - (" + histo[index + 4] + "%)";
      }
      divTexte.appendChild(p);

      divResultat.appendChild(p2);
      if (histo[index] == 'true') {
        divButton.appendChild(buttonW);
        divButton.appendChild(buttonL);

        buttonArrow.appendChild(imgArrow);
        divResultat.appendChild(buttonArrow);
      }


      divResultat.appendChild(pResultChosen);
      divResultat.appendChild(pResult);
      divResultat.appendChild(pIdGame);
      divResultat.appendChild(pPosition);
      div.appendChild(divTexte);
      div.appendChild(divButton);
      div.appendChild(divResultat);
      divHisto.appendChild(div);
      histoCount++;
    }

  }
  //console.log("après for");
  save();
}
//resultsHisto[idHisto,resultChosen,result]
function winButton(histoCount, winningSegmentId) {
  let divButton = document.getElementById("divButton" + histoCount);
  let divResultat = document.getElementById("divResultat" + histoCount);
  let pResultChosen = document.getElementById("pResultChosen" + histoCount);
  let pResult = document.getElementById("pResult" + histoCount);
  resultsHisto = window.localStorage.getItem("resultsHisto").split(',');
  if (resultsHisto[0] == "") resultsHisto.pop();

  divButton.style.display = "none";
  divResultat.classList.remove("hideContent");
  divResultat.classList.add("flex");
  divResultat.firstElementChild.innerText = "Run gagnée";
  divResultat.firstElementChild.classList.add("text-green-600");

  pResultChosen.innerText = "true";
  pResult.innerText = "true";

  resultsHisto.push(histoCount, true, true);
  window.localStorage.setItem("resultsHisto", resultsHisto);
  console.log(winningSegmentId);
  document.getElementById("win" + winningSegmentId).innerText = parseInt(document.getElementById("win" + winningSegmentId).innerText) + 1;
  document.getElementById("winSession" + winningSegmentId).innerText = parseInt(document.getElementById("winSession" + winningSegmentId).innerText) + 1;
  resultChanged = true;
  save();

}

function loseButton(histoCount, winningSegmentId) {
  let divButton = document.getElementById("divButton" + histoCount);
  let divResultat = document.getElementById("divResultat" + histoCount);
  let pResultChosen = document.getElementById("pResultChosen" + histoCount);
  let pResult = document.getElementById("pResult" + histoCount);
  resultsHisto = window.localStorage.getItem("resultsHisto").split(',');
  if (resultsHisto[0] == "") resultsHisto.pop();

  divButton.style.display = "none";
  divResultat.classList.remove("hideContent");
  divResultat.classList.add("flex");
  divResultat.firstElementChild.innerText = "Run perdue";
  divResultat.firstElementChild.classList.add("text-red-600");

  pResultChosen.innerText = "true";
  pResult.innerText = "false";

  resultsHisto.push(histoCount, true, false);
  window.localStorage.setItem("resultsHisto", resultsHisto);
  console.log(resultsHisto);
  document.getElementById("lose" + winningSegmentId).innerText = parseInt(document.getElementById("lose" + winningSegmentId).innerText) + 1;
  document.getElementById("loseSession" + winningSegmentId).innerText = parseInt(document.getElementById("loseSession" + winningSegmentId).innerText) + 1;

  resultChanged = true;
  save();

}

function swapResult(histoCount, winningSegmentId) {
  let divResultat = document.getElementById("divResultat" + histoCount);
  let pResult = document.getElementById("pResult" + histoCount);
  resultsHisto = window.localStorage.getItem("resultsHisto").split(',');

  if (pResult.innerText == "true") {
    pResult.innerText = "false";
    divResultat.firstElementChild.innerText = "Run perdue";
    divResultat.firstElementChild.classList.add("text-red-600");
    divResultat.firstElementChild.classList.remove("text-green-600");
    document.getElementById("lose" + winningSegmentId).innerText = parseInt(document.getElementById("lose" + winningSegmentId).innerText) + 1;
    document.getElementById("loseSession" + winningSegmentId).innerText = parseInt(document.getElementById("loseSession" + winningSegmentId).innerText) + 1;
    document.getElementById("win" + winningSegmentId).innerText = parseInt(document.getElementById("win" + winningSegmentId).innerText) - 1;
    document.getElementById("winSession" + winningSegmentId).innerText = parseInt(document.getElementById("winSession" + winningSegmentId).innerText) - 1;
    for (let index = 0; index < resultsHisto.length; index += 3) {
      console.log(resultsHisto[index]);
      if (resultsHisto[index] == histoCount) {
        console.log("JE SWAP");
        resultsHisto[index + 2] = false;
        window.localStorage.setItem("resultsHisto", resultsHisto);
      }
    }
  }
  else {
    pResult.innerText = "true";
    divResultat.firstElementChild.innerText = "Run gagnée";
    divResultat.firstElementChild.classList.add("text-green-600");
    divResultat.firstElementChild.classList.remove("text-red-600");
    document.getElementById("lose" + winningSegmentId).innerText = parseInt(document.getElementById("lose" + winningSegmentId).innerText) - 1;
    document.getElementById("loseSession" + winningSegmentId).innerText = parseInt(document.getElementById("loseSession" + winningSegmentId).innerText) - 1;
    document.getElementById("win" + winningSegmentId).innerText = parseInt(document.getElementById("win" + winningSegmentId).innerText) + 1;
    document.getElementById("winSession" + winningSegmentId).innerText = parseInt(document.getElementById("winSession" + winningSegmentId).innerText) + 1;
    for (let index = 0; index < resultsHisto.length; index += 3) {
      console.log(resultsHisto[index]);
      if (resultsHisto[index] == histoCount) {
        console.log("JE SWAP");
        resultsHisto[index + 2] = true;
        window.localStorage.setItem("resultsHisto", resultsHisto);
      }
    }
  }
  resultChanged = true;
  save();

}
function addZero(i) {
  if (i < 10) { i = "0" + i }
  return i;
}
//histo[bool,text,trueCount,cheatCount,%,id]
// game[title,weight,color,id,imgName,trueCount,cheatCount,played,win,lose,winSession,loseSession,playedSession]
//FAIRE POUR QUE LES CHEATER SOIENT COMPTE
function archiveSession() {
  archiveChanged = true;
  let histo = window.localStorage.getItem("histo").split(',');
  let resultsHisto = window.localStorage.getItem("resultsHisto").split(',');
  let histoCount = 0;
  window.localStorage.setItem("histoCount", histoCount);
  for (let index = 0; index < histo.length / 6; index++) {
    if (document.getElementById("pResultChosen" + index).innerText == false) {
      confirm("Merci de choisir un résultat pour les runs terminées");
      return;
    }
  }
  let game = window.localStorage.getItem("games").split(',');
  histoTirage = (localStorage.getItem("histoTirage"));
  if (histoTirage != "") {
    histoTirage = (JSON.parse(localStorage.getItem("histoTirage")));
  } else {
    histoTirage = [];
  }
  let arrTirage = [];
  for (let index = 0; index < histo.length; index += 6) {
    for (let index2 = 0; index2 < resultsHisto.length; index2 += 3) {
      console.log("CALCUL");
      console.log(histo);
      console.log(parseInt(histo[index]));
      console.log(parseInt(resultsHisto[index2]));
      if (histoCount == parseInt(resultsHisto[index2])) {
        arrTirage.push({ "id": histo[index + 5], "percent": histo[index + 4], "cheatCount": histo[index + 3], "trueCount": histo[index + 2], "text": histo[index + 1], "trueOrCheat": histo[index], "wonOrLost": resultsHisto[index2 + 2] });
      }
    }
    histoCount++;
  }
  console.log(arrTirage);
  histo = [];
  resultsHisto = [];
  archive = (localStorage.getItem("archive"));
  if (archive != "") {
    archive = (JSON.parse(localStorage.getItem("archive")));
  } else {
    archive = [];
  }
  //console.log(archive);
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  let h = addZero(today.getHours());
  let m = addZero(today.getMinutes());
  let s = addZero(today.getSeconds());

  today = dd + '/' + mm + '/' + yyyy + " " + h + ":" + m + ":" + s;

  let arrArchive = [];
  for (let index = 0; index < game.length; index += param) {
    if (parseInt(game[index + 12]) != 0) {
      var toBeArchived = { "title": game[index], "win": game[index + 10], "lose": game[index + 11], "played": game[index + 12], "date": today };
      arrArchive.push(toBeArchived);
    }
  }

  //arrArchive.push(today);
  //console.log(arrArchive);
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
  //console.log(archive);


  /* var obj2 = { "name":"John", "age":30, "city":"New York"};
  let bit3 =[obj,obj2];
  bit3.push(obj);
  bit3 = JSON.stringify(bit3);
  localStorage.setItem("bit3",bit3);
  bit3 = JSON.parse(localStorage.getItem("bit3"));
  console.log(bit3);
  console.log(bit3[0].age); */
}

function updateResumeSession() {
  let resumeSession = document.getElementById("resumeSession");
  while (resumeSession.firstChild) { // while there is still a child inside the parent
    resumeSession.removeChild(resumeSession.firstChild); // remove the first child
  }
  let winTotal = 0;
  let loseTotal = 0;
  let sessionCount = 0;
  archive = (JSON.parse(localStorage.getItem("archive")));
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
      win += parseInt(gameResults.win);
      lose += parseInt(gameResults.lose);
      winTotal += parseInt(gameResults.win);
      loseTotal += parseInt(gameResults.lose);
      let p = document.createElement("p");
      p.innerText = gameResults.title + " " + gameResults.win + "W / " + gameResults.lose + "L";
      divRight.appendChild(p);
    });
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
    localStorage.setItem("winTotal", winTotal);
    localStorage.setItem("loseTotal", loseTotal);
    sessionCount++;
  });
  updateWinLoseTotal();
}

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
    console.log("JE PARSE");
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
      console.log("lajepasse");
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
      div.classList.add("border-solid", "border-2", "border-black", "mb-1", "grid", "grid-cols-3")

      divTexte.classList.add("text-left", "col-span-2", "ml-1")

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

      if (tirage.trueOrCheat == "true") {
        if (tirage.wonOrLost == "true") {
          console.log(" MARQUE WIN");
          p2.innerText = "Run gagnée";
          p2.classList.add("text-green-600");
        } else {
          console.log(" MARQUE LOSE");
          p2.innerText = "Run perdue";
          p2.classList.add("text-red-600");
        }
      } else {
        console.log(" MARQUE CHEAT");
        p2.innerText = "Run cheatée";
        p2.classList.add("text-blue-600");
      }

      pPosition.innerText = histoCount;
      pPosition.classList.add("hideContent");
      //console.log(histo);
      if (tirage.trueOrCheat == "true") {
        p.innerText = "Vous avez tiré " + tirage.text + " - Auto " + tirage.trueCount + "(" + tirage.cheatCount + ")" + " - (" + tirage.percent + "%)";
      } else {
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

  }
  console.log(histoTirage[sessionCount]);
}

function resetSession() {
  let game = window.localStorage.getItem("games").split(',');
  for (let index = 0; index < parseInt(count); index++) {
    console.log(game[index + 3]);
    document.getElementById("winSession" + index).innerText = 0;
    document.getElementById("loseSession" + index).innerText = 0;
    document.getElementById("playedSession" + index).innerText = 0;
    resultChanged = true;
    save();
  }
}

function updateWinLoseTotal() {
  winTotal = localStorage.getItem("winTotal");
  loseTotal = localStorage.getItem("loseTotal");
  let winLoseTotal = document.getElementById("winLoseTotal");

  winLoseTotal.innerText = winTotal + "W/" + loseTotal + "L";

}

function winwheelDegreesToPercent(deg) {
  return (deg * 100 / 360).toFixed(2);
}
// When you click on "Add game"

function addGame() {
  gameAdded = true;
  let div = document.createElement("div");
  let divDetails = document.createElement("div");
  let divGrid = document.createElement("div");

  divDetails.classList.add("divDetail");

  div.id = "div_" + count;
  div.classList.add("flex", "pb-5");
  //div.style = "background-color: red;";

  divDetails.id = "div_det_" + count;
  divDetails.classList.add("flex", "grid", "grid-cols-2", "border-solid", "border-2", "borderGame2", "rounded-md", "p-1");
  //divDetails.style = "background-color: grey;";

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
  //console.log(game[index]);
  title.setAttribute("onchange", "titlesChanged()");
  title.setAttribute("onfocusout", "save()");
  title.classList.add("border-solid", "border-2", "borderGame");

  let labelWeight = document.createElement("label");
  labelWeight.for = "weight" + count;
  labelWeight.innerText = "Poids : ";

  let weight = document.createElement("input");
  weight.type = "number";
  weight.name = "weight" + count;
  weight.id = "weight" + count;
  weight.value = "";
  weight.setAttribute("onchange", "weightsChanged()");
  weight.setAttribute("onfocusout", "save()");
  //console.log(game[index+1]);
  weight.classList.add("border-solid", "border-2", "borderGame");

  let color = document.createElement("input");
  color.type = "color";
  color.name = "color" + count;
  color.value = "#f6b73c";
  color.id = "color" + count;
  color.classList.add("border-solid", "border-2", "borderGame");
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
  //imgSelect.accept = "image/png, image/jpeg";
  imgSelect.id = "img" + count;
  imgSelect.classList.add("border-solid", "border-2", "borderGame");
  imgSelect.setAttribute("onchange", "imagesChanged(this)");
  imgSelect.setAttribute("onfocusout", "save()");

  let imgName = document.createElement("p");
  imgName.id = "imgName" + count;
  imgName.style = "display:none";

  let img = document.createElement("img");
  img.id = "imgShow" + count;
  img.classList.add("mr-2", "ml-1");
  img.style.height = "200px";
  img.style.width = "200px";

  let trueCount = document.createElement("p");
  trueCount.id = "trueCount" + count;
  trueCount.style = "display:none";
  trueCount.innerText = 0;

  let cheatCount = document.createElement("p");
  cheatCount.id = "cheatCount" + count;
  cheatCount.style = "display:none";
  cheatCount.innerText = 0;

  let buttonDelete = document.createElement("button");
  buttonDelete.id = "buttonDelete" + count;
  buttonDelete.classList.add("text-white", "bg-red-700", "col-span-2");
  buttonDelete.innerText = "DELETE";
  buttonDelete.setAttribute("onclick", "deleteGame(" + count + ")");

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
  played.classList.add("border-solid", "border-2", "borderGame", "ltr");
  played.setAttribute("onchange", "playedChanged()");
  //played.setAttribute("onfocusout", "save()");

  let divEmpty = document.createElement("div");
  let addPlayed = document.createElement("button");
  addPlayed.id = "addPlayed" + count;
  addPlayed.innerText = "Ajouter partie";
  addPlayed.classList.add("text-white", "bg-blue-700", "mr-1");
  addPlayed.setAttribute("onclick", "addPlayed(" + count + ")");

  let win = document.createElement("p");
  win.id = "win" + count;
  win.innerText = "0";
  win.classList.add("hideContent");

  let lose = document.createElement("p");
  lose.id = "lose" + count;
  lose.innerText = "0";
  lose.classList.add("hideContent");

  let winSession = document.createElement("p");
  winSession.id = "winSession" + count;
  winSession.innerText = 0;
  winSession.classList.add("hideContent");

  let loseSession = document.createElement("p");
  loseSession.id = "loseSession" + count;
  loseSession.innerText = 0;
  loseSession.classList.add("hideContent");

  let playedSession = document.createElement("p");
  playedSession.id = "playedSession" + count;
  playedSession.innerText = 0;
  playedSession.classList.add("hideContent");

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
  divDetails.appendChild(divGrid);
  div.appendChild(divDetails);
  document.getElementById("games").appendChild(div);
  gamesArr.push(div);
  count++;
  save();

}
// Load already existing games
function addGames(game) {
  var lilcount = 0;
  let bool = true;
  let len = game.length;

  while (document.getElementById("games").firstChild) { // while there is still a child inside the parent
    document.getElementById("games").removeChild(document.getElementById("games").firstChild); // remove the first child
  }


  //console.log(game);
  for (let index = 0; index < game.length; index += param) {

    console.log("je pass là " + index);

    let div = document.createElement("div");
    let divDetails = document.createElement("div");
    let divGrid = document.createElement("div");

    divDetails.classList.add("divDetail");

    div.id = "div_" + lilcount;
    div.classList.add("flex", "pb-5");
    //div.style = "background-color: red;";

    divDetails.id = "div_det_" + lilcount;
    divDetails.classList.add("flex", "grid", "grid-cols-2", "border-solid", "border-2", "borderGame2", "rounded-md", "p-1");
    //divDetails.style = "background-color: grey;";

    divGrid.id = "div_grid" + lilcount;
    divGrid.classList.add("flex", "grid", "grid-cols-4", "col-span-4", "gap-y-1");


    let labelTitle = document.createElement("label");
    labelTitle.for = "title" + lilcount;
    labelTitle.innerText = ": Titre du jeu  ";


    let title = document.createElement("input");
    title.type = "text";
    title.name = "title" + lilcount;
    title.id = "title" + lilcount;
    title.value = game[index];
    //console.log(game[index]);
    title.setAttribute("onchange", "titlesChanged()");
    title.setAttribute("onfocusout", "save()");
    title.classList.add("border-solid", "border-2", "borderGame", "ltr");

    let labelWeight = document.createElement("label");
    labelWeight.for = "weight" + lilcount;
    labelWeight.innerText = ": Poids ";

    let weight = document.createElement("input");
    weight.type = "number";
    weight.name = "weight" + lilcount;
    weight.id = "weight" + lilcount;
    weight.setAttribute("onchange", "weightsChanged()");
    weight.setAttribute("onfocusout", "save()");
    //console.log(game[index+1]);
    weight.value = game[index + 1];
    weight.classList.add("border-solid", "border-2", "borderGame", "ltr");

    let color = document.createElement("input");
    color.type = "color";
    color.name = "color" + lilcount;
    color.id = "color" + lilcount;
    color.classList.add("border-solid", "border-2", "borderGame");
    color.value = game[index + 2];
    color.setAttribute("onchange", "colorsChanged()");
    color.setAttribute("onfocusout", "save()");


    let labelColor = document.createElement("label");
    labelColor.for = "color" + lilcount;
    labelColor.innerText = ": Couleur ";

    let labelImg = document.createElement("label")
    labelImg.for = "img" + lilcount;
    labelImg.innerText = ": Image ";

    let imgSelect = document.createElement("input");
    imgSelect.type = "file";
    imgSelect.name = "img" + lilcount;
    //imgSelect.accept = "image/png, image/jpeg";
    imgSelect.id = "img" + lilcount;
    imgSelect.classList.add("border-solid", "border-2", "borderGame", "ltr");
    imgSelect.setAttribute("onchange", "imagesChanged(this)");
    imgSelect.setAttribute("onfocusout", "save()");

    let imgName = document.createElement("p");
    imgName.id = "imgName" + lilcount;
    imgName.innerText = game[index + 4];
    imgName.style = "display:none";

    let img = document.createElement("img");
    img.id = "imgShow" + lilcount;
    img.src = ImgPath + game[index + 4];
    img.classList.add("mr-2", "ml-1");
    img.style.height = "200px";
    img.style.width = "200px";

    let trueCount = document.createElement("p");
    trueCount.id = "trueCount" + lilcount;
    trueCount.innerText = game[index + 5];
    trueCount.style = "display:none";

    let cheatCount = document.createElement("p");
    cheatCount.id = "cheatCount" + lilcount;
    cheatCount.innerText = game[index + 6];
    cheatCount.style = "display:none";

    let buttonDelete = document.createElement("button");
    buttonDelete.id = "buttonDelete" + lilcount;
    buttonDelete.classList.add("text-white", "bg-red-700");
    buttonDelete.innerText = "SUPPRIMER";
    buttonDelete.setAttribute("onclick", "deleteGame(" + lilcount + ")");

    let titleResult = document.createElement("p");
    titleResult.innerText = "Résultats";
    titleResult.classList.add("col-span-2");

    let labelTas = document.createElement("label");
    labelTas.for = "labelTas" + lilcount;
    labelTas.innerText = ": Tirage au sort";

    let tas = document.createElement("input");
    tas.id = "tas" + lilcount;
    tas.value = game[index + 5];
    tas.type = "number";
    tas.classList.add("border-solid", "border-2", "borderGame", "ltr");
    tas.setAttribute("onchange", "resultsChanged()");
    tas.setAttribute("onfocusout", "save()");

    let labelTasIgnored = document.createElement("label");
    labelTasIgnored.for = "labelTas" + lilcount;
    labelTasIgnored.innerText = ": Tirage ignoré";

    let tasIgnored = document.createElement("input");
    tasIgnored.id = "tasIgnored" + lilcount;
    tasIgnored.value = game[index + 6];
    tasIgnored.type = "number";
    tasIgnored.classList.add("border-solid", "border-2", "borderGame", "ltr");
    tasIgnored.setAttribute("onchange", "resultsChanged()");
    tasIgnored.setAttribute("onfocusout", "save()");

    let labelPlayed = document.createElement("label");
    labelPlayed.for = "labelPlayed" + lilcount;
    labelPlayed.innerText = ": Parties jouées";
    labelPlayed.classList.add("align-middle");

    let played = document.createElement("input");
    played.id = "played" + lilcount;
    played.type = "number";
    played.value = game[index + 7];
    played.classList.add("border-solid", "border-2", "borderGame", "ltr");
    played.setAttribute("onchange", "playedChanged(" + lilcount + ")");
    //played.setAttribute("onfocusout", "save()");

    let divEmpty = document.createElement("div");
    let addPlayed = document.createElement("button");
    addPlayed.id = "addPlayed" + lilcount;
    addPlayed.innerText = "Ajouter partie";
    addPlayed.classList.add("text-white", "bg-blue-700", "mr-1");
    addPlayed.setAttribute("onclick", "addPlayed(" + lilcount + ")");

    let win = document.createElement("p");
    win.id = "win" + lilcount;
    win.innerText = game[index + 8];
    win.classList.add("hideContent");

    let lose = document.createElement("p");
    lose.id = "lose" + lilcount;
    lose.innerText = game[index + 9];
    lose.classList.add("hideContent");

    let winSession = document.createElement("p");
    winSession.id = "winSession" + lilcount;
    winSession.innerText = game[index + 10];
    winSession.classList.add("hideContent");

    let loseSession = document.createElement("p");
    loseSession.id = "loseSession" + lilcount;
    loseSession.innerText = game[index + 11];
    loseSession.classList.add("hideContent");

    let playedSession = document.createElement("p");
    playedSession.id = "playedSession" + lilcount;
    playedSession.innerText = game[index + 12];
    playedSession.classList.add("hideContent");

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

    divDetails.appendChild(divGrid);
    div.appendChild(divDetails);
    div.appendChild(img);
    document.getElementById("games").appendChild(div);
    gamesArr.push(div);
    lilcount++;
    //console.log(theWheel.segments);

    //console.log("ici");
    //console.log(parseInt(game[index+3]));
    //console.log(theWheel.segments[parseInt(game[index+3])+1]);
    /*  
        console.log("id "+(parseInt(game[index+3])+1));
        if (theWheel.segments[(parseInt(game[index+3])+1)]) {
            console.log("Je passe ici");
            theWheel.segments[parseInt(game[index+3])+1].size = calcWeight(parseInt(game[index+1]));
        }
        else{
            console.log("undef");
            theWheel.addSegment({'size': calcWeight(parseInt(game[index+1])),'fillStyle' : game[index+2], 'text' : game[index], 'id' :game[index+3]-1,'image' : "../image/"+game[index+4]});
            
            //theWheel.segments[parseInt(game[index+3])+1].changeImage("../image/"+game[index+4])
        }  */


  }
  /* console.log(theWheel.segments);
  if (theWheel.segments[1].text == '') {
      console.log("efsssssssssssssss");
      theWheel.deleteSegment(1);
      theWheel.segments.pop();
  } */

  //if (gameNotDeleted && idGameDeleted != null) 
  //idGameDeleted = null;
  //gameNotDeleted = true;
  // console.log(theWheel.segments);
}
function addPlayed(count) {
  console.log("hello");
  let title = document.getElementById("title" + count).value;
  let played = document.getElementById("played" + count);
  let playedSession = document.getElementById("playedSession" + count);
  played.value = parseInt(played.value) + 1;
  playedSession.innerText = parseInt(playedSession.innerText) + 1;
  addPlayedGame(count, title, 360);
}

// Calculate the size of the segments with their weights
function calcWeight(weight) {
  return (weight / Tweight) * 360;
}
// Delete a game
function deleteGame(id) {
  console.log("JE SUPPRIME " + id);
  if (confirm("Voulez vous vraiment supprimer ce jeu ?") && theWheel.segments.length > 1) {
    let deleted = false;
    //console.log(window.localStorage.getItem("games").split(',')[3]);
    let games = window.localStorage.getItem("games").split(',');
    //console.log("id " + id);
    console.log("avant");
    //console.log(games);
    for (let index = 3; index < games.length; index += param) {
      console.log("id " + id);
      console.log(games[index]);
      if (games[index] == id + 1 && !deleted) {

        Tweight -= parseInt(games[index - 2]);
        window.localStorage.setItem("Tweight", Tweight)
        games.splice(index - 3, param);
        deleted = true;
      }
      if (deleted && games[index] > id + 1) games[index] = games[index] - 1;
    }
    console.log("après");
    //console.log(games);
    theWheel.deleteSegment(id + 1);
    theWheel.segments.pop();
    console.log("avant" + count);
    count--;
    console.log("après" + count);
    window.localStorage.setItem("count", parseInt(count));
    window.localStorage.setItem("games", games);
    console.log(window.localStorage.getItem("games"));
    gameAdded = true;
    addGames(games);

    save();
  }
}
function changeColor(game) {
  for (let index = 0; index < game.length; index += param) {
    //console.log("laaaaaaaaaaaaa" + game[index+3])
    //console.log(theWheel.segments);
    theWheel.segments[parseInt(game[index + 3])].fillStyle = game[index + 2];
    //theWheel.addSegment({'size': parseInt(game[index+1]),'fillStyle' : game[index+2], 'text' : game[index] +' '+ winwheelDegreesToPercent(game[index+1]) + '%'});
  }
}

function changeSize(game) {
  for (let index = 0; index < game.length; index += param) {
    //console.log("laaaaaaaaaaaaa" + game[index+3])
    //console.log(theWheel.segments);
    //console.log("Size avant "+theWheel.segments[parseInt(game[index+3])].size);
    //console.log(theWheel.segments);
    theWheel.segments[parseInt(game[index + 3])].size = calcWeight(parseInt(game[index + 1]));
    //console.log("Size après "+theWheel.segments[parseInt(game[index+3])].size);
    //console.log(theWheel.segments);
    //theWheel.addSegment({'size': parseInt(game[index+1]),'fillStyle' : game[index+2], 'text' : game[index] +' '+ winwheelDegreesToPercent(game[index+1]) + '%'});
    theWheel.updateSegmentSizes();
  }
}

function changeImage(game) {
  for (let index = 0; index < game.length; index += param) {
    //console.log("laaaaaaaaaaaaa" + game[index+3])
    //console.log(theWheel.segments);
    theWheel.segments[parseInt(game[index + 3])].image = ImgPath + game[index + 4];

  }
}
function changeTitle(game) {
  for (let index = 0; index < game.length; index += param) {
    //console.log("laaaaaaaaaaaaa" + game[index+3])
    //console.log(theWheel.segments);
    theWheel.segments[parseInt(game[index + 3])].text = game[index];

  }
}
function imagesChanged(image) {
  console.log("image a changé ");
  console.log((image.id).match(/\d+/));
  document.getElementById("imgName" + (image.id).match(/\d+/)).innerText = (image.value).replace("C:\\fakepath\\", "");
  document.getElementById("imgShow" + (image.id).match(/\d+/)).src = ImgPath + (image.value).replace("C:\\fakepath\\", "");
  if (!gameAdded) imageChanged = true;


}
function colorsChanged() {
  console.log("La couleur a changé");
  if (!gameAdded) colorChanged = true;
}

function titlesChanged() {
  console.log("Le titre a changé");
  if (!gameAdded) titleChanged = true;
}

function weightsChanged() {
  console.log("Le poids a changé");
  if (!gameAdded) weightChanged = true;
}

function resultsChanged() {
  console.log("Les résultats ont changé");
  if (!gameAdded) resultChanged = true;
  //save();
}

function playedChanged(lilcount) {
  console.log("Les parties jouées ont changé");
  let title = document.getElementById("title" + lilcount).value;
  console.log(lilcount);
  if (!gameAdded) playedCountChanged = true;

  addPlayedGame(lilcount, title, 360);
  //save();
}

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
function randomizeSegments() {
  let arrRandom = [];
  let game = localStorage.getItem("games").split(',');
  //console.log(game);
  for (let index = 0; index < game.length; index += param) {
    console.log("index" + index);
    arrRandom.push(parseInt(game[index + 3]));
    //arrRandom.push(arrTemp);
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
function updateWheel(game) {
  if (theWheel.segments[1].text == '') {
    theWheel.segments[1].size = 0;
  }
  //console.log(game);
  for (let index = 0; index < game.length; index += param) {
    //console.log((parseInt(game[index + 3])));
    if (game[index + 3] == 1 && theWheel.segments[parseInt(game[index + 3])].text == '') {
      theWheel.segments[1].size = calcWeight(parseInt(game[index + 1]));
      theWheel.segments[1].fillStyle = game[index + 2];
      theWheel.segments[1].text = game[index];
      theWheel.segments[1].id = parseInt(game[index + 3]) - 1;
      theWheel.segments[1].image = ImgPath + game[index + 4];
      theWheel.segments[1].textFillStyle = "#ffffff";
      theWheel.segments[1].textStrokeStyle = "#000000";
    }
    else if (theWheel.segments[parseInt(game[index + 3])]) {
      //console.log("Je passe ici");
      theWheel.segments[parseInt(game[index + 3])].size = calcWeight(parseInt(game[index + 1]));
    }
    else {
      //console.log("undef");
      theWheel.addSegment({ 'size': calcWeight(parseInt(game[index + 1])), 'fillStyle': game[index + 2], 'text': game[index], 'id': parseInt(game[index + 3]) - 1, 'image': ImgPath + game[index + 4], 'textFillStyle': "#ffffff", 'textStrokeStyle': "#000000" });

      //theWheel.segments[parseInt(game[index+3])+1].changeImage("../image/"+game[index+4])
    }
    theWheel.updateSegmentSizes();

  }
}
function drawTriangle() {
  let tcanvas = document.getElementById('myCanvas');

  if (tcanvas.getContext) {
    let tx = tcanvas.getContext('2d');
    let x = theWheel.centerX;
    let y = theWheel.centerY;
    tx.strokeStyle = '#000000';     // Set line colour.
    tx.fillStyle = '#a81000';        // Set fill colour.
    tx.lineWidth = 2;
    if (gamesHidden && histoHidden) {
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


function resizeWheel() {
  let grid = document.getElementById("div_menu");
  let winLoseTotal = document.getElementById("winLoseTotal");
  if (gamesHidden && histoHidden) {
    grid.style.position = 'fixed';
    grid.style.left = 0;
    grid.style.right = 0;
    grid.style.bottom = "0.1%";
    grid.style.height = "5%";
    power_ctrl.classList.add("mt-36");
    theWheel.centerX = 213;
    theWheel.centerY = 220;
    canvas.width = 880;
    canvas.height = 800;
    theWheel.scaleFactor = 1.5;
    theWheel.draw();
    drawTriangle();
    winLoseTotal.classList.add("mb-36");
  }
  else {
    power_ctrl.classList.remove("mt-36");
    grid.style.position = 'relative';
    grid.style.height = "44.3%";
    theWheel.centerX = 315;
    theWheel.centerY = 188;
    canvas.width = 630;
    canvas.height = 376;
    theWheel.scaleFactor = 1;
    theWheel.draw();
    drawTriangle();
    winLoseTotal.classList.remove("mb-36");
  }
}
function hideGames() {
  //console.log(gamesArr);
  let button = document.getElementById("imageButtonGames");
  let menuOpt = document.getElementById("menuOpt");
  let games = document.getElementById("games");
  let titleOpt = document.getElementById("titleOpt");
  if (gamesHidden) {
    gamesHidden = false;
    //games.style.height = "80%";
    titleOpt.classList.remove("mt-1", "mb-12");
    menuOpt.classList.remove("hideGamesAnimation");
    games.classList.remove("hideGamesAnimation2");
    menuOpt.classList.add("appearAnimation");
    games.classList.add("appearAnimation");
    button.innerText = "Câcher les jeux";
    //menuOpt.style.height = "49%";
    menuOpt.classList.remove("h-12", "self-end");
    //menuOpt.classList.add("overflow-y-scroll");
    button.src = ImgPath + "hide.png";
    document.getElementById("div_buttons").style = "display:block";
    gamesArr.forEach(element => {
      //console.log(element);
      element.style = "display:flex";
    });
  }
  else {
    gamesHidden = true;
    //games.style.height = "auto";
    titleOpt.classList.add("mt-1", "mb-12");
    menuOpt.classList.remove("appearAnimation");
    games.classList.remove("appearAnimation");
    menuOpt.classList.add("hideGamesAnimation");
    games.classList.add("hideGamesAnimation2");
    button.innerText = "Afficher les jeux";
    button.src = ImgPath + "view.png";
    menuOpt.classList.add("self-end");
    //menuOpt.classList.remove("overflow-y-scroll");
    document.getElementById("div_buttons").style = "display:none";
    /* gamesArr.forEach(element => {
      console.log(element);
      element.style = "display:none";
    }); */
  }
  resizeWheel();
}

function hideHisto() {
  let histo = document.getElementById("historique");
  let histoDiv = document.getElementById("menuHisto");
  let button = document.getElementById("imageButtonHisto");
  let button2 = document.getElementById("imageButtonHisto2");
  let titleHisto = document.getElementById("titleHisto");
  let ongletHisto = document.getElementById("ongletHisto");
  let ongletResume = document.getElementById("ongletResume");
  if (histoHidden) {
    ongletHisto.classList.remove("pb-4", "pt-1");
    ongletResume.classList.remove("pb-4", "pt-1");
    histoDiv.classList.remove("hideHistoAnimation");
    histo.classList.remove("hideHistoAnimation2");

    histoDiv.classList.add("appearAnimation");
    histo.classList.add("appearAnimation");

    histoDiv.classList.remove("h-12", "self-end", "content-center");
    //histoDiv.classList.add("overflow-y-scroll");
    histoHidden = false;
    button.innerText = "Câcher historique";
    button.src = ImgPath + "hide.png";
    button2.innerText = "Câcher historique";
    button2.src = ImgPath + "hide.png";
    //histo.style = "display:block";
  }
  else {
    ongletHisto.classList.add("pb-4", "rounded-tl-lg", "pt-1");
    ongletResume.classList.add("pb-4", "pt-1");
    histoHidden = true;
    histoDiv.classList.remove("appearAnimation");
    histo.classList.remove("appearAnimation");

    histoDiv.classList.add("hideHistoAnimation");
    histo.classList.add("hideHistoAnimation2");

    //histoDiv.classList.add("h-12","self-end","content-center");
    //histoDiv.classList.remove("overflow-y-scroll");
    button.innerText = "Afficher historique";
    button.src = ImgPath + "view.png";
    button2.innerText = "Afficher historique";
    button2.src = ImgPath + "view.png";
    //histo.classList.add("hideAnimation");

    //histo.style = "display:none"; 
    //histo.classList.add("hideAnimation");

  }
  resizeWheel();
}
function ongletHistoClicked() {
  let ongletHisto = document.getElementById("ongletHisto");
  let ongletResume = document.getElementById("ongletResume");
  let historique = document.getElementById("historique");
  let resumeSession = document.getElementById("resumeSession");
  let buttonArchive = document.getElementById("buttonArchive");
  if (!ongletHistoActive) {
    ongletHistoActive = true;
    ongletResumeActive = false;

    ongletResume.classList.remove("ongletChosen");
    ongletResume.classList.add("ongletNotChosen");

    ongletHisto.classList.remove("ongletNotChosen");
    ongletHisto.classList.add("ongletChosen");

    historique.classList.remove("hideContent");
    historique.classList.add("showContentFlex");

    resumeSession.classList.remove("showContentFlex");
    resumeSession.classList.add("hideContent");

    buttonArchive.classList.remove("hideContent");
    buttonArchive.classList.add("showContent");
  }
}

function ongletResumeClicked() {
  let ongletHisto = document.getElementById("ongletHisto");
  let ongletResume = document.getElementById("ongletResume");
  let historique = document.getElementById("historique");
  let resumeSession = document.getElementById("resumeSession");
  let buttonArchive = document.getElementById("buttonArchive");

  if (!ongletResumeActive) {
    ongletResumeActive = true;
    ongletHistoActive = false;

    ongletResume.classList.remove("ongletNotChosen");
    ongletResume.classList.add("ongletChosen");

    ongletHisto.classList.remove("ongletChosen");
    ongletHisto.classList.add("ongletNotChosen");

    historique.classList.remove("showContentFlex");
    historique.classList.add("hideContent");

    resumeSession.classList.remove("hideContent");
    resumeSession.classList.add("showContentFlex");

    buttonArchive.classList.remove("showContent");
    buttonArchive.classList.add("hideContent");
  }
}
// game[title,weight,color,id,imgName,trueCount,cheatCount,played,win,lose,winSession,loseSession,playedSession]
function save() {
  if (count != oldCount || gameAdded || playedCountChanged || resultChanged || histoChanged || weightChanged || colorChanged || titleChanged || imageChanged) {
    console.log("Je save");
    var games = [];
    console.log(games);
    Tweight = 0;
    for (let index = 0; index < parseInt(count); index++) {
      let game = [];
      //console.log(index);
      game.push(document.getElementById("title" + index).value);
      game.push(document.getElementById("weight" + index).value);
      game.push(document.getElementById("color" + index).value);
      game.push(index + 1);
      //console.log(document.getElementById("img"+index).value);
      game.push(document.getElementById("imgName" + index).innerText);
      game.push(document.getElementById("trueCount" + index).innerText);
      game.push(document.getElementById("cheatCount" + index).innerText);
      game.push(document.getElementById("played" + index).value);
      game.push(parseInt(document.getElementById("win" + index).innerText));
      game.push(parseInt(document.getElementById("lose" + index).innerText));
      game.push(parseInt(document.getElementById("winSession" + index).innerText));
      game.push(parseInt(document.getElementById("loseSession" + index).innerText));
      game.push(parseInt(document.getElementById("playedSession" + index).innerText));

      //console.log(parseInt(document.getElementById("weight"+index).value));
      Tweight += parseInt(document.getElementById("weight" + index).value)
      window.localStorage.setItem("Tweight", Tweight);
      //console.log("Tweight "+ localStorage.getItem("Tweight"));

      games.push(game);
    }
    //console.log(games);
    window.localStorage.setItem("count", parseInt(count));
    window.localStorage.setItem("games", games);
    oldCount = count;
    load();
  }

}
// game = [title, weight, color, id, image, trueCount, cheatCount, played]
function load() {  //to do : load colors
  console.log("Je load");
  window.localStorage.getItem("count") == null ? window.localStorage.setItem("count", 0) : null;
  //window.localStorage.getItem("games") == null ? window.localStorage.setItem("games",[]) : null;
  //console.log(window.localStorage.getItem("count"));
  //console.log(window.localStorage.getItem("games").split(','));
  //console.log("ici");
  let game = window.localStorage.getItem("games").split(',');
  //console.log(count + "segments");
  Tweight = localStorage.getItem("Tweight");
  if (weightChanged) {
    changeSize(game);
    weightChanged = false;
  }

  if (titleChanged) {
    changeTitle(game);
    titleChanged = false;
  }
  if (imageChanged) {
    changeImage(game);
    imageChanged = false;
  }
  if (colorChanged) {
    //console.log("jepasseici");
    changeColor(game);
    colorChanged = false;
  }
  if (gameAdded) {
    //console.log("jepasselà");
    addGames(game);
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
  updateWheel(game);


  window.localStorage.getItem("games");
  //console.log(theWheel.segments);
  if (histo != '') {
    updateHisto();
  }
  if (archive != '' && archiveChanged) {
    archiveChanged = false;
    updateResumeSession();
  }
  //console.log(gamesArr);
  theWheel.draw();
  drawTriangle();
}


