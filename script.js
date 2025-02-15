document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register-btn');
  const startGameBtn = document.getElementById('start-game-btn');
  const playerNameInput = document.getElementById('player-name');
  const registrationDiv = document.getElementById('registration');
  const startSection = document.getElementById('start-section');
  const qrDisplay = document.getElementById('qr-display');
  const backgroundMusic = document.getElementById('background-music');

  // Тіркелу батырмасын басқанда
  registerBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (name === '') {
      alert('Атыңызды енгізіңіз!');
      return;
    }
    alert(`${name} тіркелді!`);
    registrationDiv.classList.add('hidden');
    startSection.classList.remove('hidden');
    // Фондық музыканы ойнату (бұл браузер рұқсаттарына байланысты)
    backgroundMusic.play().catch(error => console.log("Музыканы ойнату қатесі:", error));
  });

  // Ойынды бастау батырмасы басылғанда QR код шығару
  startGameBtn.addEventListener('click', () => {
    startSection.classList.add('hidden');
    qrDisplay.classList.remove('hidden');
    generateQRCode();
  });
});

// QR код генерациялау функциясы
function generateQRCode() {
  // Ойын бетіне арналған URL-ді өзіңіздің нақты URL-ге ауыстырыңыз
  const gameUrl = "https://beksultannan.github.io/squid-game-immunology/game1.html";
  const qrcodeContainer = document.getElementById("qrcode");
  // Егер бұрын QR код болса, оны тазалау
  qrcodeContainer.innerHTML = "";
  // QRCode.js кітапханасы арқылы QR кодты генерациялау
  new QRCode(qrcodeContainer, {
    text: gameUrl,
    width: 200,
    height: 200,
    colorDark: "#ffffff",
    colorLight: "#111111",
    correctLevel: QRCode.CorrectLevel.H
  });
}
