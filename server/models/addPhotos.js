const pool = require("../db.js");

module.exports = ({ photos, review_id }) => {
  let queryStr = ` INSERT INTO reviews_photos (url, review_id)
        SELECT url, review_id FROM UNNEST ($1::text[], $2::int[])
        AS t(url, review_id)`;

  return pool.connect().then((client) => {
    return client.query(queryStr, [photos, Array(photos.length).fill(review_id)])
      .then((res) => {
        client.release();
        return res;
      })
      .catch((err) => {
        client.release();
        console.log('Error inserting photos: ', err);
      });
  });
};