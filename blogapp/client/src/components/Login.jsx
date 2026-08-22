import LoginForm from "./LoginForm"

const Login = ({ username, password, setUsername, setPassword }) => {
  return (
    <div>
      <h2>Login to see blogs</h2>
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  )
}

export default Login
