//

const country_MODEL = require("../models/country_MODEL");
const asyncHandler = require("express-async-handler");

exports.LIST_countries = asyncHandler(async (req, res) => {
  const countries = await country_MODEL.find({});
  res.json(countries);
});

// exports.CREATE_country = asyncHandler(async (req, res) => {
//   const country = new country_MODEL({
//     name: req.body.name,
//   });

//   const savedCountry = await country.save();

//   // Simplify the transformation and ensure 'id' is properly formatted
//   const responseData = {
//     data: {
//       ...savedCountry.toObject(),
//       id: savedCountry._id.toHexString(), // Use toHexString() for clarity
//     },
//   };

//   delete responseData.data._id; // Remove the MongoDB _id field if not needed

//   console.log("Country created successfully:", responseData);
//   res.status(201).json(responseData); // Send the correctly structured response
// });

// exports.DELETE_country = asyncHandler(async (req, res) => {
//   const result = await country_MODEL.findByIdAndDelete(req.params.id);
//   if (result) {
//     res.json({ message: "country removed" });
//   } else {
//     res.status(404).json({ message: "country not found" });
//   }
// });

// exports.UPDATE_country = asyncHandler(async (req, res) => {
//   const country = await country_MODEL.findById(req.params.id);
//   console.log(country);
//   if (country) {
//     country.name = req.body.name;
//     const updatedCountry = await country.save();
//     res.json(updatedCountry);
//   } else {
//     res.status(404).json({ message: "country not found" });
//   }
// });
