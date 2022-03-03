const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const userRoutes = require("./userRoute");

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/test")
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

if (process.env.NODE_ENV === "production") {
  console.log("Running on production env.");
}

app.listen(process.env.port || port, () => {
  console.log(`App is running at ${port}`);
});

module.exports = app