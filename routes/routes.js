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
let io = require("../index");
// getting schema's
const Order = require("../model/model1");
const FinalOrder = require("../model/model2");
const Owner = require("../model/model3");

let newOrder;
let newOrder2;
let order;
let getit;
let getit2;
let tablenumber;
let newOwner;

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
// post route for login and registration

Router.post("/register", url, (req, res) => {
  let username = req.body.username;
  let fullname = req.body.fullname;
  let password = req.body.password;
  newOwner = new Owner({
    username: username,
    fullname: fullname,
    password: password
  });
  newOwner
    .save()
    .then(() => {
      console.log("successfully saved");
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});
Router.post("/orderpage", url, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  Owner.findOne({ username: username, password: password })
    .then(found => {
      if (!found) {
        console.log("not found");
        res.redirect("/");
      } else {
        res.render("receiverpage");
      }
    })
    .catch(err => {
      console.log(err);
    });
});

Router.get("/", url, (req, res) => {
  res.render("landingpage", { err: "" });
});
Router.get("/register", (req, res) => {
  res.render("landingregistor");
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
  order = req.body;
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

Router.post("/submit", (req, res) => {
  res.render("confirmpage");
  db.collection("finalorder")
    .countDocuments()
    .then(count => {
      newOrder2 = FinalOrder({
        tablenumber: tablenumber,
        ordernumber: count + 1,
        order: order
      });
      newOrder2
        .save()
        .then(found => {
          console.log("new order saved successfully");
          getit2 = found;
          db.collection("order")
            .countDocuments()
            .then(count => {
              Order.findOneAndRemove({ ordernumber: count })
                .then(found => {
                  if (!found) {
                    console.log("not found");
                  } else {
                    console.log("successfully deleted");
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })

            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});
// Router.post("/Orderpage", (req, res) => {
//   db.collection("finalorder")
//     .countDocuments()
//     .then(count => {
//       FinalOrder.findOne({ ordernumber: count })
//         .then(found => {
//           if (!found) {
//             console.log("not found");
//           } else {
//             res.send(JSON.stringify(found));
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     })

//     .catch(err => {
//       console.log(err);
//     });
// });
io.sockets.on("connection", socket => {
  console.log("socket is fine");
});

module.exports = { Router: Router, newOrder2: newOrder2 };
