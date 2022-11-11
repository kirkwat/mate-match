const knex = require('../database/knex');
const bcrypt = require('bcrypt');
const USERS_TABLE = 'users';
   const fetchAllUsers = async () => {
       const query = knex(USERS_TABLE);
       const results = await query;
       return results;
   }
   const fetchUserByName = async (name) => {
       const query = knex(USERS_TABLE).where({ name });
       const results = await query;
       return results;
   }
   const findUserByEmail = async (email) => {
    const query = knex(USERS_TABLE).where({ email });
    const result = await query;
    return result;
    }
   const updateUser = async (name, email)  => {
    const query = knex(USERS_TABLE).update({name}).where({email});
    const results = await query;
    return results;
}
//add bcrypt
const createUser = async (email, password) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);
    const query = knex(USERS_TABLE).insert({ email, password: hashedPassword });
    console.log('Raw query for createNewUser:', query.toString());
    const result = await query;
    return result;
 };
const deleteUser = async (email) => {
    const query = knex(USERS_TABLE).delete().where({email});
    const results = await query;
    return results;
}
const authenticateUser = async (email, password) => {
    const users = await findUserByEmail(email);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return null;
    }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        delete user.password;
        return user;
    }
    return null;
 }
module.exports = {
    fetchAllUsers,
    fetchUserByName,
    findUserByEmail,
    updateUser, 
    createUser,
    deleteUser, 
    authenticateUser
 }