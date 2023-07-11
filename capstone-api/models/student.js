
// const db = require("../db");

const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

const { BCRYPT_WORK_FACTOR } = require("../config");

const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
const secretKey = crypto.randomBytes(64).toString("hex");
// const secretKey = process.env.SECRET_KEY || "secret-dev"

class Student {
  /**
   * Convert a student from the database into a student object that can be viewed publically.
   * Don't show student's password
   *
   *
   * @param {student} student - student from database
   * @returns public student
   */
  static createPublicstudent(student) {
    return {
      id: student.id,
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
      parentPhone: student.parentPhone,
      zipcode: student.zipcodeInput,
    };
  }

  /**
   * Authenticate student with email and password.
   *
   * Throws UnauthorizedError if student not found or wrong password.
   *
   * @returns student
   **/

  // static async authenticate(creds) {
  //   // const { email, password } = creds
  //   const requiredCreds = ["emailInput", "passwordInput"];
  //   try {
  //     validateFields({
  //       required: requiredCreds,
  //       obj: creds,
  //       location: "student authentication",
  //     });
  //   } catch (err) {
  //     throw err;
  //   }

  //   const student = await student.fetchstudentByEmail(creds.emailInput);
  //   if (student) {
  //     // compare hashed password to a new hash from password
  //     const isValid = await bcrypt.compare(creds.passwordInput, student.password);
  //     if (isValid === true) {
  //       return student.createPublicstudent(student);
  //     }
  //   }

  //   throw new UnauthorizedError("Invalid studentname/password");
  // }

  /**
   * Register student with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns student
   **/

  static async register(creds) {
    const requiredCreds = [
      "emailInput",
      "firstNameInput",
      "lastNameInput",
      "parentPhoneInput",
      "zipcodeInput",
      "passwordInput"
    ];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "student registration",
      });
    } catch (err) {
      throw err;
    }
    if (!creds.emailInput || !creds.passwordInput) {
      throw new BadRequestError(`Fix credentials: ${creds}`);
    }
    if (await student.fetchstudentByEmail(creds.emailInput)) {
      throw new BadRequestError(`Duplicate email: ${creds.emailInput}`);
    }

    const hashedPassword = await bcrypt.hash(
      creds.passwordInput,
      BCRYPT_WORK_FACTOR
    );

    const result = await db.query(
      `INSERT INTO students (
          email,
          first_name,
          last_name,
          parent_phone,
          zipcode,
          password
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING 
                  id,
                  email,       
                  first_name, 
                  last_name,
                  parent_phone,
                  zipcode`,
      [
        creds.emailInput.toLowerCase(),
        creds.firstNameInput.toLowerCase(),
        creds.lastNameInput.toLowerCase(),
        creds.parentPhoneInput,
        creds.zipcodeInput,
        hashedPassword
      ]
    );

    const student = result.rows[0];

    return student;
  }

  /**
   * Fetch a student in the database by email
   *
   * @param {String} email
   * @returns student
   */
  // static async fetchstudentByEmail(email) {
  //   const result = await db.query(
  //     `SELECT id,
  //             email, 
  //             studentname,
  //             password,
  //             first_name AS "firstName",
  //             last_name AS "lastName",
  //             created_at,
  //             updated_at              
  //          FROM students
  //          WHERE email = $1`,
  //     [email.toLowerCase()]
  //   );

  //   const student = result.rows[0];
  //   return student;
  // }

  /**
   * Fetch a student in the database by id
   *
   * @param {String} student_id
   * @returns student
   */
  // static async fetchById(student_id) {
  //   const result = await db.query(
  //     `SELECT id,
  //             email,    
  //             studentname,
  //             first_name,
  //             last_name
  //          FROM students
  //          WHERE id = $1`,
  //     [student_id]
  //   );

  //   const student = result.rows[0];
  //   return student;
  // }

  // static async generateAuthToken(student) {
  //   const payload = {
  //     id: student.id,
  //     firstName: student.firstName,
  //     lastName: student.lastName,
  //     email: student.email,
  //     location: student.location,
  //     date: student.date,
  //   };

  //   const token = jwt.sign(payload, secretKey, { expiresIn: "4h" });
  //   return token;
  // }

  // static verifyAuthToken(token) {
  //   try {
  //     //TODO: use verify and figure out why we can't verify currently
  //     const decoded = jwt.decode(token, secretKey);
  //     return decoded;
  //   } catch (err) {
  //     return null;
  //   }
  // }
}
module.exports = Student