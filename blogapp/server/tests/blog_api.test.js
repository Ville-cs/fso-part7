const { describe, test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const Blog = require("../models/blog")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

describe("tests for blogs", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", name: "root name", passwordHash })
    await user.save()

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
    const blogPromiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(blogPromiseArray)
  })

  test("blogs return the same length", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("blogs identifier is .id and not ._id", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual("id" in response.body[0], true)
  })

  test("blogs cant be added without authorization", async () => {
    const users = await helper.usersInDb()
    const newBlog = {
      title: "new blog",
      author: "blog author",
      url: "http.url.com",
      likes: 7,
      userId: users[0].id,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("content-type", /application\/json/)
  })

  test("blogs can be added to db", async () => {
    const users = await helper.usersInDb()
    const newBlog = {
      title: "new blog",
      author: "blog author",
      url: "http.url.com",
      likes: 7,
      userId: users[0].id,
    }

    const userForToken = {
      username: users[0].username,
      id: users[0].id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("content-type", /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)

    const title = blogsAfter.map((e) => e.title)
    assert(title.includes("new blog"))
  })

  test("null likes field equals zero", async () => {
    const users = await helper.usersInDb()
    const blog = {
      title: "blog name",
      author: "author name",
      url: "url address",
      likes: null,
      userId: users[0].id,
    }
    const userForToken = {
      username: users[0].username,
      id: users[0].id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("content-type", /application\/json/)

    const response = await helper.blogsInDb()
    assert.strictEqual(response[response.length - 1].likes, 0)
  })

  test("return 400 if no title or url", async () => {
    const users = await helper.usersInDb()
    const blog = {
      title: "",
      author: "author name",
      url: "url address",
      likes: 1,
      userId: users[0].id,
    }
    const userForToken = {
      username: users[0].username,
      id: users[0].id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    await Blog.deleteMany({})
    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("content-type", /application\/json/)
  })

  test("blogs can be deleted by id", async () => {
    await Blog.deleteMany({})
    const users = await helper.usersInDb()
    const blog = {
      title: "title",
      author: "author name",
      url: "url address",
      likes: 1,
      userId: users[0].id,
    }
    const userForToken = {
      username: users[0].username,
      id: users[0].id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)

    const blogs = await helper.blogsInDb()
    const blogId = blogs[0].id

    await api
      .delete("/api/blogs/" + blogId)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, blogs.length - 1)

    const titles = blogsAfter.map((blog) => blog.title)
    assert(!titles.includes(blog.title))
  })

  test("blogs can be updated by id", async () => {
    const blogs = await helper.blogsInDb()
    const toBeUpdated = blogs[0]

    const updatedBlog = {
      title: "test update",
      author: "test update",
      url: "new url",
      likes: 999,
    }

    await api
      .put(`/api/blogs/${toBeUpdated.id}`)
      .send(updatedBlog)
      .set("content-type", "application/json")
      .expect(200)
  })
})

describe("test for users", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", name: "root name", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "test username",
      name: "test name",
      password: "test password",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes("expected `username` to be unique"))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
