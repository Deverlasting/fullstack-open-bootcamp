import { useState } from "react"

export const CreateBlogForm = ({
  handleSubmit,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
  const showWhenVisible = { display: createBlogVisible ? "" : "none" }

  return (
    <div className="blog">
      <button style={hideWhenVisible} onClick={() => setCreateBlogVisible(true)}>
        New blog
      </button>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          Title
          <input placeholder="title" type="text" value={title} name="title" onChange={handleTitleChange} />
          <br />
          Author
          <input placeholder="author" type="text" value={author} name="author" onChange={handleAuthorChange} />
          <br />
          Url
          <input placeholder="url" type="text" value={url} name="url" onChange={handleUrlChange} />
          <br />
          <button onClick={() => setCreateBlogVisible(false)} type="submit">
            Create new blog
          </button>
        </form>
        <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default CreateBlogForm
