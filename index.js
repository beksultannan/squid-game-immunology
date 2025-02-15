document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name-input");
    const registerBtn = document.getElementById("register-btn");

    function registerPlayer() {
        let name = nameInput.value.trim();
        if (name === "") {
            alert("❗ Есіміңізді енгізіңіз!");
            return;
        }

        let players = JSON.parse(localStorage.getItem("players")) || [];
        players.push(name);
        localStorage.setItem("players", JSON.stringify(players));
        localStorage.setItem("playerName", name);

        window.location.href = "game.html";
    }

    registerBtn.addEventListener("click", registerPlayer);
});
