const pool = require("../db.js");

module.exports = ({ characteristics, review_id }) => {
  let queryStr = `INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                  SELECT review_id, characteristic_id, value FROM UNNEST ($1::int[], $2::int[], $3::int[])
                  AS t(review_id, characteristic_id, value)`;

  return pool.connect().then((client) => {
    return client.query(queryStr, [
      Array(Object.keys(characteristics).length).fill(review_id),
      Object.keys(characteristics),
      Object.values(characteristics)])
    .then((res) => {
      client.release();
      return res;
    })
    .catch((err) => {
      client.release();
      console.log('Error inserting characteristics: ', err);
    });
  });
};