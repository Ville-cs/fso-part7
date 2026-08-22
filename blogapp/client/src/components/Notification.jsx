import { Alert } from "@mui/material"
import { useNotification } from "../notificationStore"
import { useNotificationActions } from "../notificationStore"

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
