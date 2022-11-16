const knex = require('../database/knex');
const bcrypt = require('bcrypt');
const USERS_TABLE = 'users';
const PREF_TABLE = 'preferences';

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
   const updateUser = async (email, name, age, desiredRoomates, city, bio, gender)  => {
    const query = knex(USERS_TABLE).update({name, age, desiredRoomates, city, bio, gender}).where({email});
    const results = await query;
    return results;
}
const addPref = async (email, apartment, house, condo, nightPerson, morningPerson, extrovert, introvert, smoker, bringFriendsOver, loud, shareFood, messy)  => {
    const query = knex(PREF_TABLE).insert({email, apartment, house, condo, nightPerson, morningPerson, extrovert, introvert, smoker, bringFriendsOver, loud, shareFood, messy});
    const results = await query;
    return results;
}
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
    addPref,
    createUser,
    deleteUser, 
    authenticateUser
 }