document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register-btn');
  const startGameBtn = document.getElementById('start-game-btn');
  const playerNameInput = document.getElementById('player-name');
  const registrationDiv = document.getElementById('registration');
  const startSection = document.getElementById('start-section');
  const qrScannerDiv = document.getElementById('qr-scanner');
  const backgroundMusic = document.getElementById('background-music');

  // Тіркелу
  registerBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (name === '') {
      alert('Атыңызды енгізіңіз!');
      return;
    }
    alert(`${name} тіркелді!`);
    registrationDiv.classList.add('hidden');
    startSection.classList.remove('hidden');
    // Фондық музыканы ойнату (автоматты түрде браузерлер кейде бұғаттайды)
    backgroundMusic.play().catch(error => {
      console.log('Музыканы ойнату мүмкін болмады:', error);
    });
  });

  // Ойынды бастау батырмасы
  startGameBtn.addEventListener('click', () => {
    startSection.classList.add('hidden');
    qrScannerDiv.classList.remove('hidden');
    startQRScanner();
  });
});

// HTML5 QR Code кітапханасын қолдану арқылы QR код сканерін бастау
function startQRScanner() {
  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    // QR код сәтті оқылды
    alert(`QR код оқылды: ${decodedText}`);
    // Егер QR код URL болса, автоматты түрде сол бетке бағыттаймыз:
    if (decodedText.startsWith('http')) {
      window.location.href = decodedText;
    }
    // Сканерді тоқтату үшін: (html5QrcodeScanner.clear())
    html5QrcodeScanner.clear().catch(error => {
      console.error('Сканерді тоқтата алмады:', error);
    });
  };

  const qrCodeErrorCallback = errorMessage => {
    // Уақытша қателік пайда болса, консольге шығарамыз
    console.log(`QR код оқылмады: ${errorMessage}`);
  };

  // Html5Qrcode объектісін құру
  let html5QrcodeScanner = new Html5Qrcode("qr-reader");
  const config = { fps: 10, qrbox: 250 };

  html5QrcodeScanner.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, qrCodeErrorCallback)
    .catch(err => {
      console.error("QR сканерді іске қосу қатесі:", err);
    });
}
