import { create } from "zustand"

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: (msg) =>
      set(() => ({
        notification: {
          message: msg.message,
          type: msg.type,
        },
      })),
    emptyNotification: () => set(() => ({ notification: null })),
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.notification)

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)
