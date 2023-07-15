const pool = require("../db.js");

module.exports = (req, res) => {
  // Query params from client
  let product_id = req.params.product_id;

  findReviewMetadata(product_id).then(response => {
    res.send(response);
  }).catch(err => {
    console.log('Error getting review metadata: ', err);
    res.sendStatus(404);
  });
}