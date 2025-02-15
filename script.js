// script.js
let players = [];
let adminPassword = "1234"; // Админнің құпия сөзі

function registerPlayer() {
    let name = document.getElementById("playerName").value;
    if (name) {
        players.push(name);
        alert(name + " тіркелді!");
    }
}

function startGame() {
    document.getElementById("register").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function submitAnswer() {
    alert("Жауабыңыз тексерілді!");
}

// Админ панелін көрсету
function showAdminPanel() {
    let password = prompt("Админ құпия сөзі:");
    if (password === adminPassword) {
        document.getElementById("admin").style.display = "block";
    } else {
        alert("Қате құпия сөз!");
    }
}
