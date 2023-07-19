
/** Routes for authentication. */
const authenticateJWT = require("../utils/auth"); //importing the authenticateJWT middleware

const express = require("express")
const Student = require("../models/student")
const Parent = require("../models/parent")
const router = express.Router()



router.post("/register", async function (req, res, next) {  
  try {
    const student = await Student.register(req.body)
  //   const token = await User.generateAuthToken(user)
  return res.status(201).json(student)
  // return res.status(201).json({ user, token})
} catch (err) {
    res.send(err)
    next(err)
  }
})

router.post("/login/student", async function (req, res, next) {
    try {
      const student = await Student.authenticate(req.body)
      if (student){
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


  router.post("/register/parent", async function (req, res, next) {  
    try {
      const parent = await Parent.register(req.body)
    //   const token = await User.generateAuthToken(user)
    return res.status(201).json( parent )
    // return res.status(201).json({ user, token})
  } catch (err) {
      res.send(err)
      next(err)
    }
  })

  router.post("/login/parent", async function (req, res, next) {
    try {
      const parent = await Parent.authenticate(req.body)
      if (parent){
        return res.status(200).json(parent)
        // const token = await User.generateAuthToken(user)
        // return res.status(200).json({ user, token})
      }
  
    } catch (err) {
      res.send(err)
      next(err)
    }
  })

  module.exports = router
