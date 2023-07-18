require("dotenv").config();
const getReviews = require('./models/getReviews.js')
const getReviewMetaData = require('./models/getReviewMetaData.js')
const markHelpful = require('./models/markHelpful.js')
const markReported = require('./models/markReported.js')
const controllers = require('./controllers.js');

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

// These ARE running through controllers.js to models
app.post('/reviews/:product_id', controllers.addReviewControl);
app.get('/reviews/:product_id/meta', getReviewMetaData);

// These ARE NOT running through controllers.js, straight to models
app.get('/reviews/:product_id/list', getReviews);
app.put('/reviews/helpful/:review_id', markHelpful);
app.put('/reviews/report/:review_id', markReported);

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);