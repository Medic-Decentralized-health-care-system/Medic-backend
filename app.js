const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const doctorRoute = require("./routes/doctorRoute");
const commonRoute = require("./routes/commonRoute");
const patientRoute = require("./routes/patientRoutes");
const adminRoute = require("./routes/adminRoute");
// const ipfsRoute = require("./routes/ipfsRoute");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use("/uploads", express.static("uploads"));
app.use(cors("*"));

app.use("/api/auth", authRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/common", commonRoute);
app.use("/api/patient", patientRoute);
app.use("/api/admin", adminRoute);
// app.use("/api/ipfs", ipfsRoute);

module.exports = app;
