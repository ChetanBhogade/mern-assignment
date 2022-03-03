const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const userRoutes = require("./userRoute");

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB GOT ERROR");
  });

app.use(cors());
app.use(bodyParser.json());

app.use("/", userRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});

module.exports = app