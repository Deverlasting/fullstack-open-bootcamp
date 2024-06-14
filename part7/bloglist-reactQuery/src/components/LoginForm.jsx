import PropTypes from "prop-types"
import { useContext } from "react"
import LoginFormContext from "../context/LoginFormContext"
import { setPasswordAction, setUsernameAction } from "../reducers/loginFormReducer"
import "../styles/loginForm.css"
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
    <div className="login-container">
      <h2>Log in to application</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            data-testid="username"
            type="text"
            value={loginUser.username}
            name="Username"
            onChange={handleUsernameChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            data-testid="password"
            type="password"
            value={loginUser.password}
            name="Password"
            onChange={handlePasswordChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
