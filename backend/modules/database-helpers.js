const mysql = require('mysql');
const util = require('util');
const pool = require('./pool');
const pool = require('./db.js');

const DBQuery = util.promisify(pool.query).bind(DBConnection);

pool.getConnection(err, connection => {
    if(err) {
        connection.release();
        console.error('DB connection issue', err);
        return;
    }
    connectionSuccessHandler();
    constructDB();
});

const connectionSuccessHandler = () => {
    console.log('Successful DB connection');
}

const constructDB = async () => {
    try {
        DBConfirmConnect = util.promisify(pool.connectToDatabase).bind(DBConnection);
        await DBConfirmConnect();

        const find = await DBQuery('CREATE DATABASE IF NOT EXISTS mainData');
        console.log('Successfully found or create user table');
    } catch(err) {
        console.log('Failed to find or create user table');
    }

    try {
        const DBCheck = 'USE mainData';
        const userCheck = 'CREATE TABLE IF NOT EXISTS user (\
            id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,\
            firstName VARCHAR(30) NOTNULL,\
            lastName VARCHAR(30),\
            desiredRoommates INTEGER,\
            city VARCHAR(30) NOT NULL)';
        const preferenceCheck = 'CREATE TABLE IF NOT EXISTS prefferences (\
            id INTEGER NOT NULL PRIMARY KEY,\
            housingPref JSON,\
            lifestylePref JSON)';
        await DBQuery(DBCheck);
        await DBQuery(userCheck);
        await DBQuery(preferenceCheck);
    } catch(err) {
        console.error('Failed to find or create tables');
    }
       // We return two things: a function that lets us run queries, and another to
       // disconnect from the DB at the end of a route
};
module.exports = DBQuery;