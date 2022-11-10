const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
module.exports = router;
router.get('/', async (req, res, next) => {
   if (req.query.name) {
       const UserByName = await req.models.user.fetchUserByName(req.query.name);
       res.json(UserByName);
       next();
   } else {
       const allUsers = await req.models.user.fetchAllUsers();
       res.json(allUsers);
       next();
   }
});
router.post('/', async (req, res, next) => {
    const createUser = await req.models.user.createUser(req.body.email, req.body.password);
    res.status(201).json(createUser);
    next();
 });
 router.put('/', async (req, res, next) => {
    const updateUser = await req.models.user.updateUser(req.body.name, req.body.email);
    res.json(updateUser);
    next();
 });
 router.delete('/', async (req, res, next) => {
    const deleteUser = await req.models.user.deleteUser(req.body.email);
    res.status(204).end();
    next();
 });