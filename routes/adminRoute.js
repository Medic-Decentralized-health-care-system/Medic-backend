const express = require("express");
const { getStatistic } = require("../controllers/adminController");
const router = express.Router();

router.get("/getstats/:tag", getStatistic);
module.exports = router;
