const mongoose = require("mongoose");
var validator = require("validator");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A admin must have a name"],
  },
  type: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "A admin must have a email"],
    unique: true,
    trim: true,
  },
  tag: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "A admin must have a password"],
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
