import { useUserActions } from "../stores/userStore"
import useLocalStorage from "../services/persistentUser"
import {
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Typography,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const AppBar = ({ user }) => {
  const { remove } = useUserActions()
  const { removeUser } = useLocalStorage()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeUser()
    remove()
    navigate("/")
  }

  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }

  return (
    <MuiAppBar position="static">
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
          <Button color="inherit" component={Link} to="/users" sx={style}>
            users
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
    </MuiAppBar>
  )
}

export default AppBar
