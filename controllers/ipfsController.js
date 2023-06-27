const IPFS = require("ipfs-core");

exports.setIpfs = async (req, res, next) => {
  try {
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add(req.file.buffer);
    res.status(200).json({
      status: "success",
      data: {
        cid,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
