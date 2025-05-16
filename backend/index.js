
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
// const fs = require('fs');
const config = require("./config.json");

const app = express();
const userRoutes = require('./routes/users'); // We'll create this file

// Load config if using config.json
// const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Middlewares
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

// MongoDB connection
let url = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/users', userRoutes);



app.listen(3000, () => console.log('Server running on port 3000'));
