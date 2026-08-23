import { useEffect } from "react"
import { useBlogUsersActions, useBlogUser } from "../../stores/blogUserStore"
import { useParams } from "react-router-dom"
import { Card } from "@mui/material"

const User = () => {
  const { id } = useParams()
  const { fetchUser } = useBlogUsersActions()
  const user = useBlogUser()

  useEffect(() => {
    fetchUser(id)
  }, [fetchUser, id])

  if (!user) return
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs added by this user</h3>
      {user.blogs.map((blog) => (
        <Card key={blog.id} sx={{ marginTop: "2em", padding: "1.25em" }}>
          {blog.title}
        </Card>
      ))}
    </div>
  )
}

export default User
