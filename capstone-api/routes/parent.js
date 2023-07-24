const express = require("express")
const Student = require("../models/student")
const Parent = require("../models/parent")
const router = express.Router()

router.post("/getChildList", async function (req, res, next){
    try {
      const student = await Parent.fetchChildByPhoneNumber(req.body.parentPhone)
      const colleges = await Student.getLikedColleges(student.id)
      
      return res.status(201).json(colleges)

    } catch (err){
      res.send(err)
      next(err)
    }
  })

  module.exports = router