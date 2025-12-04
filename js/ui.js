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
  buttonCount.setAttribute("onclick", "countTrue(" + winningSegment.id + ",'" + winningSegment.text + "'," + winningSegment.size + "); countSound()");
  buttonCount.classList.add("menuButton", "text-white", "font-bold", "mr-2", "py-2", "px-2", "rounded")
  //menuButton  text-white font-bold py-2 px-4 rounded
  let buttonHide = document.createElement("button");
  buttonHide.innerText = "Ne pas compter";
  buttonHide.setAttribute("onclick", "cheatCount(" + winningSegment.id  + ",'" + winningSegment.text + "'," + winningSegment.size + "); dontCountSound()");
  buttonHide.classList.add("menuButton", "text-white", "font-bold", "py-2", "px-2", "rounded")

  let buttonClose = document.createElement("button");
  buttonClose.innerText = "Annuler";
  buttonClose.setAttribute("onclick", "closeDialog(alertDiv)");
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
function closeDialog(div) {
  console.log(div);
  //div = document.getElementById(div);
  div.style.display = "none";
  animationsDiv.style.display = "none";
  animationsDiv.classList.remove("appear");
  $("#archivedGames").empty();
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
  let archive = document.getElementById("buttonArchiveSeason");
  let showArchive = document.getElementById("buttonShowArchiveSeason");
  
  if(ongletResumeActive) {
    if (gamesHidden) {
      menuOpened();
      gamesHidden = false;
      div_menu.classList.remove("hideGamesAnimation");
      resumeSession.classList.remove("hideGamesAnimation2");
      div_menu.classList.add("appearAnimation");
      resumeSession.classList.add("appearAnimation");
      archive.classList.remove("hideContent");
      archive.classList.add("showContentFlex");
      showArchive.classList.remove("hideContent");
      showArchive.classList.add("showContentFlex");
    }
    else {
      menuClosed();
      gamesHidden = true;
      div_menu.classList.remove("appearAnimation");
      resumeSession.classList.remove("appearAnimation");
      div_menu.classList.add("hideGamesAnimation");
      resumeSession.classList.add("hideGamesAnimation2");
      archive.classList.remove("showContentFlex");
      archive.classList.add("hideContent");
      showArchive.classList.remove("showContentFlex");
      showArchive.classList.add("hideContent");
    }
    resizeWheel();
  } else {
    ongletResumeClicked();
  }
}
function ongletGameClicked() {
  let archive = document.getElementById("buttonArchiveSeason");
  let showArchive = document.getElementById("buttonShowArchiveSeason");
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

    archive.classList.add("hideContent");
    archive.classList.remove("showContentFlex");

    showArchive.classList.add("hideContent");
    showArchive.classList.remove("showContentFlex");

    document.getElementById("textHisto").classList.add("hideContent");
    document.getElementById("textHisto").classList.remove("showContent");

    document.getElementById("textResume").classList.add("hideContent");
    document.getElementById("textResume").classList.remove("showContent");
  } else {
    hideGames();
  }
}
// When you click on histo tab
function ongletHistoClicked() {
  let archive = document.getElementById("buttonArchiveSeason");
  let showArchive = document.getElementById("buttonShowArchiveSeason");
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

    archive.classList.add("hideContent");
    archive.classList.remove("showContentFlex");

    showArchive.classList.add("hideContent");
    showArchive.classList.remove("showContentFlex");

    document.getElementById("textResume").classList.add("hideContent");
    document.getElementById("textResume").classList.remove("showContent");

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
  let archive = document.getElementById("buttonArchiveSeason");
  let showArchive = document.getElementById("buttonShowArchiveSeason");
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

    archive.classList.remove("hideContent");
    archive.classList.add("showContentFlex");

    showArchive.classList.remove("hideContent");
    showArchive.classList.add("showContentFlex");

    document.getElementById("textHisto").classList.add("hideContent");
    document.getElementById("textHisto").classList.remove("showContent");

    if ($('#resumeSession').is(':empty')) {
      document.getElementById("textResume").classList.remove("hideContent");
      document.getElementById("textResume").classList.add("showContent");
    }
  }
  else {
    hideResume();
  }
}

function showGameArchive() {
  console.log("hello");
    gameArchive = window.localStorage.getItem("gameArchive");
    try {
        gameArchive = JSON.parse(window.localStorage.getItem("gameArchive"));
    } catch (error) {
      return confirm("Aucuns jeux supprimés !");
    }
    if (gameArchive === undefined || gameArchive.length == 0) {
      return confirm("Aucuns jeux supprimés !");
    }
    //gameArchive = JSON.parse(window.localStorage.getItem("gameArchive"));
    //archivedGame.style.marginTop = "5px";
    archivedGame.style.width = "1000px";
    archivedGame.style.height = "80%";
    archivedGame.style.left= "23.5%";
    archivedGame.style.top= "10%";
    archivedGame.style.flexDirection= "column";
    //archivedGame.classList.add("overflow-y-scroll" , "noScrollBar")
    archivedGames();
    archivedGame.style.display = "flex";
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
  closeDialog(alertDiv);

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
  closeDialog(alertDiv);
}

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
  //closeDialog("alertDiv");
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

function resetTotalWL(){
  winTotal = localStorage.getItem("winTotal");
  loseTotal = localStorage.getItem("loseTotal");
  localStorage.setItem("winTotal",0);
  localStorage.setItem("loseTotal",0);
  updateWinLoseTotal();
}

// histo[bool,text,trueCount,cheatCount,%,id]
// game[title,weight,color,id,imgName,trueCount,cheatCount,played,win,lose,winSession,loseSession,playedSession]
// Archive draws 
function archiveSession() {
  
  histoCount = window.localStorage.getItem("histoCount", histoCount);
  if (histoCount ==0)return;
  histo = (localStorage.getItem('histo'));
  if (histo != "") {
    histo = (JSON.parse(localStorage.getItem("histo")));
  } else {
    histo = [];
  }
  for (let index = 0; index < histo.length; index++) {
    if (document.getElementById("pResultChosen" + index).innerText == "false") {
      confirm("Merci de choisir un résultat pour les runs terminées");
      return;
    }
  }
  histoCount = 0;
  window.localStorage.setItem("histoCount", histoCount);
  archiveChanged = true;
  resultsHisto = localStorage.getItem("resultsHisto");
  archiveCheated = localStorage.getItem("archiveCheated");
  //if (histo.length == 0) return;
    
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
  seasonCount = window.localStorage.getItem("seasonCount");
  arrArchive.push({"date": today(), "season" : seasonCount});
  games.forEach(game => {
    if (parseInt(game.playedSession) != 0) {
      var toBeArchived = { "title": game.title, "win": game.winSession, "lose": game.loseSession, "played": game.playedSession, "date": today() };
      arrArchive.push(toBeArchived);
      game.playedSession = 0;
      game.winSession = 0;
      game.loseSession = 0;
    }
  });
  localStorage.setItem("games",JSON.stringify(games));
//let gameArchive = );
let gameArchive = window.localStorage.getItem("gameArchive");
if (gameArchive != "") {
  gameArchive = (JSON.parse(localStorage.getItem("gameArchive")));
  gameArchive.forEach(game => {
    if (parseInt(game.playedSession) != 0) {
      var toBeArchived = { "title": game.title, "win": game.winSession, "lose": game.loseSession, "played": game.playedSession, "date": today() };
      arrArchive.push(toBeArchived);
      console.log("JE PASSE lA");
      game.playedSession = 0;
      game.winSession = 0;
      game.loseSession = 0;
    }
  }); 
    localStorage.setItem("gameArchive",JSON.stringify(gameArchive));

}
  
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
    let divSubLeft = document.createElement("div");
    let divRight = document.createElement("div");
    let sessionDate = document.createElement("p");
    let score = document.createElement("p");
    //let scoreTotal = document.createElement("p");
    let buttonShowTirage = document.createElement("button");
    buttonShowTirage.setAttribute("onclick", "showTirage(" + sessionCount + ",'" + archivedGame[0].date + "')");

    buttonShowTirage.classList.add("bg-white", "p-1", "border-2", "border-black", "font-bold", "mb-1", "mt-1");
    buttonShowTirage.innerText = "Voir tirage";
    divLeft.classList.add("border-r", "border-gray-400","grid" ,"items-center")
    div.classList.add("flex", "grid", "grid-cols-2", "session", "m-2", "rounded", "font-medium");
  
    let buttonCancelSession = document.createElement("button");
    buttonCancelSession.setAttribute("onclick", "cancelSession(" + sessionCount +")");

    buttonCancelSession.classList.add("bg-white","ml-2", "p-1", "border-2", "border-black", "font-bold", "mb-1", "mt-1");
    buttonCancelSession.innerText = "Annuler";

    archivedGame.forEach(gameResults => {
      //console.log("gameResults");
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
    divSubLeft.appendChild(sessionDate);
    score.innerText = "Score : " + win + "W / " + lose + "L " + " | Score Total : " + winTotal + "W / " + loseTotal + "L";
    divSubLeft.appendChild(score);
    //scoreTotal.innerText = "Score Total : " + winTotal +"W / " + loseTotal + "L";
    //divLeft.appendChild(scoreTotal);
    divSubLeft.appendChild(buttonShowTirage);
    divSubLeft.appendChild(buttonCancelSession);
    divLeft.appendChild(divSubLeft);
    div.appendChild(divLeft);
    div.appendChild(divRight);
    resumeSession.appendChild(div);
    //localStorage.setItem("winTotal", winTotal);
    //localStorage.setItem("loseTotal", loseTotal);
    sessionCount++;

  });
  //updateWinLoseTotal();
}

// Resets counters after archiving
function resetSession() {
  for (let index = 0; index < parseInt(count); index++) {
    document.getElementById("winSession" + index).innerText = 0;
    document.getElementById("loseSession" + index).innerText = 0;
    document.getElementById("playedSession" + index).innerText = 0;
    resultChanged = true;
    
  }
  let games = JSON.parse(window.localStorage.getItem("games"));
  games.forEach(game => {
    game.winSession = 0;
    game.loseSession = 0;
    game.playedSession = 0;
  });
  window.localStorage.setItem("games", JSON.stringify(games));
  save();
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
    buttonClose.setAttribute("onclick", "closeDialog(alertDiv)");
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

function forCounts(tab,bool,title,sessionCount) {
    for (let index = 0; index < tab.length; index++) {
        if (index > sessionCount) {
            tab[index].forEach(element => {
            console.log(element);
                if (element.text == title) {
                    if (bool == true) {
                        console.log("TRUE");
                        element.trueCount--;
                        console.log(element);
                    } else if (bool == false) {
                        console.log("CHEAT");
                        element.cheatCount--;
                        console.log(element);
                    } else if (bool == "manu") {
                        console.log("MANU");
                        element.trueCount--;
                        element.cheatCount--;
                        console.log(element);
                    }  
                }
            });
        } 
    }
}

function forCountsHisto (title,bool) {
    historique = (JSON.parse(localStorage.getItem("histo")));
    historique.forEach(element => {
        if (element.title == title) {
            if (bool == true) {
                console.log("TRUE");
                element.trueCount--;
                console.log(element);
            } else if (bool == false) {
                console.log("CHEAT");
                element.cheatCount--;
                console.log(element);
            } else if (bool == "manu") {
                console.log("MANU");
                element.trueCount--;
                element.cheatCount--;
                console.log(element);
            }  
        }
    });
    localStorage.setItem('histo', JSON.stringify(historique));
}
// Cancels retroactively a session, like it never happened
function cancelSession (sessionCount) {
  archive = JSON.parse(localStorage.getItem("archive"));
  games = JSON.parse(localStorage.getItem("games"));
  gameArchive = localStorage.getItem("gameArchive");
  winTotal = localStorage.getItem("winTotal");
  loseTotal = localStorage.getItem("loseTotal");
  histoTirage = (JSON.parse(localStorage.getItem("histoTirage")));
  let historique = localStorage.getItem("histo");

  console.log("CANCEL");
  /* archive.forEach(element => {
    element.forEach(archived => {
      console.log("JE CHECK : ");
      console.log(archived);
      games.forEach(game => {
        console.log(archive.indexOf(element));
        console.log(sessionCount);
        if ( archive.indexOf(element) == sessionCount && archived.title && archived.title == game.title   ) {
          console.log("CA CORRESPOND (GAMES) : ");
          game.win -= archived.win;
          game.lose -= archived.lose;
          game.played -= archived.played;

          winTotal -= archived.win;
          loseTotal -= archived.lose;
        }
      });
      if (gameArchive != "") {
        gameArchive = JSON.parse(localStorage.getItem("gameArchive"));
        gameArchive.forEach(game => {
         
        if (archive.indexOf(element) == sessionCount && archived.title && archived.title == game.title) {
          console.log("CA CORRESPOND (ARCHIVE) : ");
          game.win -= archived.win;
          game.lose -= archived.lose;
          game.played -= archived.played;

          winTotal -= archived.win;
          loseTotal -= archived.lose;
        }
      });
      localStorage.setItem('gameArchive', JSON.stringify(gameArchive));
      }
      
    });
    
  
  }); */
  hitsoAdelete = histoTirage[sessionCount];
  console.log(hitsoAdelete);
  hitsoAdelete.forEach(histo => {
    console.log(histo);
    games.forEach(game => {
      console.log(game);
      console.log(histo.text + " = " + game.title)
      if (histo.text == game.title) {
        console.log("title =");
            if (histo.trueOrCheat == true) {
              console.log("true");
              game.trueCount--;
              game.played--;
              /* for (let index = 0; index < histoTirage.length; index++) {
                if (index > sessionCount) {
                  histoTirage[index].forEach(element => {
                    console.log(element);
                    if (element.text == game.title) {
                      console.log("TRUE");
                      element.trueCount--;
                      console.log(element);
                    }
                  });
                } 
            } */
            forCounts(histoTirage,true,game.title,sessionCount);
            
            if (historique != "") {
                /* historique = (JSON.parse(localStorage.getItem("histo")));
                historique.forEach(element => {
                if (element.title == game.title) {
                      console.log("TRUE");
                      element.trueCount--;
                      console.log(element);
                    }
              });
              localStorage.setItem('histo', JSON.stringify(historique)); */
              forCountsHisto(game.title,true)
            }
            

              
            } else if (histo.trueOrCheat == false) {
              console.log("cheat ");
              game.cheatCount--;
              /* for (let index = 0; index < histoTirage.length; index++) {
                if (index > sessionCount) {
                  histoTirage[index].forEach(element => {
                    console.log(element);
                    if (element.text == game.title) {
                      console.log("CHEAT");
                      element.cheatCount--;
                      console.log(element);
                    }
                  });
                } 
              } */
              forCounts(histoTirage,false,game.title,sessionCount);
              if (historique != "") {
                /* historique = (JSON.parse(localStorage.getItem("histo")));
                historique.forEach(element => {
                if (element.title == game.title) {
                      console.log("CHEAT");
                      element.cheatCount--;
                      console.log(element);
                    }
              });
              localStorage.setItem('histo', JSON.stringify(historique)); */
              forCountsHisto(game.title,false)
            }
            }
            else if (histo.trueOrCheat == "manu") {
              console.log("manu");
              game.trueCount--;
              game.cheatCount--;
              game.played--;
              /* for (let index = 0; index < histoTirage.length; index++) {
                if (index > sessionCount) {
                  histoTirage[index].forEach(element => {
                    console.log(element);
                    if (element.text == game.title) {
                      console.log(element.text + " = " + game.title)
                      console.log("MANU");
                      element.trueCount--;
                      element.cheatCount--;
                      console.log(element);
                    }
                  });
                } 
              } */
              forCounts(histoTirage,"manu",game.title,sessionCount);
              if (historique != "") {
                /* historique = (JSON.parse(localStorage.getItem("histo")));
                historique.forEach(element => {
                if (element.title == game.title) {
                      console.log(element.text + " = " + game.title)
                      console.log("MANU");
                      element.trueCount--;
                      element.cheatCount--;
                      console.log(element);
                    }
              });
              localStorage.setItem('histo', JSON.stringify(historique)); */
              forCountsHisto(game.title,"manu")
            }
            }
        if (histo.wonOrLost) {
          console.log("cetait win");
          game.win--;
          winTotal --;
        } else{
          console.log("cetait lose");
          game.lose--;
          loseTotal --;
        }

      }
    });
    if (gameArchive != "") {
        gameArchive = JSON.parse(localStorage.getItem("gameArchive"));
        gameArchive.forEach(game => {
          console.log(game);
          console.log(histo.text + " = " + game.title)
          if (histo.text == game.title) {
            console.log("title =");
            console.log(histo.trueOrCheat);
            if (histo.trueOrCheat == true) {
              console.log("true");
              game.trueCount--;
              game.played--;
              /* for (let index = 0; index < histoTirage.length; index++) {
                if (index > sessionCount) {
                  histoTirage[index].forEach(element => {
                    console.log(element);
                    if (element.text == game.title) {
                      console.log("TRUE");
                      element.trueCount--;
                      console.log(element);
                    }
                  });
                } 
              } */
              forCounts(histoTirage,true,game.title,sessionCount);
              if (historique != "") {
                /* historique = (JSON.parse(localStorage.getItem("histo")));
                historique.forEach(element => {
                if (element.title == game.title) {
                      console.log("TRUE");
                      element.trueCount--;
                      console.log(element);
                    }
              });
              localStorage.setItem('histo', JSON.stringify(historique)); */
              forCountsHisto(game.title,true)
            }
            } else if (histo.trueOrCheat == false) {
              console.log("cheat ");
              game.cheatCount--;
              /* for (let index = 0; index < histoTirage.length; index++) {
                if (index > sessionCount) {
                  histoTirage[index].forEach(element => {
                    console.log(element);
                    if (element.text == game.title) {
                      console.log("CHEAT");
                      element.cheatCount--;
                      console.log(element);
                    }
                  });
                } 
              } */
              forCounts(histoTirage,false,game.title,sessionCount);
              if (historique != "") {
                /* historique = (JSON.parse(localStorage.getItem("histo")));
                historique.forEach(element => {
                if (element.title == game.title) {
                      console.log("CHEAT");
                      element.cheatCount--;
                      console.log(element);
                    }
              }); */
              //localStorage.setItem('histo', JSON.stringify(historique));
              forCountsHisto(game.title,false)
            }
            }
            else if (histo.trueOrCheat == "manu") {
              console.log("manu");
              game.trueCount--;
              game.cheatCount--;
              game.played--;
              /* for (let index = 0; index < histoTirage.length; index++) {
                if (index > sessionCount) {
                  histoTirage[index].forEach(element => {
                    console.log(element);
                    if (element.text == game.title) {
                      console.log(element.text + " = " + game.title)
                      console.log("MANU");
                      element.trueCount--;
                      element.cheatCount--;
                      console.log(element);
                    }
                  });
                } 
              } */
              forCounts(histoTirage,"manu",game.title,sessionCount);
              if (historique != "") {
                /* historique = (JSON.parse(localStorage.getItem("histo")));
                historique.forEach(element => {
                if (element.title == game.title) {
                      console.log(element.text + " = " + game.title)
                      console.log("MANU");
                      element.trueCount--;
                      element.cheatCount--;
                      console.log(element);
                    }
              });
              localStorage.setItem('histo', JSON.stringify(historique)); */
              forCountsHisto(game.title,"manu")
            }
            }
            if (histo.wonOrLost == true) {
              game.win--;
              winTotal--;
            } else{
              game.lose--;
              loseTotal--;
            }

          }
        });
        localStorage.setItem('gameArchive', JSON.stringify(gameArchive));
    }
  });
  histoTirage.splice(sessionCount,1)

  archive.splice(sessionCount,1);
  localStorage.setItem('histoTirage', JSON.stringify(histoTirage));
  localStorage.setItem('archive', JSON.stringify(archive));
  localStorage.setItem('games', JSON.stringify(games));
  
  localStorage.setItem("winTotal",winTotal);
  localStorage.setItem("loseTotal",loseTotal);
  updateWinLoseTotal();
  updateResumeSession();
  gameAdded = true;
  load();
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

function archiveSeason () {
  archive = localStorage.getItem("archive");
  console.log(archive.length)
  if (archive.length != 2 ) {
    archive = JSON.parse(localStorage.getItem("archive"));
  } else {
    return confirm("Il n'y a aucune session à archiver !")

  }
  if (!confirm("Veux tu vraiment archiver cette saison ?"))
  {
    return;
  }
  seasonArchive = localStorage.getItem("seasonArchive");
  if (seasonArchive != "") {
    seasonArchive = JSON.parse(localStorage.getItem("seasonArchive"));
  } else {
    seasonArchive = [];
  }

  let tab = [];
  archive.forEach(element => {
    tab.push(element);
  });
  seasonArchive.push(tab);

  archive = [];
  localStorage.setItem("archive", JSON.stringify(archive));
  localStorage.setItem("seasonArchive", JSON.stringify(seasonArchive));

  localStorage.setItem("archiveCheated", []);
  localStorage.setItem("histoTirage", []);
  
  document.getElementById("textResume").classList.remove("hideContent");
  document.getElementById("textResume").classList.add("showContent");
  seasonCount = localStorage.getItem("seasonCount");
  seasonCount++;
  localStorage.setItem("seasonCount", seasonCount);
  sumUpSeasons();
  updateResumeSession();
  resetStatsGames();
  resetTotalWL();
}

function sumUpSeasons () {
  seasonArchive = JSON.parse(localStorage.getItem("seasonArchive"));
  
  /* if (seasonGameList == null) {
    seasonGameList = [];
    localStorage.setItem("seasonGameList", JSON.stringify(seasonGameList));
  } else {
    seasonGameList = JSON.parse(localStorage.getItem("seasonGameList"));
  } */
  dateFirstGamePlayed = seasonArchive[0][0][0];
  let resumeSeason = [];
  //dateLastGamePlayed = seasonArchive[seasonArchive.length-1][0][0];
  seasonArchive.forEach(element => {
    let dateFirstGamePlayed;
    let dateLastGamePlayed;
    let seasonGameList = [];
    let seasonGameScores = [];
    let played = 0;
    let win = 0;
    let lose = 0;
    let mostPlayed = {
      played: 0
    };
    let leastPlayed = {
      played: 1000
    };
    dateFirstGamePlayed = element[0][0].date;
// FAIRE UNE LISTE DES JEUX JOUES POUR POUVOIR LES TRIER PAR RATIO
    element.forEach((sessions) => {
      console.log("SESSION");console.log(sessions);
      for (let index = 0; index < sessions.length; index++) {
        dateLastGamePlayed = sessions[index].date
        if (sessions[index].played) {
          played += sessions[index].played;
          win += sessions[index].win;
          lose += sessions[index].lose;
        }
        
        if (mostPlayed.played < sessions[index].played) {
          mostPlayed = sessions[index];
        }
        if (leastPlayed.played > sessions[index].played) {
          leastPlayed = sessions[index];
        }
        console.log(sessions[index]);
        //seasonGameList.push(sessions[index])
        let keys = Object.keys(sessions[index]);
        var key = keys[0];

        if (keys.length !== 1 ){
          seasonGameList.push(sessions[index]);
        }
        if (!seasonGameScores.some(e => e.title === sessions[index].title)) {
          seasonGameScores.push({"title" : sessions[index].title, 
            win : sessions[index].win,
            lose : sessions[index].lose,
            played : sessions[index].played,
          });
        } else {
          let  i = seasonGameScores.findIndex(e => e.title === sessions[index].title);
          seasonGameScores[i].win += sessions[index].win;
          seasonGameScores[i].lose += sessions[index].lose;
          seasonGameScores[i].played += sessions[index].played;
        }
        
      }
    });
    seasonGameScores.splice(0, 1);
    console.log("SEASON SCORES")
    console.log(seasonGameScores);
    seasonGameScores.sort((a, b) => b.played - a.played);
    mostPlayed = seasonGameScores[0];
    leastPlayed = seasonGameScores[seasonGameScores.length-1];
    resumeSeason.push({"win" : win, 
        "lose" : lose , 
        "played" : played , 
        "mostPlayed" : mostPlayed , 
        "leastPlayed" : leastPlayed , 
        "dateFirstGamePlayed" : dateFirstGamePlayed , 
        "dateLastGamePlayed" : dateLastGamePlayed,
        "seasonGameList" : seasonGameList,
        "seasonGameScores" : seasonGameScores
      });
  localStorage.setItem("resumeSeason", JSON.stringify(resumeSeason));
  });
  
  //localStorage.setItem("resumeSeason", JSON.stringify(resumeSeason));
  //localStorage.setItem("dateFirstGamePlayed", JSON.stringify(dateFirstGamePlayed));
  //localStorage.setItem("dateLastGamePlayed", JSON.stringify(dateLastGamePlayed));
}


function showSeasonsArchive () {
    /* //archivedGame.style.marginTop = "5px";
    archivedSeasons.style.width = "30%";
    archivedSeasons.style.height = "100%";
    archivedSeasons.style.left= "70%";
    archivedSeasons.style.top= "0";
    archivedSeasons.classList.add("archiveSeason");
    archivedSeasons.style.flexDirection= "column";
    archivedSeasons.style.justifyContent = "flex-end"; */
    OpenAudio.play()
    resumeSeason = JSON.parse(window.localStorage.getItem("resumeSeason"));
    seasonArchive = JSON.parse(window.localStorage.getItem("seasonArchive"));

    $("#archivedSeasons").empty();
    $("#archivedSeasons").removeClass("hidden rightToLeft2");
    $("#archivedSeasons").addClass("rightToLeft");
    let p = document.createElement("p");
    p.innerHTML = "Liste des saisons"
    p.classList.add("font-medium" , "py-2","px-4","text-2xl" ,"rounded");
    p.style.backgroundColor = "#e4debe"
    let div = document.createElement("div");
    div.classList.add("flex","justify-center","mt-2")
    div.appendChild(p);
    archivedSeasons.appendChild(div);
    let bigDiv = document.createElement("div");
    let bigDiv2 = document.createElement("div");
    let bigDiv3 = document.createElement("div");
    bigDiv2.style.height = "90%";
    //bigDiv2.style.width = "90%";
    bigDiv2.classList.add("grid", "grid-cols-2")
    //bigDiv3.classList.add("grid", "grid-cols-2")
    bigDiv.classList.add("overflow-y-scroll" , "noScrollBar")
    let county = 0;
    resumeSeason.forEach(element => {
      
      let div = document.createElement("div");
      //div.classList.add("flex", "grid", "grid-cols-2", "session", "m-2", "rounded", "font-medium");
      //console.log(resumeSeason.length - county);
      div.classList.add("session", "rounded", "font-medium","m-2","pb-1");
      //div.style.width = "50%";
      let divLeft = document.createElement("div");
      let divRight = document.createElement("div");
      let seasonNum = document.createElement("p");
      let seasonDates = document.createElement("p");
      let seasonMostPlayed = document.createElement("p");
      let seasonLeastPlayed = document.createElement("p");
      let seasonBestRatio = document.createElement("p");
      let seasonScore = document.createElement("p");
      let buttonStats = document.createElement("button");
      buttonStats.classList.add("button" ,"rounded");
      buttonStats.innerHTML=" Stats";
      buttonStats.setAttribute("onclick", "showStatsSeason("+county+"); clickSound()");
      var bestRatioCount = -1;
      var bestRatio;
      (element.seasonGameScores).forEach(score => {
        if (score.win / score.lose > bestRatioCount) {
          bestRatio = score;
          bestRatioCount = score.win / score.lose;
          console.log("ICI SCORE "  );
      console.log(bestRatio  );
        }
      });
      console.log("ICI SCORE "  );
      console.log(bestRatio  );
      seasonNum.innerText = "Saison " + (county + 1);
      seasonDates.innerText = element.dateFirstGamePlayed + " - " + element.dateLastGamePlayed
      seasonMostPlayed.innerText = "Jeu le plus joué : " + element.mostPlayed.title + " - " + element.mostPlayed.played + " fois";
      seasonLeastPlayed.innerText = "Jeu le moins joué : " + element.leastPlayed.title +" - " + element.leastPlayed.played + " fois";
      seasonBestRatio.innerText = "Meilleur ratio : " + bestRatio.title +" - " + bestRatio.win + "W/"+bestRatio.lose + "L";
      seasonScore.innerText = element.win +"W / " + element.lose + " L - " + element.played + " partie(s) "; 

      divLeft.appendChild(seasonNum);
      divLeft.appendChild(seasonDates);
      divLeft.appendChild(seasonMostPlayed);
      divLeft.appendChild(seasonLeastPlayed);
      divLeft.appendChild(seasonBestRatio);
      divLeft.appendChild(seasonScore);
      divLeft.appendChild(buttonStats);
      //divLeft.classList.add("border-r", "border-gray-400");
      
      div.appendChild(divLeft);

      seasonArchive[county].forEach(session => {
        let dateSession = document.createElement("p");
        console.log(session);
        dateSession.innerText = "Session du : " + session[0].date;
        divRight.appendChild(dateSession);
        for (let index = 1; index < session.length; index++) {
          let game = document.createElement("p");
          game.innerText = session[index].title + " - " + session[index].win + " W / " + session[index].lose + " L - " + session[index].played + " joué"
          divRight.appendChild(game);
        }
        
      });
  
      //div.appendChild(divRight);

      bigDiv2.appendChild(div);
      //bigDiv3.appendChild(div);
      county++;
    });
    bigDiv2.style.display= "flex";
    bigDiv2.style.flexDirection= "column-reverse";
    bigDiv2.style.justifyContent = "flex-end";
    //bigDiv2.appendChild(bigDiv3);
    bigDiv.appendChild(bigDiv2);
    document.getElementById("archivedSeasons").appendChild(bigDiv);

    let buttonClose = document.createElement("button");
    buttonClose.innerText = "Fermer";
    buttonClose.setAttribute("onclick", "closeAnimationArchive();");
    buttonClose.classList.add("resetButton", "text-white", "font-bold", "py-2", "px-4", "rounded", "mt-1")
    archivedSeasons.appendChild(buttonClose);

    archivedSeasons.style.display = "flex";
}

function closeAnimationArchive () {
  $("#archivedSeasons").removeClass("rightToLeft");
  $("#archivedSeasons").addClass("rightToLeft2");

  $("#seasonStats").removeClass("leftToRight");
  $("#seasonStats").addClass("leftToRight2");
  CloseAudio.play()
  //$("#archivedSeasons").addClass("hidden");
  //$("#archivedSeasons").css("display","none");
}

function showStatsSeason (numero) {
  $("#seasonStats").empty();
  $("#seasonStats").removeClass("hidden leftToRight2");
  $("#seasonStats").addClass("leftToRight");
  
  seasonArchive = JSON.parse(window.localStorage.getItem("seasonArchive"));
  resumeSeason = JSON.parse(window.localStorage.getItem("resumeSeason"));
  seasonStats.style.display = "flex";
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.innerHTML = "Statistiques de la saison " + (numero +1);
  p.classList.add("font-medium" , "py-2","px-4","text-2xl" ,"rounded");
  p.style.backgroundColor = "#e4debe"
  div.classList.add("flex","justify-center","mt-2")
  div.appendChild(p)
  seasonStats.appendChild(div)

  let div2 = document.createElement("div");
  div2.classList.add("session","grid","grid-cols-2", "mr-2", "rounded-br","rounded-tr","pb-2","mt-2","overflow-y-scroll","noScrollBar");

  let divLeft = document.createElement("div");
  divLeft.classList.add("border-r", "border-gray-400");
  let p2 = document.createElement("p");
  p2.innerHTML = "Stats par jeux";
  p2.classList.add("font-bold");
  divLeft.appendChild(p2)

  
  /* let tab = [];
  resumeSeason[numero].seasonGameList.forEach(game => {
    let check = tab.findIndex(obj => obj.title == game.title);
    if(check !== -1) {
      tab[check].win += game.win;
      tab[check].lose += game.lose;
      tab[check].played += game.played;
    // do something…

    } else {
      tab.push(game);
    }
  }); *
  console.log(tab); */

  resumeSeason[numero].seasonGameScores.forEach(element => {
    let divGameStat = document.createElement("div");
    let pGameStat = document.createElement("p");
    pGameStat.innerHTML = element.title + " " + element.win + "W / " + element.lose + " L " + element.played + " joué(s)"
    divGameStat.appendChild(pGameStat);
    divLeft.appendChild(pGameStat);
  });


  let divRight = document.createElement("div");
  let p3 = document.createElement("p");
  p3.innerHTML = "Sessions";
  divRight.appendChild(p3)
  p3.classList.add("font-bold");
  console.log(numero);
  console.log(sumUpSession(numero));

  let array = sumUpSession(numero);
  let county = 0;
  array.forEach(element => {
    //element.classList.add("flex");
    let divSession = document.createElement("div");
    divSession.classList.add("block", "justify-center","mt-2");
    //divSession.appendChild(element);
    //let buttonStats = document.createElement("button");
    //buttonStats.innerHTML=">";
    //buttonStats.setAttribute("onclick", "showStatSession(" + numero + "); clickSound()");
    element.setAttribute("onclick", "showStatSession(" + numero + "," + county + "); clickSound()");
    element.classList.add("inline-block","buttonFullRounded")
    //buttonStats.style.height = "10px"
    divSession.appendChild(element);
    //divSession.appendChild(buttonStats);
    divRight.appendChild(divSession);
    county++;
  });

  let divDetails = document.createElement("div");
  divDetails.id = "divDetailSeason";
  divDetails.classList.add("flex" , "justify-center")

  div2.appendChild(divLeft);
  div2.appendChild(divRight);
  seasonStats.appendChild(div2);
  seasonStats.appendChild(divDetails);

}

function sumUpSession (sessionBig) {
  seasonArchive = JSON.parse(window.localStorage.getItem("seasonArchive"));
  //let game = document.createElement("p");
  let array = [];
  console.log(sessionBig);
  seasonArchive[sessionBig].forEach(session => {
    let game = document.createElement("button");
    game.classList.add("inline-block","align-middle")
    let played = 0;
    let win = 0;
    let lose = 0;
    let dateSession = document.createElement("p");
    console.log(session);
    dateSession.innerText = session[0].date;
    //divRight.appendChild(dateSession);
    
    for (let index = 1; index < session.length; index++) {
      played += session[index].played;
      win += session[index].win;
      lose += session[index].lose;
    }   
      game.innerText = session[0].date + " - " + played +" joués - " + win + "W/" + lose + "L";
      array.push(game);
  });
  return array;
}

function showStatSession (numSeason, numSession ) {
  $("#divDetailSeason").empty();
  seasonArchive = JSON.parse(window.localStorage.getItem("seasonArchive"));
  console.log(seasonArchive[numSeason][numSession]);
  session = seasonArchive[numSeason][numSession];
  dateSession = session[0].date;
  let div= document.createElement("div");
  div.classList.add("session", "mt-2", "w-fit", "p-2", "rounded");
  let pTitle= document.createElement("p");
  div.appendChild(pTitle);
  pTitle.innerHTML = "Détails de la session du " + dateSession;
  pTitle.classList.add("border-b" ,"border-gray-400","font-bold")
  for (let index = 1; index < session.length; index++) {
    let p = document.createElement("p");
    p.innerHTML = session[index].title + " - " + session[index].win + "W/" + session[index].lose + "L - " + session[index].played +" joué(s) " ;
    div.appendChild(p);
  }
  document.getElementById("divDetailSeason").appendChild(div)
  //return div;
}