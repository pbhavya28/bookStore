
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const config = require('./config.json');

const app = express();



// Routes
const userRoutes = require('./routes/users'); // ✅ Existing user routes
const bookRoutes = require('./routes/books'); // ✅ New book routes

// Middleware
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-session-secret', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// MongoDB connection
let url = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ✅ Use both routes
app.use('/api/users', userRoutes);  // http://localhost:3000/api/users
app.use('/api/books', bookRoutes);  // http://localhost:3000/api/books


app.listen(5000, () => console.log('Server running on port 5000'));

