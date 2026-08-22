import { useNavigate } from "react-router-dom"
import { useBlogsActions } from "../stores/blogStore"
import { useNotificationActions } from "../stores/notificationStore"
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
} from "@mui/material"

const Blog = ({ blog, user }) => {
  const navigate = useNavigate()
  const { like, remove } = useBlogsActions()
  const { setNotification } = useNotificationActions()

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    like(blog.id, blogObject)
    setNotification({ message: "Liked blog", type: "success" })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      remove(blog.id)
      setNotification({ message: "Blog deleted", type: "success" })
      navigate("/blogs")
    }
  }

  if (!blog) return

  return (
    <div data-testid="allblogs">
      <Card variant="outlined" sx={{ marginTop: "3em" }}>
        <CardHeader
          title={blog.title}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
              fontSize: "2rem",
            },
          }}
        />
        <CardContent>
          <Typography sx={{ marginTop: "1em", fontSize: "25px" }}>
            by {blog.author}
          </Typography>

          <Typography sx={{ marginTop: "1em", fontSize: "20px" }}>
            <a href={blog.url}>{blog.url}</a>
          </Typography>
          <div>
            <Typography sx={{ marginTop: "1em", fontSize: "22px" }}>
              Likes <span data-testid="likes">{blog.likes}</span>
            </Typography>
            {user && (
              <Button variant="contained" color="success" onClick={handleLike}>
                like
              </Button>
            )}
          </div>
          {(user && user.id === blog.user.id) || user.id === blog.user ? (
            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: "1em" }}
              onClick={handleRemove}
            >
              remove
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}

export default Blog
