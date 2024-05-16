// import { useSelector } from "react-redux"

// const Notification = () => {
//   const notification = useSelector((state) => state.notification)

//   const style = {
//     border: "solid",
//     padding: 10,
//     borderWidth: 1,
//   }

//   return notification ? <div style={style}>{notification}</div> : null
// }

// export default Notification
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification.duration > 0) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, notification.duration * 1000)

      return () => clearTimeout(timer)
    }
  }, [dispatch, notification.duration])

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  return notification.message ? <div style={style}>{notification.message}</div> : null
}

export default Notification
