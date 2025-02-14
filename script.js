document.getElementById('audio-control').addEventListener('click', function() {
    var music = document.getElementById('game-music');
    if (music.paused) {
        music.play();
        this.innerText = '🔇 Музыканы өшіру';
    } else {
        music.pause();
        this.innerText = '🎵 Музыка';
    }
});

// 📌 Ойыншылар тізімі
let players = [];

// 📌 Тіркелу функциясы
function registerPlayer() {
    let name = document.getElementById("playerName").value.trim();
    if (name === "") {
        alert("Атыңызды енгізіңіз!");
        return;
    }

    // 📌 Ойыншыны қосу
    let newPlayer = { name: name, status: "🔵 Тірі" };
    players.push(newPlayer);
    updateLeaderboard();
}

// 📌 Лидерлер таблицасын жаңарту
function updateLeaderboard() {
    let table = document.getElementById("leaderboard");
    
    // 📌 Ескі мәліметтерді тазалау
    table.innerHTML = `<tr>
        <th>#</th>
        <th>Ойыншы</th>
        <th>Статус</th>
    </tr>`;

    // 📌 Жаңадан қосылған ойыншыларды көрсету
    players.forEach((player, index) => {
        let row = table.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = player.name;
        row.insertCell(2).innerText = player.status;
    });
}
