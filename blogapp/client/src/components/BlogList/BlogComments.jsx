const BlogComments = ({ blog }) => {
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {blog?.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogComments
