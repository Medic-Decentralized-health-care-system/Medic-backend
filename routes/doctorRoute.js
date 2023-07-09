const express = require("express");
const {
  nearByDoctors,
  getDoctorBySpecialties,
  getDoctorByDistanceandSpecialities,
  setAvailability,
  getAvailability,
  getUpcompingAppointments,
  getRecentAppointments,
  getDoctorById,
} = require("../controllers/doctorController");
const router = express.Router();

router.post(
  "/doctors-within/:distance/center/:latlng/unit/:unit",
  nearByDoctors
);
router.get("/specialties/:specialties", getDoctorBySpecialties);
router.post(
  "/doctors-within/:distance/center/:latlng/unit/:unit/:specialities",
  getDoctorByDistanceandSpecialities
);
router.post("/doctor/setavailabilityofdoctor/", setAvailability);
router.get("/getdoctoravailability/:doctorId", getAvailability);
router.get("/getupcomingappointments/:doctorId", getUpcompingAppointments);
router.get("/getrecentappointments/:doctorId", getRecentAppointments);
router.get("/getdoctorbyid/:id", getDoctorById);
module.exports = router;
