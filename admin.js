document.addEventListener("DOMContentLoaded", function () {
    const playerList = document.getElementById("player-list");
    const startGameBtn = document.getElementById("start-game-btn");
    const resultsDiv = document.getElementById("results");

    function loadPlayers() {
        let players = JSON.parse(localStorage.getItem("players")) || [];
        playerList.innerHTML = "";

        players.forEach(player => {
            let li = document.createElement("li");
            li.textContent = player;
            playerList.appendChild(li);
        });
    }

    function startGame() {
        localStorage.setItem("gameStarted", "true");
        alert("🟢 Ойын басталды! Ойыншылар енді сұрақтарға жауап бере алады.");
    }

    function loadResults() {
        let results = JSON.parse(localStorage.getItem("results")) || {};
        resultsDiv.innerHTML = "<h3>Ойын нәтижелері:</h3>";

        for (let player in results) {
            let p = document.createElement("p");
            p.textContent = `${player}: ${results[player]} дұрыс жауап`;
            resultsDiv.appendChild(p);
        }
    }

    startGameBtn.addEventListener("click", startGame);
    
    loadPlayers();
    loadResults();
});
