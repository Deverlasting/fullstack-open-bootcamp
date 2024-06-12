import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate } from "react-router-dom"

export const UserAddedBlogs = ({ allUsers, blogs }) => {
  const personId = useParams().id
  const user = allUsers.find((u) => u.id === personId)
  const filteredBlogsId = user.blogs //blogs de los que quiero sacar el título

  return (
    <div>
      <h2>Blogs created by {user.name}</h2>
      <table>
        <tbody>
          {filteredBlogsId.map((filteredBlogId) => {
            const blog = blogs.find((b) => b.id === filteredBlogId)
            if (blog) {
              return (
                <tr key={blog.id}>
                  {/* <td>{blog.title}</td> */}
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                </tr>
              )
            }
            return null // Maneja el caso donde no se encuentra el blog
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserAddedBlogs
