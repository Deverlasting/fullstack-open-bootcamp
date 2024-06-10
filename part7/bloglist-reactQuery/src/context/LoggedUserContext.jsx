import React, { createContext, useReducer } from "react"
import loggedUserReducer from "../reducers/loggedUserReducer"
import blogService from "../services/blogs"

const getLoggedUserFromLocalStorage = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
  if (loggedUserJSON) {
    const loginUser = JSON.parse(loggedUserJSON)
    return loginUser
  }

  const defaultInitialState = {
    token: null,
    username: "",
    name: "",
  }
  return defaultInitialState
}
export const loggedUserInitialState = getLoggedUserFromLocalStorage()
blogService.setToken(loggedUserInitialState.token)

const LoggedUserContext = createContext()

export const LoggedUserContextProvider = (props) => {
  // const [user, userDispatch] = useReducer(userReducer, null)
  const [user, userDispatch] = useReducer(loggedUserReducer, loggedUserInitialState)

  return <LoggedUserContext.Provider value={[user, userDispatch]}>{props.children}</LoggedUserContext.Provider>
}

export default LoggedUserContext
