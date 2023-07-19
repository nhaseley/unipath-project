const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");
const jwt = require("jsonwebtoken"); // importing the jsonwebtoken library
const crypto = require("crypto");
const secretKey = crypto.randomBytes(64).toString("hex");
const { BCRYPT_WORK_FACTOR } = require("../config");



// const jwt = require("jsonwebtoken");
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
      firstName: student.first_name,
      lastName: student.last_name,
      parentPhone: student.parent_phone,
      zipcode: student.zipcode,
      satScore: student.sat_score,
      actScore: student.act_score,
      enrollment: student.enrollment,
      schoolType: student.school_type,
    };
  }

  /**
   * Authenticate student with email and password.
   *
   * Throws UnauthorizedError if student not found or wrong password.
   *
   * @returns student
   **/

  static async authenticate(creds) {
    // const { email, password } = creds
    const requiredCreds = ["email", "password"];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "student authentication",
      });
    } catch (err) {
      throw err;
    }

    const student = await Student.fetchStudentByEmail(creds.email);

    if (student) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(creds.password, student.password);
      if (isValid === true) {
        return Student.createPublicstudent(student);
      }
    }

    throw new UnauthorizedError("Invalid email or password");
  }

  /**
   * Register student with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns student
   **/

  static async register(creds) {
    const requiredCreds = [
      "email",
      "firstName",
      "lastName",
      "parentPhone",
      "zipcode",
      "password",
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
    if (!creds.email || !creds.password) {
      throw new BadRequestError(`Fix credentials: ${creds}`);
    }
    if (await Student.fetchStudentByEmail(creds.email)) {
      throw new BadRequestError(`Duplicate email: ${creds.email}`);
    }

    const hashedPassword = await bcrypt.hash(
      creds.password,
      BCRYPT_WORK_FACTOR
    );

    const result = await db.query(
      `INSERT INTO students (
          email,
          first_name,
          last_name,
          parent_phone,
          zipcode,
          password, 
          sat_score,
          act_score,
          enrollment,
          school_type
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING 
                  id,
                  email,       
                  first_name, 
                  last_name,
                  parent_phone,
                  zipcode,
                  sat_score,
                  act_score,
                  enrollment,
                  school_type`,
      [
        creds.email.toLowerCase(),
        creds.firstName.toLowerCase(),
        creds.lastName.toLowerCase(),
        creds.parentPhone,
        creds.zipcode,
        hashedPassword,
        creds.examScores.satScore,
        creds.examScores.actScore,
        creds.enrollment,
        creds.schoolType,
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
  static async fetchStudentByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email, 
              first_name,
              last_name,
              parent_phone,
              zipcode,
              password,
              sat_score,
              act_score,
              enrollment,
              school_type       
           FROM students
           WHERE email = $1`,
      [email.toLowerCase()]
    );

    const student = result.rows[0];
    return student;
  }

  /**
   * Add a college to the database for a given user
   *
   * @param {*} student_id
   * @return college added to the database
   */
  static async likeCollege(student_id, college) {
    const result = await db.query(
      `INSERT INTO colleges (
          user_id,
          name
        )
        VALUES ($1, $2)
        RETURNING 
                  id,
                  user_id,
                  name
                  `,
      [student_id, college]
    );
    console.log(result.rows[0]);
    return result.rows[0];
  }

  /**
   * Get the names of all the colleges a given user has liked in the past
   *
   * @param {*} student_id
   * @return colleges in the database for a given user
   */
  static async getLikedColleges(student_id) {
    const result = await db.query(
      `SELECT * FROM colleges
          WHERE user_id = $1`,
      [student_id]
    );
    // console.log("likes from database: ", result.rows);
    return result.rows;
  }


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

  static async generateAuthToken(student) {
    const payload = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      location: student.location,
      date: student.date,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "4h" });
    return token;
  }

  // static verifyAuthToken(token) {
  //   try {
  //     //TODO: use verify and figure out why we can't verify currently
  //     const decoded = jwt.decode(token, secretKey);
  //     return decoded;
  //   } catch (err) {
  //     return null;
  //   }
  // }

  static async verifyAuthToken(token) {
        
    try {
        const decoded = jwt.verify(token, secretKey); // decoding the token
        return decoded; // returning the decoded token 
        

    } catch {
        return null // return null if the token seems to be unvalid or expired
    }
    
} 
}
module.exports = Student;
