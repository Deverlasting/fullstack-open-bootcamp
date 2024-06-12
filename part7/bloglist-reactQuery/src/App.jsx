import { useEffect, useReducer, useContext, useState } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogForm"
import notificationReducer, {
  notificationInitialState,
  setNotificationAction,
  clearNotificationAction,
} from "./reducers/notificationReducer"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import LoggedUserContext from "./context/LoggedUserContext"
import { loginUserAction } from "./reducers/loggedUserReducer"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Users from "./components/Users"
import UserAddedBlogs from "./components/UserAddedBlogs"

import axios from "axios"
import BlogView from "./views/BlogView"

const App = () => {
  // const queryClient = new QueryClient()
  const queryClient = useQueryClient()

  // const initialState = {
  //   message: null,
  //   messageType: null,
  // }
  // En notificationState se guarda la info.
  // Dispatch puede acceder a las funciones de notificationReducer(setNotificationAction, clearNotificationAction)
  const [notificationState, dispatch] = useReducer(notificationReducer, notificationInitialState)
  const [user, userDispatch] = useContext(LoggedUserContext) //modificar nombre user - loggeduser

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

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
  //   if (loggedUserJSON) {
  //     const loginUser = JSON.parse(loggedUserJSON)
  //     // setUser(user)
  //     // userDispatch(setUser)
  //     loginUserDispatch(loginUserAction(loginUser))
  //     blogService.setToken(loginUser.token)
  //   }
  // }, [])

  const handleLogin = async (userFormValues) => {
    try {
      userDispatch(await loginUserAction(userFormValues.username, userFormValues.password, dispatch))
    } catch (error) {
      dispatch(setNotificationAction(`${error.response.data.error} - ReacqQuery`, "error"))
      setTimeout(() => {
        dispatch(clearNotificationAction())
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    location.reload()
  }

  // // Obtener el valor de "loggedBlogAppUser" del localStorage
  // const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
  // // Convertir el valor JSON a un objeto JavaScript
  // const loggedUser = JSON.parse(loggedUserJSON)

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

  /////VIEWS//////
  const [allUsers, setAllUsers] = useState()

  const getAllUsers = async () => {
    const baseUrl = "/api/users"
    const response = await axios.get(baseUrl)
    const users = response.data
    setAllUsers(users)
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  ////VIEWS END//////////////////////////////////////////////
  // RENDER
  if (user.token === null) {
    // if (loggedUser === null) {
    return (
      <div>
        <Notification notificationMessage={notificationState.message} typeMessage={notificationState.messageType} />
        <LoginForm onSubmit={handleLogin} />
      </div>
    )
  } else {
    if (result.data) {
      return (
        <div>
          <Notification notificationMessage={notificationState.message} typeMessage={notificationState.messageType} />
          <div>
            <h2>blogs</h2>
            <h3>{user.name}</h3>

            {blogs.sort(sortByLikes).map((blog) => (
              <Blog
                // user={user}
                user={user}
                handleLike={() => handleLikeMutation.mutate(blog)}
                handleRemove={() => handleRemoveMutation.mutate(blog)}
                key={blog.id}
                blog={blog}
              />
            ))}
          </div>

          <CreateBlogForm correctNotification={correctNotification} />
          <button onClick={handleLogOut}>Log out</button>

          <h2>***View section***</h2>
          {/* <UsersBasicInfo />
          <LoginUserInfo /> */}
          <Router>
            <div>
              <Link to="/">Clear</Link>
              <br />
              <Link to="/users">Basic info from users</Link>
              <br />
              <br />
            </div>

            <Routes>
              <Route path="/" element={<div />} /> {/* renderiza un div vacío, limpia la sección, no muestra nada */}
              <Route path="/users/:id" element={<UserAddedBlogs allUsers={allUsers} blogs={blogs} />} />
              <Route path="/users" element={<Users allUsers={allUsers} />} />
              <Route
                path="/blogs/:id"
                element={<BlogView blogs={blogs} handleLike={() => handleLikeMutation.mutate(blog)} />}
              />
            </Routes>
          </Router>
        </div>
      )
    } else {
      return <div>loading data...</div>
    }
  }
}

export default App
