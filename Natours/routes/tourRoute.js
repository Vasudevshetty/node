const express = require("express");
const {
  getAllTours,
  createTour,
  getAliasTop,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

// router
//   .route("/:tourId/reviews")
//   .post(protect, restrictTo("user"), createReview);
router.use("/:tourId/reviews", reviewRouter);

// router.param("id", checkId);

router.route("/tour-stats").get(getTourStats);
router.route("/top-5-cheap").get(getAliasTop, getAllTours);
router
  .route("/monthly-plan/:year")
  .get(protect, restrictTo("admin", "lead-guide", "guide"), getMonthlyPlan);

router
  .route("/")
  .get(getAllTours)
  .post(protect, restrictTo("admin", "lead-guide"), createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

module.exports = router;
