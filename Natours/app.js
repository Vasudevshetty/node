const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");
const reviewRouter = require("./routes/reviewRoutes");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

const app = express();

// set security http header
app.use(helmet());

// developement logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// global middleware, limit requests from same ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// body parser, reading data
app.use(
  express.json({
    limit: "10kb",
  })
);

// data sanitaisation against noSQL injection
app.use(mongoSanitize());

// data sanitaisation against XSS
app.use(xss());

// prevent paramater pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// serving static files
app.use(express.static(`${__dirname}/public`));

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.url} not found!`, 404));
});

app.use(errorController);

module.exports = app;
