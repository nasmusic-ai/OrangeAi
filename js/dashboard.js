// Simple dashboard: connects to WebSocket backend and can send alert messages
let ws;
const connectBtn = document.getElementById('connect');
const status = document.getElementById('status');


connectBtn.addEventListener('click', ()=>{
const url = document.getElementById('ws-url').value.trim();
if(ws) ws.close();
ws = new WebSocket(url);
ws.onopen = ()=>{ status.textContent = 'Connected'; }
ws.onclose = ()=>{ status.textContent = 'Disconnected'; }
ws.onerror = ()=>{ status.textContent = 'Error'; }
});


document.getElementById('send-alert').addEventListener('click', ()=>{
if(!ws || ws.readyState !== 1) return alert('Connect first');
const name = document.getElementById('alert-name').value || 'Viewer';
const type = document.getElementById('alert-type').value;
const msg = document.getElementById('alert-msg').value || '';


const payload = { type: 'alert', alertType: type, name, message: msg, time: Date.now() };
ws.send(JSON.stringify(payload));
});