const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const {
  doctorRegister,
  patientRegister,
} = require("../controllers/authController");

router.post("/doctorRegister", upload.single("image"), doctorRegister);

module.exports = router;
