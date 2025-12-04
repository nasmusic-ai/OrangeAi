// server.js (important parts)
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(express.json());

// Use the PORT provided by Render (or default to 8080 locally)
const PORT = process.env.PORT || 8080;

// Start HTTP server (Render requires a HTTP server to attach WS to)
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('HTTP + WS server on', PORT);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ type:'system', msg:'welcome' }));
});

function broadcast(obj){
  const raw = JSON.stringify(obj);
  wss.clients.forEach(c => {
    if(c.readyState === WebSocket.OPEN) c.send(raw);
  });
}

app.post('/event', (req, res) => {
  const body = req.body;
  if(!body || !body.type) return res.status(400).json({error:'type required'});
  const event = Object.assign({time:Date.now()}, body);
  broadcast(event);
  res.json({ok:true});
});
