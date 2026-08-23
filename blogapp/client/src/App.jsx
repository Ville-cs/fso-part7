import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useUser } from "./stores/userStore"
import { useBlogsActions } from "./stores/blogStore"
import { useUserActions } from "./stores/userStore"
import useLocalStorage from "./services/persistentUser"

import Home from "./components/Home"
import BlogList from "./components/BlogList"
import Blog from "./components/BlogList/Blog"
import BlogForm from "./components/BlogList/BlogForm"
import Login from "./components/Login"
import ErrorBoundary from "./components/ErrorBoundary"
import NotFound from "./components/NotFound"
import Notification from "./components/Notification"
import Users from "./components/Users"
import User from "./components/Users/User"
import AppBar from "./components/AppBar"

import blogService from "./services/blogs"
import { Container } from "@mui/material"

const App = () => {
  const user = useUser()
  const { initialize } = useBlogsActions()
  const { save } = useUserActions()
  const { getUser } = useLocalStorage()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    const loggedUser = getUser
    if (loggedUser) {
      save(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [save, getUser])

  return (
    <Container>
      <AppBar user={user} />
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog user={user} />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
