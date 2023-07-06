const Patient = require("../models/patientModel");
const appointmentModel = require("../models/appointmentModel");
const doctorAvailabilityModel = require("../models/doctorAvailabilityModel");

exports.setAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId, patientName, startTime, endTime } = req.body;
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
