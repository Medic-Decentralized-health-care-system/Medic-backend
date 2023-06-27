const express = require("express");
const { setLocation } = require("../controllers/commonController");
const router = express.Router();

router.route("/setlocation/:id").patch(setLocation);

module.exports = router;
