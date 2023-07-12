const express = require("express")
const Student = require("../models/student")
const router = express.Router()

router.post("/login", async function (req, res, next) {
    try {
      const user = await Student.authenticate(req.body)
      if (user){
        return res.status(200).json( user )
        // const token = await User.generateAuthToken(user)
        // return res.status(200).json({ user, token})
      }
  
    } catch (err) {
      res.send(err)
      next(err)
    }
  })
  
router.post("/register", async function (req, res, next) {  
  try {
    const student = await Student.register(req.body)
    console.log("student in table: ", student)
  //   const token = await User.generateAuthToken(user)
  return res.status(201).json( student )
  // return res.status(201).json({ user, token})
} catch (err) {
    res.send(err)
    next(err)
  }
})

  module.exports = router
