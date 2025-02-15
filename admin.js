document.addEventListener("DOMContentLoaded", function () {
    const playersList = document.getElementById("players-list");
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

    startRound2Button.addEventListener("click", function () {
        let winners = JSON.parse(localStorage.getItem("winners")) || [];

        if (winners.length === 0) {
            alert("Екінші раундқа өтетін ойыншылар жоқ!");
            return;
        }

        localStorage.setItem("round2Players", JSON.stringify(winners));
        alert("Екінші раунд басталды! Ойыншылар автоматты түрде жіберілді.");
        window.location.href = "game2.html";
    });

    loadPlayers();
});
