import { create } from "zustand"
import blogsService from "../services/blogs"

const useBlogsStore = create((set) => ({
  blogs: [],
  blog: null,
  actions: {
    initialize: async () => {
      const blogs = await blogsService.getAll()
      set(() => ({ blogs }))
    },
    fetchBlog: async (id) => {
      const blog = await blogsService.getById(id)
      set(() => ({ blog }))
    },
    add: async (blog) => {
      const added = await blogsService.create(blog)
      set((state) => ({ blogs: [...state.blogs, added] }))
    },
    update: async (id, blog) => {
      const updatedBlog = await blogsService.update(id, blog)
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === id ? updatedBlog : b)),
      }))
      set({ blog: updatedBlog })
    },
    remove: async (id) => {
      await blogsService.remove(id)
      set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) }))
    },
  },
}))

export const useBlogs = () =>
  useBlogsStore((state) => {
    return state.blogs.sort((a, b) => b.likes - a.likes)
  })

export const useBlog = () => useBlogsStore((state) => state.blog)

export const useBlogsActions = () => useBlogsStore((state) => state.actions)
