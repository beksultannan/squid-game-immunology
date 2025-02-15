document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register-btn');
  const playerNameInput = document.getElementById('player-name');
  const playersList = document.getElementById('players-list');
  const startGameBtn = document.getElementById('start-game-btn');
  const registrationDiv = document.getElementById('registration');
  const startSection = document.getElementById('start-section');
  const qrScannerDiv = document.getElementById('qr-scanner');
  const backgroundMusic = document.getElementById('background-music');

  let players = [];

  // Тіркелу: Ойыншы аты енгізіліп, тіркеледі.
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
    // Фондық музыканы ойнату (браузердің рұқсаттарына байланысты)
    backgroundMusic.play().catch(err => console.log("Музыка ойнатылмады:", err));
  });

  // "Ойынды бастау" батырмасы басылғанда QR код сканері көрсетіледі.
  startGameBtn.addEventListener('click', () => {
    startSection.classList.add('hidden');
    qrScannerDiv.classList.remove('hidden');
    startQRScanner();
  });

  function updatePlayersList() {
    playersList.innerHTML = '';
    players.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      playersList.appendChild(li);
    });
  }

  // QR код сканерін іске қосу функциясы
  function startQRScanner() {
    const onScanSuccess = (decodedText, decodedResult) => {
      console.log("QR код оқылды: ", decodedText);
      // Егер QR код ішінде URL болса (мысалы, tasks.html), автоматты түрде сол бетке бағыттаймыз.
      if (decodedText.startsWith("http")) {
        window.location.href = decodedText;
      } else {
        alert("QR код деректері жарамсыз: " + decodedText);
      }
      // Сканерді тоқтату
      html5QrcodeScanner.clear().catch(err => console.log("Сканерді тоқтата алмады:", err));
    };

    const onScanFailure = error => {
      console.warn(`QR код оқылмады: ${error}`);
    };

    let html5QrcodeScanner = new Html5Qrcode("qr-reader");
    const config = { fps: 10, qrbox: 250 };

    html5QrcodeScanner.start({ facingMode: "environment" }, config, onScanSuccess, onScanFailure)
      .catch(err => {
        console.error("QR сканерді іске қосу қатесі:", err);
        alert("Камера іске қосылмады. Камера рұқсатын тексеріңіз.");
      });
  }
});
