import { useEffect } from "react"
import { useBlogUsersActions, useBlogUser } from "../../stores/blogUserStore"
import { useParams } from "react-router-dom"

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
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
