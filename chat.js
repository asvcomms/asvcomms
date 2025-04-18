// chat.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC0VCn8OkSc-y8T5mJFhf-dP_lG8JyOq_g",
  authDomain: "asv-comms.firebaseapp.com",
  projectId: "asv-comms",
  storageBucket: "asv-comms.firebasestorage.app",
  messagingSenderId: "96571461160",
  appId: "1:96571461160:web:04b5311b12f5eaaea76f1d",
  measurementId: "G-WBVBZQSH3H"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM refs
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatContainer = document.getElementById('chat-container');

// Encryption key
const encryptionKey = 'asv-secret';

// XOR encryption/decryption function
function xorEncryptDecrypt(text, key) {
  let output = '';
  for (let i = 0; i < text.length; i++) {
    output += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return output;
}

// Firestore collection
const messagesRef = collection(db, 'messages');

// Send message
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (text !== '') {
    const encrypted = xorEncryptDecrypt(text, encryptionKey);
    await addDoc(messagesRef, {
      text: encrypted,
      timestamp: serverTimestamp()
    });
    chatInput.value = '';
  }
});

// Load messages
const q = query(messagesRef, orderBy('timestamp'));
onSnapshot(q, (snapshot) => {
  chatContainer.innerHTML = '';
  snapshot.forEach((doc) => {
    const msg = doc.data();
    const decrypted = xorEncryptDecrypt(msg.text, encryptionKey);
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message';
    msgEl.textContent = decrypted;
    chatContainer.appendChild(msgEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
});

