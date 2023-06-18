const mongoose = require("mongoose");
var validator = require("validator");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A doctor must have a name"],
    trim: true,
    maxlength: [40, "A doctor name must have less or equal then 40 characters"],
    minlength: [5, "A doctor name must have more or equal then 10 characters"],
  },
  username: {
    type: String,
    required: [true, "A doctor must have a username"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A doctor username must have less or equal then 40 characters",
    ],
    minlength: [
      5,
      "A doctor username must have more or equal then 10 characters",
    ],
  },
  email: {
    type: String,
    required: [true, "A doctor must have a email"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  degree: {
    type: String,
    required: [true, "A doctor must have a degree"],
    trim: true,
  },
  cloudinaryId: String,
  image: String,
  isDoctor: {
    type: Boolean,
    default: true,
  },
  specialities: {
    type: [String],
    required: [true, "A doctor must have a speciality"],
  },
  experience: {
    type: Number,
    required: [true, "A doctor must have a experience"],
  },
  clinicAddress: {
    type: String,
    required: [true, "A doctor must have a clinic address"],
  },
  password: {
    type: String,
    required: [true, "A doctor must have a password"],
    trim: true,
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
  },
});

const doctor = mongoose.model("doctor", doctorSchema);
module.exports = doctor;
