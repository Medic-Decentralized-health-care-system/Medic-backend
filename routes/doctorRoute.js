const express = require("express");
const {
  nearByDoctors,
  getDoctorBySpecialties,
} = require("../controllers/doctorController");
const router = express.Router();

router.post(
  "/doctors-within/:distance/center/:latlng/unit/:unit",
  nearByDoctors
);
router.get("/specialties/:specialties", getDoctorBySpecialties);
module.exports = router;
