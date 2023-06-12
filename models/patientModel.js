const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A patient must have a name"],
    trim: true,
    maxlength: [
      40,
      "A patient name must have less or equal then 40 characters",
    ],
    minlength: [
      10,
      "A patient name must have more or equal then 10 characters",
    ],
  },
  username: {
    type: String,
    required: [true, "A patient must have a username"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A patient name must have less or equal then 40 characters",
    ],
    minlength: [8, "A patient name must have more or equal then 10 characters"],
  },
  email: {
    type: String,
    required: [true, "A patient must have a email"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A patient email must have less or equal then 40 characters",
    ],
    minlength: [
      10,
      "A patient email must have more or equal then 10 characters",
    ],
  },
  age: {
    type: Number,
    required: [true, "A patient must have a age"],
  },
  gender: {
    type: String,
    required: [true, "A patient must have a age"],
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "A patient must have a password"],
    minlength: [
      8,
      "A patient password must have more or equal then 8 characters",
    ],
  },
});

const patient = mongoose.model("patient", patientSchema);

module.exports = patient;
