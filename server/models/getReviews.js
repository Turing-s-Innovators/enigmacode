const pool = require("../db.js");

module.exports = async (req, res) => {
  // Query params from client (or defaults)
  let product_id = req.params.product_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort || 'newest';
  let filter;
  if (sort === 'newest') filter = 'date desc';
  if (sort === 'helpful') filter = 'helpfulness desc';
  if (sort === 'relevant') filter = 'helpfulness desc, date desc';

  // https://www.techonthenet.com/postgresql/alias.php#:~:text=COLUMN%20ALIASES%20are%20used%20to,once%20in%20the%20FROM%20clause
  let queryStr = `SELECT id AS review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
                  (SELECT COALESCE(json_agg(to_json(row)), '[]')
                    FROM (
                        SELECT rp.id, rp.url
                        FROM reviews r
                        INNER JOIN reviews_photos rp
                        ON r.id = rp.review_id
                        WHERE rp.review_id = reviews.id
                    ) row
                  ) AS photos
                  FROM reviews WHERE product_id=${product_id} AND reported=false
                  ORDER BY ${filter} LIMIT ${count};`

  try {
    const {rows} = await pool.query(queryStr);
    res.status(200).send(rows);
    console.log('Query successful!');
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
}