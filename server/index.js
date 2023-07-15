require("dotenv").config();
const getReviews = require('./models/getReviews.js')
const getReviewMetaData = require('./models/getReviewMetaData.js')
const addReview = require('./models/addReview.js')
const markHelpful = require('./models/markHelpful.js')
const markReported = require('./models/markReported.js')

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Defining routes below
app.get('/', (req, res) => { // Basic route to test server connectivity, delete later
  res.type('text/plain');
  res.send('Espresso Server ☕️');
});
app.get('/reviews/:product_id/list', getReviews);
app.get('/reviews/:product_id/meta', getReviewMetaData);
app.post('/reviews/:product_id', addReview);
app.put('/reviews/helpful/:review_id', markHelpful);
app.put('/reviews/report/:review_id', markReported);

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);