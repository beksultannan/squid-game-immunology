document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register-btn');
  const playerNameInput = document.getElementById('player-name');
  const playersList = document.getElementById('players-list');
  const qrScanBtnContainer = document.getElementById('qr-scan-btn-container');
  const scanQrBtn = document.getElementById('scan-qr-btn');
  const qrScannerDiv = document.getElementById('qr-scanner');
  const gameArea = document.getElementById('game-area');
  const backgroundMusic = document.getElementById('background-music');

  let players = [];

  // Тіркелу
  registerBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (!name) {
      alert('Атыңызды енгізіңіз!');
      return;
    }
    players.push(name);
    updatePlayersList();
    alert(`${name} тіркелді!`);
    // Фондық музыканы ойнату (браузердің рұқсаттарына байланысты)
    backgroundMusic.play().catch(err => console.log("Музыка ойнатылмады:", err));
    // Тіркелуден кейін QR кодты сканерлеу батырмасын көрсету
    qrScanBtnContainer.classList.remove('hidden');
    // Тіркелу формасын жасыру
    document.getElementById('registration').classList.add('hidden');
  });

  function updatePlayersList() {
    playersList.innerHTML = '';
    players.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      playersList.appendChild(li);
    });
  }

  // QR кодты сканерлеу батырмасы басылғанда
  scanQrBtn.addEventListener('click', () => {
    qrScanBtnContainer.classList.add('hidden');
    qrScannerDiv.classList.remove('hidden');
    startQRScanner();
  });

  // QR код сканерін іске қосу
  function startQRScanner() {
    const onScanSuccess = (decodedText, decodedResult) => {
      console.log(`QR код оқылды: ${decodedText}`);
      // QR код сәтті оқылған соң сканерді тоқтату
      html5QrcodeScanner.clear().catch(err => console.log("Сканерді тоқтата алмады:", err));
      // QR код оқылған кезде ойын аймағын көрсету
      qrScannerDiv.classList.add('hidden');
      gameArea.classList.remove('hidden');
      startGame();
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

  // Ойынды бастау функциясы
  function startGame() {
    // Мұнда нақты ойын логикасын қосыңыз
    alert("Ойын басталды! Жылдам ойлау және командалық тапсырмалар іске қосылды.");
  }
});
