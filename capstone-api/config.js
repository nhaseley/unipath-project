
require("dotenv").config()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3002
const IS_TESTING = process.env.NODE_ENV === "test"
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev"
const render = process.env.DATABASE_HOSTED_URL

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
    const dbBcryptWorkFactor = parseInt(process.env.BCRYPTWORKFACTOR) || 13;
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5433
    const dbTestName = process.env.DATABASE_TEST_NAME || "capstone_test"
    const dbProdName = process.env.DATABASE_NAME || "capstone"
    const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName
  
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  }

  module.exports ={

    PORT,
    IS_TESTING,
    getDatabaseUri,
    // SECRET_KEY
  }