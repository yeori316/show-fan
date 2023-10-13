document.querySelector(".classic").addEventListener("click", classic);
document.querySelector(".festival").addEventListener("click", festival);
document.querySelector(".concert").addEventListener("click", concert);
document.querySelector(".show").addEventListener("click", show);
document.querySelector(".musical").addEventListener("click", musical);
document.querySelector(".all").addEventListener("click", all);

function classic() {
  window.localStorage.setItem("show_genre", 5);
  location.href = "../html/genre.html";
}
function festival() {
  window.localStorage.setItem("show_genre", 4);
  location.href = "../html/genre.html";
}
function musical() {
  window.localStorage.setItem("show_genre", 3);
  location.href = "../html/genre.html";
}
function concert() {
  window.localStorage.setItem("show_genre", 2);
  location.href = "../html/genre.html";
}
function show() {
  window.localStorage.setItem("show_genre", 1);
  location.href = "../html/genre.html";
}
function all() {
  location.href = "../index.html";
}
