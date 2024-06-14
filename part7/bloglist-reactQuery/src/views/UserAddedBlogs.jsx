import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate } from "react-router-dom"
import "../styles/userAddedBlogs.css"

export const UserAddedBlogs = ({ allUsers, blogs }) => {
  const personId = useParams().id
  const user = allUsers.find((u) => u.id === personId)
  const filteredBlogsId = user.blogs //blogs de los que quiero sacar el título

  return (
    <div className="blogs-by-user">
      <h2>Blogs created by {user.name}</h2>
      <table className="blogs-table">
        <tbody>
          {filteredBlogsId.map((filteredBlogId) => {
            const blog = blogs.find((b) => b.id === filteredBlogId)
            if (blog) {
              return (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`} className="blog-link">
                      {blog.title}
                    </Link>
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
