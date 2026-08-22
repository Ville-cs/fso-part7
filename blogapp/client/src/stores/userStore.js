import { create } from "zustand"
import loginService from "../services/login"

const useUserStore = create((set) => ({
  user: null,
  actions: {
    save: (details) => {
      set(() => ({ user: { ...details } }))
    },
    remove: () => {
      set(() => ({ user: null }))
    },
    login: async (details) => {
      const user = await loginService.login(details)
      set(() => ({ user }))
      return user
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)

export const useUserActions = () => useUserStore((state) => state.actions)
