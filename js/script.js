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
const CountAudio = new Audio("../sounds/count.mp3");
const DontCountAudio = new Audio("../sounds/dontcount.mp3");
const StopAudio = new Audio("../sounds/stop.mp3");
const Stop2Audio = new Audio("../sounds/stop2.mp3");
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
var seasonCount = window.localStorage.getItem("seasonCount");
var oldCount = count;
var histo = window.localStorage.getItem("histo");
var Tweight = window.localStorage.getItem("Tweight");
var seasonGameList = window.localStorage.getItem("seasonGameList");
var resultsHisto = window.localStorage.getItem("resultsHisto");
var histoTirage = window.localStorage.getItem("histoTirage");
var archive = window.localStorage.getItem("archive");
var gameArchive = window.localStorage.getItem("gameArchive");
var seasonArchive = window.localStorage.getItem("seasonArchive");
var alertDiv = document.getElementById("alert");
var archivedGame = document.getElementById("archivedGames");
var archivedSeasons = document.getElementById("archivedSeasons");
var seasonStats = document.getElementById("seasonStats");
var animationsDiv = document.getElementById("animations");
var div_canvas = document.getElementById("div_canvas");
var power_ctrl = document.getElementById("power_ctrl");


// Catch user leaving if draws are not archived
window.onbeforeunload = function (){
  histo = window.localStorage.getItem("histo");
	if(histo.length > 0){
		return confirm("Vous n\'avez pas sauvegardé vos changements !, Voulez vous quitter ?");
	}
}

if (seasonCount == null) {
  seasonCount = 1;
  window.localStorage.setItem("seasonCount", seasonCount);
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
  console.log("archiveCheated est null !")
  archiveCheated = [];
  window.localStorage.setItem("archiveCheated", archiveCheated);
}

if (seasonArchive == null) {
  console.log("seasonArchive est null !")
  seasonArchive = [];
  window.localStorage.setItem("seasonArchive", seasonArchive);
}

if (gameArchive == null) {
  gameArchive = [];
  window.localStorage.setItem("gameArchive", gameArchive);
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

// When a color changes, reload segments color
function changeColor(games) {
  games.forEach(game => {
    console.log(game.id)
    theWheel.segments[parseInt(game.id)].fillStyle = game.color;
  });
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



function easter(){
  let bato = document.getElementById("bateau");
  bato.style.height = "300px";
  bato.style.width = "300px";
  bato.classList.add("easterShip");
  PirateAudio.play();
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

