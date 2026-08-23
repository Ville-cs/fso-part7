import { create } from "zustand"
import usersService from "../services/users"

const useBlogUserStore = create((set, get) => ({
  users: [],
  user: null,
  actions: {
    initialize: async () => {
      const users = await usersService.getAll()
      set(() => ({ users }))
    },
    fetchUser: async (id) => {
      const user = await usersService.getById(id)
      set(() => ({ user }))
    },
  },
}))

export const useBlogUsers = () => useBlogUserStore((state) => state.users)

export const useBlogUser = () => useBlogUserStore((state) => state.user)

export const useBlogUsersActions = () =>
  useBlogUserStore((state) => state.actions)
