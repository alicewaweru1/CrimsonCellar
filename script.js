let wines=
JSON.parse(localStorage.getItem("wines")) ||[];
let draggedIndex = null;
let darkMode =
localStorage.getItem(darkMode) === "true";
function saveWines(){
    localStorage.setItem("wines",

   JSON.stringify(wines));
}