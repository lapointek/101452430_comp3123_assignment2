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
  const data = req.body;

  try {
    data.password = await hashPassword(data.password);
    const user = await User.create(data);
    res.status(201).json({
      message: `User created, user_id: ${user.id}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    req.session.username = userDB;
    req.session.visited = true;
    res.status(200).json({ message: "Login successful." });
  } else {
    res.sendStatus(401).json({ message: "Failed Authentication!" });
  }
});

module.exports = router;
