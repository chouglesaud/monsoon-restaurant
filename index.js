const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const route = require("./routes/routes").Router;

const port = process.env.PORT || 3000;
const app = express();
const socket = require("socket.io");

// starting server
const server = app.listen(port, () => {
  console.log("server started...");
});

let io = socket(server);

// initialization
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.set("view engine", "ejs");

app.use("/", route);
module.exports = io;
