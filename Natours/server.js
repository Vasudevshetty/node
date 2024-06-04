const dotenv = require("dotenv");
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line
  console.log(
    err.name,
    err.message,
    "\n",
    "Uncaught exception! 💥 Shutting down."
  );
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  // eslint-disable-next-line no-console
  .then(() => console.log("DB connection succefull"));
// .catch(() => "hello");
// console.log(process.env);

const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line
  console.log(
    err.name,
    err.message,
    "\n",
    "Unhandled Rejection! 💥 Shutting down."
  );
  server.close(() => {
    process.exit(1);
  });
});
