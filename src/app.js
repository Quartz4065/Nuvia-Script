import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

// Firebase configuration for "Live Chat" project
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "live-chat.firebaseapp.com",
  databaseURL: "https://live-chat.firebaseio.com",
  projectId: "live-chat",
  storageBucket: "live-chat.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// DOM Elements
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const chatContainer = document.getElementById('chat-container');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

// Register User
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User registered:', userCredential.user);
      chatContainer.style.display = 'block';
    })
    .catch((error) => {
      console.error('Error registering user:', error);
    });
});

// Login User
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User logged in:', userCredential.user);
      chatContainer.style.display = 'block';
      loadMessages();
    })
    .catch((error) => {
      console.error('Error logging in user:', error);
    });
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    chatContainer.style.display = 'block';
    loadMessages();
  } else {
    chatContainer.style.display = 'none';
  }
});

// Load chat messages
const loadMessages = () => {
  const chatRef = ref(database, 'chats');
  onChildAdded(chatRef, (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.user}: ${message.text}`;
    chatMessages.appendChild(messageElement);
  });
};

// Send a new message
chatSend.addEventListener('click', () => {
  const message = chatInput.value;
  const chatRef = ref(database, 'chats');
  push(chatRef, {
    user: auth.currentUser.email,
    text: message,
    timestamp: Date.now(),
  });
  chatInput.value = '';
});