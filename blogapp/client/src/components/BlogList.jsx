import Notification from "./Notification"
import { Link } from "react-router-dom"
import { Card } from "@mui/material"

const BlogList = ({ blogs, notification }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {blogs.map((blog) => (
        <Card key={blog.id} sx={{ marginTop: "2em" }}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </Card>
      ))}
    </div>
  )
}

export default BlogList
