const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staticProfile_SCHEMA = new Schema({
  marked: {
    val: { type: Boolean, required: true },
    notes: { type: String, required: true },
  },
  desc: { type: String, required: true },
  IS_new: { type: Boolean, required: true },
  name: {
    en: { type: String, required: true },
    de: { type: String, required: true },
  },
  subname: {
    en: { type: String, required: true },
    de: { type: String, required: true },
  },
  about_TITLE: {
    en: { type: String, required: true },
    de: { type: String, required: true },
  },
  about_PARAG: {
    en: { type: String, required: true },
    de: { type: String, required: true },
  },
  pros: [
    {
      en: { type: String, required: true },
      de: { type: String, required: true },
    },
  ],
  cons: [
    {
      en: { type: String, required: true },
      de: { type: String, required: true },
    },
  ],
  city: { type: Schema.ObjectId, ref: "cities", required: true },
  categories: [{ type: Schema.ObjectId, ref: "categories", required: true }],
  category_PATH: [{ type: Schema.ObjectId, ref: "categories", required: true }],
  tag_STRUCTURE: {
    tags: {
      type: Map,
      of: [Schema.Types.ObjectId], // array of tag IDs
      required: true,
    },
    inheritance: {
      type: Map,
      of: [Schema.Types.ObjectId], // array of category IDs
      required: true,
    },
    tagUsages: [
      {
        category_ID: { type: Schema.Types.ObjectId, ref: "categories", required: true },
        tagGroup_ID: { type: Schema.Types.ObjectId, ref: "tag_groups", required: true },
        tag_ID: { type: Schema.Types.ObjectId, ref: "tags", required: true },
      },
    ],
  },
  img: {
    desk_FRONT: { type: String, required: true },
    mob_FRONT: { type: String, required: true },
    desk_ALL: [{ type: String, required: true }],
    mob_ALL: [{ type: String, required: true }],
  },
  adress: {
    street: { type: String, required: true },
    plz: { type: String, required: true },
    region: { type: String, required: true },
    gMaps: { type: String, required: true },
    coords: { type: String, required: true },
  },
});

module.exports = mongoose.model("static_profiles", staticProfile_SCHEMA);
