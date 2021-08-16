require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const app = express();
mongoose.connect(
  "mongodb+srv://gZOFHhVBWYypd25Z:gZOFHhVBWYypd25Z@cluster0.uzqil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

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

app.listen(port, () => {
  console.log(`server sucessfully created on port ${port}`);
});
