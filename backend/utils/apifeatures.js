class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //Search
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            //using regex(mongoDB's regular expression)
            $regex: this.queryStr.keyword,
            $options: "i", //case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this; // returning the class itself
  }

  // Filters
  filter() {
    //  for category
    // creating copy of queryStr so that original is unaffected during filter
    const queryCopy = { ...this.queryStr };

    //Removing some fields for categories
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for Price & Ratings
    let queryStr = JSON.stringify(queryCopy);

    //since mongoDB operators have $ prefix converting greater than and lower than to $gt,$lt
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  //pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
