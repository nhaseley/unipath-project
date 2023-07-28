const jwt = require("jsonwebtoken"); // importing the jsonwebtoken library
const crypto = require("crypto");
const secretKey = crypto.randomBytes(64).toString("hex");

class User {
  static async generateAuthToken(user, userType) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      parentPhone: user.parentPhone,
      zipcode: user.zipcode,
      satScore: user.satScore,
      actScore: user.actScore,
      enrollment: user.enrollment,
      schoolType: user.schoolType,
      college: user.college,
      collegeGradYear: user.collegeGradYear,
      userType: userType,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
    // console.log("payload: ", payload);
    return token;
  }

  static async verifyAuthToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey); // decoding the token
      return decoded; // returning the decoded token
    } catch {
      return null; // return null if the token seems to be invalid or expired
    }
  }
}
module.exports = User;
