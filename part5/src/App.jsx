import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const [notificationMessage, setNotificationMessage] = useState("")
  const [typeMessage, setTypeMessage] = useState()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      setTypeMessage("error")
      setNotificationMessage(`${exception.response.data.error}`)

      setTimeout(() => {
        setTypeMessage(null)
        setNotificationMessage(null)
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService.create(noteObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      // setNewNote("")
    })

    setTypeMessage("correct")
    setNotificationMessage(`blog added correctly`)
    setTimeout(() => {
      setTypeMessage(null)
      setNotificationMessage(null)
    }, 5000)
  }

  //RENDER
  if (user === null) {
    return (
      <div>
        <Notification notificationMessage={notificationMessage} typeMessage={typeMessage} />
        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification notificationMessage={notificationMessage} typeMessage={typeMessage} />
      <div>
        <h2>blogs</h2>
        <h3>{loggedUser.name}</h3>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Title
            <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            Author
            <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>
            Url
            <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default App
