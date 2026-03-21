let wines=
JSON.parse(localStorage.getItem("wines")) ||[];
let draggedIndex = null;
let darkMode =
localStorage.getItem(darkMode) === "true";
function saveWines(){
    localStorage.setItem("wines",
 JSON.stringify(wines));
}
function toggleDarkMode(){
    darkMode = !darkMode;
    localStorage.setItem("darkMode",darkMode.toString());
applyDarkMode();
}
function applyDarkMode(){
    document.body.classList.toggle("bg-amber-40",darkMode);
document.body.classList.toggle("text-gray-800",darkMode);
}
applyDarkMode();