const express = require("express");
const Student = require("../models/student");
const Alum = require("../models/alum");
const AdmissionOfficer = require("../models/admissionOfficer");
const router = express.Router();

router.post("/like", async function (req, res, next) {
  try {
    if (typeof req.body.collegeName == "string") {
      // only add to liked colleges if we pass one in (handles refresh)
      await Student.likeCollege(
        req.body.studentId,
        req.body.collegeName
      );
    }
    const colleges = await Student.getLikedColleges(req.body.studentId);
    return res.status(201).json(colleges);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/colleges", async function (req, res, next) {
  try {
    const collegesToDisplay = await Student.getCollegeFeed(
      req.body.satScore,
      req.body.actScore
    );
    const allColleges = await Alum.getColleges();
    return res.status(201).json({ collegesToDisplay, allColleges });
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/info/:id", async function (req, res, next) {
  try {
    const collegeToDisplay = await Student.getCollege(req.body.id);
    return res.status(201).json(collegeToDisplay);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/register/event", async function (req, res, next) {
  try {
    const studentRegistrationInfo = await Student.registerForEvent(
      req.body.studentId,
      req.body.firstName,
      req.body.lastName,
      req.body.numAttendees,
      req.body.eventId
    );
    return res.status(201).json(studentRegistrationInfo);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/getAllEvents", async function (req, res, next) {
  try {
    const events = await Student.getAllEvents();
    return res.status(201).json(events);
  } catch (err) {
    res.send(err);
    next(err);
  }
});


router.delete("/removeEventRegistration", async function (req, res, next) {
  try {
    const ifStudentRemoved = await Student.removeEventRegistration(
      req.body.studentId,
      req.body.eventId
    );
    const attendees = await AdmissionOfficer.getEventAttendees(req.body.eventId);
    return res.status(201).json(attendees);
  } catch (err) {
    res.send(err);
    next(err);
  }
});
module.exports = router;
