const pool = require("../db.js");

module.exports = (params) => {
  let queryStr = `INSERT INTO reviews (product_id, rating, date, summary, body,
                  recommend, reviewer_name, reviewer_email, helpfulness)
                  VALUES (${params.product_id}, ${params.rating}, current_timestamp, '${params.summary}',
                  '${params.body}', ${params.recommend}, '${params.reviewer_name}', '${params.reviewer_email}', 0)
                  RETURNING id;`;

    return pool.connect().then((client) => {
      return client.query(queryStr)
        .then((res) => {
          client.release();
          return res;
          console.log('Post successful!');
        })
        .catch((err) => {
          client.release();
          return err;
        });
    });
  }