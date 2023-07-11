
const app = require('./app')
const { PORT } = require("./config")

const router = require('./routes/auth')
const Student = require("./models/student")
app.use('/auth', router)


router.post("/register", async function (req, res, next) {
  console.log("input in backend: ", req.body)
  
  try {
    const student = await Student.register(req.body)
    console.log("student in table: ", student)
  //   const token = await User.generateAuthToken(user)
  //   return res.status(201).json({ user, token})
  } catch (err) {
    res.send(err)
    next(err)
  }
})


app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

