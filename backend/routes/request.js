const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    if (req.query.to && req.query.from) {
        const ReqByName = await req.models.request.fetchReq(req.query.to,req.query.from);
        res.json(ReqByName);
        next();
    } 
    else if (req.query.to) {
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
 router.delete('/', async (req, res, next) => {
    const deleteReq = await req.models.request.deleteRequest(req.body.to, req.body.from);
    res.status(204).end();
    next();
 });
 router.put('/', async (req, res, next) => {
    const acceptReq = await req.models.request.acceptRequest(req.body.to, req.body.from, req.body.accepted);
    res.json(acceptReq);
    next();
 });
module.exports = router;