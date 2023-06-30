const express = require("express");
const {
  setLocation,
  setWalletAddress,
} = require("../controllers/commonController");
const router = express.Router();

router.patch("/setlocation/:id", setLocation);
router.post("/setwalletaddress/", setWalletAddress);

module.exports = router;
