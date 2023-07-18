const addReview = require('./models/addReview.js');

// Creating more flushed out models and controllers for more complicated parts
module.exports = {
  addReviewControl: (req, res) => {
    let params = { ...req.body, product_id: req.params.product_id };

    addReview(params)
    .then((data) => {
      let review_id = data[0].id;
      res.status(201).send({review_id});
    }).catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
  }
}