document.addEventListener("DOMContentLoaded", loadPlayers);

function loadPlayers() {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let playersTable = document.getElementById("players-list");
    playersTable.innerHTML = "";
    players.forEach((player, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.status}</td>
        </tr>`;
        playersTable.innerHTML += row;
    });
}

function startGame() {
    localStorage.setItem("gameStatus", "started");
    alert("Ойын басталды!");
}

function pauseGame() {
    localStorage.setItem("gameStatus", "paused");
    alert("Ойын паузаға қойылды!");
}

function stopGame() {
    localStorage.setItem("gameStatus", "stopped");
    alert("Ойын тоқтатылды!");
}
