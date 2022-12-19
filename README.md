# Mate Match
#### A site connecting potiental roommates using docker-compose with Node and React.js containers.
#### Also uses a MySQL DBaaS like AWS RDS or GCloud CloudSQL.

- **Backend:** Express Server, Knex.js

- **Frontend:** React.js Client, Axios, Bootstrap

# SETUP

## Initial setup
First make sure to open a terminal window to `./backend` and `./frontend` and from there run `yarn` or `npm install` in both directories to install the necessary packages. 

Create a file in the `./frontend` folder called `.env` and add the the following to it (if it is not already there):
```
CHOKIDAR_USEPOLLING=true
```

Create a file in the `./backend` folder called `.env` and add the the following to it:

**NOTE:** It is not recommended you push this file to your GitHub repo as it may expose your secrets to the world!
```
# POPULATE WITH YOUR OWN VALUES SPECIFIED IN DATABASE CREATION!
# mysql database name
MYSQL_DB=
# mysql port (usually 3306)
MYSQL_PORT=
# mysql cloud database login user
MYSQL_CLOUD_USER=
# mysql cloud database login password
MYSQL_CLOUD_PASS=
# mysql cloud database host URL
MYSQL_CLOUD_HOST=
# jwt secret keys
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

```

## MySQL setup
Once you have set up your MySQL database on a DBaaS provider like AWS RDS or GCloud CloudSQL, ensure that the database is publicly accessible on the port you used in setup (usually 3306).

In `./backend/.env` add all the values that you were provided specifically the host, user, pass, and port of the database. For the JWT secret keys, you can open `node` in the terminal and create random strings using the following command: `require('crypto').randomBytes(64).toString('hex')`.

Using a tool such as MySQL Workbech, connect to the MySQL database and create a database for the project using the command: `create database db;`. Return to the `./backend` directory, and in the terminal, enter `knex migrate:latest` to create the database schema. 

## Running the project
After installing the packages and entering your cloud DBaaS connection details, all you need to do is run `docker-compose up` from the root directory of the project to have the `docker-compose` file automatically spin the containers up for you.

If you want to run a terminal in detached mode (so you can close the window and it wont stop the containers) then type `docker-compose up -d` for a headless start instead.

## Stopping the project
As always make sure to type `docker-compose down` to shut the containers down and close everything up.

## [Running the project on an EC2 server](CloudDeploy.md)
[Click here](CloudDeploy.md) to read the directions on how to deploy the project to the cloud on an EC2 instance for all to visit!