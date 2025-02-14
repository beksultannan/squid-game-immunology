import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
import QRCode from "qrcode";

// Firebase конфигурациясы
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

// Анонимді тіркелу
signInAnonymously(auth).then((userCredential) => {
  const user = userCredential.user;
  set(ref(db, `players/${user.uid}`), { status: "alive" });
}).catch((error) => {
  console.error("Auth Error: ", error);
});

// Тапсырмаларға QR-код жасау
function generateQRCode(taskId) {
  const taskUrl = `https://yourgame.com/task/${taskId}`;
  QRCode.toCanvas(document.getElementById("qrcode"), taskUrl, function (error) {
    if (error) console.error(error);
  });
}

generateQRCode("task1"); // 1-тапсырма үшін QR код

// Нәтижелер таблицасы
function updateLeaderboard() {
  get(ref(db, "players")).then((snapshot) => {
    if (snapshot.exists()) {
      const players = snapshot.val();
      let leaderboardHtml = "";
      Object.keys(players).forEach((playerId) => {
        leaderboardHtml += `<tr><td>${playerId}</td><td>${players[playerId].status}</td></tr>`;
      });
      document.getElementById("leaderboard").innerHTML = leaderboardHtml;
    }
  });
}

updateLeaderboard();
