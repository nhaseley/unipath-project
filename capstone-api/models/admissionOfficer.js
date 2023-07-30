const db = require("../db");

const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

const { BCRYPT_WORK_FACTOR } = require("../config");

const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
const secretKey = crypto.randomBytes(64).toString("hex");
// const secretKey = process.env.SECRET_KEY || "secret-dev"

class AdmissionOfficer {
  /**
   * Convert a admission officer from the database into a admission officer object that can be viewed publically.
   * Don't show admission officer's password
   *
   *
   * @param {admissionOfficer} admissionOfficer - admission officer from database
   * @returns public admissionOfficer
   */
  static createPublicadmissionOfficer(admissionOfficer) {
    return {
      id: admissionOfficer.id,
      email: admissionOfficer.work_email,
      firstName: admissionOfficer.first_name,
      lastName: admissionOfficer.last_name,
      collegeName: admissionOfficer.college_name
    };
  }

  /**
   * Authenticate admission officer with email and password.
   *
   * Throws UnauthorizedError if admissionOfficer not found or wrong password.
   *
   * @returns admissionOfficer
   **/

  static async authenticate(creds) {
    // const { email, password } = creds
    const requiredCreds = ["email", "password"];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "admissionOfficer authentication",
      });
    } catch (err) {
      throw err;
    }

    const admissionOfficer = await AdmissionOfficer.fetchAdmissionOfficerByEmail(creds.email);

    if (admissionOfficer) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(creds.password, admissionOfficer.password);
      if (isValid === true) {
        return AdmissionOfficer.createPublicadmissionOfficer(admissionOfficer);
      } else {
        throw new UnauthorizedError("Invalid password.");
      }
    }
    throw new UnauthorizedError("There is no admission officer registered with this email.");
   
  }

  /**
   * Register admissionOfficer with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns admissionOfficer
   **/

  static async register(creds) {
    const requiredCreds = [
      "email",
      "firstName",
      "lastName",
      "collegeName"
    ];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "admission officer registration",
      });
    } catch (err) {
      throw err;
    }
    if (!creds.email || !creds.password) {
      throw new BadRequestError(`Fix credentials: ${creds}`);
    }
    if (await AdmissionOfficer.fetchAdmissionOfficerByEmail(creds.email)) {
      throw new BadRequestError(`Duplicate email: ${creds.email}`);
    }

    const hashedPassword = await bcrypt.hash(
      creds.password,
      BCRYPT_WORK_FACTOR
    );

    const result = await db.query(
      `INSERT INTO admission_officers (
          work_email,
          first_name,
          last_name,
          college_name,
          password 
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING 
                  id,
                  work_email,       
                  first_name, 
                  last_name,
                  college_name`,
      [
        creds.email.toLowerCase(),
        creds.firstName.toLowerCase(),
        creds.lastName.toLowerCase(),
        creds.collegeName,
        hashedPassword
      ]
    );

    const admissionOfficer = result.rows[0];
    return admissionOfficer;
  }

  /**
   * Fetch a admission officer in the database by email
   *
   * @param {String} email
   * @returns admissionOfficer
   */
  static async fetchAdmissionOfficerByEmail(email) {
    const result = await db.query(
      `SELECT * FROM admission_officers
           WHERE work_email = $1`,
      [email.toLowerCase()]
    );

    const admissionOfficer = result.rows[0];
    return admissionOfficer;
  }

  /**
   * Add an event to the database
   *
   * @param {String} email
   * @returns event added
   */
  static async postEvent(name, desc, email, speaker, dateTime, dept, maxRegistrants, collegeName){
    const result = await db.query (
      `INSERT INTO events (
        name,
        description,
        organizer_email,
        speaker,
        date_time,
        dept,
        max_registrants,
        college
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING 
                id,
                name,
                description,
                organizer_email,
                speaker,
                date_time,
                dept,
                max_registrants,
                college`, 
                [name, desc, email, speaker, dateTime, dept, maxRegistrants, collegeName]
    )
    return result.rows;
  }

  /**
   * Get list of all events in the database at a specific college
   *
   * @returns events
   */
  static async getCollegeEvents(school){
    const result = await db.query (
      `SELECT * FROM events
      WHERE college = $1`,
      [school]
    )
    return result.rows;
  }


    /**
   * Get list of all attendees in the database at a specific event
   *
   * @returns event attendees
   */
    static async getEventAttendees(eventId){
      const result = await db.query (
        `SELECT * FROM event_attendees
        WHERE event_id = $1`,
        [eventId]
      )
      return result.rows;
    }

}
module.exports = AdmissionOfficer;