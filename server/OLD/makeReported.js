const pool = require("../db.js");

// module.exports = (review_id) => {
//   let queryStr = `UPDATE reviews SET reported = true WHERE id = ${review_id}`;

//   (async (req, res) => {
//     try {
//       const {rows} = await pool.query(queryStr);
//       console.log('Query successful!');
//     } catch (err) {
//       console.error(err);
//     }
//   })();
// };