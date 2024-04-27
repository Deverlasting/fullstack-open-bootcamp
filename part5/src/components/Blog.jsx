import React, { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog, onLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    const updatedBlog = {
      // ...blog,
      likes: blog.likes + 1,
    }

    await blogs.update(blog.id, updatedBlog)

    // window.location.reload()
    onLike()
  }

  const handleRemove = () => {
    blogs.remove(blog.id)
    // window.location.reload()
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>View</button>
      </div>

      {showDetails && (
        <div>
          {blog.url}
          <br />
          {blog.likes}
          <button onClick={handleLike}>Like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={handleRemove} style={{ backgroundColor: "#f25073" }}>
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
