import React, { useState } from "react"
// import blogs from "../services/blogs"

const Blog = ({ blog, handleLike, onRemove, user }) => {
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

  const handleRemove = async () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogs.remove(blog.id)
      onRemove()
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button className="viewButton" onClick={toggleDetails}>
          View
        </button>
      </div>
      {showDetails && (
        <div>
          {blog.url}
          <br />
          {blog.likes}
          <button onClick={() => handleLike(blog)}>Like</button>
          <br />
          {blog.user.name}
          <br />
          {user.username === blog.user.username ? (
            <button onClick={handleRemove} style={{ backgroundColor: "#f25073" }}>
              Remove{" "}
            </button>
          ) : null}
          {/* <button onClick={handleRemove} style={{ backgroundColor: "#f25073" }}>
            Remove
          </button> */}
        </div>
      )}
    </div>
  )
}

export default Blog
