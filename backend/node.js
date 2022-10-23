//docker start mysql-container
//docker exec -it mysql-container bash
//mysql --user=root --password=password
mysql = require('mysql');
const DBConnection = mysql.createConnection({
    host: 'localhost',
   	user: 'root',
   	password: 'password',
   	/* connect to RDS
   		host: 'database-1.ctb5gx4u8bly.us-east-1.rds.amazonaws.com',
    	port: 3306,
    	user: 'admin',
    	password: '!dBgU1Gr0uP3!',
    */
    insecureAuth: true,
});
DBConnection.connect((err) => {
   if (err) {
       console.error('There was a problem connecting to the DB', err);
       return;
   }
   connectionSuccessHandler();
   createDatabasePromisified();
});
const connectionSuccessHandler = () => {
   console.log('Successful connection!');
}
 const createDatabasePromisified = async () => {
    const util = require('util');
    const DBQuery = util.promisify(DBConnection.query).bind(DBConnection);
    try {
        const result = await DBQuery('CREATE DATABASE IF NOT EXISTS testing');
        console.log('Successfully recreated the DB');
    } catch (err) {
        console.error('There was a problem recreating the DB', err);
    }
    try {
        const useDatabaseQuery = `USE testing`;
        const lifePrefTableQuery = `
            CREATE TABLE IF NOT EXISTS lifestyle_prefence (
                
            )`;
        const profPrefTableQuery = `
            CREATE TABLE IF NOT EXISTS professional_prefence (
                
            )`;
        const profileTableQuery = `
            CREATE TABLE IF NOT EXISTS profile (
                account_id INTEGER PRIMARY KEY AUTO_INCREMENT,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                birthday DATETIME,
                gender VARCHAR(7) CHECK (type IN ('male', 'female')),
                city VARCHAR(255),
                address VARCHAR(255),
                maxDesiredRoommates INT, 
                hasResidence VARCHAR(6),
                professionalPref (maybe map to another entity),
                lifestylePref (maybe map to another entity),
                bio VARCHAR (2000)
            )`;
        await DBQuery(useDatabaseQuery);
        await DBQuery(profPrefTableQuery); 
        await DBQuery(lifePrefTableQuery);
        await DBQuery(profileTableQuery);
        console.log('Successfully created tables in the DB');
     } catch (err) {
        console.error('Failed to create tables', err);
     }
 }