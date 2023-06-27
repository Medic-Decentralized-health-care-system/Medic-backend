const express = require("express");
const { setIpfs } = require("../controllers/ipfsController");
const router = express.Router();

router.post("/upload", setIpfs);

module.exports = router;
