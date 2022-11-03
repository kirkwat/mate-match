const mysql = require('mysql');

// mysql connection
var pool = mysql.createPool({
  /*host: process.env.MYSQL_CLOUD_HOST,
  user: process.env.MYSQL_CLOUD_USER,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB*/
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  //database: mainData
});

module.exports = pool;
