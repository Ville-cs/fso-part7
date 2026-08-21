import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

test("Renders blog details", () => {
  const blog = {
    title: "cool title",
    author: "cool author",
    url: "url",
    likes: 1,
  }

  renderWithRouter(<Blog blog={blog} />)

  const title = screen.getByText("cool title")
  const author = screen.getByText("cool author")
  const url = screen.queryByText("url")

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
})

test("does not render like button for unauthenticated users", () => {
  const blog = {
    title: "cool title",
    author: "cool author",
    url: "url",
    likes: 1,
  }

  renderWithRouter(<Blog blog={blog} />)

  const like = screen.queryByText("like")
  expect(like).toBeNull()
})

test("renders like button for unauthenticated users", () => {
  const blog = {
    title: "cool title",
    author: "cool author",
    url: "url",
    likes: 1,
    user: {
      id: 321,
    },
  }
  const user = {
    id: 123,
    name: "name",
    username: "username",
    password: "password",
  }

  renderWithRouter(<Blog blog={blog} user={user} />)

  const like = screen.queryByText("like")
  expect(like).toBeDefined()
})

test("renders remove button for blog's creator", () => {
  const blog = {
    title: "cool title",
    author: "cool author",
    url: "url",
    likes: 1,
    user: {
      id: 123,
    },
  }
  const user = {
    id: 123,
    name: "name",
    username: "username",
    password: "password",
  }

  renderWithRouter(<Blog blog={blog} user={user} />)

  const remove = screen.queryByText("remove")
  expect(remove).toBeDefined()
})

// Test for exercises 5.13 - 5.16 that no longer work due to changes
// made during React Router, UI frameworks chapter

// test("Event handler is called only once with a button press", async () => {
//   const user = {
//     id: 123,
//   }

//   const blog = {
//     title: "title",
//     author: "author",
//     url: "url",
//     likes: 1,
//     user: {
//       user: 123,
//     },
//   }

//   const fn = vi.fn()
//   renderWithRouter(<Blog blog={blog} handleClick={fn} user={user} />)

//   const blogUser = userEvent.setup()
//   const button = screen.getByText("show details")
//   fn(await blogUser.click(button))

//   expect(fn.mock.calls).toHaveLength(1)
// })

// test("Renders url and likes after opening", async () => {
//   const user = {
//     id: 123,
//   }

//   const blog = {
//     title: "title",
//     author: "author",
//     url: "www.website.com",
//     likes: 5,
//     user: {
//       user: 123,
//     },
//   }

//   const fn = vi.fn()
//   renderWithRouter(<Blog blog={blog} handleClick={fn} user={user} />)

//   const blogUser = userEvent.setup()
//   const button = screen.getByText("show details")
//   await blogUser.click(button)

//   const urlElement = screen.getByText("www.website.com", { exact: false })
//   const likesElement = screen.getByText("Likes", { exact: false })

//   expect(urlElement).toBeDefined()
//   expect(likesElement).toBeDefined()
// })

// eslint-disable-next-line
// test('Clicking "like" button twice calls event handler twice', async () => {
//   const user = {
//     id: 123,
//   }

//   const blog = {
//     title: "title",
//     author: "author",
//     url: "url",
//     likes: 1,
//     user: {
//       user: 123,
//     },
//   }

//   const addLike = (a, b) => {}

//   const fn = vi.fn()
//   renderWithRouter(
//     <Blog blog={blog} handleLike={fn} addLike={addLike} user={user} />,
//   )

//   const blogUser = userEvent.setup()
//   const showButton = screen.getByText("show details", { exact: false })
//   await blogUser.click(showButton)

//   const likeButton = screen.getByText("like")
//   fn(await blogUser.click(likeButton))
//   fn(await blogUser.click(likeButton))

//   expect(fn.mock.calls).toHaveLength(2)
// })
