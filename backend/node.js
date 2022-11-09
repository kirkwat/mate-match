//docker start mysql-container
//docker exec -it mysql-container bash
//mysql --user=root --password
mysql = require('mysql');
const DBConnection = mysql.createConnection({
    host: 'localhost',
   	user: 'root',
   	password: 'password',
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
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
                pets VARCHAR(255)
            )`;
        const profPrefTableQuery = `
            CREATE TABLE IF NOT EXISTS professional_prefence (
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
                desiredQuiteHoursStart VARCHAR(5),
                desiredQuiteHoursEnd VARCHAR(5),
                budget INT
            )`;
        const profileTableQuery = `
            CREATE TABLE IF NOT EXISTS profile (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255),
                birthday DATETIME,
                gender VARCHAR(7),
                city VARCHAR(255),
                address VARCHAR(255),
                maxDesiredRoommates INT, 
                hasResidence VARCHAR(6),
                professionalPref_id INT,
                lifestylePref_id INT,
                bio VARCHAR (2000), 
                CONSTRAINT chk_gender CHECK (gender IN ('male', 'female')),
                CONSTRAINT profile_has_proPref FOREIGN KEY (professionalPref_id) REFERENCES professional_prefence(id),
                CONSTRAINT profile_has_lifePref FOREIGN KEY (lifestylePref_id) REFERENCES lifestyle_prefence(id)
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
// we’ll need this later
const connectToDatabase = require('./modules/database-helpers');
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.get is a function that builds a GET request.
app.get('/health', (request, response) => {
   const responseBody = { status: 'up', port };
   response.json(responseBody);
});
// this runs the app
app.listen(port, () => {
   console.log(`This app is listening on port ${port}`);
});
app.get('/profile', async (request, response) => {
    try {
        console.log('Initiating GET /profile request');
        console.log('Request query arguments is an object containing:', request.query);
        const name = request.query.name;
        const { DBQuery, disconnect } = await connectToDatabase();
        let results;
        if (name) {
            results = await DBQuery('SELECT * FROM profile WHERE name = ?', [name]);
        } else {
            results = await DBQuery('SELECT * FROM profile');
        }
        disconnect();
        response.json(results);
    } catch (err) {
        console.error('There was an error in GET /profile', err);
        response.status(500).json({ message: err.message });
    }
 });
 app.post('/profile', async (request, response) => {
    try {
        console.log('Initiating POST /profile request');
        console.log('Request has a body / payload containing:', request.body);
        const payload = request.body; // This payload should be an object containing student data
        const { DBQuery, disconnect } = await connectToDatabase();
        const results = await DBQuery('INSERT INTO profile(name) VALUES (?)', [payload.name]);
        console.log('Results of my INSERT statement:', results);
       
        // the results object contains an insertId, which tells us what the ID is of the newly
        // created record. Let's load that record now and pull the full object to provide a
        // good response body
        const newlyCreatedRecord = await DBQuery('SELECT * FROM profile WHERE id = ?', [results.insertId]);
        disconnect();
        response.status(201).json(newlyCreatedRecord); // 201 status = resource created
    } catch (err) {
        console.error('There was an error in POST /profile', err);
        response.status(500).json({ message: err.message });
    }
 });
 app.put('/profile', async (request, response) => {
    try {
        console.log('Initiating PUT /profile request');
        console.log('Request has a body / payload containing:', request.body);
        console.log('Request has params containing:', request.query);
      
        const payload = request.body; // This payload should be an object containing update student data
        const id = request.query.id; // And pull the ID from the request params
        const { DBQuery, disconnect } = await connectToDatabase();
        const results = await DBQuery('UPDATE profile SET name = ? WHERE id = ?', [payload.name, id]);
        console.log('Results of my UPDATE statement:', results);
      
        // Since we already know the id we're looking for, let's load the most up to date data
        const newlyCreatedRecord = await DBQuery('SELECT * FROM profile WHERE id = ?', [id]);
        disconnect();
        response.json(newlyCreatedRecord);
    } catch (err) {
        console.error('There was an error in PUT /profile', err);
        response.status(500).json({ message: err.message });
    }
 });
 app.delete('/profile', async (request, response) => {
    try {
        console.log('Initiating DELETE /profile request' );
        console.log('Request has params containing:' , request.query);
       
        const id = request.query.id;
        const { DBQuery, disconnect } = await connectToDatabase ();
        const results = await DBQuery('DELETE FROM profile WHERE id = ?' , [id]);
        console.log('Results of my UPDATE statement:' , results);
       
        disconnect();
        response.status(204).end(); // End the request with a 204 status and no response body
    } catch (err) {
        console.error('There was an error in DELETE /profile' , err);
        response.status(500).json({ message: err.message });
    }
 });