document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "1902 жылы Ullman алғаш рет адамның бүйрегін трансплантациялады.", answer: "false" },
        { question: "Трансплантацияның сәттілігі донор мен реципиенттің иммунологиялық сәйкестігіне байланысты.", answer: "true" },
        { question: "Ксенотрансплантация – бір түрге жататын, бірақ генетикалық әртүрлі екі адам арасында мүшелерді алмастыру.", answer: "false" },
        { question: "HLA-антигендері трансплантацияның қабылдануына тікелей әсер етеді.", answer: "true" },
        { question: "Жедел қабылдамау трансплантациядан кейін бірнеше жыл өткенде дамиды.", answer: "false" }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let gameOver = false;

    const questionText = document.getElementById("question-text");
    const trueButton = document.getElementById("true-btn");
    const falseButton = document.getElementById("false-btn");
    const resultText = document.getElementById("result-text");

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionText.textContent = questions[currentQuestionIndex].question;
            resultText.textContent = "";
        } else {
            checkResult();
        }
    }

    function checkAnswer(userAnswer) {
        if (gameOver) return;

        if (userAnswer === questions[currentQuestionIndex].answer) {
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
        const playerName = localStorage.getItem("playerName");
        let players = JSON.parse(localStorage.getItem("players")) || [];

        if (correctAnswers >= 2) {
            resultText.textContent = `🔥 Құттықтаймыз! Сіз ${correctAnswers}/5 дұрыс жауап бердіңіз және келесі кезеңге өттіңіз!`;

            // Ойыншыны жеңімпаздар тізіміне қосу
            let winners = JSON.parse(localStorage.getItem("winners")) || [];
            winners.push(playerName);
            localStorage.setItem("winners", JSON.stringify(winners));

            // Статусты жаңарту
            players = players.map(player =>
                player.name === playerName ? { ...player, status: "Келесі кезеңге өтті ✅" } : player
            );
        } else {
            resultText.textContent = `❌ Сіз тек ${correctAnswers}/5 дұрыс жауап бердіңіз. Ойыннан шығарылдыңыз.`;
            
            // Статусты жаңарту (ойыннан шығарылды)
            players = players.map(player =>
                player.name === playerName ? { ...player, status: "Шығарылды ❌" } : player
            );
        }

        localStorage.setItem("players", JSON.stringify(players));

        trueButton.style.display = "none";
        falseButton.style.display = "none";
        gameOver = true;
    }

    trueButton.addEventListener("click", () => checkAnswer("true"));
    falseButton.addEventListener("click", () => checkAnswer("false"));

    loadQuestion();
});
