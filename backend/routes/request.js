const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
   if (req.query.to) {
       const ReqByName = await req.models.request.fetchReqByRecipient(req.query.to);
       res.json(ReqByName);
       next();
   } 
   else {
       const allReq = await req.models.request.fetchAllReq();
       res.json(allReq);
   }
});
router.post('/', async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body);
      console.log(req.models);
      const result = await req.models.request.createRequest(body.to, body.from, body.message);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to create new request:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
 });
module.exports = router;