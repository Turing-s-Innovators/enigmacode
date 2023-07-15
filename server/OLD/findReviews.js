const db = require("../db.js");

exports.findReviews = ({product_id, page, count, sort}) => {
  let queryStr = '';



  // return new Promise((resolve, reject) => {
  //   db.queryAsync(queryStr, (err, data) => {
  //     if (err) {
  //       return reject(err);
  //     } else {
  //       return resolve(data);
  //     }
  //   });
  // });
};