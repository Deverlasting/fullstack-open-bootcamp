import { useState } from "react"
import blogService from "../services/blogs"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import "../styles/createBlogForm.css"

export const CreateBlogForm = ({ correctNotification }) => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
  const showWhenVisible = { display: createBlogVisible ? "" : "none" }

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })

  console.log(hideWhenVisible)

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    newBlogMutation.mutate(blogObject)

    // Reset form inputs
    setTitle("")
    setAuthor("")
    setUrl("")

    correctNotification()
  }

  return (
    <div className="blog">
      <button className="new-blog-button" style={hideWhenVisible} onClick={() => setCreateBlogVisible(true)}>
        New blog
      </button>
      {/* <div className="create-blog-form" style={showWhenVisible}> */}
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        {/* <form> */}
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            data-testid="title"
            placeholder="Enter title"
            type="text"
            value={title}
            name="title"
            onChange={handleChangeTitle}
          />
          <br />
          <label>Author</label>
          <input
            data-testid="author"
            placeholder="Enter author"
            type="text"
            value={author}
            name="author"
            onChange={handleChangeAuthor}
          />
          <br />
          <label>Url</label>
          <input data-testid="url" placeholder="Enter URL" type="text" value={url} name="url" onChange={handleChangeUrl} />
          <br />
          <div>
            <button className="create-blog-button" onClick={handleSubmit}>
              {/* <button className="create-blog-button" type="submit"> */}
              Create new blog
            </button>
          </div>
        </form>
        <button className="cancel-button" onClick={() => setCreateBlogVisible(false)}>
          cancel
        </button>
      </div>
    </div>
  )
}

export default CreateBlogForm
