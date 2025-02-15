document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register-btn');
  const playerNameInput = document.getElementById('player-name');
  const playersList = document.getElementById('players-list');
  const startGameBtn = document.getElementById('start-game-btn');
  const registrationDiv = document.getElementById('registration');
  const startSection = document.getElementById('start-section');
  const qrScannerDiv = document.getElementById('qr-scanner');
  const backgroundMusic = document.getElementById('background-music');

  // localStorage-те сақталған ойыншыларды оқу
  let players = JSON.parse(localStorage.getItem("players")) || [];

  updatePlayersList();

  // Тіркелу
  registerBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (name === '') {
      alert('Атыңызды енгізіңіз!');
      return;
    }
    // Бірегей ID генерациясы (уақыт белгісі негізінде)
    const playerId = 'player-' + Date.now();
    const playerObj = { id: playerId, name: name };
    players.push(playerObj);
    localStorage.setItem("players", JSON.stringify(players));
    updatePlayersList();
    alert(`${name} тіркелді!`);
    registrationDiv.classList.add('hidden');
    startSection.classList.remove('hidden');
    // Фондық музыканы ойнату
    backgroundMusic.play().catch(err => console.log("Музыка ойнатылмады:", err));
  });

  // "Ойынды бастау" батырмасы басылғанда QR код сканері көрсетіледі.
  startGameBtn.addEventListener('click', () => {
    startSection.classList.add('hidden');
    qrScannerDiv.classList.remove('hidden');
    startQRScanner();
  });

  function updatePlayersList() {
    // localStorage-тегі ойыншыларды оқимыз
    let storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    playersList.innerHTML = '';
    storedPlayers.forEach(player => {
      const li = document.createElement('li');
      li.textContent = `${player.name} (${player.id})`;
      playersList.appendChild(li);
    });
  }

  // QR код сканерін іске қосу функциясы
  function startQRScanner() {
    const onScanSuccess = (decodedText, decodedResult) => {
      console.log("QR код оқылды: ", decodedText);
      if (decodedText.startsWith("http")) {
        window.location.href = decodedText;
      } else {
        alert("QR код деректері жарамсыз: " + decodedText);
      }
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
