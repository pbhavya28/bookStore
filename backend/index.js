const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const config = require('./config.json');

const app = express();

// Route files
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');

// Middleware
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

// MongoDB connection string
const mongoUrl = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;

// Connect to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(' MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Route handlers
app.use('/api/users', userRoutes);   // e.g. http://localhost:3000/api/users/register
app.use('/api/books', bookRoutes);   // e.g. http://localhost:3000/api/books/:id

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});











// // const express = require('express');
// // const mongoose = require('mongoose');
// // const session = require('express-session');
// // const cors = require('cors');
// // const path = require('path');
// // // const fs = require('fs');
// // const config = require("./config.json");

// // const app = express();
// // const userRoutes = require('./routes/users'); // We'll create this file

// // // Load config if using config.json
// // // const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// // // Middlewares
// // app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
// // app.use(express.json());
// // app.use(express.static(path.join(__dirname, 'public')));
// // app.use(session({
// //   secret: 'your-session-secret',
// //   resave: false,
// //   saveUninitialized: false
// // }));

// // // MongoDB connection
// // let url = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;


// // mongoose.connect(url, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // }).then(() => console.log('MongoDB connected'))
// //   .catch(err => console.error('MongoDB error:', err));

// // // Routes
// // app.use('/api/users', userRoutes);

// // app.listen(3000, () => console.log('Server running on port 3000'));


// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const cors = require('cors');
// const path = require('path');
// const config = require('./config.json');

// const app = express();

// // Routes
// const userRoutes = require('./routes/users'); // ✅ Existing user routes
// const bookRoutes = require('./routes/books'); // ✅ New book routes

// // Middleware
// app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret: 'your-session-secret',
//   resave: false,
//   saveUninitialized: false
// }));

// // MongoDB connection
// let url = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;

// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB error:', err));

// // ✅ Use both routes
// app.use('/api/users', userRoutes);  // http://localhost:3000/api/users
// app.use('/api/books', bookRoutes);  // http://localhost:3000/api/books


// app.listen(3000, () => console.log('Server running on port 3000'));

