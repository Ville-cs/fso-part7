import { Alert } from "@mui/material"
import { useNotification } from "../stores/notificationStore"
import { useNotificationActions } from "../stores/notificationStore"

const Notification = () => {
  const notification = useNotification()
  const { emptyNotification } = useNotificationActions()

  if (!notification) return null
  setTimeout(() => {
    emptyNotification()
  }, 3000)

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={notification.type}
    >
      {notification.message}
    </Alert>
  )
}

export default Notification
