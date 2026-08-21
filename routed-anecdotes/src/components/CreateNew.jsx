import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

// 7-3
const CreateNew = ({ addAnecdote }) => {
  const { onReset: resetContent, ...content } = useField("text", "content")
  const { onReset: resetAuthor, ...author } = useField("text", "author")
  const { onReset: resetInfo, ...info } = useField("text", "info")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate("/")
  }

  const resetForm = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
