module.exports = {
    development: {
      client: 'mysql',
      debug: true,
      connection: {
        host : '127.0.0.1',
        //host: 'localhost',
        port : 3306,
        user : 'root',
        password : 'password',
        insecureAuth: true,
        database : 'smu'
      }
    }
   };