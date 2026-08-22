import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom"
import { useBlogs } from "./stores/blogStore"
import { useUser } from "./stores/userStore"
import { useBlogsActions } from "./stores/blogStore"
import { useUserActions } from "./stores/userStore"
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
  const blogs = useBlogs()
  const user = useUser()
  const { initialize } = useBlogsActions()
  const { save, remove } = useUserActions()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      save(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [save])

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    // setUser(null)
    remove()
    navigate("/")
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
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} user={user} />} />
          <Route path="/new" element={<BlogForm blog={blog} />} />
          <Route
            path="/login"
            element={
              <Login
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
