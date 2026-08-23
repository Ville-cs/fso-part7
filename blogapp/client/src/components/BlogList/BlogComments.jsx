import { useState } from "react"
import { useBlogsActions } from "../../stores/blogStore"

const BlogComments = ({ blog }) => {
  const [comment, setCommnent] = useState("")
  const { update } = useBlogsActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { user, ...oldBlog } = blog
    const newBlog = {
      ...oldBlog,
      comments: [...oldBlog.comments, comment],
    }
    update(newBlog.id, newBlog)
  }
  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={(e) => setCommnent(e.target.value)}
          placeholder="add a comment"
        />
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
