document.addEventListener("DOMContentLoaded", function () {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let currentRound = localStorage.getItem("round") || 1;

    const playersList = document.getElementById("playersList");
    const startGameBtn = document.getElementById("startGame");
    const nextRoundBtn = document.getElementById("nextRound");
    const questionText = document.getElementById("questionText");
    const answerInput = document.getElementById("answerInput");
    const submitAnswerBtn = document.getElementById("submitAnswer");

    // 🔹 Тапсырмалар тізімі
    const questions = [
        { question: "Иммундық жүйенің негізгі органы?", answer: "тимус" },
        { question: "Лимфоциттердің екі негізгі түрі?", answer: "B және T" },
        { question: "Антигендерге жауап беретін молекула?", answer: "антидене" },
        { question: "Иммуноглобулиндердің қанша түрі бар?", answer: "5" }
    ];

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
        showQuestion();
    }

    function showQuestion() {
        let questionObj = getRandomQuestion();
        questionText.textContent = questionObj.question;
        answerInput.value = "";
        answerInput.dataset.correctAnswer = questionObj.answer.toLowerCase();
    }

    function getRandomQuestion() {
        return questions[Math.floor(Math.random() * questions.length)];
    }

    function checkAnswer() {
        let userAnswer = answerInput.value.toLowerCase();
        let correctAnswer = answerInput.dataset.correctAnswer;

        if (userAnswer === correctAnswer) {
            alert("✅ Дұрыс жауап! Келесі раундқа өттіңіз.");
            advanceToNextRound();
        } else {
            alert("❌ Қате! Сіз ойыннан шықтыңыз.");
            eliminatePlayer();
        }
    }

    function advanceToNextRound() {
        currentRound++;
        localStorage.setItem("round", currentRound);
        players = players.filter(player => Math.random() > 0.5); // 50% өтеді
        players.forEach(player => player.round = currentRound);
        localStorage.setItem("players", JSON.stringify(players));
        alert(`Раунд ${currentRound} басталды!`);
        loadPlayers();
        showQuestion();
        checkWinner();
    }

    function eliminatePlayer() {
        players.pop(); // Соңғы ойыншыны шығару
        localStorage.setItem("players", JSON.stringify(players));
        loadPlayers();
        checkWinner();
    }

    function checkWinner() {
        if (players.length === 1) {
            alert(`🏆 Жеңімпаз: ${players[0].name}`);
            localStorage.clear();
        }
    }

    startGameBtn.addEventListener("click", startGame);
    nextRoundBtn.addEventListener("click", advanceToNextRound);
    submitAnswerBtn.addEventListener("click", checkAnswer);

    loadPlayers();
});
