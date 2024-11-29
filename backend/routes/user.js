const express = require("express");
const User = require("../models/user.model");
const app = express();
const sessionRouter = require("../utils/session");
const { hashPassword, comparePassword } = require("../utils/passwordhash");

app.use(express.json());
const router = express.Router();
app.use(sessionRouter);
app.use(router);

// User Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({
      message: `User created successfully, user_id: ${newUser.id}`,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) return res.sendStatus(400);
  const userDB = await User.findOne({ username });
  if (!userDB) return res.sendStatus(401);
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    req.session.username = userDB.username;
    req.session.visited = true;
    return res.status(200).json({
      message: "Login successful.",
      success: true,
      user: {
        id: userDB.id,
        username: userDB.username,
      },
    });
  } else {
    res.sendStatus(401).json({ message: "Failed Authentication!" });
  }
});

module.exports = router;
