import axios from "axios"
import { useState, useEffect } from "react"

const userBasicInfo = () => {
  const [users, setUsers] = useState([])

  const getAllUsers = async () => {
    const baseUrl = "/api/users"
    const response = await axios.get(baseUrl)
    const users = response.data
    setUsers(users)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  //   return (
  //     <div>
  //       <h3>Users basic info</h3>
  //       <ul>
  //         {users.map((user) => (
  //           <li key={user.id}>
  //             {user.name} - Blogs: {user.blogs.length}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   )

  return (
    <div>
      <h3>Users basic info</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default userBasicInfo
