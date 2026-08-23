import { Link } from "react-router-dom"
import { Card } from "@mui/material"
import { useBlogs } from "../../stores/blogStore"

const BlogList = () => {
  const blogs = useBlogs()
  return (
    <div>
      <h2>Blogs</h2>
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
