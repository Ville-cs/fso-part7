import { useEffect } from "react"
import { useBlogUsersActions } from "../../stores/blogUserStore"
import { useBlogUsers } from "../../stores/blogUserStore"
import { Link } from "react-router-dom"

const Users = () => {
  const { initialize } = useBlogUsersActions()
  const users = useBlogUsers()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (!users) return

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
