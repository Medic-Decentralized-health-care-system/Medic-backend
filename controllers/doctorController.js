const Doctor = require("../models/doctorModel");

exports.nearByDoctors = async (req, res) => {
  try {
    const { distance, latlng, unit } = req.params;
    const [latitude, longitude] = latlng.split(",");

    let radius;
    if (unit === "mi") radius = distance / 3963.2;
    else if (unit === "km") radius = distance / 6378.1;

    let queryObject = {
      location: {
        $geoWithin: {
          $centerSphere: [[latitude, longitude], radius],
        },
      },
    };
    console.log(queryObject);
    const doctors = await Doctor.find(queryObject);
    console.log(doctors);
    res.status(200).json({
      status: "success",
      results: doctors.length,
      data: {
        doctors,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getDoctorBySpecialties = async (req, res) => {
  try {
    const doctors = await Doctor.find({ specialities: req.params.specialties });
    res.status(200).json({
      status: "success",
      results: doctors.length,
      data: {
        doctors,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
//get doctor by both distance and speacialities
exports.getDoctorByDistanceandSpecialities = async (req, res) => {
  try {
    const { distance, latlng, unit, specialities } = req.params;
    const [latitude, longitude] = latlng.split(",");

    let radius;
    if (unit === "mi") radius = distance / 3963.2;
    else if (unit === "km") radius = distance / 6378.1;

    let queryObject = {
      location: {
        $geoWithin: {
          $centerSphere: [[latitude, longitude], radius],
        },
      },
      specialities: { $in: specialities.split(",") },
    };
    const doctors = await Doctor.find(queryObject);

    res.status(200).json({
      status: "success",
      results: doctors.length,
      data: {
        doctors,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
