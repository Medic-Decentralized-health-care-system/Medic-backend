const mongoose = require("mongoose");

const appoitmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: [true, "An appointment must have a patient"],
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: [true, "An appointment must have a doctor"],
  },
  startTime: {
    type: String,
    required: [true, "An appointment must have a start time"],
  },
  endTime: {
    type: String,
    required: [true, "An appointment must have a end time"],
  },
  date: {
    type: String,
    // required: [true, "An appointment must have a date"],
  },
  status: {
    type: String,
    enum: ["Booked", "Done", "Missed"],
    default: "Booked",
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Appointment = mongoose.model("Appointment", appoitmentSchema);
module.exports = Appointment;
