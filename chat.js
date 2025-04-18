import { app } from './firebase-config.js';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const db = getFirestore(app);
const messagesRef = collection(db, "messages");

// Simple XOR encryption
function encrypt(text, key = "asvkey") {
  return Array.from(text).map((char, i) =>
    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join('');
}

function decrypt(text, key = "asvkey") {
  return encrypt(text, key); // XOR decrypts same way
}

// Send message
document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const rawMsg = input.value.trim();

  if (rawMsg !== "") {
    const encryptedMsg = encrypt(rawMsg);
    await addDoc(messagesRef, {
      text: encryptedMsg,
      createdAt: serverTimestamp()
    });
    input.value = "";
  }
});

// Listen for new messages
const chatContainer = document.getElementById("chat-container");

onSnapshot(query(messagesRef, orderBy("createdAt")), (snapshot) => {
  chatContainer.innerHTML = ""; // Clear before re-rendering
  snapshot.forEach((doc) => {
    const msgData = doc.data();
    const decryptedMsg = decrypt(msgData.text);
    const div = document.createElement("div");
    div.className = "chat-message";
    div.textContent = decryptedMsg;
    chatContainer.appendChild(div);
  });

  // Scroll to latest
  chatContainer.scrollTop = chatContainer.scrollHeight;
});
