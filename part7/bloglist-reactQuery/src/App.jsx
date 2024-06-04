import { useState, useEffect, useReducer, useContext } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
// import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogForm"
import notificationReducer, { setNotificationAction, clearNotificationAction } from "./reducers/notificationReducer"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import { loginUser } from "./reducers/userReducer"

import { UserContext } from "./context/UserContext"
import userReducer, { loginUserAction, setUsernameAction, setPasswordAction } from "./reducers/userReducer"

const App = () => {
  // const queryClient = new QueryClient()
  const queryClient = useQueryClient()

  const initialState = {
    message: null,
    messageType: null,
  }
  // En notificationState se guarda la info.
  // Dispatch puede acceder a las funciones de notificationReducer(setNotificationAction, clearNotificationAction)
  const [notificationState, dispatch] = useReducer(notificationReducer, initialState)
  const [user, userDispatch] = useContext(UserContext)
  console.log("user APP", user)
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
  })

  const blogs = result.data

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
      // setUser(user)
      // userDispatch(setUser)
      userDispatch(loginUserAction(user))
      blogService.setToken(user.token)
    }
  }, [])

  // const handleLogin = async (event) => {
  //   event.preventDefault()

  //   // try {
  //   const user = await loginService.login({
  //     username,
  //     password,
  //   })
  //   window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
  //   blogService.setToken(user.token)
  //   dispatch(loginUser(username, password))
  //   // dispatch(loginUser(username, password))
  //   // dispatch(loginUser(username, password))
  //   // dispatch(loginUser(username, password))
  //   // setUser(user)
  //   // setUsername("")
  //   // setPassword("")
  //   // } catch (exception) {
  //   // dispatch(setNotificationAction(exception.response.data.error, "error"))
  //   // setTimeout(() => {
  //   //   dispatch(clearNotificationAction())
  //   // }, 5000)
  //   // }
  // }
  const handleLogin = async (event) => {
    event.preventDefault()
    // try {
    //   const loginUser = await loginService.login({
    //     username: user.username,
    //     password: user.password,
    //   })

    //   window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(loginUser))
    //   blogService.setToken(loginUser.token)
    //   // userDispatch(loginUserAction(loginUser))
    userDispatch(loginUser(user))
    // } catch (error) {
    //   dispatch(setNotificationAction(`${error.response.data.error} - ReactQuery`, "error"))
    //   setTimeout(() => {
    //     dispatch(clearNotificationAction())
    //   }, 5000)
    // }
  }

  const handleUsernameChange = (event) => {
    userDispatch(setUsernameAction(event.target.value))
  }

  const handlePasswordChange = (event) => {
    userDispatch(setPasswordAction(event.target.value))
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

  const handleLikeMutation = useMutation({
    mutationFn: async (blog) => {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      await blogService.update(blog.id, updatedBlog)
      return updatedBlog
    },

    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries(["blogs"], {
        updatedData: (oldBlogs) => oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      })
    },
  })

  const handleRemoveMutation = useMutation({
    mutationFn: async (blog) => {
      if (window.confirm(`Remove ${blog.title}?`)) {
        await blogService.remove(blog.id)
      }
    },

    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries(["blogs"], {
        updatedData: (oldBlogs) => oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      })
    },
  })

  // RENDER
  // if (user.user === null) {
  if (loggedUser === null) {
    return (
      <div>
        <Notification notificationMessage={notificationState.message} typeMessage={notificationState.messageType} />
        <LoginForm
          handleLogin={handleLogin}
          username={user.username}
          handleUsernameChange={handleUsernameChange}
          password={user.password}
          handlePasswordChange={handlePasswordChange}
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
              <Blog
                // user={user}
                user={user.user}
                handleLike={() => handleLikeMutation.mutate(blog)}
                handleRemove={() => handleRemoveMutation.mutate(blog)}
                key={blog.id}
                blog={blog}
              />
            ))}
          </div>

          <CreateBlogForm correctNotification={correctNotification} />
          <button onClick={handleLogOut}>Log out</button>
        </div>
      )
    } else {
      return <div>loading data...</div>
    }
  }
}

export default App
