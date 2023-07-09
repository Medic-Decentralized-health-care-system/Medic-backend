const express = require("express");
const {
  setAppointment,
  getPatientUpcomingAppointments,
  getPatientRecentAppointments,
  getPatientById,
} = require("../controllers/patientController");
const router = express.Router();

router.post("/setappointment/", setAppointment);
router.get(
  "/getpatientupcomingappointments/:patientId",
  getPatientUpcomingAppointments
);
router.get("/getrecentappointments/:patientId", getPatientRecentAppointments);
router.get("/getpatientbyid/:id", getPatientById);
module.exports = router;
