//

const icon_MODEL = require("../models/icon_MODEL");
const asyncHandler = require("express-async-handler");

exports.LIST_icons = asyncHandler(async (req, res, next) => {
  const icons = await icon_MODEL.find().exec();
  res.json(icons);
});
