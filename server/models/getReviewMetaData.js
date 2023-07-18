const pool = require("../db.js");

module.exports = async (product_id) => {
  // Create queries to retrieve info from reviews and characteristics
  let queryReviewStr = `SELECT id, rating, recommend FROM reviews WHERE product_id = ${product_id}`;
  console.log(queryReviewStr);

  let queryCharsStr = `SELECT id, name FROM characteristics WHERE product_id = ${product_id}`;
  console.log(queryCharsStr)

  let client = await pool.connect()

  let queryReviews = await client.query(queryReviewStr);
  let queryChars = await client.query(queryCharsStr);

  let reviewsRows = queryReviews.rows;
  let charsRows = queryChars.rows;

  // Making the ratings object in metadata
  let ratings = {};
  for (let i = 0; i < reviewsRows.length; i++) {
    if (!ratings[reviewsRows[i].rating]) {
      ratings[reviewsRows[i].rating] = 1;
    } else {
      ratings[reviewsRows[i].rating] = ratings[reviewsRows[i].rating]++;
    }
  }

  // Making the recommended object in metadata
  let recommended = {0: 0, 1: 0};
  for (let j = 0; j < reviewsRows.length; j++) {
    if (reviewsRows[j].recommend) {
      recommended['1'] += 1;
    } else {
      recommended['0'] += 1;
    }
  }

  // Making the characteristics object in metadata
  let characteristics = {};
  for (let k = 0; k < charsRows.length; k++) {
    let queryCharsReviews = `SELECT avg(value) FROM characteristics_reviews WHERE characteristic_id = ${charsRows[k].id}`;
    let avgRating = await pool.query(queryCharsReviews);
    if (avgRating.rows[0].avg) {
      avgRating = avgRating.rows[0].avg.substring(0, 6); // Trim down string to match decimals to learn
      characteristics[charsRows[k].name] = {id: charsRows[k].id, value: avgRating}
    } else {
      characteristics[charsRows[k].name] = {id: charsRows[k].id, value: 'null'}
    }
   }

   client.release();

   let compiledMetadata = {product_id, ratings, recommended, characteristics}
   return compiledMetadata;
   console.log('Query successful!');
}

