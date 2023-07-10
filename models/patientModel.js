const mongoose = require("mongoose");
var validator = require("validator");

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
  cloudinaryId: String,
  image: String,
  username: {
    type: String,
    required: [true, "A patient must have a username"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A patient name must have less or equal then 40 characters",
    ],
    minlength: [5, "A patient name must have more or equal then 5 characters"],
  },
  email: {
    type: String,
    required: [true, "A patient must have a email"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
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
  walletAddress: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  toShare: {
    type: Boolean,
    default: false,
  },
  organization: {
    type: String,
    default: "",
  },
});

const patient = mongoose.model("patient", patientSchema);

module.exports = patient;
