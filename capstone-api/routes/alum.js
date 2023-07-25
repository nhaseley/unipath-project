const express = require("express")
const Alum = require('../models/alum')
const router = express.Router()


router.post("/collegeList", async function (req, res, next) {
    try {
        const collegesToDisplay = await Alum.getColleges()
        return res.status(201).json(collegesToDisplay)
      } catch (err){
        res.send(err)
        next(err)
      }
})



router.post("/postCollegeReview", async function (req, res, next) {
  try {
    const collegeReview = await Alum.addCollegeReview(req.body.alumId, req.body.collegeName, req.body.rating, req.body.review)
    return res.status(201).json(collegeReview)
  } catch (err){
    res.send(err)
    next(err)
  }
})



router.post('/getCollegeReview', async function (req, res, next) {

  try {
    const seeCollegeReview = await Alum.getCollegeReview(req.body.alum_id)
    return res.status(201).json(seeCollegeReview)
  } catch (err){
    res.send(err)
    next(err)
  }

})
module.exports = router