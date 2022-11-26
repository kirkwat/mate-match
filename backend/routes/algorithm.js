const express = require('express');
const router = express.Router();
router.get('/', async (req, res, next) => {
  if (req.body.email) {
      //console.log(req.body.email)
      const Matches = await req.models.algorithm.fetchMatches(req.body.email);
      res.json(Matches);
      next();
  } else {
      //console.log("Invalid Request")
      res.json({});
      next();
  }
});
module.exports = router;