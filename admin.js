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
    let gameStarted = false;
    
    const questionText = document.getElementById("question-text");
    const trueButton = document.getElementById("true-btn");
    const falseButton = document.getElementById("false-btn");
    const resultText = document.getElementById("result-text");

    function checkGameStart() {
        const gameStatus = localStorage.getItem("gameStarted");
        if (gameStatus === "true") {
            gameStarted = true;
            loadQuestion();
        } else {
            resultText.textContent = "⏳ Админ ойын бастағанша күтіңіз...";
            trueButton.style.display = "none";
            falseButton.style.display = "none";
        }
    }

    function loadQuestion() {
        if (!gameStarted) return;

        if (currentQuestionIndex < questions.length) {
            questionText.textContent = questions[currentQuestionIndex].question;
            resultText.textContent = "";
        } else {
            checkResult();
        }
    }

    function checkAnswer(userAnswer) {
        if (!gameStarted) return;

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
        if (correctAnswers >= 2) {
            resultText.textContent = `🔥 Құттықтаймыз! Сіз ${correctAnswers}/5 дұрыс жауап бердіңіз және келесі кезеңге өттіңіз!`;
        } else {
            resultText.textContent = `❌ Сіз тек ${correctAnswers}/5 дұрыс жауап бердіңіз. Ойыннан шығарылдыңыз.`;
        }

        trueButton.style.display = "none";
        falseButton.style.display = "none";

        // Админ панеліне нәтиже жіберу
        let playerName = localStorage.getItem("playerName");
        let results = JSON.parse(localStorage.getItem("results")) || {};
        results[playerName] = correctAnswers;
        localStorage.setItem("results", JSON.stringify(results));
    }

    trueButton.addEventListener("click", () => checkAnswer("true"));
    falseButton.addEventListener("click", () => checkAnswer("false"));

    checkGameStart();
});
