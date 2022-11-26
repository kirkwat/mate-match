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
   const updateUser = async (email, photoID, name, age, city, bio, gender, desired_gender, desired_roommates)  => {
    const query = knex(USERS_TABLE).update({photoID, name, age, city, bio, gender, desired_gender, desired_roommates}).where({email});
    const results = await query;
    return results;
}
const addPref = async (email, relationship, person_type, bring_over, shared_space, environment, smoker, cleanliness, temperature, sharing, pet)  => {
    const query = knex(PREF_TABLE).insert({email, relationship, person_type, bring_over, shared_space, environment, smoker, cleanliness, temperature, sharing, pet});
    const results = await query;
    return results;
}
const updatePref = async (email, relationship, person_type, bring_over, shared_space, environment, smoker, cleanliness, temperature, sharing, pet)  => {
    const query = knex(PREF_TABLE).update({relationship, person_type, bring_over, shared_space, environment, smoker, cleanliness, temperature, sharing, pet}).where({email});
    const results = await query;
    return results;
}
const createUser = async (email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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
 const findPrefByEmail = async (email) => {
    const query = knex(PREF_TABLE).where({ email });
    const result = await query;
    return result;
    }
module.exports = {
    fetchAllUsers,
    fetchUserByName,
    findUserByEmail,
    updateUser, 
    addPref,
    updatePref,
    createUser,
    deleteUser, 
    authenticateUser, 
    findPrefByEmail
 }