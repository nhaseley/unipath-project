const studentModel = require('../models/student.js'); // importing user model to use the functions in there

const authenticateJWT = async (req, res, next) => {
    // Extract the token from the authorization header (if it exists)
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]; // splitting the token from the authorization header

    if (!token) { // if there is no token
        return res.status(401).json({ message: "No token provided" }); // return an error

    }
    try {
        const decoded = studentModel.verifyAuthToken(token); // decoding the token

        if (!decoded) { // if the token is not valid
            return res.status(401).json({ message: "Invalid token" }); // return an error
        }

        const student = await studentModel.fetchUserById(decoded.id); // fetching the user by id

        if (!student) {
            return res.status(401).json({ message: "Invalid token" }); // return an error
        } // if there is no user

        req.student = student; // setting the user in the request object  
        next(); // calling the next middleware
    

    }catch (err){
        return res.status(401).json({ message: "Invalid token" }); // return an error

    }
}

module.exports = authenticateJWT; // exporting the middleware