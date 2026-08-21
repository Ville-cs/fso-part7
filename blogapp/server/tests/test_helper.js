const Blog = require("../models/blog")
const User = require("../models/user")

// const initialUsers = [
//   {
//     username: 'test username',
//     name: 'test name',
//     passwordHash,
//   },
// ]

const initialBlogs = [
  {
    title: "blog1",
    author: "some guy",
    url: "http.url.com",
    likes: 5,
  },
  {
    title: "blog2",
    author: "some guy2",
    url: "http.url2.com",
    likes: 52,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  // initialUsers,
  initialBlogs,
  blogsInDb,
  usersInDb,
}
