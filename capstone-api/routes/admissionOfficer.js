const express = require("express");
// const Student = require("../models/student")
// const Parent = require("../models/parent")
const AdmissionOfficer = require("../models/admissionOfficer");
const router = express.Router();

router.post("/postEvent", async function (req, res, next) {
  try {
    const postingEvent = await AdmissionOfficer.postEvent(
      req.body.name,
      req.body.desc,
      req.body.email,
      req.body.speaker,
      req.body.dateTime,
      req.body.dept,
      req.body.maxRegistrants,
      req.body.college
    );
    return res.status(201).json(postingEvent);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/getAllEvents", async function (req, res, next) {
  try {
    const events = await AdmissionOfficer.getAllEvents(req.body.college);
    return res.status(201).json(events);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

module.exports = router;
