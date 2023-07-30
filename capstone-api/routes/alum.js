const express = require("express");
const Alum = require("../models/alum");
const router = express.Router();

router.post("/collegeList", async function (req, res, next) {
  try {
    const collegesToDisplay = await Alum.getColleges();
    return res.status(201).json(collegesToDisplay);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/postCollegeReview", async function (req, res, next) {
  try {
    const collegeReview = await Alum.addCollegeReview(
      req.body.alumId,
      req.body.alumFirstName,
      req.body.alumLastName,
      req.body.collegeName,
      req.body.collegeGradYear,
      req.body.rating,
      req.body.review
    );
    return res.status(201).json(collegeReview);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/getCollegeReviews", async function (req, res, next) {
  try {
    const collegeReviews = await Alum.getCollegeReviews(req.body.collegeName);
    return res.status(201).json(collegeReviews);
  } catch (err) {
    res.send(err);
    next(err);
  }
});
module.exports = router;
