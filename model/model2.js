const mongoose = require("mongoose");
const schema = mongoose.Schema;
const orderSchema = new schema(
  {
    tablenumber: {
      type: Number
    },
    ordernumber: {
      type: Number,
      default: 1
    },
    order: [{ name: { type: String }, price: { type: Number } }]
  },

  { collection: "finalorder" }
);
const order = mongoose.model("MyFinalOrder", orderSchema);
module.exports = order;
