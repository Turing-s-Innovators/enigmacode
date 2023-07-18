const addReview = require('./models/addReview.js');
const addPhotos = require('./models/addPhotos.js');
const addCharsReviews = require('./models/addCharsReviews.js');
const getReviewMetaData = require('./models/getReviewMetaData.js');

// Creating more flushed out models and controllers for more complicated parts
module.exports = {
  addReviewControl: (req, res) => {
    let params = { ...req.body, product_id: req.params.product_id };

    return addReview(params)
    .then(({rows}) => {
      let review_id = rows[0].id;
      console.log(review_id);
      addPhotos({photos: params.photos, review_id});
      addCharsReviews({characteristics: params.characteristics, review_id});
      res.status(201).send({review_id});
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
  },

  getMetadataControl: (req, res) => {
    let product_id = req.params.product_id;

    getReviewMetaData(product_id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(404);
    })
  }
}