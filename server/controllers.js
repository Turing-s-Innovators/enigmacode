const models = require('./models.js');

exports.getReviews = (req, res) => {
  console.log(req.params);
  // Query params from client (or defaults)
  let product_id = req.params.product_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort || 'newest';
};

exports.getReviewMetaData = (req, res) => {
  // Query params from client
  let product_id = req.params.product_id;
};

exports.addReview = (req, res) => {
  // Body params from client
  let params = { ...req.body, product_id: req.params.product_id };
};

exports.markHelpful = (req, res) => {
  // Params from client
  let review_id = req.query.review_id;
};

exports.markReported = (req, res) => {
  // Params from client
  let review_id = req.query.review_id;
};