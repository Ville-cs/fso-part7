const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
require("express-async-errors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")
const morgan = require("morgan")
const path = require("path")

mongoose.set("strictQuery", false)
logger.info("connecting to", config.MONGODB_URI)
const mongoUrl = config.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("connected to mongodb")
  })
  .catch((error) => {
    logger.error("error while connecting to mongodb", error.message)
  })

morgan.token("body", (req) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body ",
  ),
)
app.use(middleware.tokenExtractor)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing")
  app.use("/api/testing", testingRouter)
}

app.use("/api", middleware.unknownEndpoint)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  })
}
app.use(middleware.errorHandler)

module.exports = app
