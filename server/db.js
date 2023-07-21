const { Pool, Client } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

pool.on('connect', (client) => {
  console.log(`Connected to ${client.user}@${client.host} using database ${client.database} on port ${client.port}`)
})

pool.on('error', (err) => {
  console.log(`Unexpected error on idle client: ${err.stack || err}`);
  process.exit(-1);
});

module.exports = pool;