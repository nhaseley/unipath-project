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
module.exports = router