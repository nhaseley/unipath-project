const express = require("express")
const Student = require("../models/student")
const router = express.Router()

router.post("/like", async function (req, res, next){
    try {
      console.log("req body", req.body)
      const college = await Student.likeCollege(req.body.student_id, req.body.college)
      const colleges = await Student.getLikedColleges(req.body.student_id)
      // console.log("colleges liked: ", colleges)
      return res.status(201).json(colleges)

    } catch (err){
      res.send(err)
      next(err)
    }
  })

  // router.post("/likes", async function (req, res, next){
  //   try {
  //     const colleges = await Student.getLikedColleges(req.body.student_id)
  //     console.log("colleges: ", colleges)
  //     return res.status(201).json(colleges)
  //   } catch (err){
  //     res.send(err)
  //     next(err)
  //   }
  // })
  module.exports = router