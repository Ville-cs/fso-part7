import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Typography } from "@mui/material"

const BlogForm = ({ handleBlogPost }) => {
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
    event.preventDefault()
    handleBlogPost({
      title: title,
      author: author,
      url: url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
    navigate("/")
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
