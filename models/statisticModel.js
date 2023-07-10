const mongoose = require("mongoose");
const validator = require("validator");

const statisticModel = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctor",
      required: [true, "A statistic must have a doctor"],
    },
    patientId: {
      type: mongoose.Schema.ObjectId,
      ref: "Patient",
      required: [true, "A statistic must have a patient"],
    },
  },
  {
    timestamps: true,
  }
);

const Statistic = mongoose.model("Statistic", statisticModel);
module.exports = Statistic;
