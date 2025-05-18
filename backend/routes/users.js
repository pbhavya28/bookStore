const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const router = express.Router();
const session = require("express-session");

app.use(express.json());
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed });
  await user.save();

  res.status(201).json({ message: "User registered" });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    res.json({
      message: "Login successful",
      user: {
        name: user.username, 
        email: user.email,
        _id: user._id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/home", async (req, res) => {
  console.log("Home route call");
});

module.exports = router;

