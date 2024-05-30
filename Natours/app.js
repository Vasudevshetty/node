const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
});

app.post("/api/v1/tours", (req, res) => {
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
});

app.get("/api/v1/tours/:id", (req, res) => {
  const tour = tours.find((tour) => tour.id === +req.params.id);

  // if (+req.params.id > tours.length)
  if (!tour) return res.status(404).json({ status: "fail", message: "Invalid id" });

  res.status(200).json({
    status: "success",
    data: { tour },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
