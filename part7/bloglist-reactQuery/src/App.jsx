import { useState, useEffect, useReducer } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogForm"
import notificationReducer, { setNotificationAction, clearNotificationAction } from "./reducers/notificationReducer"
// import { QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const initialState = {
    message: null,
    messageType: null,
  }
  // En notificationState se guarda la info.
  // Dispatch puede acceder a las funciones de notificationReducer(setNotificationAction, clearNotificationAction)
  const [notificationState, dispatch] = useReducer(notificationReducer, initialState)

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
  })

  const blogs = result.data
  console.log(blogs)

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs))
  // }, []) // no es lo ideal pero hace un intento de refrescar los blogs automáticamente

  const correctNotification = () => {
    dispatch(setNotificationAction("blog added correctly - useReducer (React query Exercise)", "correct"))
    setTimeout(() => {
      dispatch(clearNotificationAction())
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(setNotificationAction(exception.response.data.error, "error"))
      setTimeout(() => {
        dispatch(clearNotificationAction())
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    location.reload()
  }

  // Obtener el valor de "loggedBlogAppUser" del localStorage
  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
  // Convertir el valor JSON a un objeto JavaScript
  const loggedUser = JSON.parse(loggedUserJSON)

  const sortByLikes = (a, b) => {
    return b.likes - a.likes // Orden descendente
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      // ...blog,
      likes: blog.likes + 1,
    }

    await blogService.update(blog.id, updatedBlog)
    // setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlogs : b)))

    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogService.remove(blog.id)

      blogService.getAll().then((blogs) => setBlogs(blogs))
      // onRemove()
    }
  }

  //RENDER
  if (user === null) {
    return (
      <div>
        <Notification notificationMessage={notificationState.message} typeMessage={notificationState.messageType} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  } else {
    if (result.data) {
      return (
        <div>
          <Notification notificationMessage={notificationState.message} typeMessage={notificationState.messageType} />
          <div>
            <h2>blogs</h2>
            <h3>{loggedUser.name}</h3>

            {blogs.sort(sortByLikes).map((blog) => (
              <Blog user={user} handleLike={handleLike} handleRemove={handleRemove} key={blog.id} blog={blog} />
            ))}
          </div>

          <CreateBlogForm
            correctNotification={correctNotification}
            blogs={blogs}
            // handleCreateBlog={handleCreateBlog}
            user={user}
          />
          {/* <CreateBlogForm correctNotification={correctNotification} blogs={blogs} setBlogs={setBlogs} user={user} /> */}
          <button onClick={handleLogOut}>Log out</button>
        </div>
      )
    } else {
      return <div>loading data...</div>
    }
  }
}

export default App
