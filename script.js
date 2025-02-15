// Firebase конфигурациясы – өзіңіздің жобаның параметрлерін енгізіңіз
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase-ті инициализациялау (compat нұсқасы)
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
  const registerBtn = document.getElementById('register-btn');
  const playerNameInput = document.getElementById('player-name');
  const playersList = document.getElementById('players-list');
  const startGameBtn = document.getElementById('start-game-btn');
  const registrationDiv = document.getElementById('registration');
  const startSection = document.getElementById('start-section');
  const qrScannerDiv = document.getElementById('qr-scanner');
  const backgroundMusic = document.getElementById('background-music');

  // Тіркелген ойыншыларды көрсету үшін Firebase-тен оқимыз
  var playersRef = database.ref('players');
  playersRef.on('value', function(snapshot) {
    playersList.innerHTML = '';
    snapshot.forEach(function(childSnapshot) {
      var player = childSnapshot.val();
      var li = document.createElement('li');
      li.textContent = `${player.name} (${player.id})`;
      playersList.appendChild(li);
    });
  });

  // Тіркелу батырмасы басылғанда
  registerBtn.addEventListener('click', function() {
    const name = playerNameInput.value.trim();
    if (name === '') {
      alert('Атыңызды енгізіңіз!');
      return;
    }
    var newPlayerRef = playersRef.push();
    newPlayerRef.set({
      id: newPlayerRef.key,
      name: name,
      timestamp: Date.now()
    });
    alert(name + ' тіркелді!');
    registrationDiv.classList.add('hidden');
    startSection.classList.remove('hidden');
    // Фондық музыканы ойнату (бастапқыда браузер рұқсат беруі мүмкін)
    backgroundMusic.play().catch(function(err) {
      console.log("Музыка ойнатылмады:", err);
    });
  });

  // "Ойынды бастау" батырмасы басылғанда QR код сканері көрсетіледі
  startGameBtn.addEventListener('click', function() {
    startSection.classList.add('hidden');
    qrScannerDiv.classList.remove('hidden');
    startQRScanner();
  });

  // HTML5 QR Code кітапханасын қолдану арқылы QR код сканерін іске қосу функциясы
  function startQRScanner() {
    const onScanSuccess = function(decodedText, decodedResult) {
      console.log("QR код оқылды: ", decodedText);
      // Егер QR код ішінде URL болса, автоматты түрде сол бетке бағыттаймыз
      if (decodedText.startsWith("http")) {
        window.location.href = decodedText;
      } else {
        alert("QR код деректері жарамсыз: " + decodedText);
      }
      html5QrcodeScanner.clear().catch(function(err) {
        console.log("Сканерді тоқтата алмады:", err);
      });
    };

    const onScanFailure = function(error) {
      console.warn("QR код оқылмады: ", error);
    };

    let html5QrcodeScanner = new Html5Qrcode("qr-reader");
    const config = { fps: 10, qrbox: 250 };

    html5QrcodeScanner.start({ facingMode: "environment" }, config, onScanSuccess, onScanFailure)
      .catch(function(err) {
        console.error("QR сканерді іске қосу қатесі:", err);
        alert("Камера іске қосылмады. Камера рұқсатын тексеріңіз.");
      });
  }
});
