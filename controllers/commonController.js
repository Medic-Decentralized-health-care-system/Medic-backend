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

exports.setWalletAddress = async (req, res, next) => {
  try {
    const { walletAddress, id } = req.body;
    let user = await Patient.findOne({ walletAddress });
    if (!user) {
      user = await Doctor.findOne({ walletAddress });
    }
    if (user) {
      res.status(500).json({
        status: "fail",
        message: "Wallet address already in use!",
      });
      return;
    }
    let updatedUser = await Patient.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          walletAddress,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      updatedUser = await Doctor.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            walletAddress,
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
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
