import { useField } from "../../hooks/useField"
import { useBlogsActions } from "../../stores/blogStore"

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
        <button type="submit">ADD COMMENT</button>
      </form>
      <ul>
        {blog?.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogComments
