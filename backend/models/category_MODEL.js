//

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category_SCHEMA = new Schema(
  {
    marked: {
      val: { type: Boolean, required: true },
      notes: { type: String, required: true },
    },
    slug: { type: String, required: true },
    icon: { type: Schema.Types.ObjectId, ref: "icons", required: true },
    name: {
      en: { type: String, required: true },
      de: { type: String, required: true },
    },
    IS_startCategory: { type: Boolean, required: true },
    IS_endCategory: { type: Boolean, required: true },
    parent_CATEG: { type: Schema.ObjectId, ref: "categories" },
    ancestor_CATEG: [{ type: Schema.ObjectId, ref: "categories" }],
    child_CATEG: [{ type: Schema.ObjectId, ref: "categories" }],
    tagGroups: [{ type: Schema.ObjectId, ref: "tag_groups" }],
    city: { type: Schema.ObjectId, ref: "cities", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", category_SCHEMA);
