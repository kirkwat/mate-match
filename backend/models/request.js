const knex = require('../database/knex');
const bcrypt = require('bcrypt');
const REQ_TABLE = 'requests';

const fetchAllReq = async () => {
    const query = knex(REQ_TABLE);
    const results = await query;
    return results;
}
const fetchReqByRecipient = async (to) => {
    const query = knex(REQ_TABLE).where({ to });
    const results = await query;
    return results;
}
const createRequest = async (to, from, message) => {
    const query = knex(REQ_TABLE).insert({ to, from, message});
    console.log('Raw query for createRequest:', query.toString());
    const result = await query;
    return result;
 };

 module.exports = {
    fetchAllReq,
    fetchReqByRecipient,
    createRequest
 }