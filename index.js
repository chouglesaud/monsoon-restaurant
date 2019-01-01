const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const menu = require("./api/menu");
const route = require("./routes/routes");
const port = process.env.PORT || 3000;
const app = express();

// initialization
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/routes", route);

// starting server
app.listen(port, () => {
  console.log("server started...");
});
