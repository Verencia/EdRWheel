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
// Calculates the size of the segments with their weights
function calcWeight(weight) {
  return (weight / Tweight) * 360;
}

// Converts segments degrees to a percentage
function winwheelDegreesToPercent(deg) {
  return (deg * 100 / 360).toFixed(2);
}

function replaceChar(origString, replaceChar, index) {
  let firstPart = origString.substr(0, index);
  //let lastPart = origString.substr(index + 1);
    
  let newString = firstPart + replaceChar;
  return newString;
}
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}
// Add zeros to date
function addZero(i) {
  if (i < 10) { i = "0" + i }
  return i;
}

// 📤 Exporter le localStorage dans un fichier JSON
function downloadLocalStorage(filename = "backup.json") {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    data[key] = localStorage.getItem(key);
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// 📥 Importer un fichier JSON dans le localStorage
function uploadLocalStorage(file, callback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const data = JSON.parse(event.target.result);
      if (typeof data === "object" && data !== null) {
        for (const key in data) {
          localStorage.setItem(key, data[key]);
        }
        if (callback) callback(true);
      }
    } catch (e) {
      console.error("Fichier JSON invalide", e);
      if (callback) callback(false);
    }
  };
  reader.readAsText(file);
}

// Exemple d’utilisation avec un input de fichier
// <input type="file" id="importFile" accept="application/json">

document.getElementById("importFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    uploadLocalStorage(file, (success) => {
      if (success) {
        alert("Import réussi ✅");
        load();
      } else {
        alert("Échec de l’import ❌");
      }
    });
  }
});