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

function archivedGames() {
  var lilcount = 0;

  /* while (document.getElementById("games").firstChild) { // while there is still a child inside the parent
    document.getElementById("games").removeChild(document.getElementById("games").firstChild); // remove the first child
  } */
  gameArchive = JSON.parse(window.localStorage.getItem("gameArchive"));
  if (gameArchive.length == 0 || gameArchive === undefined) {
    console.log("CEST NON");
    closeDialog(archivedGame);
    return;
    
    
  }
  $("#archivedGames").empty();
  let p3 = document.createElement("p");
  p3.innerHTML = "Jeux supprimés"
  p3.classList.add("font-semibold");
  archivedGame.appendChild(p3);
  let bigDiv = document.createElement("div");
  gameArchive.forEach(game => {
    let div = document.createElement("div");
    let divDetails = document.createElement("div");
    let divGrid = document.createElement("div");

    divDetails.classList.add("divDetail");

    div.id = "div_archive" + lilcount;
    div.classList.add("flex","pt-2","pb-2","ltr","box");
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

    divDetails.id = "div_det_archive" + lilcount;
    divDetails.classList.add("flex","border-solid", "border-2", "borderGame2", "rounded-md", "p-1","overflow-hidden");
    divDetails.style.width = "89.6%";

    divGrid.id = "div_grid_archive" + lilcount;
    divGrid.classList.add("flex","flex-row","space-x-7");

    let labelTitle = document.createElement("label");
    labelTitle.id = "labelTitle_archive_"+lilcount;
    labelTitle.for = "title_archive_" + lilcount;
    labelTitle.innerText = "Titre du jeu :";
    labelTitle.classList.add("place-self-center","p-2");

    let title = document.createElement("p");
    //title.type = "text";
    title.name = "title_archive_" + lilcount;
    title.id = "title__archive_" + lilcount;
    title.innerHTML = game.title;
    //title.setAttribute("onchange", "titlesChanged()");
    //title.setAttribute("onfocusout", "save()");
    //title.classList.add("border-solid", "border-2", "borderGame", "ltr","title")
    title.classList.add("place-self-center","p-2");
    

    let labelWeight = document.createElement("label");
    labelWeight.id = "labelWeight_archive_"+lilcount;
    labelWeight.for = "weight_archive_" + lilcount;
    labelWeight.innerText = "Poids :";
    labelWeight.classList.add("place-self-center")

    let weight = document.createElement("input");
    weight.type = "number";
    weight.name = "weight_archive_" + lilcount;
    weight.id = "weight_archive_" + lilcount;
    weight.setAttribute("onchange", "weightsChanged()");
    weight.setAttribute("onfocusout", "save()");
    weight.setAttribute("min", 0);
    weight.value = game.weight;
    weight.classList.add("border-solid", "border-2", "borderGame", "ltr","weight");

    let color = document.createElement("input");
    color.type = "color";
    color.name = "color_archive_" + lilcount;
    color.id = "color_archive_" + lilcount;
    color.classList.add("border-solid", "border-2", "borderGame","place-self-center","color");
    color.value = game.color;
    color.setAttribute("onchange", "colorsChanged()");
    color.setAttribute("onfocusout", "save()");


    let labelColor = document.createElement("label");
    labelColor.id = "labelColor_archive_"+lilcount;
    labelColor.for = "color_archive_" + lilcount;
    labelColor.innerText = "Couleur :";
    labelColor.classList.add("place-self-center")

    let labelImg = document.createElement("label")
    labelImg.id = "labelImg_archive_"+lilcount;
    labelImg.for = "img_archive_" + lilcount;
    labelImg.innerText = "Image :";
    labelImg.classList.add("hideContent","place-self-center");

    let imgSelect = document.createElement("input");
    imgSelect.type = "file";
    imgSelect.name = "img_archive_" + lilcount;
    imgSelect.id = "img_archive_" + lilcount;
    imgSelect.classList.add("border-solid", "border-2", "borderGame", "ltr","hideContent");
    imgSelect.setAttribute("onchange", "imagesChanged(this)");
    imgSelect.setAttribute("onfocusout", "save()");

    let imgName = document.createElement("p");
    imgName.id = "imgName_archive_" + lilcount;
    imgName.innerText = game.imgName;
    imgName.style = "display:none";
    imgName.classList.add("imgName");

    let img = document.createElement("img");
    img.id = "imgShow_archive_" + lilcount;
    img.src = ImgPath + game.imgName;
    img.classList.add("mr-2", "ml-1");
    img.style.height = "50px";
    img.style.width = "50px";

    let trueCount = document.createElement("p");
    trueCount.id = "trueCount_archive_" + lilcount;
    trueCount.innerText = game.trueCount;
    trueCount.style = "display:none";
    trueCount.classList.add("trueCount");

    let cheatCount = document.createElement("p");
    cheatCount.id = "cheatCount_archive_" + lilcount;
    cheatCount.innerText = game.cheatCount;
    cheatCount.style = "display:none";
    cheatCount.classList.add("cheatCount");

    let buttonDelete = document.createElement("button");
    buttonDelete.id = "buttonDelete_archive_" + lilcount;
    buttonDelete.classList.add("text-white", "bg-red-700","ml-2","px-2","rounded","buttonDelete","py-1");
    buttonDelete.innerText = "SUPPRIMER";
    buttonDelete.setAttribute("onclick", "deleteGameArchive(" + lilcount + ")");
    buttonDelete.setAttribute("onmouseover", "hoverSound()");
    
    let titleResult = document.createElement("p");
    titleResult.id = "titleResult_archive_"+lilcount;
    titleResult.innerText = "Résultats";
    titleResult.classList.add("col-span-2","hideContent","place-self-center");

    let labelTas = document.createElement("label");
    labelTas.id = "labelTas_archive_"+lilcount;
    labelTas.for = "labelTas_archive_" + lilcount;
    labelTas.innerText = "Tirage au sort :";
    labelTas.classList.add("hideContent","place-self-center")

    let tas = document.createElement("input");
    tas.id = "tas_archive_" + lilcount;
    tas.value = game.trueCount;
    tas.type = "number";
    tas.classList.add("border-solid", "border-2", "borderGame", "ltr","hideContent");
    tas.setAttribute("onchange", "resultsChanged()");
    tas.setAttribute("onfocusout", "save()");
    tas.setAttribute('disabled', '');

    let labelTasIgnored = document.createElement("label");
    labelTasIgnored.id = "labelTasIgnored_archive_"+lilcount;
    labelTasIgnored.for = "labelTas_archive_" + lilcount;
    labelTasIgnored.innerText = "Tirage ignoré :";
    labelTasIgnored.classList.add("hideContent","place-self-center")

    let tasIgnored = document.createElement("input");
    tasIgnored.id = "tasIgnored_archive_" + lilcount;
    tasIgnored.value = game.cheatCount;
    tasIgnored.type = "number";
    tasIgnored.classList.add("border-solid", "border-2", "borderGame", "ltr","hideContent");
    tasIgnored.setAttribute("onchange", "resultsChanged()");
    tasIgnored.setAttribute("onfocusout", "save()");
    tasIgnored.setAttribute('disabled', '');

    let labelPlayed = document.createElement("label");
    labelPlayed.id = "labelPlayed_archive_"+lilcount;
    labelPlayed.for = "labelPlayed_archive_" + lilcount;
    labelPlayed.innerText = "Parties jouées :";
    labelPlayed.classList.add("align-middle","place-self-center");

    let played = document.createElement("p");
    played.id = "played_archive_" + lilcount;
    played.innerHTML = game.played;
    played.classList.add("place-self-center","p-2");
 

    let divEmpty = document.createElement("div");
    divEmpty.classList.add("hideContent");
    divEmpty.id = "divEmpty_archive_"+lilcount;

    let divEmpty2 = document.createElement("div");
    divEmpty2.classList.add("hideContent");
    divEmpty2.id = "divEmpty2_archive_"+lilcount;

    let addPlayed = document.createElement("button");
    addPlayed.id = "addPlayed_archive_" + lilcount;
    addPlayed.innerText = "Ajouter partie";
    addPlayed.classList.add("text-white", "bg-blue-700", "mr-1","px-2","rounded","addPlayed");
    addPlayed.setAttribute("onclick", "addPlayed(" + lilcount + ")");
    addPlayed.setAttribute("onmouseover", "hoverSound()");

    let labelWin = document.createElement("label");
    labelWin.id = "labelWin_archive_"+lilcount;
    labelWin.for = "win_archive_" + lilcount;
    labelWin.innerText = "Victoire(s) :";
    labelWin.classList.add("align-middle","place-self-center");

    let win = document.createElement("p");
    win.id = "win_archive_" + lilcount;
    win.innerText = game.win;
    win.classList.add("win","place-self-center","p-2");

    let labelLose = document.createElement("label");
    labelLose.id = "labelWin_archive_"+lilcount;
    labelLose.for = "lose_archive_" + lilcount;
    labelLose.innerText = "Défaite(s) :";
    labelLose.classList.add("align-middle","place-self-center");

    let lose = document.createElement("p");
    lose.id = "lose_archive_" + lilcount;
    lose.innerText = game.lose;
    lose.classList.add("lose","place-self-center","p-2");

    
    let labelWinSession = document.createElement("label");
    labelWinSession.id = "labelWinSession_archive_"+lilcount;
    labelWinSession.for = "winSession_archive_" + lilcount;
    labelWinSession.innerText = "Victoire(s) :";
    labelWinSession.classList.add("align-middle","place-self-center");

    let winSession = document.createElement("p");
    winSession.id = "winSession_archive_" + lilcount;
    winSession.innerText = game.winSession;
    winSession.classList.add("winSession","place-self-center","p-2");

    let labelLoseSession = document.createElement("label");
    labelLoseSession.id = "labelLoseSession_archive_"+lilcount;
    labelLoseSession.for = "loseSession_archive_" + lilcount;
    labelLoseSession.innerText = "Défaite(s) :";
    labelLoseSession.classList.add("align-middle","place-self-center");

    let loseSession = document.createElement("p");
    loseSession.id = "loseSession_archive_" + lilcount;
    loseSession.innerText = game.loseSession;
    loseSession.classList.add("loseSession","place-self-center","p-2");

    let labelPlayedSession = document.createElement("label");
    labelPlayedSession.id = "labelPlayedSession_archive_"+lilcount;
    labelPlayedSession.for = "playedSession_archive_" + lilcount;
    labelPlayedSession.innerText = "Parties jouées :";
    labelPlayedSession.classList.add("align-middle","place-self-center");

    let playedSession = document.createElement("p");
    playedSession.id = "playedSession_archive_" + lilcount;
    playedSession.innerText = game.playedSession;
    playedSession.classList.add("playedSession","place-self-center","p-2");

    let detailsOpened = document.createElement("p");
    detailsOpened.id = "detailsOpened_archive_" + lilcount;
    detailsOpened.innerText = "false";
    detailsOpened.classList.add("hideContent");

    let oldWeight = document.createElement("p");
    oldWeight.id = "oldWeight_archive_" + lilcount;
    oldWeight.innerText = game.oldWeight;
    oldWeight.classList.add("hideContent","oldWeight");

    let gameHidden = document.createElement("p");
    gameHidden.id = "gameHidden_archive_" + lilcount;
    if (game.weight == 0) {
      gameHidden.innerText = "true";
    }else {
      gameHidden.innerText = "false"
    }
    gameHidden.classList.add("hideContent","gameHidden");

    let buttonAdd = document.createElement("button");
    buttonAdd.id = "buttonAdd_archive_" + lilcount;
    buttonAdd.classList.add("text-white", "bg-blue-700","px-2","rounded","addPlayed","ml-2");
    buttonAdd.innerText = "Rajouter";
    buttonAdd.setAttribute("onclick", "addBack(" + lilcount + ")");
    buttonAdd.setAttribute("onmouseover", "hoverSound()");


    let divButton = document.createElement("div");
    divButton.classList.add("flex","m-2");



    /* let no = document.createElement("img");
    no.src = ImgPath + "giphy.gif";
    no.style.height = "50px";
    no.style.width = "50px"; */
    divGrid.appendChild(labelWin);
    divGrid.appendChild(win);
    divGrid.appendChild(labelLose);
    divGrid.appendChild(lose);
    divGrid.appendChild(labelPlayed);
    divGrid.appendChild(played);
    divGrid.appendChild(labelTitle);
    divGrid.appendChild(title);
    divGrid.appendChild(titleResult);
    
    
    //divGrid.appendChild(labelWeight);
    //divGrid.appendChild(weight);
    divGrid.appendChild(labelTas);
    divGrid.appendChild(tas);
    
    //divGrid.appendChild(labelColor);
    //divGrid.appendChild(color);
    divGrid.appendChild(labelTasIgnored);
    divGrid.appendChild(tasIgnored);
    

    divGrid.appendChild(labelImg);
    divGrid.appendChild(imgSelect);
    //divGrid.appendChild(labelPlayed);
    //divGrid.appendChild(played);
    
    divGrid.appendChild(divEmpty);
    divGrid.appendChild(divEmpty2);
    //divGrid.appendChild(addPlayed);
    //divGrid.appendChild(buttonDelete);
    
    
    divGrid.appendChild(trueCount);
    divGrid.appendChild(cheatCount);
    divGrid.appendChild(imgName);
    //divGrid.appendChild(no);

    //divGrid.appendChild(win);
    //divGrid.appendChild(lose);
    
    divGrid.appendChild(detailsOpened);
    divGrid.appendChild(oldWeight);
    divGrid.appendChild(gameHidden);

    divDetails.appendChild(divGrid);
    
    div.appendChild(img);
    div.appendChild(divDetails);
    divButton.appendChild
    divButton.appendChild(buttonAdd);
    divButton.appendChild(buttonDelete);
    div.appendChild(divButton);
    //div.appendChild(cogImage);
    //div.appendChild(hideImage);
    
    bigDiv.appendChild(div);
    
    //gamesArr.push(div);
    lilcount++;
  });
  bigDiv.classList.add("overflow-y-scroll" , "noScrollBar")
  document.getElementById("archivedGames").appendChild(bigDiv);
  
let buttonClose = document.createElement("button");
    buttonClose.innerText = "Fermer";
    buttonClose.setAttribute("onclick", "closeDialog(archivedGame)");
    buttonClose.classList.add("resetButton", "text-white", "font-bold", "py-2", "px-4", "rounded", "mt-1")
    archivedGame.appendChild(buttonClose);
    
}
// Load already existing games
function addGames(games) {
  var lilcount = 0;

  /* while (document.getElementById("games").firstChild) { // while there is still a child inside the parent
    document.getElementById("games").removeChild(document.getElementById("games").firstChild); // remove the first child
  } */
  $("#games").empty();
  games = JSON.parse(window.localStorage.getItem("games"));
  console.log("GAMESSSSSSSSSSS")
  
  console.log(games);
  games.forEach(game => {
    game.id = lilcount+1;
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
  window.localStorage.setItem("count", parseInt(lilcount));
  //save();
}
// When users wants to play a certain game
// Add a 100% draw to histo
function addPlayed(count) {
  //console.log("hello");
  sessionDebut = localStorage.getItem("sessionDebut");
  if (sessionDebut == null || sessionDebut == "null") {
    sessionDebut = today2();
    localStorage.setItem("sessionDebut",sessionDebut);
  }
  document.getElementById("textHisto").classList.add("hideContent");
  document.getElementById("textHisto").classList.remove("showContent");
  let title = document.getElementById("title" + count).value;
  let played = document.getElementById("played" + count);
  let playedSession = document.getElementById("playedSession" + count);
  played.value = parseInt(played.value) + 1;
  playedSession.innerText = parseInt(playedSession.innerText) + 1;
  addPlayedGame(count, title, 360);
}

function resetStatsGames() {
  games = JSON.parse(window.localStorage.getItem("games"));

  games.forEach(game => {
    game.lose = 0;
    game.loseSession = 0;
    game.win = 0;
    game.winSession = 0;
    game.played = 0;
    game.playedSession = 0;
    game.cheatCount = "0";
    game.trueCount = "0";
  });

  window.localStorage.setItem("games", JSON.stringify(games));

  gameArchive = window.localStorage.getItem("gameArchive");
  if (gameArchive != "") {
    gameArchive = JSON.parse(localStorage.getItem("gameArchive"));
      gameArchive.forEach(game => {
      game.lose = 0;
      game.loseSession = 0;
      game.win = 0;
      game.winSession = 0;
      game.played = 0;
      game.playedSession = 0;
      game.cheatCount = "0";
      game.trueCount = "0";
    });
    window.localStorage.setItem("gameArchive", JSON.stringify(gameArchive));
  } 
  gameAdded = true;
  load();
}

// Deletes a game
function deleteGame(id) {
  console.log("JE SUPPRIME " + id);
  clickSound();
  let games = JSON.parse(window.localStorage.getItem("games"));
  gameArchive = localStorage.getItem("gameArchive");
  if (gameArchive != "") {
    gameArchive = (JSON.parse(localStorage.getItem("gameArchive")));
  } else {
    gameArchive = [];
  }
  let empty = false;
  if (games[id].title === "") {
    empty = true
  }
  if (empty || confirm("Voulez vous vraiment supprimer ce jeu ? (Vous pouvez le récupérer dans les archives)") && theWheel.segments.length > 1) {
    let deleted = false;
    console.log("avant");
    games.forEach(game => {
      console.log("gameId "+ game.id + " id +1 " + id+1)
      if (game.id == id + 1 && !deleted) {
        console.log("DELETE")
        Tweight -= parseInt(game.weight);
        window.localStorage.setItem("Tweight", Tweight)
        let deletedGame = games.splice(games.indexOf(game), 1);
        console.log(deletedGame);
        if (!empty) {
          gameArchive.push(deletedGame[0]);
        }
        deleted = true;
      }
      //if (deleted && game.id > id + 1) game.id = game.id - 1;
    });
    theWheel.deleteSegment(id + 1);
    theWheel.segments.pop();
    count--;
    window.localStorage.setItem("count", parseInt(count));
    window.localStorage.setItem("games", JSON.stringify(games));
    window.localStorage.setItem("gameArchive", JSON.stringify(gameArchive));
    gameAdded = true;
    addGames(games);
    save();
  }
}

function deleteGameArchive(id) {
  if (confirm("Voulez vous vraiment supprimer ce jeu des archives ? (Définitif)")) {
    gameArchive = (JSON.parse(localStorage.getItem("gameArchive")));
    gameArchive.splice(id, 1);
    window.localStorage.setItem("gameArchive", JSON.stringify(gameArchive));
    archivedGames();
    save();
  }
  
}

function addBack (lilcount) {
  gameArchive = JSON.parse(window.localStorage.getItem("gameArchive"));
  games = JSON.parse(window.localStorage.getItem("games"));
  //gameArchive[lilcount].weight = '0';
  console.log("LILCOUNT " + lilcount);
  gameArchive[lilcount].winSession = 0;
  gameArchive[lilcount].loseSession = 0;
  gameArchive[lilcount].playedSession = 0;
  gameArchive[lilcount].weight = 0;
  games.push(gameArchive[lilcount]);
  count++;
  localStorage.setItem("count",count);
  console.log("ADD BACK")

  let deletedGame = gameArchive.splice(lilcount, 1);
  console.log(deletedGame);
  window.localStorage.setItem("games", JSON.stringify(games));
  window.localStorage.setItem("gameArchive", JSON.stringify(gameArchive));
  
  archivedGames();
  gameAdded = true;
  load();
}