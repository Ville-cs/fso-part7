const mongoose = require("mongoose")
const Blog = require("./models/blog")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://villepoi:${password}@fsopen.2aw0g.mongodb.net/testBlogsApp?
  retryWrites=true&w=majority&appName=FSopen`

mongoose.set("strictQuery", false)

mongoose.connect(url)

// const blog = new Blog({
//   title: "blog1",
//   author: "some guy",
//   url: "http.url.com",
//   likes: 5,
// })

// blog.save().then((result) => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Blog.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
