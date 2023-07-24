const db = require('../db')

class Alum {
  /**
   * Convert a alum from the database into a alum object that can be viewed publically.
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
      college: alum.college,
      collegeGradYear: alum.college_grad_year
    };
  }

 /**
   * Authenticate parent with email and password.
   *
   * Throws UnauthorizedError if parent not found or wrong password.
   *
   * @returns parent
   **/

//  static async authenticate(creds) {
//   // const { email, password } = creds
//   const requiredCreds = ["email", "password"];
//   try {
//     validateFields({
//       required: requiredCreds,
//       obj: creds,
//       location: "parent authentication",
//     });
//   } catch (err) {
//     throw err;
//   }

//   const parent = await Parent.fetchParentByEmail(creds.email);

//   if (parent) {
//     // compare hashed password to a new hash from password
//     const isValid = await bcrypt.compare(creds.password, parent.password);
//     if (isValid === true) {
//       return Parent.createPublicparent(parent);
//     }
//   }

//   throw new UnauthorizedError("Invalid email or password");
// }

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
    "college",
    "collegeGradYear"
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
  if (await Alum.fetchParentByEmail(creds.email)) {
    throw new BadRequestError(`Duplicate email: ${creds.email}`);
  }

  const hashedPassword = await bcrypt.hash(
    creds.password,
    BCRYPT_WORK_FACTOR
  );

  const result = await db.query(
    `INSERT INTO parents (
        email,
        password,
        first_name,
        last_name,
        college,
        college_grad_year 
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING 
                id,
                email,       
                first_name, 
                last_name,
                college,
                college_grad_year`,
    [
      creds.email.toLowerCase(),
      hashedPassword,
      creds.firstName.toLowerCase(),
      creds.lastName.toLowerCase(),
      creds.college.toLowerCase(),
      creds.collegeGradYear,
    ]
  );

  const alum = result.rows[0];
  console.log("alum inserted on register in back: ", alum)
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
            college,
            college_grad_year       
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



}


module.exports = Alum