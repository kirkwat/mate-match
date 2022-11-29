const express = require('express');
const router = express.Router();
//get all or ?name=... or ?email=...
router.get('/', async (req, res, next) => {
   if (req.query.name) {
       const UserByName = await req.models.user.fetchUserByName(req.query.name);
       res.json(UserByName);
       next();
   } 
   if (req.query.email){
      const UserByEmail = await req.models.user.findUserByEmail(req.query.email);
       res.json(UserByEmail);
       next();
   } else {
       const allUsers = await req.models.user.fetchAllUsers();
       res.json(allUsers);
       next();
   }
});
router.post('/', async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body);
      console.log(req.models);
      const result = await req.models.user.createNewUser(body.email, body.password);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to create new user:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
 });
 router.put('/', async (req, res, next) => {
    const updateUser = await req.models.user.updateUser(req.body.email, req.body.photoID, req.body.name, req.body.age, req.body.city, req.body.bio, req.body.gender, req.body.desired_gender, req.body.desired_roommates, req.body.hasResidence);
    res.json(updateUser);
    next();
 });
 router.post('/preferences', async (req, res, next) => {
    const addPrefstoUser = await req.models.user.addPref(req.body.email, req.body.apartment, req.body.house, req.body.condo,
      req.body.nightPerson, req.body.morningPerson, req.body.extrovert, req.body.introvert, req.body.smoker, req.body.bringFriendsOver,
      req.body.loud, req.body.shareFood, req.body.messy, req.body.pets, req.body.relationship);
    res.json(addPrefstoUser);
    next();
 });
 router.get('/preferences', async (req, res, next) => {
    if (req.query.email){
       const PrefByEmail = await req.models.user.findPrefByEmail(req.query.email);
        res.json(PrefByEmail);
        next();
    }
 });
 router.put('/preferences', async (req, res, next) => {
   const updateUser = await req.models.user.updatePref(req.body.email, req.body.apartment, req.body.house, req.body.condo,
      req.body.nightPerson, req.body.morningPerson, req.body.extrovert, req.body.introvert, req.body.smoker, req.body.bringFriendsOver,
      req.body.loud, req.body.shareFood, req.body.messy, req.body.pets, req.body.relationship);
   res.json(updateUser);
   next();
});
 router.delete('/', async (req, res, next) => {
    const deleteUser = await req.models.user.deleteUser(req.body.email);
    const deletePref = await req.models.user.deletePref(req.body.email);
    res.status(204).end();
    next();
 });
 module.exports = router;