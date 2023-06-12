const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening to port ${port}🚀🚀`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection, shutting down server ! ");
  server.close(() => {
    process.exit(1);
  });
});
