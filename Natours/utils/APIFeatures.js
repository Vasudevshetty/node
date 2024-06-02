class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1b) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)
    );
    // {difficulty : 'easy', duration : { $gte : 5}}
    this.query = this.query.find(queryStr);
    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryString.sort) {
      const sort = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sort);
    } // else query = query.sort("-createdAt");
    return this;
  }

  select() {
    // 3) selecting fields
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else this.query = this.query.select("-__v");
    return this;
  }

  page() {
    // 4) Limiting and pagination.
    const limit = this.queryString.limit || 100;
    const page = this.queryString.page || 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
exports.APIFeaturs = APIFeatures;
