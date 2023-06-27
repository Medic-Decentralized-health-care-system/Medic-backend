const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");

exports.setLocation = async (req, res, next) => {
  try {
    let user = await Patient.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [req.body.longitude, req.body.latitude],
          },
        },
      },
      {
        new: true,
      }
    );
    if (!user) {
      user = await Doctor.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            location: {
              type: "Point",
              coordinates: [req.body.longitude, req.body.latitude],
            },
          },
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
