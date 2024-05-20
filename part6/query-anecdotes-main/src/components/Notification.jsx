import React from "react"

const Notification = ({ message, isVisible }) => {
  if (!isVisible) {
    return null
  }

  return <div>{message}</div>
}

export default Notification
