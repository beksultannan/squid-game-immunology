document.addEventListener("DOMContentLoaded", function() {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let playersTable = document.getElementById("players-list");

    if (players.length === 0) {
        playersTable.innerHTML = "<tr><td colspan='3'>Ойыншылар жоқ</td></tr>";
        return;
    }

    playersTable.innerHTML = ""; // Кестені тазалау

    players.forEach((player, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${player.name || "Белгісіз"}</td>
            <td>${player.status || "Күтуде ⏳"}</td>
        </tr>`;
        playersTable.innerHTML += row;
    });
});


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
