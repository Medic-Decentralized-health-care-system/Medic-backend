const morgan = require("morgan");
const express = require("express");
const authRoute = require("./routes/authRoute");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);

module.exports = app;
