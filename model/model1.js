const mongoose = require("mongoose");
const schema = mongoose.Schema;
const orderSchema = new schema(
  {
    ordernumber: {
      type: Number,
      default: 1
    },
    order: [{ name: { type: String }, price: { type: Number } }]
  },

  { collection: "order" }
);
const order = mongoose.model("Myorder", orderSchema);
module.exports = order;
