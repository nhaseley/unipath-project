/** Routes for authentication. */
const express = require("express");
const User = require("../models/user");
const Student = require("../models/student");
const Parent = require("../models/parent");
const Alum = require("../models/alum");
const AdmissionOfficer = require("../models/admissionOfficer");
const { BadRequestError } = require("../utils/errors");

const router = express.Router();

router.post("/register", async function (req, res, next) {
  try {
    const student = await Student.register(req.body);
    console.log(student)
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
      const tokenPromise = User.generateAuthToken(student, "student");
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
    if (child) {
      const parent = await Parent.register(req.body);
      return res.status(201).json(parent);
    }
  } catch (err) {
    res.send(err);
    next(err);
  }
});

router.post("/login/parent", async function (req, res, next) {
  try {
    const parent = await Parent.authenticate(req.body);
    if (parent) {
      const tokenPromise = User.generateAuthToken(parent, "parent");
      tokenPromise?.then((token) => {
        res.cookie("token", token); // Set the token in a cookie
        res.status(200).json({ parent, token }); // Send the response to the client
      });
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
      return res.status(201).json({ alum });
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
        const tokenPromise = User.generateAuthToken(alum, "college-students-and-alumni");
        tokenPromise?.then((token) => {
          res.cookie("token", token); // Set the token in a cookie
          res.status(200).json({ alum, token }); // Send the response to the client
        });
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
      return res.status(201).json({ admissionOfficer });
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
        const tokenPromise = User.generateAuthToken(admissionOfficer, "college-admission-officer");
        tokenPromise?.then((token) => {
          res.cookie("token", token); // Set the token in a cookie
          res.status(200).json({ admissionOfficer, token }); // Send the response to the client
        });
      }
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
);

router.post("/decodedtoken", async (req, res, next) => {
  const token = req.body.token; // Getting the token from the request body
  const decodedToken = await User.verifyAuthToken(token); // Decoding the token

  try {
    if (decodedToken) {
      // console.log("user with token: ", decodedToken)
      // Returning the decoded token with the user logged in
      return res.status(200).json( decodedToken );
    }
  } catch (err) {
    res.send(err);
    next(err);
  }
});

module.exports = router;
