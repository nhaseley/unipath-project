const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { validateFields } = require("./validate")

const generateToken = (data) => jwt.sign(data, SECRET_KEY)

const createUserJwt = (user) => {
  validateFields({ required: ["id", "email"], obj: user, location: "token generation" })

  const payload = {
    id: user.id,
    email: user.email
  }

  return generateToken(payload)
}

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded
  } catch (err) {
    return {}
  }
}

module.exports = {
  generateToken,
  validateToken,
  createUserJwt,
}