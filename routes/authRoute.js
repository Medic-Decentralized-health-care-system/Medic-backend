const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const {
  doctorRegister,
  patientRegister,
  login,
} = require("../controllers/authController");

router.post("/doctorRegister", upload.single("image"), doctorRegister);
router.post("/patientRegister", upload.single("image"), patientRegister);
router.post("/login", login);

module.exports = router;
