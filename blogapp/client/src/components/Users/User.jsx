const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default User
