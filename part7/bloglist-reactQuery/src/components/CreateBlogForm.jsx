import { useState } from "react"
import blogService from "../services/blogs"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

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
      <button style={hideWhenVisible} onClick={() => setCreateBlogVisible(true)}>
        New blog
      </button>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          Title
          <input
            data-testid="title"
            placeholder="title"
            type="text"
            value={title}
            name="title"
            onChange={handleChangeTitle}
          />
          <br />
          Author
          <input
            data-testid="author"
            placeholder="author"
            type="text"
            value={author}
            name="author"
            onChange={handleChangeAuthor}
          />
          <br />
          Url
          <input data-testid="url" placeholder="url" type="text" value={url} name="url" onChange={handleChangeUrl} />
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
