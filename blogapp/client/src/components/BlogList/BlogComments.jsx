import { useField } from "../../hooks/useField"
import { useBlogsActions } from "../../stores/blogStore"
import { Card } from "@mui/material"

const BlogComments = ({ blog }) => {
  const { onReset: reset, ...comment } = useField("text")
  const { update } = useBlogsActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { user, ...oldBlog } = blog
    const newBlog = {
      ...oldBlog,
      comments: [...oldBlog.comments, comment.value],
    }
    update(newBlog.id, newBlog)
    reset()
  }
  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input {...comment} />
        <button style={styles.button} type="submit">
          ADD COMMENT
        </button>
      </form>
      {blog?.comments.map((comment) => (
        <Card
          key={comment}
          sx={{ marginTop: "1em", marginBottom: "2em", padding: "1em" }}
        >
          {comment}
        </Card>
      ))}
    </div>
  )
}

const styles = {
  button: {
    backgroundColor: "blue",
    color: "white",
    padding: "0.75em",
    marginLeft: "10px",
  },
}

export default BlogComments
