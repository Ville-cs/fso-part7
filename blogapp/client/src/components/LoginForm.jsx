import { TextField, Button } from "@mui/material"

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
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
