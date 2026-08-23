import User from "./User"
import { useEffect } from "react"
import { useBlogUsersActions } from "../../stores/blogUserStore"
import { useBlogUsers } from "../../stores/blogUserStore"

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
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
