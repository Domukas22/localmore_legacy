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

// exports.LIST_staticProfiles = asyncHandler(async (req, res, next) => {
//   console.log("LIST_staticProfiles");
//   const profiles = await staticProfile_MODEL.find({}).exec();
//   res.json(profiles);
// });

// -------> update all functions if needed <-------

// exports.CREATE_staticProfile = asyncHandler(async (req, res) => {
//   const profile = new staticProfile_MODEL({
//     desc: req.body.desc,
//     IS_new: req.body.new,
//     city: req.body.city,
//     category: req.body.category,
//     category_PATH: req.body.category_PATH,
//     tags: req.body.tags,
//     img: req.body.img,
//     adress: req.body.adress,
//     name: req.body.name,
//     subname: req.body.subname,
//     pros: req.body.pros,
//     cons: req.body.cons,
//     about_TITLE: req.body.about_TITLE,
//     about_PARAG: req.body.about_PARAG,
//   });

//   await profile.save();
//   res.status(201).json(profile);
// });

// exports.DELETE_staticProfile = asyncHandler(async (req, res) => {
//   const result = await staticProfile_MODEL.findByIdAndDelete(req.params.id);
//   if (result) {
//     res.json({ message: "staticProfile removed" });
//   } else {
//     res.status(404).json({ message: "staticProfile not found" });
//   }
// });

// exports.UPDATE_staticProfile = asyncHandler(async (req, res) => {
//   const profile = await staticProfile_MODEL.findById(req.params.id);
//   if (profile) {
//     profile.desc = req.body.desc;
//     profile.new = req.body.new;
//     profile.city = req.body.city;
//     profile.category = req.body.category;
//     profile.category_PATH = req.body.category_PATH;
//     profile.tags = req.body.tags;
//     profile.text = req.body.text;
//     profile.img = req.body.img;
//     profile.adress = req.body.adress;
//     profile.text = req.body.text;
//     const updatedProfile = await profile.save();
//     res.json(updatedProfile);
//   } else {
//     res.status(404).json({ message: "staticProfile not found" });
//   }
// });
