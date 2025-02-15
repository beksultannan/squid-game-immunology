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
    let playerName = localStorage.getItem("playerName");

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
        let status = correctAnswers >= 2 ? "Келесі кезеңге өтті ✅" : "Шығарылды ❌";

        resultText.textContent = correctAnswers >= 2 
            ? `🔥 Құттықтаймыз! Сіз ${correctAnswers}/5 дұрыс жауап бердіңіз және келесі кезеңге өттіңіз!` 
            : `❌ Сіз тек ${correctAnswers}/5 дұрыс жауап бердіңіз. Ойыннан шығарылдыңыз.`;

        trueButton.style.display = "none";
        falseButton.style.display = "none";
        gameOver = true;

        // Ойыншының нәтижесін localStorage-ке сақтау
        let players = JSON.parse(localStorage.getItem("players")) || [];
        let updatedPlayers = players.map(player => 
            player.name === playerName ? { ...player, status: status } : player
        );

        localStorage.setItem("players", JSON.stringify(updatedPlayers));
    }

    trueButton.addEventListener("click", () => checkAnswer("true"));
    falseButton.addEventListener("click", () => checkAnswer("false"));

    loadQuestion();
});
