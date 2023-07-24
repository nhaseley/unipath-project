/** Routes for authentication. */
const authenticateJWT = require("../utils/auth"); //importing the authenticateJWT middleware

const express = require("express");
const Student = require("../models/student");
const Parent = require("../models/parent");
const Alum = require("../models/alum");
const router = express.Router();

router.post("/register", async function (req, res, next) {
  try {
    const student = await Student.register(req.body);
    //   const token = await User.generateAuthToken(user)
    return res.status(201).json(student);
    // return res.status(201).json({ user, token})
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/login/student", async function (req, res, next) {
  try {
    const student = await Student.authenticate(req.body);
    if (student) {
      const tokenPromise = Student.generateAuthToken(student);
      tokenPromise?.then((token) => {
        // console.log("this is my token", token); // Log the resolved token
        res.cookie("token", token); // Set the token in a cookie
        res.status(200).json({ student, token }); // Send the response to the client
      });
    }
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/register/parent", async function (req, res, next) {
  try {
    const parent = await Parent.register(req.body);
    //   const token = await User.generateAuthToken(user)
    return res.status(201).json(parent);
    // return res.status(201).json({ user, token})
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/login/parent", async function (req, res, next) {
  try {
    const parent = await Parent.authenticate(req.body);
    if (parent) {
      return res.status(200).json(parent);
      // const token = await User.generateAuthToken(user)
      // return res.status(200).json({ user, token})
    }
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/register/college-students-and-alumni", async function (req, res, next) {
  try {
    const alum = await Alum.register(req.body);
    //   const token = await User.generateAuthToken(user)
    return res.status(201).json({alum});
    // return res.status(201).json({ user, token})
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/login/college-students-and-alumni", async function (req, res, next) {
  try {
    const alum = await Alum.authenticate(req.body);
    if (alum) {
      console.log("logged in: ", alum)
      return res.status(200).json(alum);
      // const token = await User.generateAuthToken(user)
      // return res.status(200).json({ user, token})
    }
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/decodedtoken", async (req, res, next) => {
  const token = req.body.token; // Getting the token from the request body
  const decodedToken = await Student.verifyAuthToken(token); // Decoding the token

  try {
    if (decodedToken) {
      const user = await Student.fetchStudentByEmail(decodedToken.email);
      // Returning the decoded token and the user logged in
      return res.status(200).json({ decodedToken, user }); // Returning the decoded token
    }
  } catch (err){
    res.send(err)
    next(err)
    // throw new UnauthorizedError("No token for this user");
  }
});

module.exports = router;
