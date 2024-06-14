import React, { useState } from "react"
// import blogs from "../services/blogs"
import blogService from "../services/blogs"
import CreateBlogForm from "./CreateBlogForm"
import "../styles/blogs.css"

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
    //hacer que aparezca el botón de remove cuando se renderiza la primera vez(?)
  }

  return (
    <div className="blog">
      <div className="blog-header">
        <span className="blog-title">
          {blog.title} {blog.author}
        </span>
        <button className="view-button" onClick={toggleDetails}>
          {showDetails ? "Hide" : "View"}
        </button>
      </div>
      {showDetails && (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button className="like-button" onClick={() => handleLike(blog)}>
              Like
            </button>
          </p>
          <p>Posted by: {blog.user.name}</p>
          {user.username === blog.user.username && (
            <button className="remove-button" onClick={() => handleRemove(blog)}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
