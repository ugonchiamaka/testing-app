require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
const cors = require("cors");
const path = require("./Router");
const app = express();

mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Database connected sucessfully");
  })
  .on("error", () => {
    console.log("Error while connecting to the database");
  });

app.get("/", (req, res) => {
  res.send("server is connected and updated");
});
app.use(cors());
app.use("/churchdata/api", path);

app.listen(port, () => {
  console.log(`server sucessfully created on port ${port}`);
});
