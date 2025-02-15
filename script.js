// Ойыншылар тізімі
let players = [
    { id: 1, name: "Ойыншы 1", isPlaying: true },
    { id: 2, name: "Ойыншы 2", isPlaying: true },
    { id: 3, name: "Ойыншы 3", isPlaying: true }
];

// Ойынның кезеңдерін бақылау
let currentStage = 1;
const totalStages = 3;
let timer;
let timeLeft = 30;

// Кезең тапсырмалары
const tasks = {
    1: "1-кезең: Иммунитеттің негізгі қызметін атаңыз.",
    2: "2-кезең: Вакцинацияның маңыздылығы қандай?",
    3: "3-кезең: Антиденелер қалай жұмыс істейді?"
};

// Ойыншыларды тізімде көрсету
function updatePlayers() {
    const playersList = document.getElementById("players-list");
    playersList.innerHTML = ""; 

    players.forEach(player => {
        const playerItem = document.createElement("li");
        playerItem.textContent = `${player.name} ${player.isPlaying ? "(Ойында)" : "(Шығарылды)"}`;
        playersList.appendChild(playerItem);
    });
}

// Таймерді бастау
function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").textContent = `Қалған уақыт: ${timeLeft} секунд`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Қалған уақыт: ${timeLeft} секунд`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log("Уақыт бітті!");
            nextStage();
        }
    }, 1000);
}

// Ойынды бастау
function startGame() {
    console.log("Ойын басталды!");
    updatePlayers();
    startTimer();
}

// Тапсырманы көрсету
function showTask() {
    document.getElementById("task").textContent = tasks[currentStage] || "Ойын аяқталды!";
}

// Ойыншылардың жауаптарын тексеру
function checkAnswer(playerId, isCorrect) {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    if (isCorrect) {
        console.log(`${player.name} дұрыс жауап берді!`);
    } else {
        player.isPlaying = false;
        console.log(`${player.name} қате жауап берді және ойыннан шығарылды.`);
    }

    updatePlayers();
}

// Келесі кезеңге өту
function nextStage() {
    if (currentStage < totalStages) {
        currentStage++;
        console.log(`Ойын ${currentStage}-кезеңге өтті!`);
        updatePlayers();
    } else {
        console.log("Ойын аяқталды!");
        announceWinner();
    }
}

// Келесі кезеңге өту және тапсырманы өзгерту
function nextStageWithTask() {
    nextStage();
    showTask();
}

// Жеңімпазды анықтау
function announceWinner() {
    const remainingPlayers = players.filter(p => p.isPlaying);
    if (remainingPlayers.length === 1) {
        console.log(`Жеңімпаз: ${remainingPlayers[0].name}!`);
    } else {
        console.log("Жеңімпаздар бірнешеу немесе ешкім қалмады.");
    }
}

// Ойынды аяқтау
function endGame() {
    document.getElementById("game-area").innerHTML = "<h2>Ойын аяқталды!</h2>";
    clearInterval(timer);
}
