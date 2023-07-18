const pool = require("../db.js");

module.exports = (req, res) => {
  // Query params from client
  let product_id = req.params.product_id;


}


// let queryStr = `
//   SELECT rMain.product_id,
//     (SELECT jsonb_agg(outerC) FROM
//       (SELECT json_object_agg(r2.rating,
//         (SELECT count(r1.rating) FROM reviews r1
//           WHERE r1.product_id = rMain.product_id AND r1.rating = r2.rating)
//       ) AS counts
//     FROM reviews r2
//     WHERE r2.product_id = rMain.product_id
//     GROUP BY r2.rating) as outerC) as ratings,
//     (SELECT jsonb_agg(outerRecommendCounts) FROM
//       (SELECT json_object_agg(r4.recommend,
//         (SELECT count(r3.recommend) FROM reviews r3
//           WHERE r3.product_id = rMain.product_id AND r3.recommend = r4.recommend)
//       ) AS recommendCounts
//     FROM reviews r4
//     WHERE r4.product_id = rMain.product_id
//     GROUP BY r4.recommend) AS outerRecommendCounts
//     ) AS recommended,
//     (SELECT array_to_json(array_agg(characteristicGroup)) FROM
//       (SELECT c.name, c.id, avg(cr.value) as VALUE
//         FROM "characteristics" c
//         INNER JOIN characteristics_reviews cr
//         ON c.id = cr.characteristics_id
//         WHERE c.product_id = rMain.product_id
//         GROUP BY c.id) characteristicGroup
//     ) AS characteristics
//   FROM reviews rMain
//   WHERE rMain.product_id = ${product_id}
//   GROUP BY rMain.product_id;`;