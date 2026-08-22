import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom"
import { useNotificationActions } from "./notificationStore"
import Home from "./components/Home"
import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Login from "./components/Login"
import ErrorBoundary from "./components/ErrorBoundary"
import NotFound from "./components/NotFound"
import Notification from "./components/Notification"

import blogService from "./services/blogs"
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [renderBlog, setRenderBlog] = useState(false)
  const navigate = useNavigate()
  const { setNotification } = useNotificationActions()

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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    navigate("/")
  }

  const deleteBlog = async (blog) => {
    await blogService.remove(blog.id)
    setRenderBlog(!renderBlog)
    setNotification({ message: "Blog deleted", type: "success" })
  }

  const addLike = async (blog, blogObject) => {
    await blogService.update(blog.id, blogObject)
    setRenderBlog(!renderBlog)
    setNotification({ message: "Liked blog", type: "success" })
  }

  const match = useMatch("/blogs/:id")
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
              home
            </Button>
            <Button color="inherit" component={Link} to="/blogs" sx={style}>
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
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList blogs={blogs} />} />
          <Route
            path="/blogs/:id"
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
            element={
              <BlogForm
                blog={blog}
                renderBlog={renderBlog}
                setBlogs={blog}
                setRenderBlog={blog}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
