const pool = require('./db')
const DBQuery = require ('./modules/database-helpers.js');
const util = require('util');

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(async function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('DROP TABLE IF EXISTS mainData.user, mainData.prefferences', async function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the tables user & prefferences: ", err); 
            res.status(400).send('Problem dropping the user and prefferences'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            try {
              constructDB()
              connection.release()
              res.status(200).send('created user and prefference table');
            } catch(err) {
              connection.release()
              logger.error("Problem creating the tables user and prefferences in parallel: ", err);
              res.status(400).send('Problem creating the tables in parallel');
            }
            // connection.query('CREATE TABLE mainData.user (\
            //   id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,\
            //   firstName VARCHAR(30) NOTNULL,\
            //   lastName VARCHAR(30),\
            //   desiredRoommates INTEGER,\
            //   city VARCHAR(30) NOT NULL)', function (err, rows, fields) {
            //   if (err) { 
            //     // if there is an error with the query, release the connection instance and log the error
            //     connection.release()
            //     logger.error("Problem creating the table test_table: ", err);
            //     res.status(400).send('Problem creating the table'); 
            //   } else { 
            //     // if there is no error with the query, release the connection instance
            //     connection.release()
            //     res.status(200).send('created the table'); 
            //   }
            // });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/insertinto', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(async function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        try {
          await DBQuery('INSERT INTO mainData.\'' + req.body.table + '\' VALUES (\'' + req.body.insert + '\')');
          res.status(200).send('Success -> INSERT INTO mainData.\'' + req.body.table + '\' VALUES (\'' + req.body.insert + '\')');
        } catch(err)
        {
          logger.error("Problem inserting into \"" + req.body.table + "\" table");
          res.status(400).send('Problem inserting into \'' + req.body.table + '\' table');
        }
        
        // connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
        //   connection.release();
        //   if (err) {
        //     // if there is an error with the query, log the error
        //     logger.error("Problem inserting into test table: \n", err);
        //     res.status(400).send('Problem inserting into table'); 
        //   } else {
        //     res.status(200).send(`added ${req.body.product} to the table!`);
        //   }
        // });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
}