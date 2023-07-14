require("dotenv").config();
const controllers = require('./controllers.js')

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
app.get('/reviews/:product_id/list', controllers.getReviews);
app.get('/reviews/:product_id/meta', controllers.getReviewMetaData);
app.post('/reviews/:product_id', controllers.addReview);
app.put('/reviews/helpful/:review_id', controllers.markHelpful);
app.put('/reviews/report/:review_id', controllers.markReported);

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);