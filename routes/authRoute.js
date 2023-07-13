const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const {
  doctorRegister,
  patientRegister,
  login,
  adminRegister,
} = require("../controllers/authController");

router.post("/doctorRegister", upload.single("image"), doctorRegister);
router.post("/patientRegister", upload.single("image"), patientRegister);
router.post("/adminRegister", adminRegister);
router.post("/login", login);

module.exports = router;
