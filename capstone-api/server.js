
const app = require('./app')
const { PORT } = require("./config")

const router = require('./routes/auth')
// const Student = require("./models/student")
// app.use('/auth', router)


app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})



