import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogForm"

import { setNotification, clearNotification } from "./reducers/notificationReducer"
import { getAllBlogs, likeBlog, removeBlog } from "./reducers/blogReducer"
import { useSelector, useDispatch } from "react-redux"
import {
  loginUser,
  // setUserFromLocalStorageAction,
  setUserAction,
  // setUsernameAction,
  // setPasswordAction,
} from "./reducers/userReducer"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)
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
      // setUser(user)
      // dispatch(loginUser(user.username, user.password))
      dispatch(setUserAction(user))
      // dispatch(setUserFromLocalStorageAction(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))
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
    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async (blog) => {
    dispatch(removeBlog(blog))
  }

  //RENDER
  if (user === null) {
    return (
      <div>
        <h1>Redux</h1>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <h1>Redux</h1>
        <Notification />
        <div>
          <h2>blogs</h2>
          <h3>{loggedUser.name}</h3>

          {/* {blogs.sort(sortByLikes).map((blog) => ( */}
          {[...blogs].sort(sortByLikes).map((blog) => (
            <Blog user={user} handleLike={handleLike} handleRemove={handleRemove} key={blog.id} blog={blog} />
          ))}
        </div>

        <CreateBlogForm correctNotification={correctNotification} blogs={blogs} user={user} />
        <button onClick={handleLogOut}>Log out</button>
      </div>
    )
  }
}

export default App
