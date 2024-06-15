//

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tag_SCHEMA = new Schema(
  {
    marked: {
      val: { type: Boolean, required: true },
      notes: { type: String, required: true },
    },
    type: { type: String, required: true, default: "tag" },
    new: { type: Boolean, required: true },
    slug: { type: String, required: true },
    icon: { type: Schema.Types.ObjectId, ref: "icons", required: true },
    name: {
      en: { type: String, required: true },
      de: { type: String, required: true },
    },
    keywords: {
      en: [{ type: String, required: true }],
      de: [{ type: String, required: true }],
    },
  },
  { timestamps: true, collection: "tags" }
);

const tag_MODEL = mongoose.model("Tag", tag_SCHEMA);

module.exports = { tag_MODEL };

///////////////////////////////
