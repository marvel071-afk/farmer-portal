const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple file-based DB (low-traffic demo)
const DB_FILE = path.join(__dirname, 'db.json');
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], crops: [] }, null, 2));
}
const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email & password required' });
  const db = readDB();
  if (db.users.find(u => u.email === email)) return res.status(400).json({ message: 'user exists' });
  const hashed = bcrypt.hashSync(password, 8);
  const user = { id: Date.now().toString(), name: name||'', email, password: hashed };
  db.users.push(user);
  writeDB(db);
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '7d' });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'invalid credentials' });
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(400).json({ message: 'invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '7d' });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

// Middleware
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'no token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'invalid token' });
  }
}

// Crops CRUD
app.get('/api/crops', (req, res) => {
  const db = readDB();
  res.json(db.crops);
});

app.post('/api/crops', auth, (req, res) => {
  const db = readDB();
  const crop = { id: Date.now().toString(), ownerId: req.user.id, ...req.body };
  db.crops.push(crop);
  writeDB(db);
  res.json(crop);
});

app.put('/api/crops/:id', auth, (req, res) => {
  const db = readDB();
  const idx = db.crops.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'not found' });
  if (db.crops[idx].ownerId !== req.user.id) return res.status(403).json({ message: 'forbidden' });
  db.crops[idx] = { ...db.crops[idx], ...req.body };
  writeDB(db);
  res.json(db.crops[idx]);
});

app.delete('/api/crops/:id', auth, (req, res) => {
  const db = readDB();
  const idx = db.crops.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'not found' });
  if (db.crops[idx].ownerId !== req.user.id) return res.status(403).json({ message: 'forbidden' });
  const removed = db.crops.splice(idx,1)[0];
  writeDB(db);
  res.json(removed);
});

// Placeholder for weather proxy (you must add an API key)
app.get('/api/weather', (req, res) => {
  // Example: client requests ?q=Mumbai
  // Implement a real proxy to OpenWeatherMap or WeatherAPI using server-side API key.
  res.json({ message: 'weather proxy not implemented', note: 'Add an API key in backend and implement request to a weather API.' });
});

// Placeholder for news
app.get('/api/news', (req, res) => {
  res.json({ message: 'news proxy not implemented', note: 'Add server-side calls to news provider (e.g., NewsAPI) with API_KEY.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend running on', PORT));
