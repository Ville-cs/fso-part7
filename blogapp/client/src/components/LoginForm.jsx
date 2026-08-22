import { TextField, Button } from "@mui/material"
import blogService from "../services/blogs"
import { useNavigate } from "react-router-dom"
import { useNotificationActions } from "../stores/notificationStore"
import { useUserActions } from "../stores/userStore"

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  const navigate = useNavigate()
  const { setNotification } = useNotificationActions()
  const { save, login } = useUserActions()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      save(user)
      setUsername("")
      setPassword("")
      navigate("/")
      setNotification({ message: "Login successful", type: "success" })
    } catch (error) {
      console.log(error.message)
      setNotification({ message: "Username or password wrong", type: "error" })
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          variant="standard"
        />
      </div>
      <div>
        <TextField
          label="password"
          value={password}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          variant="standard"
        />
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
  )
}

export default LoginForm
