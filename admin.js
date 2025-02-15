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
                <td>${player.status || "Күтуде ⏳"}</td>
            `;
            playersList.appendChild(row);
        });
    }

    // ✅ Бірінші раундты бастау батырмасы (Ойыншыларға бастау белгісін береді)
    startRound1Button.addEventListener("click", function () {
        let players = JSON.parse(localStorage.getItem("players")) || [];

        if (players.length === 0) {
            alert("❌ Бірінші раундқа өтетін ойыншылар жоқ!");
            return;
        }

        // Ойыншыларға раунд басталғанын белгілеу
        players = players.map(player => ({
            ...player,
            status: "Ойын басталды 🎮"
        }));
        localStorage.setItem("players", JSON.stringify(players));

        // ✅ Ойыншыларды бірінші ойынға жіберу
        localStorage.setItem("gameStatus", "round1_started");

        alert("✅ Бірінші раунд басталды! Ойыншылар енді кіре алады.");
        loadPlayers();
    });

    // ✅ Екінші раундты бастау батырмасы
    startRound2Button.addEventListener("click", function () {
        let winners = JSON.parse(localStorage.getItem("winners_round1")) || [];

        if (winners.length === 0) {
            alert("❌ Екінші раундқа өтетін ойыншылар жоқ!");
            return;
        }

        // Ойыншыларға раунд басталғанын белгілеу
        winners = winners.map(player => ({
            ...player,
            status: "Екінші раунд 🎯"
        }));
        localStorage.setItem("players", JSON.stringify(winners));

        // ✅ Ойыншыларды екінші ойынға жіберу
        localStorage.setItem("gameStatus", "round2_started");

        alert("✅ Екінші раунд басталды! Жеңімпаздар ойынды бастай алады.");
        loadPlayers();
    });

    loadPlayers();
});
