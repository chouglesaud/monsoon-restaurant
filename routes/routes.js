const express = require("express");
const fs = require("fs");
const Router = express.Router();
const bodyParser = require("body-parser");
const Readjson = fs.readFileSync("./api/menu.json");
const menuObj = JSON.parse(Readjson);
const url = bodyParser.urlencoded({ extended: false });
const dburl = require("../myurl/url").url;
const mongoose = require("mongoose");
const db = mongoose.connection;
const Order = require("../model/model1");
let newOrder;
let getit;
let tablenumber;

//connecting to database

mongoose
  .connect(
    dburl,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("successfully connected");
  })
  .catch(err => {
    console.log(err);
  });

Router.use(bodyParser.json());
Router.get("/", (req, res) => {
  res.render("landingpage");
});

Router.get("/menu", (req, res) => {
  res.render("menupage", { menuitem: menuObj });
});

Router.post("/tablenumber", url, (req, res) => {
  let get_table_number = req.body.store;
  tablenumber = parseInt(get_table_number, 10);
});

//  getting order
Router.post("/order", url, (req, res) => {
  let order = req.body;
  lenght = order.lenght;

  db.collection("order")
    .countDocuments()
    .then(count => {
      newOrder = Order({
        tablenumber: tablenumber,
        ordernumber: count + 1,
        order: order
      });
      // saving to data base
      newOrder
        .save()
        .then(() => {
          Order.findOne({ ordernumber: count + 1 })
            .then(found => {
              if (!found) {
                console.log("not found");
              } else {
                getit = found;
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
      // console.log(newOrder.ordernumber);
    })

    .catch(err => {
      console.log(err);
    });
});
Router.get("/order", (req, res) => {
  res.send(JSON.stringify({ data: getit }));
});
Router.post("/confirm", (req, res) => {
  res.render("orderpage");
});
module.exports = Router;
