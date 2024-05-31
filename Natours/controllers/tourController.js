const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkId = (req, res, next, val) => {
  if (+req.params.id > tours.length)
    return res.status(404).json({ status: "fail", message: "Invalid id" });
  next();
};
exports.checkId = checkId;

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Body does'nt contains a name or price",
    });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
exports.getAllTours = getAllTours;

const getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === +req.params.id);

  // if (+req.params.id > tours.length)
  res.status(200).json({
    status: "success",
    data: { tour },
  });
};
exports.getTour = getTour;

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const tour = { ...req.body, id: newId };
  tours.push(tour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour,
        },
      });
    }
  );
};
exports.createTour = createTour;

const updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Udpated tour here >",
    },
  });
};
exports.updateTour = updateTour;

const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
exports.deleteTour = deleteTour;
