const pool = require("../db.js");

module.exports = (req, res) => {
  // Body params from client
  let params = { ...req.body, product_id: req.params.product_id };

  createReview(params).then(response => {
    res.sendStatus(201);
  }).catch(err => {
    console.log('Error adding review: ', err);
    res.sendStatus(404);
  });
}