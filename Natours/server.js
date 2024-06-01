const dotenv = require("dotenv");
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

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
// console.log(process.env);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${process.env.PORT}`);
});
