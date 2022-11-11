module.exports = {
    development: {
      client: 'mysql',
      debug: true,
      connection: {
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'password',
        insecureAuth: true,
        database : 'smu'
      }
    }
   };