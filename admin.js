document.addEventListener("DOMContentLoaded", function () {
    const playersList = document.getElementById("players-list");
    const startRound1Button = document.getElementById("start-round1-btn");
    const startRound2Button = document.getElementById("start-round2-btn");

    function loadPlayers() {
        let players = JSON.parse(localStorage.getItem("players")) || [];
        playersList.innerHTML = "";

        players.forEach((player, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name || "Белгісіз"}</td>
                <td>${player.status}</td>
            `;
            playersList.appendChild(row);
        });
    }

    // Бірінші раундты бастау
    startRound1Button.addEventListener("click", function () {
        let players = JSON.parse(localStorage.getItem("players")) || [];
        if (players.length === 0) {
            alert("Бірінші раундқа өтетін ойыншылар жоқ!");
            return;
        }
        localStorage.setItem("round1Players", JSON.stringify(players));
        alert("Бірінші раунд басталды!");
        window.location.href = "game.html";
    });

    // Екінші раундты бастау
    startRound2Button.addEventListener("click", function () {
        let winners = JSON.parse(localStorage.getItem("winners_round1")) || [];

        if (winners.length === 0) {
            alert("Екінші раундқа өтетін ойыншылар жоқ!");
            return;
        }

        localStorage.setItem("round2Players", JSON.stringify(winners));
        alert("Екінші раунд басталды!");
        window.location.href = "game2.html";
    });

    loadPlayers();
});
