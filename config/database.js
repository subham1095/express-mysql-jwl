// const { createPool } = require("mysql");

// const pool = createPool({
//   host: process.env.DB_HOST,
//   port: process.env.APP_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.MYSQL_DB,
//   connectionLimit: 10
// });

pool = require('mysql').createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  acquireTimeout  : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host: process.env.DB_HOST,
   port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});
module.exports = pool;

// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : process.env.DB_HOST,
//     port : process.env.DB_PORT,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.MYSQL_DB
//   },
//   pool: { min: 0, max: 7 }
// });

// module.exports = knex;