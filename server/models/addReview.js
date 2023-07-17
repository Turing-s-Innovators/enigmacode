const pool = require("../db.js");

module.exports = async (req, res) => {
  // Body params from client
  let params = { ...req.body, product_id: req.params.product_id };

  console.log('Params: ', params);

  let queryStr = `INSERT INTO reviews
                    (product_id, rating, date, summary, body,
                      recommend, reviewer_name, reviewer_email, helpfulness)
                    VALUES (${params.product_id}, ${params.rating}, current_timestamp, '${params.summary}',
                      '${params.body}', ${params.recommend}, '${params.name}', '${params.email}', 0);`;

  try { // will need to insert photos below
    const {rows} = await pool.query(queryStr);
    res.sendStatus(201);
    console.log('Query successful!');
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
}