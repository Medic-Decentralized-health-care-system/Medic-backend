const Patient = require("../models/patientModel");
const appointmentModel = require("../models/appointmentModel");
const doctorAvailabilityModel = require("../models/doctorAvailabilityModel");

exports.setAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId, patientName, doctorName, startTime, endTime } =
      req.body;
    const doctorAvailability = await doctorAvailabilityModel.findOne({
      doctorId: doctorId,
    });
    const slotIndex = doctorAvailability.slots.findIndex(
      (slot) => slot.startTime === startTime && slot.endTime === endTime
    );

    if (slotIndex === -1) {
      throw new Error("Slot is not available for this doctor.");
    }
    doctorAvailability.slots.splice(slotIndex, 1);

    const appointment = await appointmentModel.create({
      patientId,
      doctorId,
      patientName,
      doctorName,
      startTime,
      endTime,
      status: "Booked",
    });
    doctorAvailability.bookedSlots.push({
      appointmentId: appointment._id,
    });
    await doctorAvailability.save();

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

exports.getPatientUpcomingAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const data = await appointmentModel.find({ patientId, status: "Booked" });
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
exports.getPatientRecentAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const data = await appointmentModel.find({ patientId, status: "Done" });
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "No availability found",
      });
    }
    //sort data from newest to oldest
    data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
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

exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "No patient found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
