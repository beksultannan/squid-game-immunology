document.addEventListener("DOMContentLoaded", function () {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let currentRound = localStorage.getItem("round") || 1;

    const playersList = document.getElementById("playersList");
    const startGameBtn = document.getElementById("startGame");
    const nextRoundBtn = document.getElementById("nextRound");

    function loadPlayers() {
        playersList.innerHTML = "";
        players.forEach((player, index) => {
            let playerElement = document.createElement("li");
            playerElement.textContent = `№${index + 1}: ${player.name} (Раунд: ${player.round})`;
            playersList.appendChild(playerElement);
        });
    }

    function startGame() {
        if (players.length === 0) {
            alert("Ойыншылар жоқ! Алдымен тіркеліңіз.");
            return;
        }
        currentRound = 1;
        localStorage.setItem("round", currentRound);
        alert("Ойын басталды! 🎮");
        loadPlayers();
    }

    function advanceToNextRound() {
        currentRound++;
        localStorage.setItem("round", currentRound);
        players = players.filter(player => Math.random() > 0.5); // 50% өтеді
        players.forEach(player => player.round = currentRound);
        localStorage.setItem("players", JSON.stringify(players));
        alert(`Раунд ${currentRound} басталды!`);
        loadPlayers();
        checkWinner();
    }

    function checkWinner() {
        if (players.length === 1) {
            alert(`Жеңімпаз: ${players[0].name} 🏆`);
            localStorage.clear();
        }
    }

    startGameBtn.addEventListener("click", startGame);
    nextRoundBtn.addEventListener("click", advanceToNextRound);

    loadPlayers();
});
