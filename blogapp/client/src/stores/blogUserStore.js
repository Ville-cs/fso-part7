import { create } from "zustand"
import usersService from "../services/users"

const useBlogUserStore = create((set) => ({
  users: [],
  actions: {
    initialize: async () => {
      const users = await usersService.getAll()
      set(() => ({ users }))
    },
  },
}))

export const useBlogUsers = () => useBlogUserStore((state) => state.users)

export const useBlogUsersActions = () =>
  useBlogUserStore((state) => state.actions)
