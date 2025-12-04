// utils.js
// Shared helpers for dashboard and overlay

// ------------------------------
// Generate random IDs
// ------------------------------
export function uid(length = 8) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let out = "";
    for (let i = 0; i < length; i++) {
        out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
}

// ------------------------------
// Sleep helper (async delay)
// ------------------------------
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ------------------------------
// Logger
// ------------------------------
export function log(msg, type = "info") {
    const color = {
        info: "color: #4FC3F7",
        success: "color: #81C784",
        error: "color: #E57373",
    }[type] || "color: gray";

    console.log(`%c[UTILS] ${msg}`, color);
}

// ------------------------------
// Send WebSocket command
// ------------------------------
export function wsSend(socket, data) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error("WebSocket is not connected.");
        return;
    }

    socket.send(JSON.stringify(data));
}
