
/** Routes for authentication. */
const authenticateJWT = require("../utils/auth"); //importing the authenticateJWT middleware

const express = require("express")
const Student = require("../models/student")
const router = express.Router()

router.post("/login", async function (req, res, next) {
    try {
      const user = await Student.authenticate(req.body)
      if (user){
        console.log(req.body)
        const token = await Student.generateAuthToken(user)
        console.log("auth token-----",token)
        return res.status(200).json( user )
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

  return res.status(201).json( student )
  // return res.status(201).json({ user, token})
} catch (err) {
    res.send(err)
    next(err)
  }
})



  module.exports = router
