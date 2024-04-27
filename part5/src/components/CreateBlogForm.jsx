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
    <div>
      <button style={hideWhenVisible} onClick={() => setCreateBlogVisible(true)}>
        New blog
      </button>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Title
            <input type="text" value={title} name="title" onChange={handleTitleChange} />
          </div>
          <div>
            Author
            <input type="text" value={author} name="author" onChange={handleAuthorChange} />
          </div>
          <div>
            Url
            <input type="text" value={url} name="url" onChange={handleUrlChange} />
          </div>
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
