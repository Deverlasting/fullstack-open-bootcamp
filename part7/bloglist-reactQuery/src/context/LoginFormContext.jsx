//just handle the login username and password
import React, { createContext, useReducer } from "react"
import loginUserReducer from "../reducers/loginFormReducer"

export const loginFormUserInitialState = {
  username: "",
  password: "",
}

const LoginFormContext = createContext()

export const LoginFormContextProvider = (props) => {
  // const [user, userDispatch] = useReducer(userReducer, null)
  const [loginUser, loginUserDispatch] = useReducer(loginUserReducer, loginFormUserInitialState)

  return <LoginFormContext.Provider value={[loginUser, loginUserDispatch]}>{props.children}</LoginFormContext.Provider>
}

export default LoginFormContext
