const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register controller
const register = async (req, res) => {
  console.log("REQ BODY 👉", req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email and password are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    if (!newUser) {
      return res.status(400).json({ error: "User creation failed" });
    }
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.status(200).json({ message: "Login successful", token });
};

module.exports = { register, login };
