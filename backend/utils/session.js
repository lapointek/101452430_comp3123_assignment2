const express = require("express");
const session = require("express-session");
const router = express.Router();
const app = express();
app.use(router);

router.use(
  session({
    secret: "pass123",
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
      maxAge: 60000 * 60,
    },
  })
);

module.exports = router;
