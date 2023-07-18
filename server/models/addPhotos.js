const pool = require("../db.js");

module.exports = ({photos, review_id}) => {
  let queryStr = `INSERT INTO photos (url, review_id)
                  SELECT url, review_id FROM UNNEST (${photos}::text[], ${Array(photos.length).fill(review_id)}::int[]) AS t (url, review_id)`;

  return pool.connect().then((client) => {
    return client.query(queryStr).then((res) => {
        client.release();
        res.sendStatus(201);
      }).catch((err) => {
        client.release();
        console.error(err);
      });
  });


  // return pool.connect().then((client) => {
  //   return client.query(queryStr).then(({rows}) => {
  //       const review_id = rows[0].id;
  //       addPhotos({photos: params.photos, review_id});
  //       client.release();
  //     }).catch((err) => {
  //       client.release();
  //       console.error(err);
  //     });
  // });


  // try {
  //   const {rows} = await pool.query(queryStr);
  //   res.sendStatus(201);
  //   console.log('Query successful!');
  // } catch (err) {
  //   console.error(err);
  //   res.sendStatus(404);
  // }
}