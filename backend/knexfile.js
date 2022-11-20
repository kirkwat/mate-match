module.exports = {
    development: {
      client: 'mysql',
      debug: true,
      connection: {
        /*host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'password',
        insecureAuth: true,
        database : 'smu'*/
        host: process.env.MYSQL_CLOUD_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_CLOUD_USER,
        password: process.env.MYSQL_CLOUD_PASS,
        insecureAuth: true,
        database: process.env.MYSQL_DB
      }
    }
   };