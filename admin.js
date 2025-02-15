function checkPassword() {
    const passwordInput = document.getElementById("admin-password").value;
    const correctPassword = "1234"; // Осында өз пароліңді жаз

    if (passwordInput === correctPassword) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
    } else {
        alert("Қате құпиясөз! Қайта енгізіңіз.");
    }
}

function startGame() {
    alert("Ойын басталды!");
    // Ойынды бастау логикасын осында жазамыз
   
    // Тіркелген ойыншылардың тізімі (тест үшін статикалық түрде жазып қойдым)
let players = [
    { id: 1, name: "Ойыншы 1", status: "жарыста" },
    { id: 2, name: "Ойыншы 2", status: "жарыста" },
    { id: 3, name: "Ойыншы 3", status: "жарыста" },
    { id: 4, name: "Ойыншы 4", status: "жарыста" }
];

// Ойынның ағымдағы кезеңі
let currentRound = 1;

// Ойыншыларды көрсету функциясы
function displayPlayers() {
    const playersList = document.getElementById("players");
    playersList.innerHTML = "";

    players.forEach(player => {
        let li = document.createElement("li");
        li.textContent = `${player.name} - ${player.status}`;
        playersList.appendChild(li);
    });
}

// Ойынды бастау функциясы
function startGame() {
    if (players.length < 2) {
        alert("Ойынды бастау үшін кемінде 2 ойыншы керек!");
        return;
    }

    alert(`Ойын басталды! ${currentRound}-раунд`);
    nextRound();
}

// Келесі раундқа өту функциясы
function nextRound() {
    if (players.length <= 1) {
        alert(`Ойын аяқталды! Жеңімпаз: ${players[0].name}`);
        return;
    }

    alert(`${currentRound}-раунд басталды!`);
    
    // Жеңімпаздарды кездейсоқ таңдау (50% шанс)
    players = players.filter(() => Math.random() > 0.5);

    // Кезеңді жаңарту
    currentRound++;
    
    // Жаңартылған ойыншылар тізімін шығару
    displayPlayers();

    // Егер бір ойыншы қалса, жеңімпазды жариялау
    if (players.length === 1) {
        alert(`Жеңімпаз: ${players[0].name}!`);
    } else {
        setTimeout(nextRound, 3000); // Келесі раундты 3 секундтан кейін бастау
    }
}

// Ойыншыларды алғашқы рет көрсету
displayPlayers();

}
