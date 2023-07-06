const express = require("express");
const { setAppointment } = require("../controllers/patientController");
const {
  getPatientUpcomingAppointments,
  getPatientRecentAppointments,
} = require("../controllers/doctorController");
const router = express.Router();

router.post("/setappointment/", setAppointment);
router.get(
  "/getpatientupcomingappointments/:patientId",
  getPatientUpcomingAppointments
);
router.get("/getrecentappointments/:patientId", getPatientRecentAppointments);
module.exports = router;
