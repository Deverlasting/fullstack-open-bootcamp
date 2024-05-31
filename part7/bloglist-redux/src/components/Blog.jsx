import React, { useState } from "react"

const Blog = ({ blog, handleLike, handleRemove, user }) => {
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
    //hacer que aparezca el botón de remove cuando se renderiza la primera vez(?)
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
          {/* {JSON.stringify.blog.user} */}
          {blog.user.name}
          <br />
          {user.username === blog.user.username ? (
            <button onClick={() => handleRemove(blog)} style={{ backgroundColor: "#f25073" }}>
              Remove{" "}
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Blog
