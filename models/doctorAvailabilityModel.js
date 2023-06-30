const mongoose = require("mongoose");

const doctorAvailabilitySchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: [true, "An appointment must have a doctor"],
  },
  slots: [
    {
      startTime: {
        type: String,
        required: [true, "An appointment must have a start time"],
      },
      endTime: {
        type: String,
        required: [true, "An appointment must have a end time"],
      },
    },
  ],
  fees: {
    type: Number,
    required: [true, "An appointment must have a fees"],
  },
  bookedSlots: [
    {
      appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
        required: [true, "An appointment must have a patient"],
      },
    },
  ],
});

const doctorAvailability = mongoose.model(
  "doctorAvailability",
  doctorAvailabilitySchema
);
module.exports = doctorAvailability;
