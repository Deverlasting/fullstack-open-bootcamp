import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate } from "react-router-dom"

export const BlogView = ({ blogs, handleLike }) => {
  const blogId = useParams().id
  const blog = blogs.find((b) => b.id === blogId)

  return (
    // <div className="blog" style={blogStyle}>
    <div className="blog">
      <div>
        Autor: {blog.user.name}
        <br />
        Title: {blog.title}
        <br />
        url: {blog.url}
        <br />
        likes: {blog.likes}
        <button onClick={() => handleLike(blog)}>Like</button>
        <br />
      </div>
    </div>
  )

  //   return (
  //     <div>
  //       <h2>{blog.title}</h2>
  //       <h3></h3>
  //     </div>
  //   )
}

export default BlogView
