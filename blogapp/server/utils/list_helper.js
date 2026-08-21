const logger = require("./logger")

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (fav, blog) => {
    if (blog.likes > fav.likes) {
      return {
        _id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        __v: blog.__v,
      }
    }
    return fav
  }
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const seenBlogs = {}
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].author in seenBlogs) {
      seenBlogs[blogs[i].author]++
    } else {
      seenBlogs[blogs[i].author] = 1
    }
  }
  const pair = Object.entries(seenBlogs).reduce((a, b) => (a[1] > b[1] ? a : b))
  const obj = {
    author: pair[0],
    blogs: pair[1],
  }
  return obj
}

const mostLIkes = (blogs) => {
  const seenBlogs = []
  const seenAuthors = []
  for (const blog of blogs) {
    if (seenAuthors.includes(blog.author)) {
      let index = seenBlogs.findIndex((item) => item.author === blog.author)
      seenBlogs[index].likes += blog.likes
    } else {
      seenAuthors.push(blog.author)
      seenBlogs.push({
        author: blog.author,
        likes: blog.likes,
      })
    }
  }
  const mostLiked = seenBlogs.reduce((a, b) => {
    return a.likes > b.likes ? a : b
  })
  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLIkes,
}
