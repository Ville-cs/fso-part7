import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"
import { MemoryRouter } from "react-router-dom"

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

test("BlogForm calls event handler with the right props", async () => {
  const handleBlogPost = vi.fn()

  renderWithRouter(<BlogForm handleBlogPost={handleBlogPost} />)

  const blogTitle = screen.getByPlaceholderText("title of the blog")
  const blogAuthor = screen.getByPlaceholderText("author of the blog")
  const blogUrl = screen.getByPlaceholderText("URL of the blog")
  const button = screen.getByText("Post")

  const blogUser = userEvent.setup()
  await blogUser.type(blogTitle, "A Cool Blog")
  await blogUser.type(blogAuthor, "Jon doe")
  await blogUser.type(blogUrl, "www.blog.com")
  await blogUser.click(button)

  expect(handleBlogPost.mock.calls).toHaveLength(1)
  expect(handleBlogPost.mock.calls[0][0].title).toBe("A Cool Blog")
  expect(handleBlogPost.mock.calls[0][0].author).toBe("Jon doe")
  expect(handleBlogPost.mock.calls[0][0].url).toBe("www.blog.com")
})
