import { useSelector } from "react-redux"
import "../index.css"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification || !notification.message) {
    return null
  }
  const { message, messageType } = notification

  if (message === null) {
    return null
  }

  if (messageType === "correct") {
    return (
      <div>
        <h1 className="correctMessage"> {message}</h1>
      </div>
    )
  }

  if (messageType === "error") {
    return (
      <div>
        <h1 className="errorMessage"> {message}</h1>
      </div>
    )
  }

  return null
}

export default Notification
