document.addEventListener("DOMContentLoaded", function () {
    let currentRound = localStorage.getItem("currentRound") || "round1";

    if (currentRound === "round2") {
        startRound2(); // Екінші раундтың сұрақтарын жүктеу
    } else {
        startRound1(); // Бірінші раундтың сұрақтарын жүктеу
    }
});

function finishRound1(playerName, correctAnswers) {
    let players = JSON.parse(localStorage.getItem("players")) || [];

    players = players.map(player => {
        if (player.name === playerName) {
            return {
                ...player,
                status: correctAnswers >= 3 ? "Келесі раунд ✔️" : "Жеңілді ❌"
            };
        }
        return player;
    });

    localStorage.setItem("players", JSON.stringify(players));
}

function startRound2() {
    const questionsRound2 = [
        { question: "Аутотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 0 },
        { question: "Аллотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 1 },
        { question: "Ксенотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 2 }
    ];
    
    loadQuestions(questionsRound2);
}

function loadQuestions(questions) {
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let gameOver = false;

    const questionText = document.getElementById("question-text");
    const trueButton = document.getElementById("true-btn");
    const falseButton = document.getElementById("false-btn");
    const resultText = document.getElementById("result-text");

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            let question = questions[currentQuestionIndex];

            if (question.options) {
                // Көп нұсқалы сұрақтар (2-раунд)
                questionText.innerHTML = `
                    <p>${question.question}</p>
                    ${question.options.map((opt, index) => 
                        `<button class="btn option-btn" data-index="${index}">${opt}</button>`
                    ).join("")}
                `;

                document.querySelectorAll(".option-btn").forEach(btn => {
                    btn.addEventListener("click", function () {
                        checkAnswer(parseInt(this.dataset.index));
                    });
                });

                trueButton.style.display = "none";
                falseButton.style.display = "none";
            } else {
                // True/False сұрақтар (1-раунд)
                questionText.textContent = question.question;
                trueButton.style.display = "inline-block";
                falseButton.style.display = "inline-block";
            }

            resultText.textContent = "";
        } else {
            checkResult();
        }
    }

    function checkAnswer(userAnswer) {
        let question = questions[currentQuestionIndex];

        if (gameOver) return;

        if ((question.options && userAnswer === question.correct) || 
            (!question.options && userAnswer === question.answer)) {
            correctAnswers++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            checkResult();
        }
    }

    function checkResult() {
        let currentRound = localStorage.getItem("currentRound");

        if (correctAnswers >= 2) {
            resultText.textContent = `🔥 Құттықтаймыз! Сіз ${correctAnswers}/${questions.length} дұрыс жауап бердіңіз!`;

            if (currentRound === "round1") {
                localStorage.setItem("currentRound", "round2");
                setTimeout(() => window.location.reload(), 3000);
            } else {
                resultText.textContent += " 🏆 Сіз ойынды жеңіп алдыңыз!";
            }
        } else {
            resultText.textContent = `❌ Сіз тек ${correctAnswers}/${questions.length} дұрыс жауап бердіңіз. Ойыннан шығарылдыңыз.`;
        }

        trueButton.style.display = "none";
        falseButton.style.display = "none";
        gameOver = true;
    }

    trueButton.addEventListener("click", () => checkAnswer("true"));
    falseButton.addEventListener("click", () => checkAnswer("false"));

    loadQuestion();
}
