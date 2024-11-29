const express = require("express");
const mongoose = require("mongoose");
const sessionRouter = require("./utils/session");
const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(sessionRouter);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Basic route
app.get("/", (req, res) => {
  res.send("Backend Running!");
});

app.use("/user", userRoutes);
app.use("/emp", employeeRoutes);

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
