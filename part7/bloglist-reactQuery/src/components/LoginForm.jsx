import PropTypes from "prop-types"
import { useContext } from "react"
import LoginFormContext from "../context/LoginFormContext"
import { setPasswordAction, setUsernameAction } from "../reducers/loginFormReducer"

export const LoginForm = ({ onSubmit }) => {
  const [loginUser, loginUserDispatch] = useContext(LoginFormContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(loginUser)
    //  onSubmit({username: loginUser.username, password: loginUser.password, })
  }

  const handleUsernameChange = (event) => {
    loginUserDispatch(setUsernameAction(event.target.value))
  }

  const handlePasswordChange = (event) => {
    loginUserDispatch(setPasswordAction(event.target.value))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={loginUser.username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={loginUser.password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
