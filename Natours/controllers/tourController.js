const Tour = require("../models/tourModel");

const getAllTours = async (req, res) => {
  try {
    // bulid the query
    // 1a) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1b) Advanced Filtering
    const queryStr = JSON.stringify(queryObj);
    const queryStrReplaced = JSON.parse(
      queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)
    );
    // {difficulty : 'easy', duration : { $gte : 5}}

    let query = Tour.find(queryStrReplaced);

    // const query = await Tour.find()
    //   .where("difficulty")
    //   .equals("easy")
    //   .where("duration")
    //   .equals("5");

    // 2) Sorting
    if (req.query.sort) {
      const sort = req.query.sort.split(",").join(" ");
      query = query.sort(sort);
    } // else query = query.sort("-createdAt");

    // 3) selecting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else query = query.select("-__v");

    // 4) Limiting and pagination.
    const limit = +req.query.limit || 100;
    const page = +req.query.page || 1;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Correctly check if the requested page exists
    const totalPages = Math.ceil((await Tour.countDocuments()) / limit);
    if (page > totalPages) {
      throw new Error("This page does not exist");
    }

    // execute query
    const tours = await query;

    // send response
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getAllTours = getAllTours;

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id : req.params.id});

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getTour = getTour;

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.createTour = createTour;

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.updateTour = updateTour;

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.deleteTour = deleteTour;
