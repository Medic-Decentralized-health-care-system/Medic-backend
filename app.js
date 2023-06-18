const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const doctorRoute = require("./routes/doctorRoute");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use("/uploads", express.static("uploads"));
app.use(cors("*"));

app.use("/api/auth", authRoute);
app.use("/api/doctors", doctorRoute);

module.exports = app;
