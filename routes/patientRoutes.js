const express = require("express");
const { setAppointment } = require("../controllers/patientController");
const router = express.Router();

router.post("/setappointment/", setAppointment);

module.exports = router;
