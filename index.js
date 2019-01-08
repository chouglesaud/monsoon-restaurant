const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const route = require("./routes/routes");
const port = process.env.PORT || 3000;
const app = express();

// initialization
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.set("view engine", "ejs");

app.use("/", route);

// starting server
app.listen(port, () => {
  console.log("server started...");
});
