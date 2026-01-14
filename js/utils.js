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
function isValidDate(d) {
  return d instanceof Date && !isNaN(d.getTime());
}
function convertDate(date) {
  console.log(date);
  date1 = new Date(date);
  console.log(date1);
  if (!isValidDate(date1)) {
    console.log("PAS UNE DATE VALIDE");
    return date
  }
  let dd = String(date1.getDate()).padStart(2, '0');
  let mm = String(date1.getMonth() + 1).padStart(2, '0');
  let yyyy = date1.getFullYear();
  let h = addZero(date1.getHours());
  let m = addZero(date1.getMinutes());  
  
  date1 = dd + '/' + mm + '/' + yyyy + " " + h + ":" + m;
  return date1;
}

function convertDate2(dateStr) {
  // "18/09/2024 00:22"
  const [datePart, timePart] = dateStr.split(" ");
  const [dd, mm, yyyy] = datePart.split("/");
  const [h, m] = timePart.split(":");

  const date = new Date(
    Number(yyyy),
    Number(mm) - 1,
    Number(dd),
    Number(h),
    Number(m)
  );

  const d = String(date.getDate()).padStart(2, "0");
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${d}/${mo}/${y} ${hh}:${min}`;
}

function today2(){
  let today = new Date();
  
  return today;
}

function differenceDates(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const diffMs = Math.abs(d2.getTime() - d1.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const heures = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const secondes = totalSeconds % 60;

  if (heures > 0) {
    return `${heures}h ${minutes}min`;
  } else {
    return `${minutes}min ${secondes}s`;
  }
}

function differenceDates2(date1,date2){
  date1 = new Date(date1);
  date2 = new Date (date2);
  let dateDiff = date2.getTime() - date1.getTime();
  return Math.abs(dateDiff);
  
}

function msToHmin(ms){
  let totalMinutes = Math.floor(ms / 1000 / 60);

  let heures = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  const totalSeconds = Math.floor(ms / 1000);
  let secondes = totalSeconds % 60;

  if (heures > 0) {
    return `${heures}h ${minutes}min`;
  } else {
    return `${minutes}min ${secondes}s`;
  }
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