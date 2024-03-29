const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinaryConfig");
const Admin = require("../models/adminModel");

dotenv.config();
const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

exports.doctorRegister = async (req, res) => {
  try {
    const existingUser = await Doctor.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!existingUser) {
      const existingUser = await Patient.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });
    }
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User with the same username or email already exists",
      });
    } else {
      const isValidPassword = validatePassword(req.body.password);
      if (!isValidPassword) {
        return res.status(400).json({
          status: "fail",
          message:
            "Please provide a strong password with a minimum of 8 characters, including at least 1 letter, 1 number, and 1 special symbol.",
        });
      }
      console.log(req.body);
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const image = await cloudinary.uploader.upload(req.file.path);
      const newUser = new Doctor({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        image: image.secure_url,
        cloudinaryId: image.public_id,
        specialities: req.body.specialities,
        clinicAddress: req.body.clinicAddress,
        degree: req.body.degree,
        isDoctor: true,
        experience: req.body.experience,
        location: {
          type: "Point",
          coordinates: [req.body.latitude, req.body.longitude],
        },
      });
      await newUser.save();
      let token = "";
      if (newUser) {
        token = jwt.sign({ id: newUser._id }, process.env.JWT);
        res.cookie("token", token);
      }
      res.status(200).json({
        user: newUser,
        message: "User has been signed in!",
        token: token,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.patientRegister = async (req, res) => {
  try {
    const existingUser = await Patient.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!existingUser) {
      const existingUser = await Doctor.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });
    }
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User with the same username or email already exists",
      });
    } else {
      const isValidPassword = validatePassword(req.body.password);
      if (!isValidPassword) {
        return res.status(400).json({
          status: "fail",
          message:
            "Please provide a strong password with a minimum of 8 characters, including at least 1 letter, 1 number, and 1 special symbol.",
        });
      }
      console.log(req.body.image);
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const image = await cloudinary.uploader.upload(req.file.path);
      const newUser = new Patient({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        image: image.secure_url,
        cloudinaryId: image.public_id,
        age: req.body.age,
        gender: req.body.gender,
        isDoctor: false,
        location: {
          type: "Point",
          coordinates: [req.body.latitude, req.body.longitude],
        },
      });
      await newUser.save();
      let token = "";
      if (newUser) {
        token = jwt.sign({ id: newUser._id }, process.env.JWT);
        res.cookie("token", token);
      }
      res.status(200).json({
        user: newUser,
        message: "User has been signed in!",
        token: token,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.adminRegister = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new Admin({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      type: req.body.type,
      tag: req.body.tag,
      isAdmin: true,
    });
    console.log(newUser);
    await newUser.save();
    let token = "";
    if (newUser) {
      token = jwt.sign({ id: newUser._id }, process.env.JWT);
      res.cookie("token", token);
    }
    res.status(200).json({
      user: newUser,
      message: "User has been signed in!",
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let user = await Admin.findOne({ username: req.body.username });
    if (!user) {
      user = await Doctor.findOne({ username: req.body.username });
      if (!user) {
        user = await Patient.findOne({ username: req.body.username });
      }
    }
    console.log(user);
    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
      return;
    }
    console.log(req.body.password, user.password);
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(isPassword);
    if (!isPassword) {
      res.status(400).json({
        status: "fail",
        message: "Password is incorrect",
      });
      return;
    }

    const token = jwt.sign(
      { id: user._id, isDoctor: user.isDoctor },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    res.cookie("token", token);
    res.status(200).json({
      status: "success",
      message: "User has been logged in!",
      user: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
