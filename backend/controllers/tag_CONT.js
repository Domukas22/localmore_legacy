// create an update fucntion which only patches the specific fields
// The tag collection has 2 schemas, the tag schema and the subtag schema

const { tag_MODEL, subtag_MODEL } = require("../models/tag_MODEL");
const asyncHandler = require("express-async-handler");

exports.LIST_tags = asyncHandler(async (req, res, next) => {
  const tags = await tag_MODEL.find({ type: "tag" }).populate("icon").exec();
  res.json(tags);
});
exports.LIST_subtags = asyncHandler(async (req, res, next) => {
  const subtags = await subtag_MODEL.find({ type: "subtag" }).exec();
  res.json(subtags);
});

// exports.CREATE_tag = asyncHandler(async (req, res) => {
//   const tag = new tag_MODEL({
//     new: req.body.new,
//     slug: req.body.slug,
//     icon: req.body.icon,
//     name: {
//       en: req.body.name.en,
//       de: req.body.name.de,
//     },
//   });
//   await tag.save();
//   res.status(201).json(tag);
// });
// exports.DELETE_tag = asyncHandler(async (req, res) => {
//   console.log(req.params.id); // Log the ID to ensure it's correct
//   const result = await tag_MODEL.findByIdAndDelete(req.params.id);
//   console.log(result); // Check the result of the deletion
//   if (result) {
//     res.json({ message: "tag removed" });
//   } else {
//     res.status(404).json({ message: "tag not found" });
//   }
// });
// exports.UPDATE_tag = asyncHandler(async (req, res) => {
//   const tag = await tag_MODEL.findById(req.params.id);
//   if (tag) {
//     tag.new = req.body.new;
//     tag.slug = req.body.slug;
//     tag.icon = req.body.icon;
//     tag.name = {
//       en: req.body.name.en,
//       de: req.body.name.de,
//     };
//     const updatedTag = await tag.save();
//     res.json(updatedTag);
//   } else {
//     res.status(404).json({ message: "tag not found" });
//   }
// });

// exports.CREATE_subtag = asyncHandler(async (req, res) => {
//   const subtag = new subtag_MODEL({
//     name: {
//       en: req.body.name.en,
//       de: req.body.name.de,
//     },
//     onTags: req.body.onTags,
//   });
//   await subtag.save();
//   res.status(201).json(subtag);
// });
// exports.DELETE_subtag = asyncHandler(async (req, res) => {
//   console.log(req.params.id); // Log the ID to ensure it's correct
//   const result = await subtag_MODEL.findByIdAndDelete(req.params.id);
//   console.log(result); // Check the result of the deletion
//   if (result) {
//     res.json({ message: "subtag removed" });
//   } else {
//     res.status(404).json({ message: "subtag not found" });
//   }
// });
// exports.UPDATE_subtag = asyncHandler(async (req, res) => {
//   const subtag = await subtag_MODEL.findById(req.params.id);
//   if (subtag) {
//     subtag.name = {
//       en: req.body.name.en,
//       de: req.body.name.de,
//     };
//     subtag.onTags = req.body.onTags;

//     const updatedSubtag = await subtag.save();
//     res.json(updatedSubtag);
//   } else {
//     res.status(404).json({ message: "subtag not found" });
//   }
// });
