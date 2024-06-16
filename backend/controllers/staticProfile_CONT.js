// create, read, update, delete the staticProfile model just like the category model
// impor the tag model

const staticProfile_MODEL = require("../models/staticProfile_MODEL");
const asyncHandler = require("express-async-handler");

exports.LIST_staticProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await staticProfile_MODEL
    .find({})
    .populate("city")
    .populate("categories")
    .populate("category_PATH")
    // Here we assume you have 'tagGroups' as a path in your schema
    .populate({
      path: "tag_STRUCTURE.tagUsages.tag_ID",
      model: "Tag",
      populate: {
        path: "icon", // Assuming 'icon' is the field in the 'Tag' model that needs to be populated
        model: "icons", // Specify the model name of the 'Icon' if it's different
      },
    })
    .exec();

  const profiles_withAddedTagArray = profiles.map((profile) => {
    const tags = new Set([]);
    if (profile.tag_STRUCTURE && profile.tag_STRUCTURE.tagUsages) {
      for (const tagUsage of profile.tag_STRUCTURE.tagUsages) {
        tags.add(tagUsage.tag_ID);
      }
    }
    return {
      ...profile._doc,
      tags: Array.from(tags),
    };
  });

  res.json(profiles_withAddedTagArray);
});
exports.GET_staticProfileById = asyncHandler(async (req, res, next) => {
  const profileId = req.params.id;

  const profile = await staticProfile_MODEL
    .findById(profileId)
    .populate("city")
    .populate("categories")
    .populate("category_PATH")
    .populate({
      path: "tag_STRUCTURE.tagUsages.tag_ID",
      model: "Tag",
      populate: {
        path: "icon", // Assuming 'icon' is the field in the 'Tag' model that needs to be populated
        model: "icons", // Specify the model name of the 'Icon' if it's different
      },
    })
    .exec();

  if (!profile) {
    res.status(404);
    throw new Error("Profile not found");
  }

  const tags = new Set([]);
  if (profile.tag_STRUCTURE && profile.tag_STRUCTURE.tagUsages) {
    for (const tagUsage of profile.tag_STRUCTURE.tagUsages) {
      tags.add(tagUsage.tag_ID);
    }
  }

  const profile_withTags = {
    ...profile._doc,
    tags: Array.from(tags),
  };

  res.json(profile_withTags);
});
