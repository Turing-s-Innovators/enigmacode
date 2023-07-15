const createCharacteristicsReviews = require('./models/createCharacteristicsReviews.js');
const createPhotos = require('./models/createPhotos.js');
const createReview = require('./models/createReview.js');
const findReviewMetadata = require('./models/findReviewMetadata.js');
const findReviews = require('./models/findReviews.js');
const makeHelpful = require('./models/makeHelpful.js');
const makeReported = require('./models/makeReported.js');
const pool = require("./db.js");

module.exports = {
  getReviews: (req, res) => {
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
  },

  getReviewMetaData: (req, res) => {
    // Query params from client
    let product_id = req.params.product_id;

    findReviewMetadata(product_id).then(response => {
      res.send(response);
    }).catch(err => {
      console.log('Error getting review metadata: ', err);
      res.sendStatus(404);
    });
  },

  addReview: (req, res) => {
    // Body params from client
    let params = { ...req.body, product_id: req.params.product_id };

    createReview(params).then(response => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('Error adding review: ', err);
      res.sendStatus(404);
    });
  },

  markHelpful: (req, res) => {
    // Params from client
    let review_id = req.params.review_id;

    makeHelpful(review_id).then(response => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('Error marking helpful: ', err);
      res.sendStatus(404);
    });
  },

  markReported: async (req, res) => {
    // Params from client
    let review_id = req.params.review_id;
    let queryStr = `UPDATE reviews SET reported = true WHERE id = ${review_id}`;

    console.log('THIS IS THE REVIEW ID: ', review_id);
  //   makeReported(review_id).then(data => {
  //     res.sendStatus(204);
  //   }).catch(err => {
  //     console.log('Error marking reported: ', err);
  //     res.sendStatus(404);
  //   });
  // },
    try {
      const {rows} = await pool.query(queryStr);
      res.sendStatus(204);
      console.log('Query successful!');
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  }
}