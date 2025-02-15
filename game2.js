document.addEventListener("DOMContentLoaded", function () {
    const terms = [
        { term: "Аутотрансплантация", correctMatch: "в" },
        { term: "Аллотрансплантация", correctMatch: "а" },
        { term: "Ксенотрансплантация", correctMatch: "б" }
    ];

    const definitions = {
        "а": "Генетикалық жағынан әртүрлі, бірақ бір түрге жататын екі жеке тұлға арасында мүшені алмастыру.",
        "б": "Донор мен реципиент әртүрлі биологиялық түрлерге жататын трансплантация түрі.",
        "в": "Адамның өз тінін немесе мүшесін басқа бөлігіне ауыстыру."
    };

    let userAnswers = {};
    let correctAnswers = 0;

    function loadGame() {
        const container = document.getElementById("game-container");
        container.innerHTML = "";

        terms.forEach((term, index) => {
            const termElement = document.createElement("div");
            termElement.innerHTML = `<p><strong>${index + 1}. ${term.term}</strong></p>`;

            Object.keys(definitions).forEach((key) => {
                const button = document.createElement("button");
                button.textContent = `${key}) ${definitions[key]}`;
                button.classList.add("option-btn");
                button.onclick = function () {
                    selectAnswer(term.term, key);
                };
                termElement.appendChild(button);
            });

            container.appendChild(termElement);
        });

        const submitButton = document.createElement("button");
        submitButton.textContent = "Тексеру ✅";
        submitButton.classList.add("submit-btn");
        submitButton.onclick = checkResults;
        container.appendChild(submitButton);
    }

    function selectAnswer(term, answer) {
        userAnswers[term] = answer;
    }

    function checkResults() {
        correctAnswers = 0;

        terms.forEach((term) => {
            if (userAnswers[term.term] === term.correctMatch) {
                correctAnswers++;
            }
        });

        const resultText = document.getElementById("result-text");
        if (correctAnswers >= 2) {
            resultText.textContent = `🎉 Құттықтаймыз! Сіз ${correctAnswers}/3 дұрыс сәйкестендірдіңіз және келесі кезеңге өттіңіз!`;
        } else {
            resultText.textContent = `❌ Сіз тек ${correctAnswers}/3 дұрыс сәйкестендірдіңіз. Ойыннан шығарылдыңыз.`;
        }
    }

    loadGame();
});
