import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { setUsernameAction, setPasswordAction } from "../reducers/userReducer"

export const LoginForm = ({ handleLogin }) => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsernameAction(target.value))}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPasswordAction(target.value))}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  // handleUsernameChange: PropTypes.func.isRequired,
  // handlePasswordChange: PropTypes.func.isRequired,
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
}

export default LoginForm
