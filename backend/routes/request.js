const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  let requests;
  if (req.query.to && req.query.from) {
    requests = await req.models.request.fetchReq(req.query.to, req.query.from);
  } else if (req.query.to) {
    requests = await req.models.request.fetchReqByRecipient(req.query.to);
    requests = await req.models.avatar.getAvatarImages(requests);
  } else if (req.query.from) {
    requests = await req.models.request.fetchReqBySender(req.query.from);
    requests = await req.models.avatar.getAvatarImages(requests);
  } else {
    requests = await req.models.request.fetchAllReq();
  }
  res.json(requests);
  next();
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const result = await req.models.request.createRequest(
      body.to,
      body.from,
      body.message
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Failed to create new request:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

router.delete("/", async (req, res, next) => {
  try {
    const deleteReq = await req.models.request.deleteRequest(
      req.query.to,
      req.query.from
    );
    res.status(204).end();
  } catch (err) {
    console.error("Failed to delete request:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

router.put("/", async (req, res, next) => {
  try {
    const acceptReq = await req.models.request.acceptRequest(
      req.body.to,
      req.body.from,
      req.body.accepted
    );
    res.json(acceptReq);
  } catch (err) {
    console.error("Failed to accept request:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

module.exports = router;
