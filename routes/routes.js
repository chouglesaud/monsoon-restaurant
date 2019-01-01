const express = require("express");
const Router = express.Router();
const menu = require("./api/menu");

Router.get("/", (req, res) => {
  res.render("landingpage");
});
