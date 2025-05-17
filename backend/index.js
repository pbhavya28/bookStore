const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const config = require('./config.json');

const app = express();



// Routes
const userRoutes = require('./routes/users'); 
const bookRoutes = require('./routes/books'); 


app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-session-secret', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));


let url = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.listen(5000, () => console.log('Server running on port 5000'));

// app.listen(3000, () => console.log("Server running on port 3000"));
