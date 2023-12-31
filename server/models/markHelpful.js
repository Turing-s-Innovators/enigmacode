const pool = require("../db.js");

module.exports = async (req, res) => {
  let review_id = req.params.review_id;
  let queryStr = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`;

  try {
    const {rows} = await pool.query(queryStr);
    res.sendStatus(204);
    console.log('Query successful!');
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
}