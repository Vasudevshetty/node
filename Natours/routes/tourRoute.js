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

const router = express.Router();

// router.param("id", checkId);

router.route("/monthly-plan/:year").get(getMonthlyPlan);
router.route("/tour-stats").get(getTourStats);
router.route("/top-5-cheap").get(getAliasTop, getAllTours);

router.route("/").get(protect, getAllTours).post(createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

module.exports = router;
