import { useField } from "../../hooks/useField"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Typography } from "@mui/material"
import { useNotificationActions } from "../../stores/notificationStore"
import { useBlogsActions } from "../../stores/blogStore"

const BlogForm = () => {
  const { setNotification } = useNotificationActions()
  const { add } = useBlogsActions()
  const { onReset: resetTitle, ...title } = useField("text")
  const { onReset: resetAuthor, ...author } = useField("text")
  const { onReset: resetUrl, ...url } = useField("text")
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
      }
      add(newBlog)
      setNotification({
        message: `Added new blog: ${title} by ${author}`,
        type: "success",
      })
      resetTitle()
      resetAuthor()
      resetUrl()
      navigate("/blogs")
    } catch (error) {
      console.log(error)
      setNotification({
        message: `Encountered an error: ${error.message}`,
        type: "error",
      })
    }
  }

  const styles = {
    textFieldMargin: {
      marginBottom: 25,
    },
  }

  return (
    <form id="testForm" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ margin: "1em 0em" }}>
        create new
      </Typography>
      <div style={styles.textFieldMargin}>
        <TextField {...title} label="title" variant="standard" />
      </div>
      <div style={styles.textFieldMargin}>
        <TextField {...author} label="author" variant="standard" />
      </div>
      <div style={styles.textFieldMargin}>
        <TextField {...url} label="url" variant="standard" />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ margin: "1em 2em" }}
      >
        Post
      </Button>
    </form>
  )
}

export default BlogForm
