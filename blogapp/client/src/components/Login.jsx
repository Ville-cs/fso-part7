import { useField } from "../hooks/useField"

import { TextField, Button } from "@mui/material"
import blogService from "../services/blogs"
import { useNavigate } from "react-router-dom"
import { useNotificationActions } from "../stores/notificationStore"
import { useUserActions } from "../stores/userStore"
import useLocalStorage from "../services/persistentUser"

const Login = () => {
  const { onReset: resetUsername, ...username } = useField("text")
  const { onReset: resetPassword, ...password } = useField("password")

  const navigate = useNavigate()
  const { setNotification } = useNotificationActions()
  const { save, login } = useUserActions()
  const { saveUser } = useLocalStorage()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        username: username.value,
        password: password.value,
      })
      saveUser(user)
      blogService.setToken(user.token)
      save(user)
      resetUsername()
      resetPassword()
      navigate("/")
      setNotification({ message: "Login successful", type: "success" })
    } catch (error) {
      console.log(error.message)
      setNotification({ message: "Username or password wrong", type: "error" })
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField {...username} label="username" variant="standard" />
        </div>
        <div>
          <TextField {...password} label="password" variant="standard" />
        </div>
        <Button
          type="submit"
          id="login-button"
          variant="contained"
          color="success"
          sx={{ margin: "1em 2em" }}
        >
          login
        </Button>
      </form>
    </div>
  )
}

export default Login
