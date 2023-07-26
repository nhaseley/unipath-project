const express = require("express")
const Student = require("../models/student")
const router = express.Router()

router.post("/like", async function (req, res, next){
    try {
      if (typeof(req.body.college) == "string"){ // only add to liked colleges if we pass one in (handles refresh)
        const college = await Student.likeCollege(req.body.student_id, req.body.college)
      }
      const colleges = await Student.getLikedColleges(req.body.student_id)
      return res.status(201).json(colleges)

    } catch (err){
      res.send(err)
      next(err)
    }
  })
  
  router.post("/colleges", async function (req, res, next){
    try {
    
      const collegesToDisplay = await Student.getCollegeFeed(req.body.satScore, req.body.actScore)
      return res.status(201).json(collegesToDisplay)

    } catch (err){
      // res.send(err)
      // next(err)
    }
  })

  router.post("/info/:id", async function (req, res, next){
    try {
      const collegeToDisplay = await Student.getCollege(req.body.id)
      return res.status(201).json(collegeToDisplay)

    } catch (err){
      res.send(err)
      next(err)
    }
  })
  module.exports = router