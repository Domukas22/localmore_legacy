//

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const icon_SCHEMA = new Schema(
  {
    marked: {
      val: { type: Boolean, required: true },
      notes: { type: String, required: true },
    },
    url: { type: String, required: true },
    desc: { type: String, required: true },
    attribution: { type: String, required: true },
  },
  { timestamps: true, collection: "icons" }
);

module.exports = mongoose.model("icons", icon_SCHEMA);

///////////////////////////////
