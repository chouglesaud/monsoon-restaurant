const express = require("express");
const fs = require("fs");
const Router = express.Router();
const Readjson = fs.readFileSync("./api/menu.json");
const menuObj = JSON.parse(Readjson);
console.log(menuObj.menu[0].items[0]);

Router.get("/", (req, res) => {
  res.render("landingpage");
});

Router.get("/menu", (req, res) => {
  res.render("menupage", { menuitem: menuObj });
});
module.exports = Router;
