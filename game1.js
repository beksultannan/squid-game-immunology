document.addEventListener("DOMContentLoaded", function () {
    let currentRound = localStorage.getItem("currentRound") || "round1";

    if (currentRound === "round2") {
        startRound2();
    } else {
        startRound1();
    }
});

function startRound1() {
    const questionsRound1 = [
        { question: "1902 жылы Ullman алғаш рет адамның бүйрегін трансплантациялады.", correct: false },
        { question: "Трансплантацияның сәттілігі донор мен реципиенттің иммунологиялық сәйкестігіне байланысты.", correct: true },
        { question: "Ксенотрансплантация – бір түрге жататын, бірақ генетикалық әртүрлі екі адам арасында мүшелерді алмастыру.", correct: false },
        { question: "HLA-антигендері трансплантацияның қабылдануына тікелей әсер етеді.", correct: true },
        { question: "Жедел қабылдамау трансплантациядан кейін бірнеше жыл өткенде дамиды.", correct: false }
    ];

    loadQuestions(questionsRound1, "round1");
}

function finishRound1(playerName, correctAnswers) {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let winners = [];

    players = players.map(player => {
        if (player.name === playerName) {
            let newStatus = correctAnswers >= 3 ? "Келесі раунд ✔️" : "Жеңілді ❌";
            if (correctAnswers >= 3) winners.push({ name: playerName, status: "Келесі раунд ✔️" });
            return { ...player, status: newStatus };
        }
        return player;
    });

    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("winners_round1", JSON.stringify(winners));

    console.log("✅ Бірінші раунд аяқталды. Жеңімпаздар:", winners);
}


function startRound2() {
    const questionsRound2 = [
        { question: "Аутотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 0 },
        { question: "Аллотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 1 },
        { question: "Ксенотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 2 }
    ];

    loadQuestions(questionsRound2, "round2");
}

function loadQuestions(questions, round) {
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
            (!question.options && userAnswer === question.correct)) {
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
        let players = JSON.parse(localStorage.getItem("players")) || [];
        let playerName = localStorage.getItem("currentPlayer");

        if (correctAnswers >= 2) {
            resultText.textContent = `🔥 Құттықтаймыз! Сіз ${correctAnswers}/${questions.length} дұрыс жауап бердіңіз!`;

            if (round === "round1") {
                localStorage.setItem("currentRound", "round2");
                players = players.map(player => {
                    if (player.name === playerName) {
                        return { ...player, status: "Келесі раунд ✔️" };
                    }
                    return player;
                });

                localStorage.setItem("players", JSON.stringify(players));

                setTimeout(() => window.location.reload(), 3000);
            } else {
                resultText.textContent += " 🏆 Сіз ойынды жеңіп алдыңыз!";
            }
        } else {
            resultText.textContent = `❌ Сіз тек ${correctAnswers}/${questions.length} дұрыс жауап бердіңіз. Ойыннан шығарылдыңыз.`;

            players = players.map(player => {
                if (player.name === playerName) {
                    return { ...player, status: "Жеңілді ❌" };
                }
                return player;
            });

            localStorage.setItem("players", JSON.stringify(players));
        }

        trueButton.style.display = "none";
        falseButton.style.display = "none";
        gameOver = true;
    }

    trueButton.addEventListener("click", () => checkAnswer(true));
    falseButton.addEventListener("click", () => checkAnswer(false));

    loadQuestion();
}
