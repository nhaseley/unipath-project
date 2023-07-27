/** Routes for authentication. */
const authenticateJWT = require("../utils/auth"); //importing the authenticateJWT middleware

const express = require("express");
const Student = require("../models/student");
const Parent = require("../models/parent");
const Alum = require("../models/alum");
const AdmissionOfficer = require("../models/admissionOfficer");
const { BadRequestError } = require("../utils/errors");

const router = express.Router();

router.post("/register", async function (req, res, next) {
  try {
    const student = await Student.register(req.body);
    return res.status(201).json(student);
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/login/student", async function (req, res, next) {
  try {
    const student = await Student.authenticate(req.body);
    if (student) {
      console.log("student on login: ", student)
      const tokenPromise = Student.generateAuthToken(student, "student");
      tokenPromise?.then((token) => {
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
    // Making sure we can get a child with the phone number they registered with
    const child = await Parent.fetchChildByPhoneNumber(req.body.parentPhone);
    //   const token = await User.generateAuthToken(user)
    if (child) {
      const parent = await Parent.register(req.body);
      return res.status(201).json(parent);
    }
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
      console.log("parent on login: ", parent)
      const tokenPromise = Student.generateAuthToken(parent, "parent");
      tokenPromise?.then((token) => {
        res.cookie("token", token); // Set the token in a cookie
        res.status(200).json({ parent, token }); // Send the response to the client
      });
      // return res.status(200).json({parent});
    }
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post(
  "/register/college-students-and-alumni",
  async function (req, res, next) {
    try {
      const alum = await Alum.register(req.body);
      //   const token = await User.generateAuthToken(user)
      return res.status(201).json({ alum });
      // return res.status(201).json({ user, token})
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
);

router.post(
  "/login/college-students-and-alumni",
  async function (req, res, next) {
    try {
      const alum = await Alum.authenticate(req.body);
      if (alum) {
        return res.status(200).json({alum});
        // const token = await User.generateAuthToken(user)
        // return res.status(200).json({ user, token})
      }
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
);

router.post(
  "/register/college-admission-officer",
  async function (req, res, next) {
    try {
      const admissionOfficer = await AdmissionOfficer.register(req.body);
      //   const token = await User.generateAuthToken(user)
      return res.status(201).json({ admissionOfficer });
      // return res.status(201).json({ user, token})
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
);
router.post(
  "/login/college-admission-officer",
  async function (req, res, next) {
    try {
      const admissionOfficer = await AdmissionOfficer.authenticate(req.body);
      if (admissionOfficer) {
        return res.status(200).json({ admissionOfficer });
        // const token = await User.generateAuthToken(user)
        // return res.status(200).json({ user, token})
      }
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
);

router.post("/decodedtoken", async (req, res, next) => {
  const token = req.body.token; // Getting the token from the request body
  const decodedToken = await Student.verifyAuthToken(token); // Decoding the token

  try {
    if (decodedToken) {
      console.log("user with token: ", decodedToken)
      // Returning the decoded token with the user logged in
      return res.status(200).json( decodedToken );
    }
  } catch (err) {
    res.send(err);
    next(err);
    // throw new UnauthorizedError("No token for this user");
  }
});

module.exports = router;
