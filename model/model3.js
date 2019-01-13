const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ownerSchema = new schema(
  {
    username: {
      type: String
    },
    fullname: {
      type: String,
      required: true
    },
    password: {
      type: String
    }
  },

  { collection: "owner" }
);
const owner = mongoose.model("Myowner", ownerSchema);
module.exports = owner;
