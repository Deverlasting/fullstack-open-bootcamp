import "../index.css"

export const Notification = ({ notificationMessage, typeMessage }) => {
  if (notificationMessage === null) {
    return null
  }
  if (typeMessage === "correct") {
    return (
      <div>
        <h1 className="correctMessage"> {notificationMessage}</h1>
      </div>
    )
  }

  if (typeMessage === "error") {
    return (
      <div>
        <h1 className="errorMessage"> {notificationMessage}</h1>
      </div>
    )
  }
}
export default Notification
