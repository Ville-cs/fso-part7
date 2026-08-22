import LoginForm from "./LoginForm"

const Login = ({ setUser, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <h2>Login to see blogs</h2>
      <LoginForm
        setUser={setUser}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  )
}

export default Login
