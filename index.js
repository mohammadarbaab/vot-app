const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");

app.use("user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Guys This is Mein Bca Wala");
});
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
