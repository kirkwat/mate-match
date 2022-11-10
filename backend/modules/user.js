const knex = require('../database/knex');
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
   const updateUser = async (name, email)  => {
    const query = knex(USERS_TABLE).update({name}).where({email});
    const results = await query;
    return results;
}
//add bcrypt
const createUser = async (email, password) => {
    const query = knex(USERS_TABLE).insert({email, password});
    const results = await query;
    return results;
}
const deleteUser = async (email) => {
    const query = knex(USERS_TABLE).delete().where({email});
    const results = await query;
    return results;
}
module.exports = {
    fetchAllUsers,
    fetchUserByName,
    updateUser, 
    createUser,
    deleteUser
 }