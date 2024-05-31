import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogForm"

import { setNotification, clearNotification } from "./reducers/notificationReducer"
import { getAllBlogs, likeBlog } from "./reducers/blogReducer"
import { useSelector, useDispatch } from "react-redux"

const App = () => {
  const blogs = useSelector((state) => state.blogs)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogs())
  }, []) // creo que no es lo ideal pero hace un intento de refrescar los blogs automáticamente

  const correctNotification = () => {
    dispatch(setNotification("blog added correctly - redux", "correct"))
    setTimeout(() => {
      dispatch(clearNotification())
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
      dispatch(setNotification(`${exception.response.data.error} - redux`, "error"))
      setTimeout(() => {
        dispatch(clearNotification())
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

  const handleLike = async (likedBlog) => {
    // const updatedBlog = {
    //   // ...blog,
    //   likes: blog.likes + 1,
    // }

    // await blogService.update(blog.id, updatedBlog)
    // // setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlogs : b)))

    // blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(likeBlog(likedBlog))
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
        <h1>Redux 2</h1>
        <Notification />
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
    return (
      <div>
        <h1>Redux 2</h1>
        <Notification />
        <div>
          <h2>blogs</h2>
          <h3>{loggedUser.name}</h3>

          {blogs.sort(sortByLikes).map((blog) => (
            <Blog user={user} handleLike={handleLike} handleRemove={handleRemove} key={blog.id} blog={blog} />
          ))}
        </div>

        <CreateBlogForm
          // onSubmit={handleSubmit}
          correctNotification={correctNotification}
          blogs={blogs}
          // setBlogs={setBlogs}
          user={user}
          // title={title}
          // handleTitleChange={(value) => setTitle(value)} //este es que funciona
          // author={author}
          // handleAuthorChange={({ target }) => setAuthor(target.value)}
          // url={url}
          // handleUrlChange={({ target }) => setUrl(target.value)}
        />
        <button onClick={handleLogOut}>Log out</button>
      </div>
    )
  }
}

export default App
