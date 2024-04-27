export const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handelPasswordChange }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input type="password" value={password} name="Password" onChange={handelPasswordChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
