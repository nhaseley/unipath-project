/** Express app for Vaccine Hub */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { NotFoundError } = require("./utils/errors");
const config = require("./config");
const authRoutes = require("./routes/auth");
const likeRoute = require("./routes/student")
const alumRoutes = require("./routes/alum")
const parentRoutes = require("./routes/parent")
const admissionOfficerRoutes = require("./routes/admissionOfficer")
const app = express();

app.use(cors()); 
app.use(express.json());
// app.use(morgan("tiny"))

// routes
app.use("/auth", authRoutes);
app.use(likeRoute)
app.use(alumRoutes)
app.use(parentRoutes)
app.use(admissionOfficerRoutes)

app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

/** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//   const message = "not found";
//   const status = 404;
//   res.send({ message: message, status: status });
//   return next(new NotFoundError());
// });

// /** Generic error handler; anything unhandled goes here. */
// app.use(function (err, req, res, next) {
//   if (!config.IS_TESTING) console.error(err.stack);
//   const status = 500;
//   const message = err.message;

//   return res.status(status).json({
//     error: { message, status },
//   });
// });

module.exports = app;
