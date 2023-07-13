const Appointment = require("../models/appointmentModel");
const doctorAvailability = require("../models/doctorAvailabilityModel");
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

exports.setAvailability = async (req, res) => {
  const { doctorId, slots, fees } = req.body;

  try {
    let availability = await doctorAvailability.findOne({ doctorId });

    if (!availability) {
      availability = await doctorAvailability.create({
        doctorId,
        slots,
        fees,
      });
    } else {
      availability.slots = slots;
      availability.fees = fees;
      await availability.save();
    }

    res.status(200).json({
      status: "success",
      data: {
        availability,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const data = await doctorAvailability.findOne({ doctorId });
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "No availability found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUpcompingAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const data = await Appointment.find({ doctorId, status: "Booked" });
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "No availability found",
      });
    }
    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getRecentAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const data = await Appointment.find({ doctorId, status: "Done" });
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "No availability found",
      });
    }
    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "No doctor found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.appointmentDone = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "No appointment found",
      });
    }
    appointment.status = "Done";
    await appointment.save();
    res.status(200).json({
      status: "success",
      data: {
        appointment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.editDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    // const image = req.file.path;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "No doctor found",
      });
    }
    doctor.name = req.body.name;
    doctor.email = req.body.email;
    doctor.clinicAddress = req.body.clinicAddress;
    // doctor.image = image.secure_url;
    // doctor.cloudinaryId = image.public_id;
    await doctor.save();
    res.status(200).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
