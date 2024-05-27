import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogForm"

import { setNotification, clearNotification } from "./reducers/notificationReducer"
import { initializeBlogs, updateBlogAction, setBlogs } from "./reducers/blogReducer"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }

  // const handleLike = async (blog) => {
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1,
  //   }

  //   await blogService.update(blog.id, updatedBlog)
  //   dispatch(initializeBlogs())
  // }

  const handleLike = async (blogToUpdate) => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    // await blogService.update(blogToUpdate.id, updatedBlog)
    // const updatedBlogs = blogs.map((blog) => (blog.id === blogToUpdate.id ? updatedBlog : blog))
    // dispatch(setBlogs(updatedBlogs))
    await blogService.update(updatedBlog.id, updatedBlog)
    // const updatedBlogs = blogs.map((blog) => (blog.id === blogToUpdate.id ? updatedBlog : { ...blog }))

    dispatch(updateBlogAction(updatedBlog))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogService.remove(blog.id)
      dispatch(initializeBlogs())
    }
  }

  // const handleSetBlogs = (newBlogs) => {
  //   dispatch(setBlogs(newBlogs))
  // }

  if (user === null) {
    return (
      <div>
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
        <Notification />
        <div>
          <h2>blogs</h2>
          <h3>{user.name}</h3>

          {blogs.sort(sortByLikes).map((blog) => (
            <Blog user={user} handleLike={handleLike} handleRemove={handleRemove} key={blog.id} blog={blog} />
            // <Blog key={blog.id} user={user} blog={blog} handleLike={() => handleLike(blog)} handleRemove={() => {}} />
          ))}
        </div>

        {/* <CreateBlogForm
          correctNotification={correctNotification}
          blogs={blogs}
          setBlogs={(newBlogs) => dispatch(setBlogs(newBlogs))}
          // setBlogs={handleSetBlogs}
          user={user}
        /> */}
        <button onClick={handleLogOut}>Log out</button>
      </div>
    )
  }
}

export default App
