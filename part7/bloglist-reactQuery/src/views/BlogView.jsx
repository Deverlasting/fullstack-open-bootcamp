import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import blogService from "../services/blogs"
import "../styles/blogView.css"

export const BlogView = ({ blogs, handleLike }) => {
  const blogId = useParams().id
  const blog = blogs.find((b) => b.id === blogId)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(blog.comments)

  const handleSubmit = (event) => {
    event.preventDefault()
    const commentObject = {
      content: comment,
    }

    blogService.createComment(blogId, commentObject).then((returnedComment) => {
      setComments(comments.concat(returnedComment))
      setComment("")
    })
  }

  const handleChangeComment = (event) => {
    setComment(event.target.value)
  }

  return (
    <div className="blog-details">
      <div className="blog-info">
        <p>
          <strong>Autor:</strong> {blog.user.name}
        </p>
        <p>
          <strong>Title:</strong> {blog.title}
        </p>
        <p>
          <strong>Url:</strong> {blog.url}
        </p>
        <p>
          <strong>Likes:</strong> {blog.likes}
        </p>
        <button className="like-button" onClick={() => handleLike(blog)}>
          Like
        </button>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <form className="comment-form" onSubmit={handleSubmit}>
          <label htmlFor="comment">Comment</label>
          <input
            id="comment"
            placeholder="Enter comment"
            type="text"
            value={comment}
            name="comment"
            onChange={handleChangeComment}
          />
          <button className="send-comment-button" type="submit">
            Send comment
          </button>
        </form>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              {comment.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogView
