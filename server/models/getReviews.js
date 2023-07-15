const pool = require("../db.js");

module.exports = (req, res) => {
  // Query params from client (or defaults)
  let product_id = req.params.product_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort || 'newest';

  findReviews({product_id, page, count, sort}).then(response => {
    res.send(response);
  }).catch(err => {
    console.log('Error getting reviews: ', err);
    res.sendStatus(404);
  });
}