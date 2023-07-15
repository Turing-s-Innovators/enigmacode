const pool = require("../db.js");

module.exports = async (req, res) => {
  // Query params from client (or defaults)
  let product_id = req.params.product_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort || 'newest';

  let queryStr = `SELECT id AS review_id, rating, summary, recommend, response, body, TO_TIMESTAMP(date), reviewer_name, helpfulness,`; // IN PROGRESS

  try {
    const {rows} = await pool.query(queryStr);
    res.send(rows);
    console.log('Query successful!');
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
}