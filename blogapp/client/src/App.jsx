import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom"
import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Login from "./components/Login"
import blogService from "./services/blogs"
import loginService from "./services/login"
// import "./styles.css"
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  // const [message, setMessage] = useState("")
  // const [errorMessage, setErrorMessage] = useState("")
  const [renderBlog, setRenderBlog] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [renderBlog])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      navigate("/")
      setNotification({ message: "Login successful", type: "success" })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log(error.message)
      setNotification({ message: "Username or password wrong", type: "error" })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    navigate("/")
  }

  const handleBlogPost = async (object) => {
    try {
      const postedBlog = await blogService.create(object)
      setBlogs(blogs.concat(postedBlog))
      setRenderBlog(!renderBlog)
      setNotification({ message: "Blog submitted", type: "success" })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log(error.message)
      setNotification({ message: "Some fields missing", type: "error" })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    await blogService.remove(blog.id)
    setRenderBlog(!renderBlog)
    setNotification({ message: "Blog deleted!", type: "success" })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addLike = async (blog, blogObject) => {
    await blogService.update(blog.id, blogObject)
    setRenderBlog(!renderBlog)
    setNotification({ message: "Liked blog", type: "success" })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const match = useMatch("/:id")
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }

  return (
    <Container>
      <AppBar position="static">
        <Container
          sx={{
            "& > *": {
              paddingLeft: "7em",
              paddingRight: "7em",
            },
          }}
        >
          <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color="inherit" component={Link} to="/" sx={style}>
              blogs
            </Button>
            {user ? (
              <span>
                <Button color="inherit" component={Link} to="/new" sx={style}>
                  add blog
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  onClick={handleLogout}
                  sx={style}
                >
                  logout
                </Button>
              </span>
            ) : (
              <Button color="inherit" component={Link} to="/login" sx={style}>
                login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route
          path="/"
          element={<BlogList blogs={blogs} notification={notification} />}
        />
        <Route
          path="/:id"
          element={
            <Blog
              blog={blog}
              user={user}
              deleteBlog={deleteBlog}
              addLike={addLike}
            />
          }
        />
        <Route
          path="/new"
          element={<BlogForm handleBlogPost={handleBlogPost} />}
        />
        <Route
          path="/login"
          element={
            <Login
              notification={notification}
              handleLogin={handleLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </Container>
  )
}

export default App
