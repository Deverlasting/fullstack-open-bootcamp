import React, { createContext, useReducer } from "react"
import userReducer from "../reducers/userReducer"

const initialState = {
  user: null,
  username: "",
  password: "",
}
// const initialState = {
//   token: null,
//   username: "",
//   name: "",
// }

export const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, [])
  // const [user, userDispatch] = useReducer(userReducer, initialState)

  return <UserContext.Provider value={[user, userDispatch]}>{props.children}</UserContext.Provider>
}

export default UserContext
