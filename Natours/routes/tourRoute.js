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

const router = express.Router();

// router.param("id", checkId);

router.route("/monthly-plan/:year").get(getMonthlyPlan);
router.route("/tour-stats").get(getTourStats);
router.route("/top-5-cheap").get(getAliasTop, getAllTours);
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
