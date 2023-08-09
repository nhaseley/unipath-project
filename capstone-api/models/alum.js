const db = require('../db')
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");
const { BCRYPT_WORK_FACTOR } = require("../config");

class Alum {
  /**
   * Convert a college student/alum from the database into a alum object that can be viewed publically.
   * Don't show alum's password
   *
   *
   * @param {alum} alum - alum from database
   * @returns public alum
   */
  static createPublicalum(alum) {
    return {
      id: alum.id,
      email: alum.email,
      firstName: alum.first_name,
      lastName: alum.last_name,
      collegeName: alum.college_name,
      collegeGradYear: alum.college_grad_year
    };
  }

 /**
   * Authenticate college student/alum with email and password.
   *
   * Throws UnauthorizedError if college student/alum not found or wrong password.
   *
   * @returns college student/alum
   **/

 static async authenticate(creds) {
  const requiredCreds = ["email", "password"];
  try {
    validateFields({
      required: requiredCreds,
      obj: creds,
      location: "college students and alumni authentication",
    });
  } catch (err) {
    throw err;
  }

  const alum = await Alum.fetchAlumByEmail(creds.email);
  if (alum) {
    // compare hashed password to a new hash from password
    const isValid = await bcrypt.compare(creds.password, alum.password);
    if (isValid === true) {
      return Alum.createPublicalum(alum);
    } else {
      throw new UnauthorizedError("Invalid password.");
    }
  }

  throw new UnauthorizedError("There is no alum registered with this email.");
}

/**
 * Register parent with data.
 *
 * Throws BadRequestError on duplicates.
 *
 * @returns parent
 **/

static async register(creds) {
  const requiredCreds = [
    "email",
    "firstName",
    "lastName",
    "password",
    "collegeName"
  ];
  try {
    validateFields({
      required: requiredCreds,
      obj: creds,
      location: "alum registration",
    });
  } catch (err) {
    throw err;
  }

  if (!creds.email || !creds.password) {
    throw new BadRequestError(`Fix credentials: ${creds}`);
  }
  if (await Alum.fetchAlumByEmail(creds.email)) {
    throw new BadRequestError(`Duplicate email: ${creds.email}`);
  }

  const hashedPassword = await bcrypt.hash(
    creds.password,
    BCRYPT_WORK_FACTOR
  );

  const result = await db.query(
    `INSERT INTO college_students_and_alumni (
        email,
        password,
        first_name,
        last_name,
        college_name,
        college_grad_year 
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING 
                id,
                email,       
                first_name, 
                last_name,
                college_name,
                college_grad_year`,
    [
      creds.email.toLowerCase(),
      hashedPassword,
      creds.firstName.toLowerCase(),
      creds.lastName.toLowerCase(),
      creds.collegeName,
      creds.collegeGradYear,
    ]
  );
  const alum = result.rows[0];
  return alum;
}

/**
 * Fetch a college student/alum in the database by email
 *
 * @param {String} email
 * @returns college student/alum
 */
static async fetchAlumByEmail(email) {
  const result = await db.query(
    `SELECT id,
            email, 
            first_name,
            last_name,
            college_name,
            college_grad_year,
            password       
         FROM college_students_and_alumni
         WHERE email = $1`,
    [email.toLowerCase()]
  );

  const alum = result.rows[0];
  return alum;
}



  /**
   * Get the names of all the colleges
   *
   * @param {*} 
   * @return colleges in the database 
   */
  static async getColleges() {
    const result = await db.query(
      `SELECT * FROM colleges_from_api`
    );
    return result.rows;
  }


  /**
   * Add alum reviews to the Review table
   *
   * @param {*} 
   * @return review added to the database
   */
  static async addCollegeReview(alum_id, alum_first_name, alum_last_name, college_name, alum_grad_year, rating, review) {
    const result = await db.query(
      `INSERT INTO reviews (
        user_id,
        first_name,
        last_name,
        college_name,
        college_grad_year,
        rating,
        review
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
              id,
              user_id,
              first_name,
              last_name,
              college_name,
              college_grad_year,
              rating,
              review`,
              [alum_id, alum_first_name, alum_last_name, college_name, alum_grad_year, rating, review]
    );
    return result.rows;
  }




    /**
   * get alum reviews from the Review table
   *
   * @param {*} 
   * @return review from the database
   */

    static async getCollegeReviews(college) {
      const result = await db.query(
        `SELECT * FROM reviews
        WHERE college_name = $1`,
        [college]
      )
      return result.rows;
    }
}


module.exports = Alum