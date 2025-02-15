// Ойыншыларды тіркеу және сақтау
function registerPlayer() {
    let playerName = document.getElementById("playerName").value;
    if (!playerName) {
        alert("Атыңызды енгізіңіз!");
        return;
    }

    let players = JSON.parse(localStorage.getItem("players")) || [];
    players.push({ name: playerName, score: 0, status: "Ойында" });

    localStorage.setItem("players", JSON.stringify(players));
    updatePlayerList();
}

// Ойыншылар тізімін жаңарту
function updatePlayerList() {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let list = document.getElementById("playerList");
    list.innerHTML = "";

    players.forEach((player) => {
        list.innerHTML += `<li>${player.name} - ${player.status}</li>`;
    });
}

// Ойынды бастау
function startGame() {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    if (players.length < 2) {
        alert("Кемінде 2 ойыншы қажет!");
        return;
    }

    players = players.map(player => ({ ...player, status: "Ойында" }));

    localStorage.setItem("players", JSON.stringify(players));
    updatePlayerList();
    alert("Ойын басталды!");
}

// Келесі кезеңге өткізу
function nextRound() {
    let players = JSON.parse(localStorage.getItem("players")) || [];

    // Кездейсоқ түрде кейбір ойыншыларды шығару (мысалы, жартысын)
    let remainingPlayers = players.filter((_, index) => index % 2 === 0);

    remainingPlayers.forEach(player => {
        player.status = "Келесі кезеңге өтті";
    });

    localStorage.setItem("players", JSON.stringify(remainingPlayers));
    updatePlayerList();
    alert("Келесі кезең басталды!");
}

// Бетті жаңартқанда ойыншылардың тізімі сақталсын
document.addEventListener("DOMContentLoaded", updatePlayerList);
