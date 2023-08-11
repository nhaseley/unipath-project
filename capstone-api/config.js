
require("dotenv").config()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3010
const IS_TESTING = process.env.NODE_ENV === "test"
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev"
const render = process.env.DATABASE_HOSTED_URL

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
    const dbBcryptWorkFactor = parseInt(process.env.BCRYPTWORKFACTOR) || 13;
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbTestName = process.env.DATABASE_TEST_NAME || "capstone_test"
    const dbProdName = process.env.DATABASE_NAME || "capstone"
    const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName
    const render = process.env.DATABASE_HOSTED_URL

  
    // return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
    return render || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  }
  const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13

  module.exports ={

    PORT,
    IS_TESTING,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
    // SECRET_KEY
  }
