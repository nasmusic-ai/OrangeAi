// =====================
// OVERLAY.JS
// =====================

// Get WebSocket URL from ?ws= in the URL
// Example:
// overlay.html?ws=wss://orange-backend.onrender.com
const WS_URL = new URLSearchParams(location.search).get("ws");

if (!WS_URL) {
    console.error("❌ Missing WebSocket URL. Use: overlay.html?ws=wss://your-backend.onrender.com");
}

// Connect to WebSocket backend
let socket = new WebSocket(WS_URL);

// Show messages on the screen
const alertBox = document.getElementById("alert-box");

function showAlert(message) {
    alertBox.innerHTML = `
        <div class="alert-popup">
            <h2>${message.title || "Alert"}</h2>
            <p>${message.text || ""}</p>
        </div>
    `;

    alertBox.style.opacity = 1;

    // Hide after 5 seconds
    setTimeout(() => {
        alertBox.style.opacity = 0;
    }, 5000);
}

// WebSocket Events
socket.onopen = () => {
    console.log("✅ WebSocket Connected:", WS_URL);
};

socket.onmessage = (event) => {
    console.log("📩 Incoming alert:", event.data);

    let data = {};
    try {
        data = JSON.parse(event.data);
    } catch (err) {
        console.error("❌ Invalid JSON:", event.data);
        return;
    }

    showAlert(data);
};

socket.onerror = (err) => {
    console.error("⚠ WebSocket Error:", err);
};

socket.onclose = () => {
    console.warn("❌ WebSocket Disconnected. Retrying in 3 seconds...");

    setTimeout(() => {
        socket = new WebSocket(WS_URL);
    }, 3000);
};
