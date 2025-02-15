document.addEventListener("DOMContentLoaded", function () {
    const questionsRound1 = [
        { question: "1902 жылы Ullman алғаш рет адамның бүйрегін трансплантациялады.", answer: "false" },
        { question: "Трансплантацияның сәттілігі донор мен реципиенттің иммунологиялық сәйкестігіне байланысты.", answer: "true" },
        { question: "Ксенотрансплантация – бір түрге жататын, бірақ генетикалық әртүрлі екі адам арасында мүшелерді алмастыру.", answer: "false" },
        { question: "HLA-антигендері трансплантацияның қабылдануына тікелей әсер етеді.", answer: "true" },
        { question: "Жедел қабылдамау трансплантациядан кейін бірнеше жыл өткенде дамиды.", answer: "false" }
    ];

    const questionsRound2 = [
        { question: "Аутотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 0 },
        { question: "Аллотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 1 },
        { question: "Ксенотрансплантация дегеніміз не?", options: ["Өз тінін басқа бөлікке ауыстыру", "Басқа адамнан мүшені алу", "Жануардан адамға трансплантациялау"], correct: 2 }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let gameOver = false;
    let currentRound = localStorage.getItem("currentRound") || "round1";

    const questionText = document.getElementById("question-text");
    const trueButton = document.getElementById("true-btn");
    const falseButton = document.getElementById("false-btn");
    const resultText = document.getElementById("result-text");

    function loadQuestion() {
        let questions = currentRound === "round1" ? questionsRound1 : questionsRound2;

        if (currentQuestionIndex < questions.length) {
            if (currentRound === "round1") {
                questionText.textContent = questions[currentQuestionIndex].question;
                trueButton.style.display = "inline-block";
                falseButton.style.display = "inline-block";
            } else {
                questionText.innerHTML = `
                    <p>${questions[currentQuestionIndex].question}</p>
                    ${questions[currentQuestionIndex].options.map((opt, index) => 
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
            }
            resultText.textContent = "";
        } else {
            checkResult();
        }
    }

    function checkAnswer(userAnswer) {
        let questions = currentRound === "round1" ? questionsRound1 : questionsRound2;

        if (gameOver) return;

        if ((currentRound === "round1" && userAnswer === questions[currentQuestionIndex].answer) ||
            (currentRound === "round2" && userAnswer === questions[currentQuestionIndex].correct)) {
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
            resultText.textContent = `🔥 Құттықтаймыз! Сіз ${correctAnswers}/${currentRound === "round1" ? 5 : 3} дұрыс жауап бердіңіз!`;

            if (currentRound === "round1") {
                localStorage.setItem("currentRound", "round2");
                setTimeout(() => window.location.reload(), 3000);
            } else {
                resultText.textContent += " 🏆 Сіз ойынды жеңіп алдыңыз!";
            }
        } else {
            resultText.textContent = `❌ Сіз тек ${correctAnswers}/${currentRound === "round1" ? 5 : 3} дұрыс жауап бердіңіз. Ойыннан шығарылдыңыз.`;
        }

        trueButton.style.display = "none";
        falseButton.style.display = "none";
        gameOver = true;
    }

    trueButton.addEventListener("click", () => checkAnswer("true"));
    falseButton.addEventListener("click", () => checkAnswer("false"));

    loadQuestion();
});
