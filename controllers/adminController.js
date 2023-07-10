const Doctor = require("../models/doctorModel.js");
const patient = require("../models/patientModel");
const Statistic = require("../models/statisticModel");

exports.getStatistic = async (req, res) => {
  try {
    const { tag } = req.params;

    const patients = await patient.find({ organization: tag, toShare: true });
    console.log(patients);
    const doctorIds = await Statistic.find({
      patientId: { $in: patients.map((patient) => patient._id) },
    });
    console.log(doctorIds);
    const doctors = await Doctor.find({
      _id: { $in: doctorIds.map((doctor) => doctor.doctorId) },
    });
    res.status(200).json({
      status: "success",
      data: {
        doctors,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
