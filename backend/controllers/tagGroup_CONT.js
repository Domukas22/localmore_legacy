const tagGroup_MODEL = require("../models/tagGroup_MODEL");
const asyncHandler = require("express-async-handler");

exports.LIST_tagGroups = asyncHandler(async (req, res, next) => {
  const tagGroups = await tagGroup_MODEL.find().populate("icon").exec();
  res.json(tagGroups);
});

// exports.CREATE_tagGroup = asyncHandler(async (req, res) => {
//   const tagGroup = new tagGroup_MODEL({
//     name: req.body.name,
//   });

//   await tagGroup.save();
//   res.status(201).json(tagGroup);
// });

// exports.DELETE_tagGroup = asyncHandler(async (req, res) => {
//   const result = await tagGroup_MODEL.findByIdAndDelete(req.params.id);
//   if (result) {
//     res.json({ message: "tagGroup removed" });
//   } else {
//     res.status(404).json({ message: "tagGroup not found" });
//   }
// });

// exports.UPDATE_tagGroup = asyncHandler(async (req, res) => {
//   const tagGroup = await tagGroup_MODEL.findById(req.params.id);
//   if (tagGroup) {
//     tagGroup.name = req.body.name;
//     const updatedTagGroup = await tagGroup.save();
//     res.json(updatedTagGroup);
//   } else {
//     res.status(404).json({ message: "tagGroup not found" });
//   }
// });
