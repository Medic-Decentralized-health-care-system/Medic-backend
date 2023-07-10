const express = require("express");
const {
  setAppointment,
  getPatientUpcomingAppointments,
  getPatientRecentAppointments,
  getPatientById,
  shareData,
  setOrganization,
} = require("../controllers/patientController");
const router = express.Router();

router.post("/setappointment/", setAppointment);
router.get(
  "/getpatientupcomingappointments/:patientId",
  getPatientUpcomingAppointments
);
router.get("/getrecentappointments/:patientId", getPatientRecentAppointments);
router.get("/getpatientbyid/:id", getPatientById);
router.put("/giveaccestodata/", shareData);
router.put("/setorganization/", setOrganization);
module.exports = router;
