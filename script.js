document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register-btn');
  const playerNameInput = document.getElementById('player-name');
  const playersList = document.getElementById('players-list');
  const startGameBtn = document.getElementById('start-game-btn');
  const registrationDiv = document.getElementById('registration');
  const startSection = document.getElementById('start-section');
  const qrDisplay = document.getElementById('qr-display');
  const backgroundMusic = document.getElementById('background-music');

  let players = [];

  // Тіркелу
  registerBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (name === '') {
      alert('Атыңызды енгізіңіз!');
      return;
    }
    players.push(name);
    updatePlayersList();
    alert(`${name} тіркелді!`);
    registrationDiv.classList.add('hidden');
    startSection.classList.remove('hidden');
    // Фондық музыканы ойнату (браузер рұқсаттарына байланысты)
    backgroundMusic.play().catch(err => console.log("Музыка ойнатылмады:", err));
  });

  // Ойынды бастау батырмасы басылғанда QR код шығару
  startGameBtn.addEventListener('click', () => {
    startSection.classList.add('hidden');
    qrDisplay.classList.remove('hidden');
    generateQRCode();
  });

  function updatePlayersList() {
    playersList.innerHTML = '';
    players.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      playersList.appendChild(li);
    });
  }

  // QR код генерациялау функциясы
  function generateQRCode() {
    // Тапсырмалар бетіне арналған URL-ді tasks.html деп өзгертіңіз
    const tasksUrl = "https://beksultannan.github.io/squid-game-immunology/tasks.html";
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = ""; // Алдыңғы QR кодты тазалау
    new QRCode(qrcodeContainer, {
      text: tasksUrl,
      width: 250,
      height: 250,
      colorDark : "#ffffff",
      colorLight : "#111111",
      correctLevel : QRCode.CorrectLevel.H
    });
  }
});
