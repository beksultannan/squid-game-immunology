document.addEventListener("DOMContentLoaded", function () {
    const playersList = document.getElementById("players-list");
    const startRound1Button = document.getElementById("start-round1-btn");
    const startRound2Button = document.getElementById("start-round2-btn");
    const stopGameButton = document.getElementById("stop-game-btn"); // 🛑 Ойын тоқтату батырмасы

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

    // ✅ Бірінші раундты бастау
    startRound1Button.addEventListener("click", function () {
        let players = JSON.parse(localStorage.getItem("players")) || [];

        if (players.length === 0) {
            alert("❌ Бірінші раундқа өтетін ойыншылар жоқ!");
            return;
        }

        // Ойыншыларға "Ойын басталды" деген статус беру
        players = players.map(player => ({
            ...player,
            status: "Ойын басталды 🎮"
        }));
        localStorage.setItem("players", JSON.stringify(players));

        // ✅ Ойыншыларды бірінші ойынға автоматты түрде жіберу
        localStorage.setItem("gameStatus", "round1_started");

        alert("✅ Бірінші раунд басталды! Ойыншылар енді кіре алады.");
        window.location.reload(); // 🌟 Бетті жаңарту
    });

   // ✅ Екінші раундты бастау (ТҮЗЕТІЛГЕН)
startRound2Button.addEventListener("click", function () {
    let players = JSON.parse(localStorage.getItem("players")) || [];

    // **"Келесі раунд ✔️" статусы барларды таңдау**
    let winners = players.filter(player => player.status === "Келесі раунд ✔️");

    if (winners.length === 0) {
        alert("❌ Екінші раундқа өтетін ойыншылар жоқ!");
        return;
    }

    // **Жеңімпаздардың статусын "Екінші раунд 🎯" деп өзгерту**
    winners = winners.map(player => ({
        ...player,
        status: "Екінші раунд 🎯"
    }));

    // **Жаңа жеңімпаздар тізімін сақтау**
    localStorage.setItem("players", JSON.stringify(winners));
    localStorage.setItem("winners_round1", JSON.stringify(winners)); // 🔹 Жеңімпаздарды бөлек сақтау
    localStorage.setItem("gameStatus", "round2_started");

    alert("✅ Екінші раунд басталды! Жеңімпаздар ойынды бастай алады.");
    window.location.reload(); // 🌟 Бетті жаңарту
});


    // 🚨 **ОЙЫНДЫ ТОҚТАТУ (ТАБЛИЦАНЫ ТАЗАЛАУ)** 🚨
    stopGameButton.addEventListener("click", function () {
        if (!confirm("⚠️ Барлық деректер өшіріледі. Ойынды тоқтатқыңыз келе ме?")) {
            return;
        }

        // ✅ Ойыншылар тізімін тазалау
        localStorage.removeItem("players");

        // ✅ Жеңімпаздар тізімін тазалау
        localStorage.removeItem("winners_round1");

        // ✅ Ойын статусын тазалау
        localStorage.removeItem("gameStatus");

        alert("🛑 Ойын тоқтатылды! Барлық ойыншылар тізімі өшірілді.");
        window.location.reload(); // 🌟 Бетті жаңарту
    });

    loadPlayers();
});
