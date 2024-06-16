//

const express = require("express");
const router = express.Router();

const staticProfile_CONT = require("../controllers/staticProfile_CONT");

router.get("/:id", staticProfile_CONT.GET_staticProfileById);

module.exports = router;
