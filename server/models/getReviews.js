const pool = require("../db.js");

module.exports = (req, res) => {
  let product_id = req.params.product_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort || 'newest';
  let filter;
  if (sort === 'newest') filter = 'date desc';
  if (sort === 'helpful') filter = 'helpfulness desc';
  if (sort === 'relevant') filter = 'helpfulness desc, date desc';

  pool.query(`
      SELECT id AS review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
      (SELECT COALESCE(json_agg(to_json(row)), '[]')
        FROM (
            SELECT rp.id, rp.url
            FROM reviews r
            INNER JOIN reviews_photos rp
            ON r.id = rp.review_id
            WHERE rp.review_id = reviews.id
        ) row
      ) AS photos
      FROM reviews WHERE product_id=$1 AND reported=false
      ORDER BY $2 LIMIT $3;`, [product_id, filter, count],
      (err, data) => {
        if (err) {
          console.error(err);
          res.sendStatus(404);
        } else {
          res.status(200).send(data.rows);
        }
      }
  )
}