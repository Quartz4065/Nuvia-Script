import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "YOUR_DATABASE_URL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Registered:", user);
            chatContainer.style.display = "block";
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in:", user);
            chatContainer.style.display = "block";
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

chatSend.addEventListener("click", () => {
    const message = chatInput.value;
    if (message) {
        const chatRef = ref(database, "chats");
        push(chatRef, {
            user: auth.currentUser.email,
            message: message,
            timestamp: new Date().toISOString()
        });
        chatInput.value = "";
    }
});

const chatRef = ref(database, "chats");
onChildAdded(chatRef, (data) => {
    const chat = data.val();
    const chatMessage = document.createElement("div");
    chatMessage.textContent = `${chat.user}: ${chat.message}`;
    chatMessages.appendChild(chatMessage);
});
