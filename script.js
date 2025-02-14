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

// Ойыншылар тізімі
let players = [];

// Тіркелу функциясы
function registerPlayer() {
    let name = document.getElementById("playerName").value.trim();
    if (name === "") {
        alert("Атыңызды енгізіңіз!");
        return;
    }

    let newPlayer = { name: name, status: "🔵 Тірі" };
    players.push(newPlayer);
    updateLeaderboard();
}

// Лидерлер таблицасын жаңарту
function updateLeaderboard() {
    let table = document.getElementById("leaderboard");
    table.innerHTML = `<tr>
        <th>#</th>
        <th>Ойыншы</th>
        <th>Статус</th>
    </tr>`;

    players.forEach((player, index) => {
        let row = table.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = player.name;
        row.insertCell(2).innerText = player.status;
    });
}

// "Қызыл жарық, жасыл жарық" ойыны
let lightStatus = "🔴 Қызыл жарық";
let isRunning = false;

function changeLight() {
    let light = document.getElementById("light-status");
    let randomTime = Math.floor(Math.random() * 3000) + 2000;

    setTimeout(() => {
        if (lightStatus === "🟢 Жасыл жарық") {
            lightStatus = "🔴 Қызыл жарық";
        } else {
            lightStatus = "🟢 Жасыл жарық";
        }
        light.innerText = lightStatus;
        changeLight();
    }, randomTime);
}

function run() {
    if (lightStatus === "🔴 Қызыл жарық") {
        alert("❌ Сіз ойыннан шығып қалдыңыз!");
        document.getElementById("move-button").disabled = true;
    } else {
        alert("✅ Сіз алға жылжыдыңыз!");
    }
}

// Ойынды бастау
changeLight();
