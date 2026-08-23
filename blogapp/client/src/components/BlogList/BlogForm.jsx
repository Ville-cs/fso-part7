import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Typography } from "@mui/material"
import { useNotificationActions } from "../../stores/notificationStore"
import { useBlogsActions } from "../../stores/blogStore"

const BlogForm = () => {
  const { setNotification } = useNotificationActions()
  const { add } = useBlogsActions()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      add(newBlog)
      setNotification({
        message: `Added new blog: ${title} by ${author}`,
        type: "success",
      })
      setTitle("")
      setAuthor("")
      setUrl("")
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
        <TextField
          label="title"
          value={title}
          onChange={handleTitleChange}
          variant="standard"
        />
      </div>
      <div style={styles.textFieldMargin}>
        <TextField
          label="author"
          value={author}
          onChange={handleAuthorChange}
          variant="standard"
        />
      </div>
      <div style={styles.textFieldMargin}>
        <TextField
          label="url"
          value={url}
          onChange={handleUrlChange}
          variant="standard"
        />
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
