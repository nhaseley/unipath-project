const db = require("../db");

const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

const { BCRYPT_WORK_FACTOR } = require("../config");

const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
const secretKey = crypto.randomBytes(64).toString("hex");
// const secretKey = process.env.SECRET_KEY || "secret-dev"

class Parent {
  /**
   * Convert a parent from the database into a parent object that can be viewed publically.
   * Don't show parent's password
   *
   *
   * @param {parent} parent - parent from database
   * @returns public parent
   */
  static createPublicparent(parent) {
    return {
      id: parent.id,
      email: parent.email,
      firstName: parent.first_name,
      lastName: parent.last_name,
      parentPhone: parent.parent_phone,
    };
  }

  /**
   * Authenticate parent with email and password.
   *
   * Throws UnauthorizedError if parent not found or wrong password.
   *
   * @returns parent
   **/

  static async authenticate(creds) {
    // const { email, password } = creds
    const requiredCreds = ["email", "password"];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "parent authentication",
      });
    } catch (err) {
      throw err;
    }

    const parent = await Parent.fetchParentByEmail(creds.email);

    if (parent) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(creds.password, parent.password);
      if (isValid === true) {
        return Parent.createPublicparent(parent);
      }
    }

    throw new UnauthorizedError("Invalid email or password");
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
      "parentPhone",
      "password"
    ];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "parent registration",
      });
    } catch (err) {
      throw err;
    }
    if (!creds.email || !creds.password) {
      throw new BadRequestError(`Fix credentials: ${creds}`);
    }
    if (await Parent.fetchParentByEmail(creds.email)) {
      throw new BadRequestError(`Duplicate email: ${creds.email}`);
    }

    const hashedPassword = await bcrypt.hash(
      creds.password,
      BCRYPT_WORK_FACTOR
    );

    const result = await db.query(
      `INSERT INTO parents (
          email,
          first_name,
          last_name,
          parent_phone,
          password 
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING 
                  id,
                  email,       
                  first_name, 
                  last_name,
                  parent_phone`,
      [
        creds.email.toLowerCase(),
        creds.firstName.toLowerCase(),
        creds.lastName.toLowerCase(),
        creds.parentPhone,
        hashedPassword
      ]
    );

    const parent = result.rows[0];
    return parent;
  }

  /**
   * Fetch a parent in the database by email
   *
   * @param {String} email
   * @returns parent
   */
  static async fetchParentByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email, 
              first_name,
              last_name,
              parent_phone,
              password       
           FROM parents
           WHERE email = $1`,
      [email.toLowerCase()]
    );

    const parent = result.rows[0];
    return parent;
  }

  
  /**
   * Fetch a parent in the database by id
   *
   * @param {String} parent_id
   * @returns parent
   */
  // static async fetchById(parent_id) {
  //   const result = await db.query(
  //     `SELECT id,
  //             email,
  //             parentname,
  //             first_name,
  //             last_name
  //          FROM parents
  //          WHERE id = $1`,
  //     [parent_id]
  //   );

  //   const parent = result.rows[0];
  //   return parent;
  // }

  // static async generateAuthToken(parent) {
  //   const payload = {
  //     id: parent.id,
  //     firstName: parent.firstName,
  //     lastName: parent.lastName,
  //     email: parent.email,
  //     location: parent.location,
  //     date: parent.date,
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


   /**
   * Get the student of all the colleges a given parent
   *
   * @param {*} student_id
   * @return student in the database for a given parent phone
   */
   static async fetchChildByPhoneNumber(parentPhone) {
    console.log("phone: ", parentPhone)
    const result = await db.query(
      `SELECT * FROM students
          WHERE parent_phone = $1`,
      [parentPhone]
    );
    console.log(result.rows)
    return result.rows[0];
  }
}
module.exports = Parent;
