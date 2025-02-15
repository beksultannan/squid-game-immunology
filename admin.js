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
}
