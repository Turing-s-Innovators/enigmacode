const pool = require("../db.js");
const addPhotos = require("./addPhotos");

module.exports = (params) => {
  console.log('Here are the params being added: ', params);
  let queryStr = `INSERT INTO reviews
                    (product_id, rating, date, summary, body,
                      recommend, reviewer_name, reviewer_email, helpfulness)
                    VALUES (${params.product_id}, ${params.rating}, current_timestamp, '${params.summary}',
                      '${params.body}', ${params.recommend}, '${params.name}', '${params.email}', 0);`;


    return pool.connect().then(client => {
      return client.query(queryStr).then(async (res) => {
        await params.photos.forEach(photo => {
          queryStr = {
            text: `INSERT INTO reviews_photos (review_id, url) VALUES ($1, $2)`,
            values: [res.rows[0].id, photo]
          }
          client.query(queryStr);
        });
        client.release()
        return res.rows
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
        return err.stack
      })
    })

  }
  // return pool.query(queryStr).then((response) => {
  //   let review_id = response.rows[0];
  //   let values = params.photos.map((photo, i) => {
  //   let photoQuery = `INSERT INTO reviews_photos (review_id, url) VALUES ${values.join(',')}`;
  //   let value = [review_id, ...photos];
  //   return pool.query({text: photoQuery, values: value})
  //   }).catch(err => console.log(err));
  // });

  // return client.query(queryStr).then(({rows}) => {
    //     const review_id = rows[0];
    //     console.log('REVUEW ID', review_id);
    //     addPhotos({photos: params.photos, review_id});
    //     client.release();
    //   }).catch((err) => {
      //     client.release();
      //     console.error(err);
      //   });

  // module.exports = async (req, res) => {
    //   // Body params from client
    //   let params = { ...req.body, product_id: req.params.product_id };
    //   console.log('Params: ', params);

    //   let queryStr = `INSERT INTO reviews
    //                     (product_id, rating, date, summary, body,
    //                       recommend, reviewer_name, reviewer_email, helpfulness)
    //                     VALUES (${params.product_id}, ${params.rating}, current_timestamp, '${params.summary}',
    //                       '${params.body}', ${params.recommend}, '${params.name}', '${params.email}', 0);`;

//   try { // will need to insert photos below
//     const {rows} = await pool.query(queryStr);
//     res.sendStatus(201);
//     console.log('Query successful!');
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(404);
//   }
// }